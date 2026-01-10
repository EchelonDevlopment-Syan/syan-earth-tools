import React, { useState, useCallback } from 'react';

// SYAN.EARTH Correlation Analysis Engine
// Uses Claude API to analyze cross-domain patterns between weather/ocean/plankton data

const NOTION_DATABASES = {
  archive: {
    id: 'ea822bbc8b48422ca0925ea93a0bdade',
    dataSource: '49d06bdd-b9b6-4ace-8b45-94df089d3065',
    name: '🌍 Climate Data Archive'
  },
  findings: {
    id: 'e7429a2c9fac4c1d9c3bb0abb93be628',
    dataSource: '6d00d6c8-ffda-447a-baa8-989d68e17d35',
    name: '🔬 Correlation Findings'
  }
};

const DATA_SOURCES = [
  { id: 'weather-rescue', name: 'Weather Rescue 1861', domain: 'weather', color: '#e63946', years: '1861-1875' },
  { id: 'met-office', name: 'Met Office Historic', domain: 'weather', color: '#457b9d', years: '1853-2024' },
  { id: 'hadcet', name: 'HadCET', domain: 'weather', color: '#6a4c93', years: '1659-2024' },
  { id: 'ceda', name: 'CEDA MIDAS', domain: 'weather', color: '#1d3557', years: '1853-2024' },
  { id: 'met-eireann', name: 'Met Éireann', domain: 'weather', color: '#2a9d8f', years: '1881-2024' },
  { id: 'copernicus', name: 'Copernicus Marine', domain: 'ocean', color: '#e9c46a', years: '1993-2024' },
  { id: 'bioargo', name: 'Bio-Argo', domain: 'biology', color: '#52b788', years: '2012-2024' },
  { id: 'noaa-sst', name: 'NOAA SST', domain: 'ocean', color: '#f4a261', years: '1981-2024' }
];

const ANALYSIS_PROMPTS = {
  'cross-domain': `You are an expert climate scientist analyzing historical and modern environmental data for the SYAN.EARTH platform. Analyze the correlation potential between the selected data sources.

Consider:
1. Temporal overlap between datasets
2. Geographic compatibility (UK, Ireland, North Atlantic)
3. Physical mechanisms linking the variables
4. Known climate teleconnections (AMO, NAO, etc.)
5. Statistical considerations for correlation analysis

Provide:
- Hypothesis for potential correlation
- Expected R-value range and confidence
- Recommended time period for analysis
- Key variables to examine
- Caveats and limitations`,

  'bloom-prediction': `You are analyzing climate data to improve harmful algal bloom (HAB) prediction models. Based on the selected datasets, identify:

1. Leading indicators for bloom events (SST thresholds, nutrient patterns)
2. Lag times between environmental triggers and bloom onset
3. Geographic hotspots where data coverage enables prediction
4. Historical bloom events in the data record
5. Integration pathway into SYAN.EARTH monitoring system`,

  'trend-analysis': `Analyze long-term trends in the selected climate data sources. Focus on:

1. Decadal variability patterns
2. Acceleration/deceleration of trends since 1980
3. Comparison with IPCC AR6 regional projections
4. Implications for coastal communities and fisheries
5. Data gaps that limit trend confidence`
};

export default function CorrelationAnalysisEngine() {
  const [selectedSources, setSelectedSources] = useState([]);
  const [analysisType, setAnalysisType] = useState('cross-domain');
  const [customQuery, setCustomQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [searchEnabled, setSearchEnabled] = useState(true);
  const [notionEnabled, setNotionEnabled] = useState(true);

  const toggleSource = useCallback((sourceId) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  }, []);

  const runAnalysis = async () => {
    if (selectedSources.length < 2) {
      setError('Select at least 2 data sources to analyze correlations');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    const selectedData = DATA_SOURCES.filter(s => selectedSources.includes(s.id));
    const domains = [...new Set(selectedData.map(s => s.domain))];
    
    const systemPrompt = ANALYSIS_PROMPTS[analysisType];
    const userQuery = customQuery || `Analyze correlation potential between: ${selectedData.map(s => s.name).join(', ')}`;

    const contextInfo = `
SELECTED DATA SOURCES:
${selectedData.map(s => `- ${s.name} (${s.domain}, ${s.years})`).join('\n')}

DOMAIN COVERAGE:
${domains.length === 1 ? `Single domain: ${domains[0]}` : `Cross-domain: ${domains.join(', ')}`}

GEOGRAPHIC FOCUS: UK, Ireland, North Atlantic
PROJECT: SYAN.EARTH - Living Earth Digital Twin for HAB Detection

USER QUERY: ${userQuery}`;

    try {
      const tools = [];
      
      if (searchEnabled) {
        tools.push({
          type: "web_search_20250305",
          name: "web_search"
        });
      }
      
      if (notionEnabled) {
        tools.push({
          type: "url",
          url: "https://mcp.notion.com/mcp",
          name: "notion-mcp"
        });
      }

      const requestBody = {
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          { role: "user", content: contextInfo }
        ]
      };

      if (tools.length > 0) {
        if (searchEnabled) {
          requestBody.tools = [{ type: "web_search_20250305", name: "web_search" }];
        }
        if (notionEnabled) {
          requestBody.mcp_servers = [{ type: "url", url: "https://mcp.notion.com/mcp", name: "notion-mcp" }];
        }
      }

      const response = await fetch("/.netlify/functions/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      const textContent = data.content
        ?.filter(item => item.type === "text")
        ?.map(item => item.text)
        ?.join("\n") || "No analysis returned";

      setResults({
        analysis: textContent,
        sources: selectedData,
        domains: domains,
        timestamp: new Date().toISOString(),
        toolsUsed: { search: searchEnabled, notion: notionEnabled }
      });

    } catch (err) {
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getDomainColor = (domain) => {
    const colors = { weather: '#457b9d', ocean: '#e9c46a', biology: '#52b788' };
    return colors[domain] || '#6c757d';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1a 0%, #0d1929 50%, #051118 100%)',
      color: '#e0e7ef',
      fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
      padding: '0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background grid */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 212, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 212, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <header style={{
        padding: '24px 32px',
        borderBottom: '1px solid rgba(0, 255, 212, 0.15)',
        background: 'rgba(10, 15, 26, 0.9)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              margin: 0,
              letterSpacing: '-1px',
              background: 'linear-gradient(135deg, #00ffd4 0%, #00b894 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              CORRELATION ANALYSIS ENGINE
            </h1>
            <p style={{ margin: '4px 0 0', opacity: 0.6, fontSize: '13px', letterSpacing: '2px' }}>
              SYAN.EARTH • CLIMATE DATA INTELLIGENCE
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '12px'
          }}>
            <div style={{
              padding: '8px 16px',
              background: 'rgba(0, 255, 212, 0.1)',
              borderRadius: '20px',
              border: '1px solid rgba(0, 255, 212, 0.3)'
            }}>
              <span style={{ color: '#00ffd4' }}>●</span> Claude API Connected
            </div>
          </div>
        </div>
      </header>

      <main style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Data Source Selection */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#00ffd4',
            letterSpacing: '2px',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            SELECT DATA SOURCES
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '12px'
          }}>
            {DATA_SOURCES.map(source => {
              const isSelected = selectedSources.includes(source.id);
              return (
                <button
                  key={source.id}
                  onClick={() => toggleSource(source.id)}
                  style={{
                    padding: '16px',
                    background: isSelected 
                      ? `linear-gradient(135deg, ${source.color}22, ${source.color}11)`
                      : 'rgba(255, 255, 255, 0.03)',
                    border: `2px solid ${isSelected ? source.color : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'inherit',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: isSelected ? source.color : 'transparent',
                    border: `2px solid ${isSelected ? source.color : 'rgba(255,255,255,0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px'
                  }}>
                    {isSelected && '✓'}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '6px',
                    color: isSelected ? source.color : '#fff'
                  }}>
                    {source.name}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    fontSize: '11px',
                    opacity: 0.7
                  }}>
                    <span style={{
                      padding: '2px 8px',
                      background: getDomainColor(source.domain) + '33',
                      borderRadius: '10px',
                      color: getDomainColor(source.domain)
                    }}>
                      {source.domain}
                    </span>
                    <span>{source.years}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Analysis Configuration */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#00ffd4',
            letterSpacing: '2px',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            ANALYSIS CONFIGURATION
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', opacity: 0.7 }}>
                Analysis Type
              </label>
              <select
                value={analysisType}
                onChange={(e) => setAnalysisType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="cross-domain">Cross-Domain Correlation Analysis</option>
                <option value="bloom-prediction">HAB Bloom Prediction Signals</option>
                <option value="trend-analysis">Long-Term Trend Analysis</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', opacity: 0.7 }}>
                AI Capabilities
              </label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px',
                  background: searchEnabled ? 'rgba(0, 255, 212, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${searchEnabled ? 'rgba(0, 255, 212, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  flex: 1
                }}>
                  <input
                    type="checkbox"
                    checked={searchEnabled}
                    onChange={(e) => setSearchEnabled(e.target.checked)}
                    style={{ accentColor: '#00ffd4' }}
                  />
                  <span style={{ fontSize: '13px' }}>🌐 Web Search</span>
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px',
                  background: notionEnabled ? 'rgba(0, 255, 212, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${notionEnabled ? 'rgba(0, 255, 212, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  flex: 1
                }}>
                  <input
                    type="checkbox"
                    checked={notionEnabled}
                    onChange={(e) => setNotionEnabled(e.target.checked)}
                    style={{ accentColor: '#00ffd4' }}
                  />
                  <span style={{ fontSize: '13px' }}>📚 Notion MCP</span>
                </label>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', opacity: 0.7 }}>
              Custom Query (Optional)
            </label>
            <textarea
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Ask a specific question about the selected data sources..."
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                minHeight: '80px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </section>

        {/* Run Analysis Button */}
        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing || selectedSources.length < 2}
            style={{
              width: '100%',
              padding: '18px 32px',
              background: selectedSources.length >= 2
                ? 'linear-gradient(135deg, #00ffd4 0%, #00b894 100%)'
                : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '12px',
              color: selectedSources.length >= 2 ? '#0a0f1a' : '#666',
              fontSize: '16px',
              fontWeight: '700',
              cursor: selectedSources.length >= 2 ? 'pointer' : 'not-allowed',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {isAnalyzing ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                ANALYZING {selectedSources.length} DATA SOURCES...
              </span>
            ) : (
              `RUN CORRELATION ANALYSIS (${selectedSources.length} sources selected)`
            )}
          </button>
          {selectedSources.length < 2 && (
            <p style={{ textAlign: 'center', fontSize: '12px', opacity: 0.5, marginTop: '8px' }}>
              Select at least 2 data sources to enable analysis
            </p>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            padding: '16px 20px',
            background: 'rgba(230, 57, 70, 0.1)',
            border: '1px solid rgba(230, 57, 70, 0.3)',
            borderRadius: '12px',
            marginBottom: '24px',
            color: '#e63946'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Results Display */}
        {results && (
          <section style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(0, 255, 212, 0.2)',
            borderRadius: '16px',
            padding: '24px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '24px',
              background: '#0a0f1a',
              padding: '4px 16px',
              borderRadius: '20px',
              border: '1px solid rgba(0, 255, 212, 0.3)',
              fontSize: '12px',
              fontWeight: '600',
              color: '#00ffd4',
              letterSpacing: '1px'
            }}>
              ANALYSIS RESULTS
            </div>

            {/* Metadata */}
            <div style={{
              display: 'flex',
              gap: '24px',
              marginTop: '12px',
              marginBottom: '24px',
              fontSize: '12px',
              opacity: 0.7
            }}>
              <span>🕐 {new Date(results.timestamp).toLocaleString()}</span>
              <span>📊 {results.sources.length} sources</span>
              <span>🔗 Domains: {results.domains.join(', ')}</span>
              {results.toolsUsed.search && <span>🌐 Web Search</span>}
              {results.toolsUsed.notion && <span>📚 Notion</span>}
            </div>

            {/* Sources used */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '24px'
            }}>
              {results.sources.map(source => (
                <span
                  key={source.id}
                  style={{
                    padding: '6px 14px',
                    background: source.color + '22',
                    border: `1px solid ${source.color}`,
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: source.color,
                    fontWeight: '500'
                  }}
                >
                  {source.name}
                </span>
              ))}
            </div>

            {/* Analysis content */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              padding: '24px',
              fontSize: '14px',
              lineHeight: '1.8',
              whiteSpace: 'pre-wrap'
            }}>
              {results.analysis}
            </div>

            {/* Action buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '24px'
            }}>
              <button
                onClick={() => navigator.clipboard.writeText(results.analysis)}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                📋 Copy Analysis
              </button>
              <button
                onClick={() => window.open(`https://www.notion.so/${NOTION_DATABASES.findings.id}`, '_blank')}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(0, 255, 212, 0.1)',
                  border: '1px solid rgba(0, 255, 212, 0.3)',
                  borderRadius: '8px',
                  color: '#00ffd4',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                📝 Save to Notion Findings
              </button>
              <button
                onClick={() => window.open(`https://www.notion.so/${NOTION_DATABASES.archive.id}`, '_blank')}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                📂 View Climate Archive
              </button>
            </div>
          </section>
        )}

        {/* Database Links */}
        <section style={{
          marginTop: '48px',
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '2px',
            opacity: 0.5,
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            CONNECTED NOTION DATABASES
          </h3>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a
              href={`https://www.notion.so/${NOTION_DATABASES.archive.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#00ffd4',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🌍 Climate Data Archive →
            </a>
            <a
              href={`https://www.notion.so/${NOTION_DATABASES.findings.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#00ffd4',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🔬 Correlation Findings →
            </a>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        * {
          box-sizing: border-box;
        }
        button:hover:not(:disabled) {
          transform: translateY(-1px);
        }
        select option {
          background: #0a0f1a;
          color: #fff;
        }
        ::selection {
          background: #00ffd4;
          color: #0a0f1a;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 212, 0.3);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
