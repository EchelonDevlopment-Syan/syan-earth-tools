<div align="center" style="background: linear-gradient(135deg, #B87333, #8B5A2B); padding: 60px 40px; border-radius: 12px;">

# SYAN.EARTH CORRELATION ENGINE

### User Manual v1.0 | January 2026

**Climate Intelligence Platform**
*Powered by Echelon Development & Contract Consulting LLC*

---

*"From 366 Years of Data to Actionable Intelligence"*

</div>

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Data Source Index](#2-data-source-index)
3. [Analysis Types](#3-analysis-types)
4. [Methodology](#4-methodology)
5. [Running Modes](#5-running-modes)
6. [Connecting to Data Sources](#6-connecting-to-data-sources)
7. [Ten Historic Anomaly Findings](#7-ten-historic-anomaly-findings)
8. [Top 10 Untried Use Cases](#8-top-10-untried-use-cases)
9. [Competitor Landscape](#9-competitor-landscape)
10. [Technical References](#10-technical-references)

---

# 1. Platform Overview

## What It Does

The SYAN.EARTH Correlation Engine analyzes relationships between environmental variables across **366 years of historical data** to:

- **Predict** harmful algal bloom (HAB) events in Tampa Bay
- **Identify** lead times and operational triggers for coastal risk
- **Connect** global climate patterns to local ecological outcomes

> **The Echelon Philosophy**: "Pilot in Command" — AI serves as avionics and instrumentation, not as a replacement for human decision-making. SYAN.EARTH is the connective tissue between raw data and expert decisions.

## Live Platform

| Resource | URL |
|----------|-----|
| **Web Interface** | [syanearthtools.netlify.app](https://syanearthtools.netlify.app) |
| **Tampa Bay Module** | Regional analysis for MacDill, Egmont Key, Fort De Soto, Skyway Bridge |
| **GitHub Repository** | [github.com/syan-earth/syan-earth-tools](https://github.com/syan-earth/syan-earth-tools) |
| **Website** | [syan.earth](https://syan.earth) |

## Key Capabilities

| Capability | Description |
|------------|-------------|
| Multi-Source Correlation | Select 2+ data sources spanning 366 years for cross-domain analysis |
| AI Pattern Recognition | Claude API (claude-sonnet-4-20250514) identifies statistical relationships |
| Web Search Integration | Real-time data retrieval during analysis via Claude Web Search tool |
| Notion MCP Integration | Direct access to Climate Data Archive and Correlation Findings databases |
| Interactive Map | SVG-based Tampa Bay map with 8 clickable monitoring stations |

## Platform Statistics

| Metric | Value |
|--------|-------|
| Years of Data | 366 (1659–2025) |
| Total Data Sources | 24 |
| HAB Records | 200,000+ |
| Validated Correlations | 10 |
| Tampa Bay Stations | 8 |
| Global/UK Sources | 8 |

---

# 2. Data Source Index

## Tampa Bay Regional Sources

| Source ID | Full Name | Type | Date Range | Records | Description | Access URL |
|-----------|-----------|------|------------|---------|-------------|------------|
| `fwc_hab` | FWC HAB Database | HAB | 1953–2025 | 200K+ | Karenia brevis red tide records — longest HAB dataset in the US (70+ years) | [myfwc.com/research/redtide](https://myfwc.com/research/redtide/) |
| `tbep_wq` | Tampa Bay Estuary Program | Water Quality | 1972–2025 | 26K+ | 50+ years of estuary water quality monitoring (nutrients, chlorophyll, DO) | [tbep.org](https://tbep.org/) |
| `noaa_42098` | Egmont Channel Buoy 42098 | Ocean | 2015–2025 | Real-time | Wind, waves, SST, currents at Tampa Bay entrance — first bloom detection point | [ndbc.noaa.gov/42098](https://www.ndbc.noaa.gov/station_page.php?station=42098) |
| `macdill_afb` | MacDill AFB Weather Station | Weather | 1941–2025 | 30K+ | 80+ years continuous local weather with military-grade accuracy | NOAA ISD/NCEI |
| `fwri_otb` | FWRI Old Tampa Bay Program | HAB | 2011–2025 | 5K+ | Pyrodinium bahamense monitoring — secondary HAB species tracking | FWC-FWRI |
| `usf_atlas` | USF Water Atlas | Water Quality | 1990–2025 | Composite | Multi-agency aggregated water quality data for Tampa Bay region | [tampabay.wateratlas.usf.edu](https://www.tampabay.wateratlas.usf.edu/) |
| `pinellas_rt` | Pinellas Red Tide Counts | HAB | 2000–2025 | Weekly | Beach-level K. brevis monitoring at Fort De Soto area, public health focus | Pinellas County Environmental Management |
| `egkf1` | Egmont Key C-MAN Station | Ocean | 1990–2025 | Continuous | Bay gateway meteorological and water temperature at 6-minute resolution | [ndbc.noaa.gov](https://www.ndbc.noaa.gov/) |

### Tampa Bay Station Coordinates

| Station | Latitude | Longitude | Location |
|---------|----------|-----------|----------|
| FWC HAB Database | 27.7617°N | 82.6867°W | Central Tampa Bay |
| TBEP | 27.7676°N | 82.6343°W | Tampa Bay Estuary |
| Egmont Channel Buoy 42098 | 27.590°N | 82.931°W | Bay Entrance |
| MacDill AFB | 27.8494°N | 82.5214°W | South Tampa |
| FWRI Old Tampa Bay | 27.9264°N | 82.5917°W | Old Tampa Bay |
| USF Water Atlas | 27.8006°N | 82.6673°W | Regional Composite |
| Pinellas Red Tide | 27.6233°N | 82.7394°W | Fort De Soto |
| Egmont Key C-MAN | 27.6000°N | 82.7600°W | Egmont Key |

---

## Global Climate Archive Sources

| Source | Organization | Description | Date Range | Records | Access URL |
|--------|-------------|-------------|------------|---------|------------|
| HadCET | UK Met Office | Central England Temperature — world's longest instrumental temperature record | 1659–2024 | 133K+ daily | [metoffice.gov.uk/hadobs/hadcet](https://www.metoffice.gov.uk/hadobs/hadcet/) |
| Weather Rescue 1861 | Zooniverse / Met Office | Digitized Victorian-era Daily Weather Reports from Vice-Admiral Fitzroy's network | 1861–1875 | 3.6M+ obs | [github.com/ed-hawkins/weather-rescue-data](https://github.com/ed-hawkins/weather-rescue-data) |
| Met Office Historic | UK Met Office | 37 UK station records — temperature, rainfall, sunshine, wind | 1853–2024 | 10M+ | [metoffice.gov.uk/historic-station-data](https://www.metoffice.gov.uk/research/climate/maps-and-data/historic-station-data) |
| CEDA MIDAS | Centre for Environmental Data Analysis | Complete UK meteorological archive — hourly and daily resolution | 1853–2024 | 50M+ | [catalogue.ceda.ac.uk](https://catalogue.ceda.ac.uk/) |
| Met Eireann | Irish Meteorological Service | Ireland historical weather — Irish Sea and North Atlantic coverage | 1881–2024 | 2M+ | [met.ie/historical-data](https://www.met.ie/climate/available-data/historical-data) |
| Copernicus Marine | European Union | Ocean state data — SST, chlorophyll, currents, waves (satellite-derived) | 1993–2024 | Satellite | [marine.copernicus.eu](https://marine.copernicus.eu/) |
| Bio-Argo | International Argo Program | Biogeochemical profiling float network — chlorophyll, oxygen, nitrate, pH | 2012–2024 | 300+ floats | [biogeochemical-argo.org](https://biogeochemical-argo.org/) |
| NOAA OISST | NOAA | Optimum Interpolation Sea Surface Temperature — consistent global baseline | 1981–2024 | Global daily | [ncei.noaa.gov/oisst](https://www.ncei.noaa.gov/products/optimum-interpolation-sst) |

---

## Data Type Categories

| Category | Color Code | Parameters Measured |
|----------|------------|---------------------|
| **HAB / Red Tide** | Red `#ef4444` | Karenia brevis cell counts, Pyrodinium bahamense, species identification |
| **Water Quality** | Purple `#8b5cf6` | Chlorophyll-a, nitrogen, phosphorus, dissolved oxygen, secchi depth |
| **Ocean Observations** | Blue `#3b82f6` | SST, wave height, currents, salinity, tidal data |
| **Weather** | Gray `#6b7280` | Temperature, wind speed/direction, rainfall, barometric pressure, humidity |

---

# 3. Analysis Types

## Pre-Built Analysis Modes

### 1. HAB Prediction Model

> **Purpose**: Identify red tide triggers and forecast conditions

- Temperature thresholds: K. brevis activates when SST exceeds **28°C for 14+ consecutive days**
- Nutrient loading patterns from upstream runoff events
- Seasonal pattern analysis matching historical bloom timing
- Integration of satellite chlorophyll-a with in-situ cell counts

### 2. Bloom Transport Analysis

> **Purpose**: Track how offshore blooms enter Tampa Bay

- Tidal current patterns at Egmont Channel (flood vs. ebb cycle)
- Time delay modeling: **Gulf detection → Old Tampa Bay arrival = 48–72 hours**
- Wind-driven surface transport supplementing tidal advection
- Kinematic trajectory analysis using buoy current data

### 3. Weather-HAB Correlation

> **Purpose**: Connect atmospheric conditions to bloom impacts

- MacDill AFB wind patterns → respiratory irritation risk
- Threshold identified: **Onshore SW-W winds ≥10 knots = beach advisory**
- Temperature anomalies preceding bloom activation seasons
- Rainfall deficit periods linked to increased bloom persistence

### 4. Long-term Trend Analysis (1953–2025)

> **Purpose**: Multi-decadal pattern identification

- AMO (Atlantic Multidecadal Oscillation) phase influence on bloom frequency
- Tampa Bay population growth (1.5M → 3.5M) vs. maintained water quality
- Decadal shifts in bloom onset timing and duration
- IPCC AR6 regional projections compared to observed trends

### 5. Custom Query

> **Purpose**: User-defined correlation analysis

- Natural language input — AI interprets intent and selects relevant sources
- Combine any 2+ data sources across domains
- Supports hypothesis-driven exploration
- Results include R-values, lead times, and confidence assessments

---

# 4. Methodology

## The Echelon Method

> *"Digitizing human expertise using AI rather than simply automating tasks."*

The Correlation Engine operationalizes domain knowledge by combining expert-curated data source context with AI-driven pattern recognition. The human analyst remains the decision-maker; the platform amplifies their reach across datasets too large and complex for manual review.

## Correlation Analysis Workflow

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  1. SOURCE       │     │  2. QUERY        │     │  3. AI ANALYSIS  │
│  SELECTION       │────▶│  GENERATION      │────▶│  (Claude API)    │
│                  │     │                  │     │                  │
│  User selects    │     │  System builds   │     │  Web search +    │
│  2+ data sources │     │  context-aware   │     │  Notion archive  │
│  from 24 options │     │  prompt with     │     │  access for      │
│                  │     │  source metadata  │     │  enrichment      │
└──────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                           │
┌──────────────────┐     ┌──────────────────┐              │
│  5. ACTIONABLE   │     │  4. PATTERN      │◀─────────────┘
│  OUTPUT          │◀────│  RECOGNITION     │
│                  │     │                  │
│  Lead times,     │     │  Statistical     │
│  thresholds,     │     │  correlations    │
│  triggers for    │     │  with R-values,  │
│  operations      │     │  p-values, lags  │
└──────────────────┘     └──────────────────┘
```

## Statistical Standards

| Standard | Description |
|----------|-------------|
| Correlation Coefficients | R-values reported for all identified relationships |
| Statistical Significance | P-values provided to assess confidence |
| Lead Time Calculations | Temporal lag between trigger and outcome quantified |
| Confidence Intervals | Uncertainty ranges noted for all predictions |
| Cross-Validation | Multi-source agreement used to strengthen findings |

## Key Validated Thresholds

| Finding | Threshold | Lead Time | Correlation Type |
|---------|-----------|-----------|------------------|
| SST Bloom Activation | >28°C sustained for 14+ days | Immediate onset | Validated — temperature-growth kinetics |
| Respiratory Risk | Onshore winds ≥10 knots during active bloom | 24–48 hours | High correlation (wind-aerosol transport) |
| Egmont Channel Transport | Flood tide + detected offshore bloom | 48–72 hours | Kinematic — tidal advection model |
| Upwelling Index | >10 km onshore bottom water transport | ~10 days | Predictive — nutrient entrainment |
| Nutrient Pulse Response | Major rain event → elevated nitrogen | 7–14 days | Runoff-to-bloom lag validated |

---

# 5. Running Modes

## Web Interface (Recommended for Most Users)

**URL**: [syanearthtools.netlify.app](https://syanearthtools.netlify.app)

| Feature | Detail |
|---------|--------|
| Installation | None — runs in browser |
| Visual Map | Interactive SVG of Tampa Bay with 8 clickable stations |
| Source Selection | Point-and-click with color-coded domain indicators |
| Analysis Output | Formatted results with copy/export and Notion save |
| AI Toggles | Enable/disable Web Search and Notion MCP per analysis |

**How to Use:**

1. Navigate to [syanearthtools.netlify.app](https://syanearthtools.netlify.app)
2. Select an analysis engine: **Global Correlation Engine** or **Tampa Bay HAB Engine**
3. Click data source cards or map markers to select 2+ sources
4. Choose an analysis type from the dropdown menu
5. (Optional) Enter a custom query for targeted analysis
6. Toggle **Web Search** and **Notion MCP** under AI Capabilities
7. Click **"Run Correlation Analysis"**
8. Review results — use **Copy Analysis**, **Save to Notion Findings**, or **View Climate Archive**

**Requirements**: Modern web browser (Chrome, Firefox, Safari, Edge) and internet connection.

---

## Claude Desktop Application

**Best for**: Full MCP integration, persistent conversation context, and direct Notion database access.

**Setup:**

1. Download Claude Desktop from [claude.ai](https://claude.ai)
2. Configure MCP servers in Settings → Developer:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": {
        "NOTION_API_KEY": "your_notion_integration_token"
      }
    }
  }
}
```

3. (Optional) Connect GitHub for repository code access

**Usage Examples:**

- *"Analyze the correlation between MacDill wind patterns and red tide respiratory events using the last 10 years of data."*
- *"Query the Climate Data Archive in Notion for all SST anomaly records above 28°C."*
- *"Compare HadCET long-term trends with Tampa Bay bloom frequency since 1953."*

---

## Claude Code (Terminal / CLI)

**Best for**: Automation, scripting, batch processing, and direct file system access.

**Installation:**

```bash
npm install -g @anthropic-ai/claude-code
claude-code auth login
```

**Usage:**

```bash
claude-code "Run correlation analysis on Tampa Bay HAB data using FWC records \
1953-2025 and TBEP water quality 1972-2025. Focus on nitrogen loading patterns \
and their lead time to bloom events."
```

**Python Integration:**

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=2500,
    system="""You are an expert oceanographer analyzing Tampa Bay data
    for the SYAN.EARTH platform. Focus on HAB prediction using the
    Correlation Engine methodology. Report R-values and lead times.""",
    messages=[
        {"role": "user", "content": "Analyze SST thresholds for K. brevis activation using NOAA OISST and FWC HAB records."}
    ],
    tools=[{
        "type": "web_search_20250305",
        "name": "web_search"
    }]
)

print(message.content[0].text)
```

---

## Terminal (Direct API)

**Best for**: Maximum control, custom integrations, and server-side deployment.

**cURL Example:**

```bash
curl https://api.anthropic.com/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 2500,
    "system": "You are the SYAN.EARTH Correlation Engine analyzing Tampa Bay environmental data.",
    "messages": [
      {
        "role": "user",
        "content": "Analyze the 48-72 hour transport delay between Egmont Channel bloom detection and Old Tampa Bay arrival using tidal current and wind data."
      }
    ]
  }'
```

**Netlify Functions Endpoint** (used by web interface):

```
POST /.netlify/functions/analyze
Content-Type: application/json

{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 2000,
  "system": "<analysis prompt>",
  "messages": [{"role": "user", "content": "<query with source context>"}],
  "tools": [{"type": "web_search_20250305", "name": "web_search"}],
  "mcp_servers": [{"type": "url", "url": "https://mcp.notion.com/mcp", "name": "notion-mcp"}]
}
```

---

# 6. Connecting to Data Sources

## FWC HAB Database

| Field | Detail |
|-------|--------|
| Access | [myfwc.com/research/redtide](https://myfwc.com/research/redtide/) |
| Live Status Map | [myfwc.com/research/redtide/statewide](https://myfwc.com/research/redtide/statewide/) |
| Data | Daily sample map with K. brevis concentrations |
| Key Fields | Cell count (cells/L), location, date, species |
| Format | Interactive map; downloadable CSV available |
| Update Frequency | Event-based sampling, daily during active blooms |

## Tampa Bay Estuary Program (TBEP)

| Field | Detail |
|-------|--------|
| Access | [tbep.org](https://tbep.org/) |
| Data Portal | [tbep.org/tampa-bay-estuary-program-data](https://tbep.org/tampa-bay-estuary-program-data/) |
| Data | Water quality monitoring since 1972 |
| Key Fields | Chlorophyll-a, total nitrogen, total phosphorus, secchi depth, dissolved oxygen |
| Format | Downloadable datasets, R packages available |
| Update Frequency | Monthly sampling |

## NOAA Buoys (42098 & EGKF1)

| Field | Detail |
|-------|--------|
| Access | [ndbc.noaa.gov](https://www.ndbc.noaa.gov/) |
| Buoy 42098 | [ndbc.noaa.gov/station/42098](https://www.ndbc.noaa.gov/station_page.php?station=42098) |
| Egmont Key | [ndbc.noaa.gov/station/EGKF1](https://www.ndbc.noaa.gov/station_page.php?station=egkf1) |
| Data | Real-time meteorological and oceanographic parameters |
| Key Fields | SST, wave height/period, wind speed/direction, barometric pressure |
| Format | Text/CSV, real-time API feeds |
| Update Frequency | Hourly (42098), 6-minute (EGKF1) |

## HadCET (Central England Temperature)

| Field | Detail |
|-------|--------|
| Access | [metoffice.gov.uk/hadobs/hadcet](https://www.metoffice.gov.uk/hadobs/hadcet/) |
| Download | [metoffice.gov.uk/hadobs/hadcet/data/download](https://www.metoffice.gov.uk/hadobs/hadcet/data/download.html) |
| Data | Daily temperatures from 1772, monthly from 1659 |
| Format | Plain text files, direct download |
| Unique Value | World's longest continuous instrumental temperature record |

## Weather Rescue 1861–1875

| Field | Detail |
|-------|--------|
| Access | [github.com/ed-hawkins/weather-rescue-data](https://github.com/ed-hawkins/weather-rescue-data) |
| Clone | `git clone https://github.com/ed-hawkins/weather-rescue-data.git` |
| Data | 570,000+ digitized observations from Victorian Daily Weather Reports |
| Source Paper | Craig, P. & Hawkins, E. (2024). *Geoscience Data Journal* |
| Format | CSV, GitHub-hosted |

## Copernicus Marine Service

| Field | Detail |
|-------|--------|
| Access | [marine.copernicus.eu](https://marine.copernicus.eu/) |
| Registration | Free account required |
| Data | SST, chlorophyll, ocean currents, biogeochemistry |
| Format | NetCDF, OPeNDAP, WMS |
| Resolution | Daily / 0.25° global grid |

## Notion Climate Archive (MCP Integration)

| Field | Detail |
|-------|--------|
| Protocol | Model Context Protocol (MCP) |
| MCP URL | `https://mcp.notion.com/mcp` |
| Climate Data Archive | Database ID: `ea822bbc8b48422ca0925ea93a0bdade` |
| Correlation Findings | Database ID: `e7429a2c9fac4c1d9c3bb0abb93be628` |
| Archive Contents | 24 data source entries with metadata, access info, and quality notes |
| Findings Contents | 10 validated correlation findings with R-values and lead times |

---

# 7. Ten Historic Anomaly Findings

## Tampa Bay Resilience Findings (Local Impact)

### Finding 1: The "Red Tide Conveyor Belt" (48–72 Hour Warning)

> Tides at Egmont Channel transport offshore K. brevis cells into Tampa Bay within 48–72 hours of detection at the bay entrance.

- **Sources Used**: NOAA Buoy 42098, Egmont Key C-MAN, FWC HAB Database
- **Operational Value**: Enables precision beach closures (specific beaches, specific days) vs. blanket multi-county warnings
- **Lead Time**: 48–72 hours from Egmont Channel detection to inner bay arrival

### Finding 2: The 10-Day Intensification Signal

> Upwelling Index exceeding 10 km of onshore bottom water transport predicts bloom intensification approximately 10 days before surface manifestation.

- **Sources Used**: NOAA SST, Egmont Channel currents, FWC HAB Database
- **Operational Value**: Shifts response posture from reactive to proactive; enables pre-positioning of monitoring resources
- **Lead Time**: ~10 days

### Finding 3: The "Piney Point" Proof of Concept

> The 2021 Piney Point phosphogypsum wastewater discharge correlated with an anomalous summer bloom that shifted from the typical fall peak timing.

- **Sources Used**: TBEP Water Quality, FWC HAB Database, FWRI Old Tampa Bay
- **Operational Value**: Validates that the Correlation Engine can detect pulse nutrient events and their downstream bloom effects
- **Significance**: Demonstrates industrial discharge monitoring as a bloom predictor

### Finding 4: The "14-Day Heat" Trigger

> K. brevis bloom activation occurs when sea surface temperature exceeds 28°C for 14 or more consecutive days.

- **Sources Used**: NOAA OISST, FWC HAB Database (70 years)
- **Operational Value**: Simple automated tripwire for early warning system — no complex modeling required
- **Lead Time**: Immediate onset after threshold met

### Finding 5: Respiratory Risk and Wind Velocity

> Onshore winds (SW to W direction) at ≥10 knots during active bloom conditions create respiratory irritation conditions at beaches.

- **Sources Used**: MacDill AFB Weather (80 years), FWC HAB Database, Pinellas Red Tide Counts
- **Operational Value**: Enables "Safe Beach Days" vs. "Risk Days" classification for public advisories
- **Lead Time**: 24–48 hours using weather forecasts

---

## Global Climate Intelligence Findings (Macro Data)

### Finding 6: The 365-Year Temperature Lock

> The HadCET record (1659–2024) reveals multi-decadal oscillations linked to the Atlantic Multidecadal Oscillation (AMO), providing a 365-year baseline for distinguishing natural variability from anthropogenic climate shift.

- **Sources Used**: HadCET, NOAA OISST
- **Significance**: Multi-century context that no other HAB platform incorporates
- **Application**: Calibrating Gulf of Mexico warming rates against the longest available instrumental record

### Finding 7: The "Spring Bloom" Shift (12 Days)

> The North Atlantic phytoplankton spring bloom has advanced by approximately 12 days since 1950, with acceleration in the satellite era (post-1993).

- **Sources Used**: Copernicus Marine, Bio-Argo, HadCET
- **Significance**: Critical baseline for fisheries management and food security models
- **Application**: Shifts in bloom timing cascade through the marine food web

### Finding 8: Victorian Era Data Rescue

> The 1861–1875 Weather Rescue citizen science records, when validated against modern ocean reanalysis models, show consistent pressure and temperature patterns — proving that low-cost historical data digitization can build predictive models.

- **Sources Used**: Weather Rescue 1861, Met Office Historic, Copernicus Marine (for validation)
- **Source Paper**: Craig, P. & Hawkins, E. (2024). *Geoscience Data Journal*
- **Significance**: Opens path to incorporating pre-digital era observations into modern prediction systems

### Finding 9: Irish Sea Rainfall Teleconnection

> Anomalously warm autumn sea surface temperatures in the Irish Sea predict above-average winter rainfall across UK and Ireland with a 4–8 week lag.

- **Sources Used**: Met Eireann, CEDA MIDAS, Copernicus Marine, Met Office Historic
- **Significance**: Demonstrates the Correlation Engine's ability to discover distant cause-and-effect patterns across geographic scales
- **Application**: Methodology transferable to Gulf Coast teleconnection research

### Finding 10: Tampa Bay's 50-Year Nutrient "Miracle"

> Despite population growth from 1.5M to 3.5M (1970–2025), Tampa Bay has maintained or improved chlorophyll-a target levels through a 90% improvement in wastewater treatment and coordinated nutrient management.

- **Sources Used**: TBEP Water Quality (1972–2025), USF Water Atlas, FWC HAB Database
- **Significance**: Demonstrates that active management works — provides a quantified success story for estuary restoration programs worldwide
- **Application**: Benchmark for other coastal regions facing population-driven eutrophication

---

# 8. Top 10 Untried Use Cases

*Based on platform capabilities and identified industry needs:*

### 1. Aquaculture Site Selection Scoring

> Combine HAB risk frequency, water quality trends, and climate projections to generate a location suitability index for oyster, clam, and shellfish operations in the Tampa Bay watershed.

- **Data Sources**: FWC HAB, TBEP, NOAA SST, MacDill AFB Weather
- **Output**: Numeric site score (0–100) with seasonal risk calendar

### 2. Real Estate Climate Risk Integration

> Correlate coastal property values with historical bloom frequency, beach closure days, and water quality trends to create a climate risk factor for real estate assessments.

- **Potential Partners**: Insurance underwriters, real estate investment trusts
- **Output**: Property-level climate risk premium estimate

### 3. Tourism Revenue Forecasting

> Link 10-day HAB prediction confidence to historical hotel booking patterns and beach visitation data for revenue impact modeling.

- **Potential Partners**: Visit Tampa Bay, hospitality chains, local government
- **Output**: Estimated revenue impact per bloom event duration

### 4. Desalination Plant Intake Optimization

> Predict optimal vs. risky seawater intake periods during bloom events to reduce treatment costs and avoid brevetoxin contamination.

- **Data Sources**: Egmont Channel data, FWC HAB, tidal models
- **Output**: Daily intake risk classification (green/yellow/red)

### 5. Marine Protected Area Effectiveness Analysis

> Before/after water quality comparison in protected vs. unprotected zones using long-term TBEP and FWC data to quantify conservation outcomes.

- **Data Sources**: TBEP (50 years), USF Water Atlas, FWC HAB
- **Output**: Ecological trend report with statistical significance testing

### 6. Fisheries Timing Optimization

> Apply spring bloom shift data and seasonal SST patterns to identify optimal fishing windows and stock recruitment predictions for Gulf species.

- **Data Sources**: Copernicus Marine, NOAA SST, Bio-Argo, FWC HAB
- **Output**: Species-specific calendar with confidence intervals

### 7. Storm Surge + HAB Compound Risk Modeling

> Overlay hurricane track forecasts with active bloom locations to create combined hazard maps for emergency management scenarios.

- **Data Sources**: NOAA buoys, FWC HAB, MacDill AFB Weather, NHC track data
- **Output**: Compound risk map with evacuation and shelter-in-place implications

### 8. Blue Carbon Credit Verification

> Track Tampa Bay seagrass recovery using long-term water quality improvements as proxy data for carbon offset market verification.

- **Data Sources**: TBEP (seagrass surveys), USF Water Atlas, NOAA SST
- **Output**: Carbon sequestration estimates tied to water quality metrics

### 9. Pharmaceutical Algae Monitoring

> Track brevetoxin concentration levels during bloom events for biotech and pharmaceutical research applications, including neurotoxin studies.

- **Data Sources**: FWC HAB (cell counts as toxin proxy), Pinellas monitoring
- **Output**: Toxin exposure timeline for research sample collection timing

### 10. Cross-Gulf Teleconnection Discovery

> Apply the Irish Sea rainfall teleconnection methodology (Finding 9) to the Gulf of Mexico to identify new predictive relationships between distant oceanographic conditions and Tampa Bay bloom events.

- **Data Sources**: HadCET, NOAA OISST, Copernicus Marine, FWC HAB
- **Output**: Newly discovered lead indicators from non-obvious data source combinations

---

# 9. Competitor Landscape

## Government and Operational Systems

| System | Organization | Capabilities | Forecast Lead Time | Limitations |
|--------|-------------|-------------|-------------------|-------------|
| HAB Monitoring System | NOAA NCCOS | Satellite imagery, field cell counts, transport models | 3–4 days | Reactive — based on detected blooms; county-level resolution |
| IRIS (Integrated Red Tide Information System) | USF College of Marine Science | Near real-time satellite + circulation model output | 3.5 days | Florida-specific; limited historical depth |
| HAB Bulletin | NOAA Coastal Ocean Science | Weekly analysis + short-term transport forecast | 3–4 days | Published twice weekly during active blooms only |
| Beach Conditions Reporting System | Mote Marine Laboratory | Respiratory irritation reports from trained observers | Same day | Manual reporting; no predictive capability |
| Protecting Florida Together | Florida DEP | Statewide water quality dashboard and data aggregation | Variable | Aggregation portal — no analysis or prediction |

## Academic and Research Systems

| System | Institution | Focus | Key Publication |
|--------|-------------|-------|-----------------|
| WFS-ROMS | USF Ocean Circulation Group | 4-day bloom trajectory forecasts using circulation models | Weisberg, R.H., et al. (2019). *JGR Oceans* |
| XGBoost HAB Prediction | Multiple institutions | 8-day ML forecasting achieving 96% accuracy in hindcast | MDPI Remote Sensing (2021) |
| Optical Oceanography Lab | USF | Satellite algorithm development for bloom detection | Hu, C., et al. — multiple publications |
| WFCOM | USF | West Florida Continental Shelf circulation model | Weisberg & Zheng — ongoing research |

## SYAN.EARTH Differentiators

| Differentiator | SYAN.EARTH | Typical Competitor |
|---------------|------------|-------------------|
| Historical Depth | 366 years (1659–2025) | 20–50 years |
| Cross-Domain Analysis | Climate + HAB + Weather + Water Quality + Ocean | Single-domain focus |
| Output Type | Operational thresholds and triggers | Observations and status reports |
| AI Integration | Claude API with web search + Notion MCP | None or basic ML models |
| Knowledge Archive | Notion database with 24 sources + 10 findings | Static reports or dashboards |
| Access Modes | Web + Desktop + CLI + API | Web only (typically) |
| Data Source Coverage | 24 sources, 8 domains | 3–5 sources, 1–2 domains |
| User Customization | Custom queries in natural language | Pre-defined reports only |

---

# 10. Technical References

## API Configuration

| Parameter | Value |
|-----------|-------|
| AI Provider | Anthropic |
| API Endpoint | `https://api.anthropic.com/v1/messages` |
| Model | `claude-sonnet-4-20250514` |
| API Version | `2023-06-01` |
| Max Tokens | 2,000–2,500 per request |
| Notion MCP URL | `https://mcp.notion.com/mcp` |
| Web Search Tool | `web_search_20250305` |

## Infrastructure

| Component | Technology |
|-----------|-----------|
| Frontend | React 18.2.0 (Create React App) |
| Hosting | Netlify (auto-deploy from GitHub) |
| Serverless Functions | Netlify Functions (`/.netlify/functions/analyze`) |
| Font | JetBrains Mono (monospace) |
| Security | CSP headers, CORS, X-Frame-Options: DENY |

## Notion Database IDs

| Database | ID | URL |
|----------|-----|-----|
| Climate Data Archive | `ea822bbc8b48422ca0925ea93a0bdade` | [Notion Link](https://www.notion.so/ea822bbc8b48422ca0925ea93a0bdade) |
| Correlation Findings | `e7429a2c9fac4c1d9c3bb0abb93be628` | [Notion Link](https://www.notion.so/e7429a2c9fac4c1d9c3bb0abb93be628) |

### Individual Tampa Bay Source Pages in Notion

| Source | Notion Page ID |
|--------|---------------|
| FWC HAB Database | `2dccd6b758eb81bca1a1df1d2aa40c10` |
| Tampa Bay Estuary Program | `2dccd6b758eb816a99edca3c4969c0d5` |
| Egmont Channel Buoy 42098 | `2dccd6b758eb81a4b23ace4269cf9264` |
| MacDill AFB Weather | `2dccd6b758eb8120905ece4cac54c54b` |
| Old Tampa Bay Program (FWRI) | `2dccd6b758eb81b2ad14ff5f1d927721` |
| USF Water Atlas | `2dccd6b758eb81b485dbd66649098548` |
| Pinellas Red Tide Counts | `2dccd6b758eb813c9e35d3dc642e6690` |
| Egmont Key C-MAN | `2dccd6b758eb81599977c65c5e953dc0` |

## Data Licenses

| Source | License |
|--------|---------|
| UK Met Office (HadCET, Historic) | Open Government Licence v3.0 |
| NOAA (Buoys, SST, ISD) | Public domain (US Government) |
| Copernicus Marine Service | Free access with registration (Copernicus License) |
| FWC / FWRI | Public records (State of Florida) |
| TBEP | Public data |
| Weather Rescue | CC-BY-4.0 (via Zooniverse/Met Office) |
| CEDA MIDAS | NERC data policy (registration required) |
| Met Eireann | Open data |

## Key Academic References

1. Craig, P. & Hawkins, E. (2024). "Digitizing observations from the 1861–1875 Met Office Daily Weather Reports using citizen science." *Geoscience Data Journal*.
2. Weisberg, R.H., et al. (2019). "Coastal ocean circulation influence on the 2018 West Florida Shelf K. brevis red tide bloom." *Journal of Geophysical Research: Oceans*.
3. Steidinger, K.A. (2009). "Historical perspective on Karenia brevis red tide research in the Gulf of Mexico." *Harmful Algae*.
4. Parker, D.E., et al. (1992). "A new daily Central England Temperature Series." *International Journal of Climatology*.
5. MDPI Remote Sensing (2021). "Machine Learning Approaches for HAB Forecasting in Southwest Florida."
6. Tampa Bay Estuary Program. *State of the Bay Reports* (1990–2025).
7. FWC-FWRI. *Red Tide Historical Database Documentation*.

---

## Echelon Brand Reference

### Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Copper / Bronze (Primary) | `#B87333` | Headers, brand elements, "weight and value" |
| Navy (Secondary) | `#0a1628` | Backgrounds, utility elements |
| Cyan (Accent) | `#00d4ff` | Digital/tech elements, links, highlights |
| Teal (Secondary Accent) | `#00ffd4` | Success states, Correlation Engine branding |
| Text Primary | `#f3f4f6` | Body text on dark backgrounds |
| Text Secondary | `#9ca3af` | Subtitles, descriptions, metadata |
| Background Gradient | `#0a1628 → #1a1a2e → #16213e` | Full-page backgrounds |

### Typography

| Element | Font | Weight |
|---------|------|--------|
| Body / Code | JetBrains Mono | 400 |
| Headings | JetBrains Mono | 600–700 |
| Labels / Tags | JetBrains Mono | 500 |
| Letter Spacing | Headers: -1px, Labels: +2px | — |

---

<div align="center" style="border-top: 2px solid #B87333; padding-top: 40px; margin-top: 60px;">

**SYAN.EARTH Correlation Engine**
User Manual v1.0 | January 2026

*Echelon Development & Contract Consulting LLC*
[syan.earth](https://syan.earth) | info@echelonbridge.com

---

*Protecting coastlines through climate intelligence.*

</div>
