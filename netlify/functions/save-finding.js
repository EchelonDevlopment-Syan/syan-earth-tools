// SYAN.EARTH - Save Correlation Finding to Notion
// Writes analysis results to the Correlation Findings database
// Database ID: e7429a2c9fac4c1d9c3bb0abb93be628

const NOTION_DATABASE_ID = 'e7429a2c9fac4c1d9c3bb0abb93be628';

// Map source names to Notion multi-select options
const DATA_SOURCE_MAP = {
  // Tampa Bay engine sources
  'FWC HAB Database': 'FWC HAB Database',
  'Tampa Bay Estuary Program': 'TBEP',
  'Egmont Channel Buoy': 'NOAA Buoy 42098',
  'MacDill AFB Weather': 'MacDill AFB',
  'Old Tampa Bay Program': 'FWRI OTB',
  'USF Water Atlas': 'USF WFCOM',
  'Pinellas Red Tide Counts': 'Pinellas County',
  'Egmont Key C-MAN': 'GCOOS',
  // Global engine sources
  'Weather Rescue 1861': 'Weather Rescue 1861',
  'Met Office Historic': 'Met Office Historic',
  'HadCET': 'HadCET',
  'CEDA MIDAS': 'CEDA MIDAS',
  'Copernicus Marine': 'Copernicus Marine',
  'Bio-Argo': 'Bio-Argo',
  'NOAA SST': 'NOAA SST'
};

// Map analysis types to Notion correlation type options
const CORRELATION_TYPE_MAP = {
  // Tampa Bay engine types
  'hab_prediction': 'SST-HAB',
  'transport_analysis': 'Transport-HAB',
  'weather_correlation': 'Weather-Biology',
  'long_term_trends': 'Historical-Modern',
  'custom': 'Multi-Domain',
  // Global engine types
  'cross-domain': 'Multi-Domain',
  'bloom-prediction': 'SST-HAB',
  'trend-analysis': 'Historical-Modern'
};

exports.handler = async (event) => {
  // CORS preflight
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
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const notionKey = process.env.NOTION_API_KEY;
  if (!notionKey) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'NOTION_API_KEY not configured. Add it in Netlify environment variables.' })
    };
  }

  try {
    const { title, analysisText, dataSources, analysisType, timestamp } = JSON.parse(event.body);

    // Map data source names to Notion multi-select options
    const notionDataSources = (dataSources || [])
      .map(name => DATA_SOURCE_MAP[name] || name)
      .filter(Boolean)
      .map(name => ({ name }));

    const correlationType = CORRELATION_TYPE_MAP[analysisType] || 'Multi-Domain';

    // Build Notion page properties
    const properties = {
      'Finding Title': {
        title: [{ text: { content: title || 'Tampa Bay Analysis' } }]
      },
      'Full Analysis': {
        rich_text: [{ text: { content: (analysisText || '').slice(0, 2000) } }]
      },
      'Discovery Date': {
        date: { start: timestamp ? timestamp.split('T')[0] : new Date().toISOString().split('T')[0] }
      },
      'Correlation Type': {
        select: { name: correlationType }
      },
      'Data Sources Used': {
        multi_select: notionDataSources
      },
      'Research Implication': {
        select: { name: 'HAB Early Warning' }
      }
    };

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: data.message || 'Notion API error', details: data })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        success: true,
        pageId: data.id,
        url: data.url
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};
