import React, { useState, useEffect, useCallback } from 'react';

// SYAN.EARTH — Anomaly #6 Live Monitor Panel
// Shows real-time status of upper Tampa Bay early warning sensors
// Polls /.netlify/functions/sensor-monitor every 30 minutes

const ALERT_CONFIG = {
  CRITICAL: { color: '#ef4444', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.5)',  icon: '🚨', pulse: true  },
  HIGH:     { color: '#f97316', bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.5)', icon: '⚠️', pulse: true  },
  WATCH:    { color: '#eab308', bg: 'rgba(234,179,8,0.15)',  border: 'rgba(234,179,8,0.5)',  icon: '👁️', pulse: false },
  ACTIVE:   { color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.5)', icon: '🌊', pulse: false },
  BACKGROUND:{ color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', icon: '🔵', pulse: false },
  CLEAR:    { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.3)',  icon: '✅', pulse: false }
};

const POLL_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

export default function SensorMonitorPanel() {
  const [status, setStatus]       = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [lastPoll, setLastPoll]   = useState(null);
  const [expanded, setExpanded]   = useState(false);
  const [triggering, setTriggering] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/.netlify/functions/sensor-monitor');
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch {
        throw new Error(`Sensor monitor returned non-JSON (HTTP ${res.status}). Function may be cold-starting — retrying shortly.`);
      }
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setStatus(data);
      setError(null);
      setLastPoll(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const triggerManual = async () => {
    setTriggering(true);
    try {
      const res = await fetch('/.netlify/functions/sensor-monitor', { method: 'POST' });
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch {
        throw new Error(`Sensor monitor returned non-JSON (HTTP ${res.status}). Please try again.`);
      }
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setStatus(data);
      setLastPoll(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setTriggering(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const alertLevel = status?.alert?.level || 'CLEAR';
  const cfg = ALERT_CONFIG[alertLevel] || ALERT_CONFIG.CLEAR;

  const formatCells = (n) => {
    if (!n || n === 0) return '0';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000)    return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  return (
    <div style={{
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Pulse ring for active alerts */}
      {cfg.pulse && (
        <style>{`
          @keyframes monitor-pulse {
            0%   { box-shadow: 0 0 0 0 ${cfg.color}40; }
            70%  { box-shadow: 0 0 0 12px transparent; }
            100% { box-shadow: 0 0 0 0 transparent; }
          }
          .monitor-pulse { animation: monitor-pulse 2s infinite; }
        `}</style>
      )}

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: expanded ? '12px' : '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className={cfg.pulse ? 'monitor-pulse' : ''} style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: cfg.color, flexShrink: 0
          }} />
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: cfg.color }}>
            {cfg.icon} ANOMALY #6 MONITOR
          </span>
          <span style={{
            fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
            background: cfg.color, color: '#000', fontWeight: 'bold'
          }}>
            {alertLevel}
          </span>
          {status?.alert?.leadTime && (
            <span style={{ fontSize: '10px', color: cfg.color }}>
              ⏱ {status.alert.leadTime} lead
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {lastPoll && (
            <span style={{ fontSize: '9px', color: '#6b7280' }}>
              {lastPoll.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={triggerManual}
            disabled={triggering || loading}
            style={{
              padding: '4px 8px', borderRadius: '4px', border: 'none',
              background: triggering ? 'rgba(107,114,128,0.3)' : 'rgba(255,255,255,0.1)',
              color: '#9ca3af', fontSize: '9px', cursor: triggering ? 'not-allowed' : 'pointer'
            }}
          >
            {triggering ? '⏳' : '🔄'} Check Now
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              padding: '4px 8px', borderRadius: '4px', border: 'none',
              background: 'rgba(255,255,255,0.1)', color: '#9ca3af',
              fontSize: '9px', cursor: 'pointer'
            }}
          >
            {expanded ? '▲ Less' : '▼ Detail'}
          </button>
        </div>
      </div>

      {/* Alert message */}
      {loading && (
        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px' }}>
          Querying upper bay sensors...
        </div>
      )}

      {error && (
        <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '8px' }}>
          Sensor poll error: {error}
        </div>
      )}

      {!loading && !error && status && (
        <>
          <div style={{ fontSize: '11px', color: '#e5e7eb', marginTop: '8px', lineHeight: '1.5' }}>
            {status.alert.message}
          </div>
          {status.alert.sstNote && (
            <div style={{ fontSize: '10px', color: cfg.color, marginTop: '4px' }}>
              🌡️ {status.alert.sstNote}
            </div>
          )}

          {/* Expanded detail */}
          {expanded && (
            <div style={{ marginTop: '12px', borderTop: `1px solid ${cfg.border}`, paddingTop: '12px' }}>

              {/* Station readings */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                {/* Upper Bay */}
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '10px' }}>
                  <div style={{ fontSize: '9px', color: '#6b7280', marginBottom: '4px', letterSpacing: '1px' }}>
                    UPPER BAY SENSORS
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: cfg.color }}>
                    {formatCells(status.stations.upperBay.peakCells)}
                  </div>
                  <div style={{ fontSize: '9px', color: '#9ca3af' }}>cells/L K. brevis</div>
                  <div style={{ fontSize: '9px', color: '#6b7280', marginTop: '4px' }}>
                    {status.stations.upperBay.totalRecords} records (14d)
                  </div>
                  {status.stations.upperBay.error && (
                    <div style={{ fontSize: '9px', color: '#ef4444', marginTop: '2px' }}>
                      ⚠ {status.stations.upperBay.error}
                    </div>
                  )}
                </div>

                {/* Egmont */}
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '10px' }}>
                  <div style={{ fontSize: '9px', color: '#6b7280', marginBottom: '4px', letterSpacing: '1px' }}>
                    EGMONT CHANNEL
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>
                    {formatCells(status.stations.egmont.peakCells)}
                  </div>
                  <div style={{ fontSize: '9px', color: '#9ca3af' }}>cells/L K. brevis</div>
                  <div style={{ fontSize: '9px', color: '#6b7280', marginTop: '4px' }}>
                    {status.stations.egmont.totalRecords} records (14d)
                  </div>
                  {status.stations.egmont.error && (
                    <div style={{ fontSize: '9px', color: '#ef4444', marginTop: '2px' }}>
                      ⚠ {status.stations.egmont.error}
                    </div>
                  )}
                </div>

                {/* NOAA Buoy */}
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '10px' }}>
                  <div style={{ fontSize: '9px', color: '#6b7280', marginBottom: '4px', letterSpacing: '1px' }}>
                    BUOY 42098 SST
                  </div>
                  {status.buoy ? (
                    <>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: status.buoy.sst >= 28 ? '#ef4444' : '#22c55e' }}>
                        {status.buoy.sst !== null ? status.buoy.sst + '°C' : 'N/A'}
                      </div>
                      <div style={{ fontSize: '9px', color: '#9ca3af' }}>
                        Wind {status.buoy.windSpd !== null ? status.buoy.windSpd + ' m/s' : 'N/A'}
                      </div>
                      <div style={{ fontSize: '9px', color: '#6b7280', marginTop: '4px' }}>
                        {status.buoy.time}
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>Unavailable</div>
                  )}
                </div>
              </div>

              {/* Recent upper bay samples */}
              {status.stations.upperBay.recentSamples?.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '9px', color: '#6b7280', marginBottom: '4px', letterSpacing: '1px' }}>
                    RECENT UPPER BAY SAMPLES
                  </div>
                  {status.stations.upperBay.recentSamples.map((s, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontSize: '9px', color: '#9ca3af',
                      padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <span>{s.date}</span>
                      <span style={{ color: s.cells > 1000 ? cfg.color : '#9ca3af' }}>
                        {formatCells(s.cells)} cells/L
                      </span>
                      <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {s.location}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Anomaly reference */}
              <div style={{
                background: 'rgba(0,0,0,0.2)', borderRadius: '6px', padding: '8px',
                fontSize: '9px', color: '#6b7280', lineHeight: '1.6'
              }}>
                <span style={{ color: '#00d4ff' }}>Anomaly #6</span> — {status.anomalyRef.name} •
                R={status.anomalyRef.rValue} • {status.anomalyRef.pValue} •
                Lead time: {status.anomalyRef.leadTime}
                <br />{status.anomalyRef.mechanism}
              </div>

              {/* Notion write confirmation */}
              {status.notionAlert?.written && (
                <div style={{ marginTop: '8px', fontSize: '10px', color: '#22c55e' }}>
                  ✅ Alert written to Notion Findings •{' '}
                  <a href={status.notionAlert.url} target="_blank" rel="noopener noreferrer"
                    style={{ color: '#22c55e' }}>View →</a>
                </div>
              )}

              <div style={{ marginTop: '8px', fontSize: '9px', color: '#4b5563' }}>
                Auto-refreshes every 30 min • Scheduled monitor runs every 6 hours •
                Notion alert written on WATCH level and above
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
