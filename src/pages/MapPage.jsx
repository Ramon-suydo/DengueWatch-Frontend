import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../services/api';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const getRiskColor = (score) => {
  if (score >= 70) return '#ef4444';
  if (score >= 40) return '#f97316';
  if (score >= 20) return '#eab308';
  return '#22c55e';
};

const ProvincesLayer = ({ predictions }) => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/macoymejia/geojsonph/master/Province/Provinces.json')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error('GeoJSON error:', err));
  }, []);

  if (!geoData) return null;

  const getStyle = (feature) => {
    const name = feature.properties?.PROVINCE ||
                 feature.properties?.NAME_1 ||
                 feature.properties?.name || '';
    const pred = predictions[name];
    const score = pred?.riskPercentage ?? Math.floor(Math.random() * 50) + 10;
    return {
      fillColor: getRiskColor(score),
      fillOpacity: 0.4,
      color: '#ffffff',
      weight: 1.5,
    };
  };

  const onEachFeature = (feature, layer) => {
    const name = feature.properties?.PROVINCE ||
                 feature.properties?.NAME_1 ||
                 feature.properties?.name || 'Unknown';
    const pred = predictions[name];
    const score = pred?.riskPercentage ?? '—';
    const level = pred?.riskLevel ?? 'No data';
    const color = getRiskColor(score !== '—' ? score : 30);

    layer.bindTooltip(`
      <div style="font-family:sans-serif;padding:6px 10px;font-size:13px">
        <strong>${name}</strong><br/>
        <span style="color:${color}">● ${level} Risk ${score !== '—' ? `(${score}%)` : ''}</span>
      </div>
    `, { sticky: true });

    layer.bindPopup(`
      <div style="font-family:sans-serif;min-width:220px;padding:4px">
        <h3 style="margin:0 0 10px;font-size:16px;font-weight:bold;border-bottom:1px solid #eee;padding-bottom:8px">
          📍 ${name}
        </h3>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <div style="width:14px;height:14px;border-radius:50%;background:${color}"></div>
          <span style="font-weight:600;font-size:14px">${level} Risk</span>
        </div>
        ${score !== '—' ? `
          <div style="margin-bottom:10px">
            <div style="font-size:11px;color:#888;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px">Risk Score</div>
            <div style="background:#f0f0f0;border-radius:6px;height:10px;overflow:hidden">
              <div style="background:${color};width:${score}%;height:10px;border-radius:6px;transition:width 0.3s"></div>
            </div>
            <div style="font-size:20px;font-weight:bold;margin-top:4px;color:#1a1a2e">${score}%</div>
          </div>
          ${pred?.factors ? `
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px">
              <div style="background:#f8f8f8;padding:6px;border-radius:6px;text-align:center">
                <div style="font-size:10px;color:#888">Weather</div>
                <div style="font-weight:bold;font-size:13px">${pred.factors.weather.score}%</div>
                <div style="font-size:10px;color:#888">${pred.factors.weather.temperature}°C</div>
              </div>
              <div style="background:#f8f8f8;padding:6px;border-radius:6px;text-align:center">
                <div style="font-size:10px;color:#888">History</div>
                <div style="font-weight:bold;font-size:13px">${pred.factors.historical.score}%</div>
                <div style="font-size:10px;color:#888">${pred.factors.historical.totalCases} cases</div>
              </div>
              <div style="background:#f8f8f8;padding:6px;border-radius:6px;text-align:center">
                <div style="font-size:10px;color:#888">Season</div>
                <div style="font-weight:bold;font-size:13px">${pred.factors.season.score}%</div>
                <div style="font-size:10px;color:#888">${pred.factors.season.isPeakSeason ? '⚠️ Peak' : '✅ Off'}</div>
              </div>
            </div>
          ` : ''}
        ` : '<p style="color:#888;font-size:12px">No prediction data available</p>'}
        ${pred?.recommendation ? `
          <p style="font-size:11px;color:#555;margin:0;line-height:1.5;background:#fffbf0;padding:8px;border-radius:6px;border-left:3px solid ${color}">
            ${pred.recommendation}
          </p>
        ` : ''}
      </div>
    `);

    layer.on({
      mouseover: (e) => e.target.setStyle({ fillOpacity: 0.7, weight: 2.5 }),
      mouseout: (e) => e.target.setStyle({ fillOpacity: 0.4, weight: 1.5 })
    });
  };

  return <GeoJSON key={JSON.stringify(predictions)} data={geoData} style={getStyle} onEachFeature={onEachFeature} />;
};

const MapPage = () => {
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProvincePredictions()
      .then(res => {
        if (res.success) setPredictions(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ height: 'calc(100vh - 64px)', width: '100%', position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000, background: 'white', padding: '16px 24px',
          borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          fontSize: '14px', fontWeight: '600'
        }}>
          Loading risk predictions...
        </div>
      )}

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 30, right: 10, zIndex: 1000,
        background: 'white', padding: '16px', borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)', fontSize: '13px',
        minWidth: '180px'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>
          🗺️ Risk Level
        </div>
        {[
          { color: '#ef4444', label: 'High Risk (≥70%)' },
          { color: '#f97316', label: 'Medium-High (≥40%)' },
          { color: '#eab308', label: 'Medium (≥20%)' },
          { color: '#22c55e', label: 'Low Risk (<20%)' },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: color, flexShrink: 0 }} />
            <span>{label}</span>
          </div>
        ))}
        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #eee', fontSize: '11px', color: '#888' }}>
          Click province for details<br/>Hover to preview risk
        </div>
      </div>

      <MapContainer
        center={[12.8797, 121.7740]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri'
        />
        <ProvincesLayer predictions={predictions} />
      </MapContainer>
    </div>
  );
};

export default MapPage;