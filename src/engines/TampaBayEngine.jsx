import React, { useState } from 'react';

// Tampa Bay HAB Correlation Analysis Engine
// SYAN.EARTH - Regional Analysis Module

const TampaBayCorrelationEngine = () => {
  const [selectedSources, setSelectedSources] = useState([]);
  const [analysisType, setAnalysisType] = useState('hab_prediction');
  const [customQuery, setCustomQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('sources');
  const [enableWebSearch, setEnableWebSearch] = useState(true);
  const [enableNotion, setEnableNotion] = useState(true);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  // Tampa Bay Data Sources with geographic coordinates
  const tampaBayDataSources = [
    {
      id: 'fwc_hab',
      name: 'FWC HAB Database',
      shortName: 'FWC',
      type: 'hab',
      years: '1953-2025',
      records: '200K+',
      lat: 27.7617,
      lng: -82.6867,
      color: '#ef4444',
      description: 'Red tide records since 1953',
      notionUrl: 'https://www.notion.so/2dccd6b758eb81bca1a1df1d2aa40c10'
    },
    {
      id: 'tbep_wq',
      name: 'Tampa Bay Estuary Program',
      shortName: 'TBEP',
      type: 'water_quality',
      years: '1972-2025',
      records: '26K+',
      lat: 27.7676,
      lng: -82.6343,
      color: '#8b5cf6',
      description: '50+ years water quality',
      notionUrl: 'https://www.notion.so/2dccd6b758eb816a99edca3c4969c0d5'
    },
    {
      id: 'noaa_42098',
      name: 'Egmont Channel Buoy',
      shortName: 'Buoy 42098',
      type: 'ocean',
      years: '2015-2025',
      records: 'Real-time',
      lat: 27.590,
      lng: -82.931,
      color: '#3b82f6',
      description: 'Waves, SST at bay entrance',
      notionUrl: 'https://www.notion.so/2dccd6b758eb81a4b23ace4269cf9264'
    },
    {
      id: 'macdill_afb',
      name: 'MacDill AFB Weather',
      shortName: 'MacDill',
      type: 'weather',
      years: '1941-2025',
      records: '30K+',
      lat: 27.8494,
      lng: -82.5214,
      color: '#6b7280',
      description: '80+ years weather data',
      notionUrl: 'https://www.notion.so/2dccd6b758eb8120905ece4cac54c54b'
    },
    {
      id: 'fwri_otb',
      name: 'Old Tampa Bay Program',
      shortName: 'FWRI OTB',
      type: 'hab',
      years: '2011-2025',
      records: '5K+',
      lat: 27.9264,
      lng: -82.5917,
      color: '#22c55e',
      description: 'Pyrodinium monitoring',
      notionUrl: 'https://www.notion.so/2dccd6b758eb81b2ad14ff5f1d927721'
    },
    {
      id: 'usf_atlas',
      name: 'USF Water Atlas',
      shortName: 'USF',
      type: 'water_quality',
      years: '1990-2025',
      records: 'Composite',
      lat: 27.8006,
      lng: -82.6673,
      color: '#ec4899',
      description: 'Multi-agency composite',
      notionUrl: 'https://www.notion.so/2dccd6b758eb81b485dbd66649098548'
    },
    {
      id: 'pinellas_rt',
      name: 'Pinellas Red Tide Counts',
      shortName: 'Pinellas',
      type: 'hab',
      years: '2000-2025',
      records: 'Weekly',
      lat: 27.6233,
      lng: -82.7394,
      color: '#f97316',
      description: 'Fort De Soto area',
      notionUrl: 'https://www.notion.so/2dccd6b758eb813c9e35d3dc642e6690'
    },
    {
      id: 'egkf1',
      name: 'Egmont Key C-MAN',
      shortName: 'EGKF1',
      type: 'ocean',
      years: '1990-2025',
      records: 'Continuous',
      lat: 27.6000,
      lng: -82.7600,
      color: '#a16207',
      description: 'Bay gateway station',
      notionUrl: 'https://www.notion.so/2dccd6b758eb81599977c65c5e953dc0'
    }
  ];

  // Key locations for context
  const keyLocations = [
    { name: 'Skyway Bridge', lat: 27.6203, lng: -82.6553, icon: '🌉' },
    { name: 'Fort De Soto', lat: 27.6147, lng: -82.7375, icon: '🏝️' },
    { name: 'Egmont Key', lat: 27.6006, lng: -82.7611, icon: '🏝️' },
    { name: 'MacDill AFB', lat: 27.8494, lng: -82.5214, icon: '✈️' },
    { name: 'Port Tampa', lat: 27.8583, lng: -82.5528, icon: '⚓' },
    { name: 'St. Petersburg', lat: 27.7676, lng: -82.6403, icon: '🏙️' }
  ];

  const analysisTypes = [
    {
      id: 'hab_prediction',
      name: 'HAB Prediction Model',
      icon: '🔴',
      description: 'Identify red tide triggers and forecast conditions'
    },
    {
      id: 'transport_analysis',
      name: 'Bloom Transport Analysis',
      icon: '🌊',
      description: 'How blooms move from Gulf into Tampa Bay'
    },
    {
      id: 'weather_correlation',
      name: 'Weather-HAB Correlation',
      icon: '🌡️',
      description: 'Link MacDill weather to bloom events'
    },
    {
      id: 'long_term_trends',
      name: 'Long-term Trend Analysis',
      icon: '📈',
      description: 'Multi-decadal patterns since 1953'
    },
    {
      id: 'custom',
      name: 'Custom Query',
      icon: '🔍',
      description: 'Define your own correlation analysis'
    }
  ];

  const toggleSource = (sourceId) => {
    setSelectedSources(prev =>
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const selectAllSources = () => {
    setSelectedSources(tampaBayDataSources.map(s => s.id));
  };

  const clearSelection = () => {
    setSelectedSources([]);
  };

  const getTypeColor = (type) => {
    const colors = {
      hab: '#ef4444',
      water_quality: '#8b5cf6',
      ocean: '#3b82f6',
      weather: '#6b7280'
    };
    return colors[type] || '#6b7280';
  };

  const getTypeLabel = (type) => {
    const labels = {
      hab: 'HAB/Red Tide',
      water_quality: 'Water Quality',
      ocean: 'Ocean Obs',
      weather: 'Weather'
    };
    return labels[type] || type;
  };

  // Generate analysis prompt based on selections
  const generatePrompt = () => {
    const sources = selectedSources.map(id => 
      tampaBayDataSources.find(s => s.id === id)
    ).filter(Boolean);
    
    const sourceDescriptions = sources.map(s => 
      `- ${s.name} (${s.years}): ${s.description}`
    ).join('\
');

    const prompts = {
      hab_prediction: `Analyze these Tampa Bay data sources for HAB prediction capability:

${sourceDescriptions}

Focus on:
1. Temperature thresholds that trigger Karenia brevis blooms (>28°C sustained?)
2. Nutrient loading patterns preceding bloom events
3. Wind direction and strength correlations with bloom intensification
4. Seasonal patterns - why are summer blooms (like 2021) unusual?
5. Lag times between environmental triggers and cell count increases
6. Specific predictions for Egmont Key, Fort De Soto, and Skyway Bridge areas`,

      transport_analysis: `Analyze bloom transport dynamics for Tampa Bay:

${sourceDescriptions}

Focus on:
1. How do offshore blooms enter through Egmont Channel?
2. Tidal current patterns (flood vs ebb) and bloom movement
3. Time delay from Gulf detection to Old Tampa Bay arrival
4. Wind effects on surface bloom concentration
5. Why Old Tampa Bay is susceptible to Pyrodinium bahamense
6. Critical monitoring points along the transport pathway`,

      weather_correlation: `Analyze weather-HAB correlations for Tampa Bay:

${sourceDescriptions}

Focus on:
1. MacDill AFB wind patterns and respiratory irritation events
2. Temperature anomalies preceding bloom seasons
3. Rainfall and nutrient runoff linkages
4. Hurricane impacts on bloom disruption/intensification
5. Onshore (SW-W) wind thresholds for beach advisories
6. Seasonal weather patterns and bloom timing`,

      long_term_trends: `Analyze long-term trends in Tampa Bay (1953-2025):

${sourceDescriptions}

Focus on:
1. Has red tide frequency actually increased, or just detection?
2. Multi-decadal cycles (AMO, El Niño influences)
3. Impact of population growth (2M+) on water quality
4. Success of nitrogen management since 1979 (90% wastewater reduction)
5. Seagrass recovery as indicator of ecosystem health
6. Climate change signals in SST and bloom timing`,

      custom: customQuery || 'Please specify your analysis query.'
    };

    return prompts[analysisType];
  };

  const runAnalysis = async () => {
    if (selectedSources.length < 2) {
      alert('Please select at least 2 data sources for correlation analysis');
      return;
    }

    setIsAnalyzing(true);
    setResults(null);

    try {
      const prompt = generatePrompt();
      const tools = [];
      const mcpServers = [];

      if (enableWebSearch) {
        tools.push({
          type: "web_search_20250305",
          name: "web_search"
        });
      }

      if (enableNotion) {
        mcpServers.push({
          type: "url",
          url: "https://mcp.notion.com/mcp",
          name: "notion-mcp"
        });
      }

      const requestBody = {
        model: "claude-sonnet-4-20250514",
        max_tokens: 2500,
        system: `You are an expert oceanographer and climate scientist analyzing Tampa Bay data for the SYAN.EARTH Living Earth Digital Twin platform. You specialize in harmful algal bloom (HAB) prediction, particularly Karenia brevis (red tide) and Pyrodinium bahamense dynamics.

Key Tampa Bay context:
- Egmont Channel is the primary gateway for Gulf waters entering the bay
- Old Tampa Bay has restricted circulation, making it susceptible to HAB accumulation
- MacDill AFB provides 80+ years of continuous weather observations
- The 2021 summer red tide event following Piney Point discharge was anomalous
- Tampa Bay has been an environmental success story since 1979 wastewater improvements

Provide actionable insights for aquaculture operators, coastal managers, and the SYAN.EARTH platform. Include specific correlation findings with estimated R-values where appropriate.`,
        messages: [
          { role: "user", content: prompt }
        ]
      };

      if (tools.length > 0) {
        requestBody.tools = tools;
      }
      if (mcpServers.length > 0) {
        requestBody.mcp_servers = mcpServers;
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      const analysisText = data.content
        ?.filter(item => item.type === "text")
        .map(item => item.text)
        .join("\
") || "Analysis completed but no text response received.";

      setResults({
        text: analysisText,
        sources: selectedSources,
        analysisType,
        timestamp: new Date().toISOString(),
        toolsUsed: {
          webSearch: enableWebSearch,
          notion: enableNotion
        }
      });

    } catch (error) {
      console.error('Analysis error:', error);
      setResults({
        text: `Analysis error: ${error.message}\
\
This may be due to API configuration. The Tampa Bay data sources have been successfully added to your Notion database and are ready for analysis.`,
        sources: selectedSources,
        analysisType,
        timestamp: new Date().toISOString(),
        error: true
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Simple SVG map of Tampa Bay
  const TampaBayMap = () => {
    const width = 400;
    const height = 350;
    const centerLat = 27.75;
    const centerLng = -82.65;
    const scale = 150;

    const projectPoint = (lat, lng) => {
      const x = width/2 + (lng - centerLng) * scale;
      const y = height/2 - (lat - centerLat) * scale;
      return { x, y };
    };

    // Tampa Bay outline (simplified)
    const bayPath = `
      M ${projectPoint(27.95, -82.45).x} ${projectPoint(27.95, -82.45).y}
      L ${projectPoint(27.85, -82.42).x} ${projectPoint(27.85, -82.42).y}
      L ${projectPoint(27.75, -82.55).x} ${projectPoint(27.75, -82.55).y}
      L ${projectPoint(27.65, -82.60).x} ${projectPoint(27.65, -82.60).y}
      L ${projectPoint(27.58, -82.70).x} ${projectPoint(27.58, -82.70).y}
      L ${projectPoint(27.55, -82.80).x} ${projectPoint(27.55, -82.80).y}
      L ${projectPoint(27.60, -82.85).x} ${projectPoint(27.60, -82.85).y}
      L ${projectPoint(27.70, -82.80).x} ${projectPoint(27.70, -82.80).y}
      L ${projectPoint(27.80, -82.75).x} ${projectPoint(27.80, -82.75).y}
      L ${projectPoint(27.90, -82.65).x} ${projectPoint(27.90, -82.65).y}
      L ${projectPoint(27.95, -82.55).x} ${projectPoint(27.95, -82.55).y}
      Z
    `;

    return (
      <svg width={width} height={height} style={{ background: '#0a1628' }}>
        {/* Water */}
        <rect width={width} height={height} fill="#0a1628" />
        
        {/* Bay area */}
        <path d={bayPath} fill="#1e3a5f" stroke="#00d4ff" strokeWidth="1" opacity="0.6" />
        
        {/* Grid lines */}
        {[27.6, 27.7, 27.8, 27.9].map(lat => {
          const p1 = projectPoint(lat, -82.9);
          const p2 = projectPoint(lat, -82.4);
          return (
            <line key={lat} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} 
              stroke="#00d4ff" strokeWidth="0.5" opacity="0.2" />
          );
        })}
        {[-82.5, -82.6, -82.7, -82.8].map(lng => {
          const p1 = projectPoint(27.5, lng);
          const p2 = projectPoint(28.0, lng);
          return (
            <line key={lng} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke="#00d4ff" strokeWidth="0.5" opacity="0.2" />
          );
        })}

        {/* Key locations */}
        {keyLocations.map(loc => {
          const pos = projectPoint(loc.lat, loc.lng);
          return (
            <g key={loc.name}>
              <text x={pos.x} y={pos.y} fontSize="12" textAnchor="middle">
                {loc.icon}
              </text>
              <text x={pos.x} y={pos.y + 14} fontSize="8" fill="#9ca3af" textAnchor="middle">
                {loc.name}
              </text>
            </g>
          );
        })}

        {/* Data source markers */}
        {tampaBayDataSources.map(source => {
          const pos = projectPoint(source.lat, source.lng);
          const isSelected = selectedSources.includes(source.id);
          const isHovered = hoveredLocation === source.id;
          
          return (
            <g key={source.id}
              onClick={() => toggleSource(source.id)}
              onMouseEnter={() => setHoveredLocation(source.id)}
              onMouseLeave={() => setHoveredLocation(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Pulse effect for selected */}
              {isSelected && (
                <circle cx={pos.x} cy={pos.y} r="15" fill={source.color} opacity="0.3">
                  <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              
              {/* Main marker */}
              <circle 
                cx={pos.x} 
                cy={pos.y} 
                r={isHovered ? 10 : 8}
                fill={isSelected ? source.color : '#374151'}
                stroke={source.color}
                strokeWidth="2"
              />
              
              {/* Label */}
              {(isHovered || isSelected) && (
                <text 
                  x={pos.x} 
                  y={pos.y - 14} 
                  fontSize="9" 
                  fill={source.color}
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {source.shortName}
                </text>
              )}
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(10, 10)">
          <rect width="100" height="75" fill="#111827" opacity="0.9" rx="4" />
          <text x="8" y="15" fontSize="9" fill="#f3f4f6" fontWeight="bold">Data Types</text>
          {[
            { type: 'hab', label: 'HAB/Red Tide' },
            { type: 'water_quality', label: 'Water Quality' },
            { type: 'ocean', label: 'Ocean Obs' },
            { type: 'weather', label: 'Weather' }
          ].map((item, i) => (
            <g key={item.type} transform={`translate(8, ${25 + i * 12})`}>
              <circle r="4" fill={getTypeColor(item.type)} />
              <text x="10" y="3" fontSize="8" fill="#9ca3af">{item.label}</text>
            </g>
          ))}
        </g>

        {/* Title */}
        <text x={width/2} y={height - 10} fontSize="10" fill="#00d4ff" textAnchor="middle">
          Click markers to select data sources
        </text>
      </svg>
    );
  };

  const styles = {
    container: {
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      background: 'linear-gradient(135deg, #0a1628 0%, #1a1a2e 50%, #16213e 100%)',
      minHeight: '100vh',
      color: '#f3f4f6',
      padding: '20px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '24px',
      borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
      paddingBottom: '16px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#00d4ff',
      marginBottom: '8px',
      textShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
    },
    subtitle: {
      fontSize: '14px',
      color: '#9ca3af'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    panel: {
      background: 'rgba(17, 24, 39, 0.8)',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid rgba(0, 212, 255, 0.2)'
    },
    panelTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#00d4ff',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    tabs: {
      display: 'flex',
      gap: '8px',
      marginBottom: '16px'
    },
    tab: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '12px',
      fontFamily: 'inherit',
      transition: 'all 0.2s'
    },
    tabActive: {
      background: '#00d4ff',
      color: '#0a1628'
    },
    tabInactive: {
      background: 'rgba(55, 65, 81, 0.5)',
      color: '#9ca3af'
    },
    sourceCard: {
      background: 'rgba(31, 41, 55, 0.5)',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      border: '2px solid transparent'
    },
    sourceCardSelected: {
      borderColor: '#00d4ff',
      background: 'rgba(0, 212, 255, 0.1)'
    },
    sourceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '4px'
    },
    sourceName: {
      fontSize: '12px',
      fontWeight: 'bold'
    },
    sourceTag: {
      fontSize: '9px',
      padding: '2px 6px',
      borderRadius: '4px',
      color: '#fff'
    },
    sourceMeta: {
      fontSize: '10px',
      color: '#9ca3af'
    },
    analysisOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '8px',
      transition: 'all 0.2s',
      background: 'rgba(31, 41, 55, 0.5)',
      border: '2px solid transparent'
    },
    analysisOptionSelected: {
      borderColor: '#00d4ff',
      background: 'rgba(0, 212, 255, 0.1)'
    },
    icon: {
      fontSize: '24px'
    },
    optionText: {
      flex: 1
    },
    optionName: {
      fontSize: '12px',
      fontWeight: 'bold',
      marginBottom: '2px'
    },
    optionDesc: {
      fontSize: '10px',
      color: '#9ca3af'
    },
    textarea: {
      width: '100%',
      minHeight: '80px',
      background: 'rgba(31, 41, 55, 0.8)',
      border: '1px solid rgba(0, 212, 255, 0.3)',
      borderRadius: '8px',
      padding: '12px',
      color: '#f3f4f6',
      fontFamily: 'inherit',
      fontSize: '12px',
      resize: 'vertical',
      marginTop: '8px'
    },
    button: {
      width: '100%',
      padding: '14px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      fontFamily: 'inherit',
      marginTop: '16px',
      transition: 'all 0.2s'
    },
    buttonPrimary: {
      background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
      color: '#0a1628'
    },
    buttonDisabled: {
      background: '#374151',
      color: '#6b7280',
      cursor: 'not-allowed'
    },
    toggle: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      background: 'rgba(31, 41, 55, 0.5)',
      borderRadius: '6px',
      marginBottom: '8px',
      fontSize: '11px'
    },
    checkbox: {
      width: '16px',
      height: '16px',
      cursor: 'pointer'
    },
    results: {
      background: 'rgba(17, 24, 39, 0.9)',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '20px',
      border: '1px solid rgba(0, 212, 255, 0.3)'
    },
    resultsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      paddingBottom: '12px',
      borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
    },
    resultsText: {
      whiteSpace: 'pre-wrap',
      fontSize: '12px',
      lineHeight: '1.6',
      color: '#e5e7eb'
    },
    loading: {
      textAlign: 'center',
      padding: '40px'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '3px solid rgba(0, 212, 255, 0.2)',
      borderTop: '3px solid #00d4ff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 16px'
    },
    quickActions: {
      display: 'flex',
      gap: '8px',
      marginBottom: '12px'
    },
    smallButton: {
      padding: '6px 12px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '10px',
      fontFamily: 'inherit',
      background: 'rgba(55, 65, 81, 0.5)',
      color: '#9ca3af'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <header style={styles.header}>
        <h1 style={styles.title}>🌊 Tampa Bay HAB Correlation Engine</h1>
        <p style={styles.subtitle}>
          SYAN.EARTH Regional Analysis Module • MacDill • Egmont Key • Fort De Soto • Skyway Bridge
        </p>
      </header>

      <div style={styles.grid}>
        {/* Left Panel - Map and Sources */}
        <div style={styles.panel}>
          <div style={styles.panelTitle}>
            📍 Tampa Bay Monitoring Network
          </div>
          
          <TampaBayMap />

          <div style={{ marginTop: '16px' }}>
            <div style={styles.quickActions}>
              <button style={styles.smallButton} onClick={selectAllSources}>
                Select All
              </button>
              <button style={styles.smallButton} onClick={clearSelection}>
                Clear
              </button>
              <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 'auto' }}>
                {selectedSources.length}/8 selected
              </span>
            </div>

            {tampaBayDataSources.map(source => (
              <div 
                key={source.id}
                style={{
                  ...styles.sourceCard,
                  ...(selectedSources.includes(source.id) ? styles.sourceCardSelected : {})
                }}
                onClick={() => toggleSource(source.id)}
              >
                <div style={styles.sourceHeader}>
                  <span style={styles.sourceName}>{source.name}</span>
                  <span style={{
                    ...styles.sourceTag,
                    background: getTypeColor(source.type)
                  }}>
                    {getTypeLabel(source.type)}
                  </span>
                </div>
                <div style={styles.sourceMeta}>
                  {source.years} • {source.records} records • {source.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Analysis Options */}
        <div style={styles.panel}>
          <div style={styles.panelTitle}>
            🔬 Analysis Configuration
          </div>

          <div style={styles.tabs}>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'sources' ? styles.tabActive : styles.tabInactive)
              }}
              onClick={() => setActiveTab('sources')}
            >
              Analysis Type
            </button>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'settings' ? styles.tabActive : styles.tabInactive)
              }}
              onClick={() => setActiveTab('settings')}
            >
              AI Settings
            </button>
          </div>

          {activeTab === 'sources' && (
            <div>
              {analysisTypes.map(type => (
                <div
                  key={type.id}
                  style={{
                    ...styles.analysisOption,
                    ...(analysisType === type.id ? styles.analysisOptionSelected : {})
                  }}
                  onClick={() => setAnalysisType(type.id)}
                >
                  <span style={styles.icon}>{type.icon}</span>
                  <div style={styles.optionText}>
                    <div style={styles.optionName}>{type.name}</div>
                    <div style={styles.optionDesc}>{type.description}</div>
                  </div>
                </div>
              ))}

              {analysisType === 'custom' && (
                <textarea
                  style={styles.textarea}
                  placeholder="Enter your custom analysis query..."
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                />
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <div style={styles.toggle}>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={enableWebSearch}
                  onChange={(e) => setEnableWebSearch(e.target.checked)}
                />
                <span>🌐 Enable Web Search</span>
                <span style={{ marginLeft: 'auto', color: '#6b7280' }}>
                  Real-time data
                </span>
              </div>
              <div style={styles.toggle}>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={enableNotion}
                  onChange={(e) => setEnableNotion(e.target.checked)}
                />
                <span>📚 Enable Notion MCP</span>
                <span style={{ marginLeft: 'auto', color: '#6b7280' }}>
                  Climate Archive
                </span>
              </div>
              <div style={{ 
                marginTop: '16px', 
                padding: '12px', 
                background: 'rgba(0, 212, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '10px',
                color: '#9ca3af'
              }}>
                <strong style={{ color: '#00d4ff' }}>Notion Database Links:</strong>
                <br />• Climate Archive: ea822bbc8b48422ca0925ea93a0bdade
                <br />• Correlation Findings: e7429a2c9fac4c1d9c3bb0abb93be628
              </div>
            </div>
          )}

          <button
            style={{
              ...styles.button,
              ...(selectedSources.length < 2 || isAnalyzing ? styles.buttonDisabled : styles.buttonPrimary)
            }}
            onClick={runAnalysis}
            disabled={selectedSources.length < 2 || isAnalyzing}
          >
            {isAnalyzing ? '⏳ Analyzing...' : '🔬 Run Correlation Analysis'}
          </button>
        </div>
      </div>

      {/* Results */}
      {isAnalyzing && (
        <div style={styles.results}>
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <div style={{ color: '#00d4ff' }}>Analyzing Tampa Bay correlations...</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px' }}>
              Querying {selectedSources.length} data sources
            </div>
          </div>
        </div>
      )}

      {results && !isAnalyzing && (
        <div style={styles.results}>
          <div style={styles.resultsHeader}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#00d4ff' }}>
                🌊 Tampa Bay Analysis Results
              </div>
              <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>
                {new Date(results.timestamp).toLocaleString()} • 
                {results.sources.length} sources • 
                {analysisTypes.find(t => t.id === results.analysisType)?.name}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {results.toolsUsed?.webSearch && (
                <span style={{ fontSize: '10px', background: '#22c55e', padding: '2px 8px', borderRadius: '4px' }}>
                  🌐 Web
                </span>
              )}
              {results.toolsUsed?.notion && (
                <span style={{ fontSize: '10px', background: '#8b5cf6', padding: '2px 8px', borderRadius: '4px' }}>
                  📚 Notion
                </span>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '6px' }}>
              Data Sources Used:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {results.sources.map(sourceId => {
                const source = tampaBayDataSources.find(s => s.id === sourceId);
                return source ? (
                  <span key={sourceId} style={{
                    fontSize: '9px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: source.color,
                    color: '#fff'
                  }}>
                    {source.shortName}
                  </span>
                ) : null;
              })}
            </div>
          </div>

          <div style={styles.resultsText}>
            {results.text}
          </div>

          <div style={{ 
            marginTop: '16px', 
            paddingTop: '16px', 
            borderTop: '1px solid rgba(0, 212, 255, 0.2)',
            display: 'flex',
            gap: '12px'
          }}>
            <button 
              style={{ ...styles.smallButton, background: '#00d4ff', color: '#0a1628' }}
              onClick={() => navigator.clipboard.writeText(results.text)}
            >
              📋 Copy Analysis
            </button>
            <a
              href="https://www.notion.so/e7429a2c9fac4c1d9c3bb0abb93be628"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                ...styles.smallButton, 
                textDecoration: 'none',
                background: '#8b5cf6'
              }}
            >
              💾 Save to Findings
            </a>
            <a
              href="https://www.notion.so/ea822bbc8b48422ca0925ea93a0bdade"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                ...styles.smallButton, 
                textDecoration: 'none'
              }}
            >
              📊 View Archive
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default TampaBayCorrelationEngine;
