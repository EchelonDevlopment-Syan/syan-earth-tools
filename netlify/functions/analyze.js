export default async (req) => {
    if (req.method === 'OPTIONS') {
          return new Response('', {
                  status: 200,
                  headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'Access-Control-Allow-Methods': 'POST, OPTIONS'
                  }
          });
    }

    if (req.method !== 'POST') {
          return new Response('Method Not Allowed', { status: 405 });
    }

    try {
          const body = await req.json();

      let messages;
          if (body.messages) {
                  messages = body.messages;
          } else if (body.query) {
                  const userContent = `Analyze this climate correlation query:\n\nQuery: ${body.query}\n\nData Sources to consider: ${(body.dataSources || []).join(', ')}\n\nProvide analysis with:\n1. Finding title\n2. Confidence score (0-100%)\n3. Correlation type\n4. Key variables\n5. R-value estimate\n6. Layman summary\n7. Problem solved\n8. Ideal organizations\n\nFormat response as JSON.`;
                  messages = [{ role: 'user', content: userContent }];
          } else {
                  return new Response(
                            JSON.stringify({ error: 'Missing required field: messages or query' }),
                    { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
                          );
          }

      const requestBody = {
              model: body.model || 'claude-sonnet-4-6',
              max_tokens: body.max_tokens || 2500,
              messages,
              stream: true
      };

      if (body.system) {
              requestBody.system = body.system;
      } else if (body.query) {
              requestBody.system = 'You are the SYAN.EARTH Correlation Engine, an expert in climate-ocean-biology pattern analysis. Focus on harmful algal blooms, particularly Karenia brevis in Tampa Bay and Gulf of Mexico. Provide scientifically grounded analysis with practical applications.';
      }

      const betaHeaders = [];
          if (body.tools && body.tools.length > 0) {
                  requestBody.tools = body.tools;
                  const hasWebSearch = body.tools.some(t => t.type === 'web_search_20250305');
                  if (hasWebSearch) betaHeaders.push('web-search-2025-03-05');
          }

      if (body.notionEnabled) {
              const notionToken = process.env.Notion_API_KEY || process.env.NOTION_API_KEY;
              if (notionToken) {
                        try {
                                    const notionHeaders = {
                                                  'Authorization': `Bearer ${notionToken}`,
                                                  'Notion-Version': '2022-06-28',
                                                  'Content-Type': 'application/json'
                                    };
                                    const [archiveRes, findingsRes] = await Promise.all([
                                                  fetch('https://api.notion.com/v1/databases/ea822bbc8b48422ca0925ea93a0bdade/query', {
                                                                  method: 'POST', headers: notionHeaders,
                                                                  body: JSON.stringify({ page_size: 8, sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }] })
                                                  }),
                                                  fetch('https://api.notion.com/v1/databases/e7429a2c9fac4c1d9c3bb0abb93be628/query', {
                                                                  method: 'POST', headers: notionHeaders,
                                                                  body: JSON.stringify({ page_size: 8, sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }] })
                                                  })
                                                ]);
                                    const archiveData = archiveRes.ok ? await archiveRes.json() : null;
                                    const findingsData = findingsRes.ok ? await findingsRes.json() : null;
                                    const extractTitle = (page) => {
                                                  const titleProp = Object.values(page.properties || {}).find(p => p.type === 'title');
                                                  return titleProp?.title?.[0]?.plain_text || 'Untitled';
                                    };
                                    let notionContext = '\n\nNOTION CLIMATE ARCHIVE CONTEXT:\n';
                                    if (archiveData?.results?.length) {
                                                  notionContext += '\nClimate Data Archive (recent entries):\n';
                                                  archiveData.results.forEach(p => { notionContext += `- ${extractTitle(p)}\n`; });
                                    }
                                    if (findingsData?.results?.length) {
                                                  notionContext += '\nCorrelation Findings (recent discoveries):\n';
                                                  findingsData.results.forEach(p => { notionContext += `- ${extractTitle(p)}\n`; });
                                    }
                                    if (requestBody.system) requestBody.system += notionContext;
                        } catch (notionErr) {
                                    console.error('Notion fetch error:', notionErr.message);
                        }
              }
      }

      const headers = {
              'Content-Type': 'application/json',
              'x-api-key': process.env.ANTHROPIC_API_KEY,
              'anthropic-version': '2023-06-01'
      };
          if (betaHeaders.length > 0) {
                  headers['anthropic-beta'] = betaHeaders.join(',');
          }

      const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
              method: 'POST',
              headers,
              body: JSON.stringify(requestBody)
      });

      if (!anthropicResponse.ok) {
              const errorText = await anthropicResponse.text();
              return new Response(
                        JSON.stringify({ error: `Anthropic API error (${anthropicResponse.status})`, detail: errorText.slice(0, 300) }),
                { status: anthropicResponse.status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
                      );
      }

      return new Response(anthropicResponse.body, {
              status: 200,
              headers: {
                        'Content-Type': 'text/event-stream',
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                        'Access-Control-Allow-Origin': '*'
              }
      });

    } catch (error) {
          return new Response(
                  JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
                );
    }
};

export const config = { path: '/netlify/functions/analyze' };
