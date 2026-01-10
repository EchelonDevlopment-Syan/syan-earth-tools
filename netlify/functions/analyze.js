exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    
    // Build messages array - handle both formats
    let messages;
    if (body.messages) {
      // Frontend sent messages directly
      messages = body.messages;
    } else if (body.query) {
      // Frontend sent query/dataSources format - convert it
      const userContent = `Analyze this climate correlation query:

Query: ${body.query}

Data Sources to consider: ${(body.dataSources || []).join(', ')}

Provide analysis with:
1. Finding title
2. Confidence score (0-100%)
3. Correlation type
4. Key variables
5. R-value estimate
6. Layman's summary (2-3 sentences anyone can understand)
7. Problem solved (real-world impact)
8. Ideal organizations that would benefit

Format response as JSON.`;

      messages = [{ role: 'user', content: userContent }];
    } else {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Missing required field: messages or query' })
      };
    }

    const requestBody = {
      model: body.model || 'claude-sonnet-4-20250514',
      max_tokens: body.max_tokens || 4096,
      messages: messages
    };

    if (body.system) {
      requestBody.system = body.system;
    } else if (body.query) {
      // Add default system prompt for query mode
      requestBody.system = 'You are the SYAN.EARTH Correlation Engine, an expert in climate-ocean-biology pattern analysis. Focus on harmful algal blooms, particularly Karenia brevis in Tampa Bay and Gulf of Mexico. Provide scientifically grounded analysis with practical applications.';
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: { 
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return { 
      statusCode: 500, 
      headers: { 
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*' 
      }, 
      body: JSON.stringify({ error: error.message }) 
    };
  }
};
