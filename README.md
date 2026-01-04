<p align="center">
  <img src="public/images/syan-earth-banner.png" alt="SYAN.EARTH" width="800"/>
</p>

<h1 align="center">🌍 SYAN.EARTH Climate Intelligence Tools</h1>

<p align="center">
  <strong>Living Earth Digital Twin for Harmful Algal Bloom Detection & Prediction</strong>
</p>

<p align="center">
  <a href="https://github.com/syan-earth/syan-earth-tools/actions"><img src="https://img.shields.io/github/actions/workflow/status/syan-earth/syan-earth-tools/deploy.yml?style=flat-square&logo=github" alt="Build Status"></a>
  <a href="https://tools.syan.earth"><img src="https://img.shields.io/badge/demo-live-00d4ff?style=flat-square&logo=netlify" alt="Live Demo"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-00ffd4?style=flat-square" alt="License"></a>
  <a href="https://github.com/syan-earth/syan-earth-tools/stargazers"><img src="https://img.shields.io/github/stars/syan-earth/syan-earth-tools?style=flat-square&color=yellow" alt="Stars"></a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-data-sources">Data Sources</a> •
  <a href="#-api">API</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 🌊 The Problem

**Harmful Algal Blooms (HABs) cost billions annually:**
- 💀 Marine life mortality
- 🏥 Human respiratory illness  
- 🎣 Fishery closures
- 🏖️ Tourism devastation

A single red tide event in South Africa's abalone industry caused **$33M in losses**. Florida's 2018 red tide killed over 2,000 tons of marine life.

**Current prediction tools are fragmented and reactive.** SYAN.EARTH changes that.

---

## 💡 The Solution

SYAN.EARTH combines **366 years of historical climate data** with **real-time ocean monitoring** to predict HAB events before they devastate coastlines.

```
┌─────────────────────────────────────────────────────────────────┐
│                    SYAN.EARTH Architecture                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Historical Data (1659-2025)      Real-Time Monitoring          │
│   ┌─────────────────────┐         ┌─────────────────────┐       │
│   │ • Weather Rescue    │         │ • NOAA Buoys        │       │
│   │ • Met Office        │         │ • FWC HAB Database  │       │
│   │ • HadCET            │         │ • Satellite (PACE)  │       │
│   │ • NOAA SST          │         │ • Tampa Bay PORTS   │       │
│   └──────────┬──────────┘         └──────────┬──────────┘       │
│              │                               │                   │
│              └───────────┬───────────────────┘                   │
│                          ▼                                       │
│              ┌─────────────────────┐                            │
│              │  Correlation Engine │                            │
│              │  (Claude API + MCP) │                            │
│              └──────────┬──────────┘                            │
│                         ▼                                        │
│              ┌─────────────────────┐                            │
│              │   HAB Predictions   │                            │
│              │   & Early Warnings  │                            │
│              └─────────────────────┘                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🌐 Global Correlation Engine
Analyze cross-domain patterns between weather, ocean, and biological data spanning 366 years.

- **8 UK/Global data sources** (Weather Rescue 1861, Met Office, HadCET, Bio-Argo, NOAA SST)
- **3 analysis modes**: Cross-Domain Correlation, HAB Prediction Signals, Long-Term Trends
- **AI-powered insights** via Claude API with web search and Notion MCP integration

### 🌊 Tampa Bay HAB Engine
Regional red tide analysis with interactive monitoring map.

- **8 Tampa Bay stations**: FWC HAB Database (200K+ records since 1953), TBEP, MacDill AFB, Egmont Channel
- **Interactive SVG map** with clickable data source markers
- **5 analysis types**: HAB Prediction, Bloom Transport, Weather Correlation, Long-term Trends, Custom Query

### 📊 Connected Databases
All findings automatically save to Notion for tracking and collaboration.

- [Climate Data Archive](https://www.notion.so/ea822bbc8b48422ca0925ea93a0bdade) - 24 sources
- [Correlation Findings](https://www.notion.so/e7429a2c9fac4c1d9c3bb0abb93be628) - Research results

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/syan-earth/syan-earth-tools.git
cd syan-earth-tools

# Install dependencies
npm install

# Start development server
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/syan-earth/syan-earth-tools)

Or connect your GitHub repo to Netlify for automatic deployments on every push.

---

## 🎯 Live Demo

**[→ tools.syan.earth](https://tools.syan.earth)**

| Tool | Description | Status |
|------|-------------|--------|
| Global Engine | 366-year climate correlation analysis | ✅ Live |
| Tampa Bay Engine | Regional HAB prediction with interactive map | ✅ Live |
| API Dashboard | Coming soon | 🚧 Development |

---

## 📊 Data Sources

### Global / UK Historical (1659-2025)

| Source | Years | Records | Type |
|--------|-------|---------|------|
| HadCET | 1659-2024 | 133K+ | Temperature |
| Weather Rescue | 1861-1875 | 3.6M+ | Pressure/Weather |
| Met Office Historic | 1853-2024 | 10M+ | Multi-parameter |
| CEDA MIDAS | 1853-2024 | 50M+ | UK Weather |
| Met Éireann | 1881-2024 | 2M+ | Ireland |
| Copernicus Marine | 1993-2024 | Satellite | Ocean/SST |
| Bio-Argo | 2012-2024 | 300+ floats | Biology |
| NOAA SST | 1981-2024 | Global | Sea Surface Temp |

### Tampa Bay Regional (1941-2025)

| Source | Years | Records | Focus |
|--------|-------|---------|-------|
| FWC HAB Database | 1953-2025 | 200K+ | Red tide (Karenia brevis) |
| Tampa Bay Estuary Program | 1972-2025 | 26K+ | Water quality |
| MacDill AFB Weather | 1941-2025 | 30K+ | Local weather |
| NOAA Buoy 42098 | 2015-2025 | Real-time | Egmont Channel |
| FWRI Old Tampa Bay | 2011-2025 | 5K+ | Pyrodinium monitoring |
| USF Water Atlas | 1990-2025 | Composite | Multi-agency |
| Pinellas Red Tide | 2000-2025 | Weekly | Fort De Soto area |
| Egmont Key C-MAN | 1990-2025 | Continuous | Bay gateway |

---

## 🔌 API

### Coming Soon: SYAN.EARTH API

Programmatic access to HAB predictions and climate correlations.

```javascript
// Example usage (coming soon)
const syan = require('@syan-earth/api');

const prediction = await syan.predict({
  region: 'tampa-bay',
  timeframe: '7-day',
  parameters: ['karenia_brevis', 'temperature', 'upwelling_index']
});

console.log(prediction.risk_level); // "elevated"
console.log(prediction.confidence); // 0.85
```

**Pricing Tiers:**
| Tier | Price | Calls/Month | Use Case |
|------|-------|-------------|----------|
| Fisherman | $29/mo | 1,000 | Individual operators |
| Commercial | $299/mo | 10,000 | Small fleets |
| Enterprise | $2,999/mo | Unlimited | Aquaculture farms, agencies |

[→ Join API Waitlist](https://syan.earth/api-waitlist)

---

## 🏗️ Architecture

```
syan-earth-tools/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # Auto-deploy to Netlify
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
├── src/
│   ├── engines/
│   │   ├── CorrelationEngine.jsx    # Global analysis
│   │   └── TampaBayEngine.jsx       # Regional analysis
│   ├── components/
│   │   └── ...
│   ├── App.js                  # Main navigation hub
│   └── index.js
├── public/
│   └── index.html
├── docs/
│   ├── API.md
│   └── DATA_SOURCES.md
├── package.json
├── netlify.toml
└── README.md
```

---

## 🤝 Contributing

We welcome contributions! SYAN.EARTH is building the future of ocean health monitoring.

### Ways to Contribute

- 🐛 **Report bugs** - Open an issue
- 💡 **Suggest features** - Open a discussion
- 📊 **Add data sources** - Submit a PR
- 📝 **Improve docs** - Always appreciated
- ⭐ **Star the repo** - Helps visibility

### Development

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/syan-earth-tools.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "Add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📜 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

**Note:** The SYAN.EARTH core prediction algorithms and API are proprietary. This repository contains the open-source analysis tools and interfaces.

---

## 🙏 Acknowledgments

- **NOAA NCCOS** - HAB forecasting research and data
- **FWC/FWRI** - Florida red tide monitoring (200K+ records since 1953)
- **Tampa Bay Estuary Program** - 50+ years of water quality data
- **University of South Florida** - WFCOM circulation modeling
- **Weather Rescue** - Victorian-era data digitization
- **Anthropic** - Claude API for AI-powered analysis

---

## 📬 Contact

**Echelon Development & Contract Consulting LLC**

- 🌐 Website: [syan.earth](https://syan.earth)
- 📧 Email: contact@syan.earth
- 🔗 LinkedIn: [SYAN.EARTH](https://linkedin.com/company/syan-earth)

---

<p align="center">
  <strong>🌍 Protecting coastlines through climate intelligence</strong>
</p>

<p align="center">
  <a href="https://syan.earth">Website</a> •
  <a href="https://tools.syan.earth">Demo</a> •
  <a href="https://twitter.com/syanearth">Twitter</a>
</p>
