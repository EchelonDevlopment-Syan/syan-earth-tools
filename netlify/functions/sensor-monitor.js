// SYAN.EARTH — Upper Tampa Bay Sensor Monitor
// Scheduled: every 6 hours via netlify.toml
//
// Anomaly #6: Egmont Channel Tidal Transport (R=0.68, p<0.01)
// Upper Tampa Bay shallow stagnant water stations detect microorganism
// activity 48-72 hours before Egmont Buoy 42098 — the bay entrance gateway.
//
// This function:
// 1. Queries NOAA NDBC Buoy 42098 (Egmont Channel) for current SST + conditions
// 2. Queries FWC HAB GIS for recent K. brevis counts at upper bay stations
// 3. Applies the 48-72hr early warning threshold model
// 4. Writes an alert to Notion Correlation Findings if threshold exceeded
// 5. Returns structured status for the UI polling endpoint

const NOTION_DATABASE_ID = 'e7429a2c9fac4c1d9c3bb0abb93be628';

// Upper Tampa Bay monitoring stations (shallow stagnant water — Anomaly #6 sensors)
const UPPER_BAY_STATIONS = [
  { name: 'Old Tampa Bay (FWRI OTB)',    lat: 27.9264, lng: -82.5917, threshold: 1000  },
  { name: 'Hillsborough Bay',            lat: 27.8700, lng: -82.4500, threshold: 1000  },
  { name: 'McKay Bay',                   lat: 27.9200, lng: -82.4400, threshold: 500   },
  { name: 'Upper Tampa Bay',             lat: 27.9500, lng: -82.5400, threshold: 1000  }
];

// Egmont Channel reference station (downstream — detects 48-72hr LATER)
const EGMONT_BUOY = { id: '42098', lat: 27.590, lng: -82.931 };

// K. brevis alert thresholds (cells/L) — from FWC classification
const KBREVIS_THRESHOLDS = {
  background:  1000,    // < 1K: background
  low:        10000,    // 1K–10K: low
  medium:    100000,    // 10K–100K: medium (shellfish advisory)
  high:     1000000    // > 1M: high (beach advisory)
};

// Geographic bounding box for upper Tampa Bay FWC HAB queries
const UPPER_BAY_BBOX = {
  xmin: -82.70, ymin: 27.80, xmax: -82.35, ymax: 28.05
};

const EGMONT_BBOX = {
  xmin: -83.10, ymin: 27.45, xmax: -82.60, ymax: 27.70
};

// ── Data Fetchers ──────────────────────────────────────────────────────────

async function fetchNOAABuoy(stationId) {
  // NDBC real-time standard meteorological data (last 45 obs)
  const url = `https://www.ndbc.noaa.gov/data/realtime2/${stationId}.txt`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const text = await res.text();
    const lines = text.trim().split('\n');
    // Line 0: header, Line 1: units, Line 2+: data (newest first)
    if (lines.length < 3) return null;
    const headers = lines[0].replace(/^#\s*/, '').trim().split(/\s+/);
    const values  = lines[2].trim().split(/\s+/);
    const record  = {};
    headers.forEach((h, i) => { record[h] = values[i]; });
    return {
      station:  stationId,
      time:    `${record.YY || record['#YY']}-${record.MM}-${record.DD} ${record.hh}:${record.mm} UTC`,
      sst:      record.WTMP !== 'MM' ? parseFloat(record.WTMP) : null,  // °C
      waveHt:   record.WVHT !== 'MM' ? parseFloat(record.WVHT) : null,  // m
      windSpd:  record.WSPD !== 'MM' ? parseFloat(record.WSPD) : null,  // m/s
      windDir:  record.WDIR !== 'MM' ? parseFloat(record.WDIR) : null   // degrees
    };
  } catch {
    return null;
  }
}

async function fetchFWCHABCounts(bbox, label) {
  // FWC HAB Mapping GIS REST API — K. brevis cell counts
  // Filter: last 14 days, within bounding box
  const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString().split('T')[0];
  const geometry = encodeURIComponent(JSON.stringify({
    xmin: bbox.xmin, ymin: bbox.ymin,
    xmax: bbox.xmax, ymax: bbox.ymax,
    spatialReference: { wkid: 4326 }
  }));

  const url = `https://geodata.myfwc.com/arcgis/rest/services/FWC/HabMapping/MapServer/0/query` +
    `?where=${encodeURIComponent(`SAMPLE_DATE >= DATE '${twoWeeksAgo}'`)}` +
    `&geometry=${geometry}` +
    `&geometryType=esriGeometryEnvelope` +
    `&spatialRel=esriSpatialRelContains` +
    `&outFields=SAMPLE_DATE,LATITUDE,LONGITUDE,CELLCOUNT,GENUS,SPECIES,LOCATION_D` +
    `&orderByFields=SAMPLE_DATE+DESC` +
    `&resultRecordCount=50` +
    `&returnGeometry=false` +
    `&f=json`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) return { label, records: [], error: `HTTP ${res.status}` };
    const data = await res.json();
    if (data.error) return { label, records: [], error: data.error.message };

    const records = (data.features || []).map(f => ({
      date:      f.attributes.SAMPLE_DATE,
      lat:       f.attributes.LATITUDE,
      lng:       f.attributes.LONGITUDE,
      cells:     f.attributes.CELLCOUNT,
      genus:     f.attributes.GENUS,
      species:   f.attributes.SPECIES,
      location:  f.attributes.LOCATION_D
    }));

    // Find peak K. brevis (Karenia brevis) count
    const kbRecords = records.filter(r =>
      r.genus && r.genus.toLowerCase().includes('karenia')
    );
    const peakCells = kbRecords.length > 0
      ? Math.max(...kbRecords.map(r => r.cells || 0))
      : 0;

    return { label, records: kbRecords, peakCells, totalRecords: records.length };
  } catch (err) {
    return { label, records: [], error: err.message };
  }
}

// ── Alert Level Classifier ─────────────────────────────────────────────────

function classifyAlert(upperBayPeak, egmontPeak, buoySST) {
  // Anomaly #6 logic: upper bay elevation before Egmont = early warning
  const upperElevated = upperBayPeak >= KBREVIS_THRESHOLDS.low;
  const egmontClear   = egmontPeak  <  KBREVIS_THRESHOLDS.low;
  const sstWarming    = buoySST     !== null && buoySST >= 28.0;

  if (upperElevated && egmontClear) {
    // Classic Anomaly #6 signature: upper bay ahead of Egmont
    const level = upperBayPeak >= KBREVIS_THRESHOLDS.high   ? 'CRITICAL' :
                  upperBayPeak >= KBREVIS_THRESHOLDS.medium  ? 'HIGH'     : 'WATCH';
    return {
      triggered: true,
      level,
      leadTime: '48-72 hours',
      message: `Upper bay K. brevis (${upperBayPeak.toLocaleString()} cells/L) elevated while Egmont clear — Anomaly #6 early warning pattern. Bloom expected at Egmont Channel in 48-72 hours.`,
      sstNote: sstWarming ? `SST ${buoySST}°C ≥ 28°C threshold — bloom activation conditions present.` : null
    };
  }

  if (upperElevated && !egmontClear) {
    return {
      triggered: false,
      level: 'ACTIVE',
      leadTime: null,
      message: `Active bloom detected at both upper bay (${upperBayPeak.toLocaleString()} cells/L) and Egmont (${egmontPeak.toLocaleString()} cells/L). Transport already underway.`
    };
  }

  return {
    triggered: false,
    level: upperBayPeak > 0 ? 'BACKGROUND' : 'CLEAR',
    leadTime: null,
    message: upperBayPeak > 0
      ? `Low-level K. brevis present (${upperBayPeak.toLocaleString()} cells/L). Below early warning threshold.`
      : 'No K. brevis detected in upper Tampa Bay stations. Conditions clear.'
  };
}

// ── Notion Alert Writer ────────────────────────────────────────────────────

async function writeNotionAlert(alert, upperData, egmontData, buoy) {
  const notionKey = process.env.NOTION_API_KEY;
  if (!notionKey) return null;

  const title = `⚠️ Anomaly #6 Alert [${alert.level}] — Upper Bay Early Warning ${new Date().toISOString().split('T')[0]}`;

  const fullText = [
    `ALERT LEVEL: ${alert.level}`,
    `LEAD TIME: ${alert.leadTime || 'N/A'}`,
    '',
    alert.message,
    alert.sstNote || '',
    '',
    `UPPER BAY DATA (${upperData.label}):`,
    `  Peak K. brevis: ${(upperData.peakCells || 0).toLocaleString()} cells/L`,
    `  Records (14 days): ${upperData.totalRecords || 0}`,
    upperData.error ? `  API Error: ${upperData.error}` : '',
    '',
    `EGMONT REFERENCE (${egmontData.label}):`,
    `  Peak K. brevis: ${(egmontData.peakCells || 0).toLocaleString()} cells/L`,
    egmontData.error ? `  API Error: ${egmontData.error}` : '',
    '',
    buoy ? [
      `NOAA BUOY 42098 (Egmont Channel):`,
      `  SST: ${buoy.sst !== null ? buoy.sst + '°C' : 'N/A'}`,
      `  Wind: ${buoy.windSpd !== null ? buoy.windSpd + ' m/s @ ' + buoy.windDir + '°' : 'N/A'}`,
      `  Wave Ht: ${buoy.waveHt !== null ? buoy.waveHt + 'm' : 'N/A'}`,
      `  Obs Time: ${buoy.time}`
    ].join('\n') : 'NOAA Buoy 42098: data unavailable',
    '',
    `SOURCE: SYAN.EARTH automated sensor monitor`,
    `ANOMALY REF: #6 — Egmont Channel Tidal Transport (R=0.68, p<0.01)`,
    `MONITOR RUN: ${new Date().toISOString()}`
  ].filter(l => l !== null && l !== undefined).join('\n').trim();

  try {
    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          'Finding Title':   { title: [{ text: { content: title } }] },
          'Full Analysis':   { rich_text: [{ text: { content: fullText.slice(0, 2000) } }] },
          'Correlation Type':{ select: { name: 'Transport-HAB' } },
          'Research Implication': { select: { name: 'HAB Early Warning' } },
          'Data Sources Used': { multi_select: [
            { name: 'NOAA Buoy 42098' },
            { name: 'FWC HAB Database' },
            { name: 'FWRI OTB' }
          ]},
          'Key Variables': { multi_select: [
            { name: 'K. brevis Cells' },
            { name: 'Tidal Current' },
            { name: 'SST' }
          ]},
          'Discovery Date': { date: { start: new Date().toISOString().split('T')[0] } },
          'R-Value':         { number: 0.68 },
          'Confidence Score':{ number: 0.80 },
          'Statistical Significance': { select: { name: 'p < 0.01' } }
        }
      })
    });
    const data = await res.json();
    return res.ok ? { pageId: data.id, url: data.url } : null;
  } catch {
    return null;
  }
}

// ── Main Handler ───────────────────────────────────────────────────────────

exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  try {
    // Run all data fetches in parallel
    const [buoy, upperBayData, egmontData] = await Promise.all([
      fetchNOAABuoy(EGMONT_BUOY.id),
      fetchFWCHABCounts(UPPER_BAY_BBOX, 'Upper Tampa Bay'),
      fetchFWCHABCounts(EGMONT_BBOX,    'Egmont Channel')
    ]);

    const upperPeak  = upperBayData.peakCells || 0;
    const egmontPeak = egmontData.peakCells   || 0;
    const sst        = buoy ? buoy.sst : null;

    const alert = classifyAlert(upperPeak, egmontPeak, sst);

    // Write to Notion only for WATCH level and above (not CLEAR/BACKGROUND)
    let notionResult = null;
    const scheduledRun = event.httpMethod !== 'GET' && event.httpMethod !== 'POST';
    const manualTrigger = event.httpMethod === 'POST';

    if (alert.triggered || manualTrigger) {
      notionResult = await writeNotionAlert(alert, upperBayData, egmontData, buoy);
    }

    const result = {
      timestamp:   new Date().toISOString(),
      alert,
      stations: {
        upperBay: {
          peakCells:    upperPeak,
          totalRecords: upperBayData.totalRecords || 0,
          error:        upperBayData.error || null,
          recentSamples: (upperBayData.records || []).slice(0, 5).map(r => ({
            date:     r.date ? new Date(r.date).toISOString().split('T')[0] : 'unknown',
            cells:    r.cells,
            location: r.location
          }))
        },
        egmont: {
          peakCells:    egmontPeak,
          totalRecords: egmontData.totalRecords || 0,
          error:        egmontData.error || null
        }
      },
      buoy: buoy ? {
        sst:     buoy.sst,
        windSpd: buoy.windSpd,
        windDir: buoy.windDir,
        waveHt:  buoy.waveHt,
        time:    buoy.time
      } : null,
      notionAlert: notionResult ? { written: true, url: notionResult.url } : null,
      anomalyRef: {
        id:        6,
        name:      'Egmont Channel Tidal Transport',
        rValue:    0.68,
        pValue:    'p < 0.01',
        leadTime:  '48-72 hours',
        mechanism: 'Flood tide transports K. brevis from upper bay shallow stagnant zones through Egmont Channel'
      }
    };

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message, timestamp: new Date().toISOString() })
    };
  }
};
