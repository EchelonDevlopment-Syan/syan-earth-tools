import React, { useState } from 'react';
import CorrelationEngine from './engines/CorrelationEngine';
import TampaBayEngine from './engines/TampaBayEngine';

/**
 * SYAN.EARTH Climate Intelligence Hub
 * Main application with navigation between analysis engines
 */
function App() {
  const [activeView, setActiveView] = useState('home');

  // Back button component
  const BackButton = ({ color = '#00ffd4' }) => (
    <button 
      onClick={() => setActiveView('home')}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        padding: '12px 24px',
        background: color,
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '14px',
        color: '#0a1628',
        boxShadow: `0 4px 20px ${color}40`,
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      ← Back to Hub
    </button>
  );

  // Render Global Correlation Engine
  if (activeView === 'global') {
    return (
      <div>
        <BackButton color="#00ffd4" />
        <CorrelationEngine />
      </div>
    );
  }

  // Render Tampa Bay HAB Engine
  if (activeView === 'tampa') {
    return (
      <div>
        <BackButton color="#00d4ff" />
        <TampaBayEngine />
      </div>
    );
  }

  // Home / Hub View
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1628 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#f3f4f6',
      fontFamily: "'JetBrains Mono', monospace",
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>🌍</div>
          <h1 style={{
            fontSize: '52px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #00d4ff 0%, #00ffd4 50%, #00d4ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
            letterSpacing: '-1px'
          }}>
            SYAN.EARTH
          </h1>
          <p style={{ 
            fontSize: '20px', 
            color: '#9ca3af',
            marginBottom: '8px'
          }}>
            Climate Intelligence Hub
          </p>
          <p style={{ 
            fontSize: '14px', 
            color: '#6b7280'
          }}>
            Harmful Algal Bloom Detection & Prediction Platform
          </p>
        </header>

        {/* Stats Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '50px',
          flexWrap: 'wrap'
        }}>
          {[
            { value: '366', label: 'Years of Data', color: '#00ffd4' },
            { value: '24', label: 'Data Sources', color: '#00d4ff' },
            { value: '200K+', label: 'HAB Records', color: '#ef4444' },
            { value: '10', label: 'Correlations', color: '#8b5cf6' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                color: stat.color,
                textShadow: `0 0 20px ${stat.color}40`
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Engine Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '30px',
          marginBottom: '50px'
        }}>
          {/* Global Correlation Engine */}
          <div 
            onClick={() => setActiveView('global')}
            style={{
              background: 'rgba(17, 24, 39, 0.8)',
              borderRadius: '20px',
              padding: '35px',
              border: '2px solid rgba(0, 255, 212, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#00ffd4';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 212, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 212, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ 
              position: 'absolute', 
              top: '-50px', 
              right: '-50px', 
              fontSize: '150px', 
              opacity: 0.05 
            }}>🌐</div>
            
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌐</div>
            <h2 style={{ 
              fontSize: '26px', 
              color: '#00ffd4', 
              marginBottom: '12px',
              fontWeight: '600'
            }}>
              Global Correlation Engine
            </h2>
            <p style={{ 
              color: '#9ca3af', 
              marginBottom: '24px',
              lineHeight: '1.6',
              fontSize: '14px'
            }}>
              Analyze 366 years of UK/Global climate data. Cross-domain correlation 
              analysis between weather, ocean, and biological datasets.
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>
                DATA SOURCES
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['Weather Rescue', 'Met Office', 'HadCET', 'NOAA SST', 'Bio-Argo'].map((src, i) => (
                  <span key={i} style={{ 
                    padding: '4px 10px', 
                    background: 'rgba(0, 255, 212, 0.1)', 
                    borderRadius: '12px', 
                    fontSize: '11px',
                    color: '#00ffd4'
                  }}>
                    {src}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ 
                padding: '6px 14px', 
                background: '#e63946', 
                borderRadius: '20px', 
                fontSize: '11px',
                fontWeight: '500'
              }}>Weather</span>
              <span style={{ 
                padding: '6px 14px', 
                background: '#e9c46a', 
                borderRadius: '20px', 
                fontSize: '11px', 
                color: '#000',
                fontWeight: '500'
              }}>Ocean</span>
              <span style={{ 
                padding: '6px 14px', 
                background: '#52b788', 
                borderRadius: '20px', 
                fontSize: '11px',
                fontWeight: '500'
              }}>Biology</span>
            </div>
          </div>

          {/* Tampa Bay HAB Engine */}
          <div 
            onClick={() => setActiveView('tampa')}
            style={{
              background: 'rgba(17, 24, 39, 0.8)',
              borderRadius: '20px',
              padding: '35px',
              border: '2px solid rgba(0, 212, 255, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#00d4ff';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ 
              position: 'absolute', 
              top: '-50px', 
              right: '-50px', 
              fontSize: '150px', 
              opacity: 0.05 
            }}>🌊</div>
            
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌊</div>
            <h2 style={{ 
              fontSize: '26px', 
              color: '#00d4ff', 
              marginBottom: '12px',
              fontWeight: '600'
            }}>
              Tampa Bay HAB Engine
            </h2>
            <p style={{ 
              color: '#9ca3af', 
              marginBottom: '24px',
              lineHeight: '1.6',
              fontSize: '14px'
            }}>
              Regional red tide analysis with interactive map. 200K+ HAB records 
              since 1953. Predict Karenia brevis blooms before they reach shore.
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>
                MONITORING STATIONS
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['FWC HAB', 'TBEP', 'MacDill AFB', 'Egmont Channel', 'FWRI'].map((src, i) => (
                  <span key={i} style={{ 
                    padding: '4px 10px', 
                    background: 'rgba(0, 212, 255, 0.1)', 
                    borderRadius: '12px', 
                    fontSize: '11px',
                    color: '#00d4ff'
                  }}>
                    {src}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ 
                padding: '6px 14px', 
                background: '#ef4444', 
                borderRadius: '20px', 
                fontSize: '11px',
                fontWeight: '500'
              }}>HAB/Red Tide</span>
              <span style={{ 
                padding: '6px 14px', 
                background: '#8b5cf6', 
                borderRadius: '20px', 
                fontSize: '11px',
                fontWeight: '500'
              }}>Water Quality</span>
              <span style={{ 
                padding: '6px 14px', 
                background: '#3b82f6', 
                borderRadius: '20px', 
                fontSize: '11px',
                fontWeight: '500'
              }}>Ocean Obs</span>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '50px'
        }}>
          {/* Notion Databases */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.6)',
            borderRadius: '16px',
            padding: '25px',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}>
            <h3 style={{ 
              color: '#8b5cf6', 
              marginBottom: '16px',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '1px'
            }}>
              📊 NOTION DATABASES
            </h3>
            <a 
              href="https://www.notion.so/ea822bbc8b48422ca0925ea93a0bdade" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'block',
                color: '#00ffd4', 
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                fontSize: '14px'
              }}
            >
              🌍 Climate Data Archive (24 sources) →
            </a>
            <a 
              href="https://www.notion.so/e7429a2c9fac4c1d9c3bb0abb93be628" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'block',
                color: '#00ffd4', 
                textDecoration: 'none',
                padding: '10px 0',
                fontSize: '14px'
              }}
            >
              🔬 Correlation Findings (10 findings) →
            </a>
          </div>

          {/* Live Data Feeds */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.6)',
            borderRadius: '16px',
            padding: '25px',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <h3 style={{ 
              color: '#ef4444', 
              marginBottom: '16px',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '1px'
            }}>
              🔴 LIVE DATA FEEDS
            </h3>
            <a 
              href="https://myfwc.com/research/redtide/statewide/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'block',
                color: '#f87171', 
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                fontSize: '14px'
              }}
            >
              FWC Red Tide Current Status →
            </a>
            <a 
              href="https://coastalscience.noaa.gov/science-areas/habs/hab-forecasts/gulf-of-mexico/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'block',
                color: '#f87171', 
                textDecoration: 'none',
                padding: '10px 0',
                fontSize: '14px'
              }}
            >
              NOAA HAB Forecast Gulf Coast →
            </a>
          </div>

          {/* Resources */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.6)',
            borderRadius: '16px',
            padding: '25px',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }}>
            <h3 style={{ 
              color: '#22c55e', 
              marginBottom: '16px',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '1px'
            }}>
              🔗 RESOURCES
            </h3>
            <a 
              href="https://syan.earth" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'block',
                color: '#4ade80', 
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                fontSize: '14px'
              }}
            >
              🌐 SYAN.EARTH Website →
            </a>
            <a 
              href="https://github.com/syan-earth/syan-earth-tools" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'block',
                color: '#4ade80', 
                textDecoration: 'none',
                padding: '10px 0',
                fontSize: '14px'
              }}
            >
              📦 GitHub Repository →
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ 
          textAlign: 'center', 
          paddingTop: '30px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '8px' }}>
            Built by <strong style={{ color: '#00d4ff' }}>Echelon Development & Contract Consulting LLC</strong>
          </p>
          <p style={{ color: '#4b5563', fontSize: '11px' }}>
            🌍 Protecting coastlines through climate intelligence
          </p>
        </footer>
      </div>

      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        ::selection {
          background: #00d4ff;
          color: #0a1628;
        }
      `}</style>
    </div>
  );
}

export default App;
