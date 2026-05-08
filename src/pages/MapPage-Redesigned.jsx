import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, ChevronUp, ChevronDown, Locate, AlertCircle, X } from 'lucide-react';
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

const getRiskLabel = (score) => {
  if (score >= 70) return 'High Risk';
  if (score >= 40) return 'Medium-High';
  if (score >= 20) return 'Medium';
  return 'Low Risk';
};

// All 17 NCR cities
const NCR_CITIES = [
  'MANILA CITY',
  'QUEZON CITY',
  'CALOOCAN CITY',
  'TAGUIG CITY',
  'PASAY CITY',
  'MAKATI CITY',
  'LAS PIÑAS CITY',
  'PARAÑAQUE CITY',
  'NAVOTAS CITY',
  'MALABON CITY',
  'SAN JUAN',
  'MARIKINA CITY',
  'PASIG CITY',
  'MANDALUYONG CITY',
  'VALENZUELA CITY',
  'MUNTINLUPA CITY',
  'PATEROS'
];

const isMetroManila = (name) => {
  if (!name) return false;
  const normalized = name.toUpperCase().trim();
  return (normalized.includes('METRO') && normalized.includes('MANILA')) ||
         normalized === 'METROPOLITAN MANILA';
};

const getPredictionData = (provinceName, predictions) => {
  if (predictions[provinceName]) {
    return predictions[provinceName];
  }

  if (isMetroManila(provinceName)) {
    let maxRiskCity = null;
    let maxRisk = -1;

    NCR_CITIES.forEach(city => {
      if (predictions[city] && predictions[city].riskPercentage > maxRisk) {
        maxRisk = predictions[city].riskPercentage;
        maxRiskCity = city;
      }
    });

    if (maxRiskCity) {
      return predictions[maxRiskCity];
    }
  }

  return null;
};

const getTopNCRCities = (predictions) => {
  const ncrData = NCR_CITIES
    .filter(city => predictions[city])
    .map(city => ({
      name: city,
      ...predictions[city]
    }))
    .sort((a, b) => b.riskPercentage - a.riskPercentage)
    .slice(0, 3);
  
  return ncrData;
};

const ProvincesLayer = ({ predictions, onProvinceClick }) => {
  const [geoData, setGeoData] = useState(null);
  const map = useMap();

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/macoymejia/geojsonph/master/Province/Provinces.json')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error('GeoJSON error:', err));
  }, []);

  if (!geoData) return null;

  const getStyle = (feature) => {
    const provinceName = feature.properties?.PROVINCE ||
                         feature.properties?.NAME_1 ||
                         feature.properties?.name || '';
    
    const pred = getPredictionData(provinceName, predictions);
    const score = pred?.riskPercentage ?? 0;
    
    return {
      fillColor: getRiskColor(score),
      fillOpacity: 0.5,
      color: '#ffffff',
      weight: 1.5,
    };
  };

  const onEachFeature = (feature, layer) => {
    const provinceName = feature.properties?.PROVINCE ||
                         feature.properties?.NAME_1 ||
                         feature.properties?.name || 'Unknown';
    
    const pred = getPredictionData(provinceName, predictions);
    const score = pred?.riskPercentage ?? null;
    const level = pred?.riskLevel ?? 'No data';
    const color = getRiskColor(score !== null ? score : 0);

    // Tooltip on hover
    layer.bindTooltip(`
      <div style="font-family:system-ui,-apple-system,sans-serif;padding:6px 10px;font-size:13px;font-weight:600">
        ${provinceName}<br/>
        <span style="color:${color}">● ${level} ${score !== null ? `(${score}%)` : ''}</span>
      </div>
    `, { sticky: false, offset: L.point(0, -10) });

    // Click handler for bottom sheet
    layer.on('click', (e) => {
      L.DomEvent.stopPropagation(e);
      onProvinceClick({
        name: provinceName,
        pred: pred,
        color: color,
        score: score,
        level: level
      });
    });

    // Hover effects
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({ fillOpacity: 0.8, weight: 2.5 });
      },
      mouseout: (e) => {
        e.target.setStyle({ fillOpacity: 0.5, weight: 1.5 });
      }
    });
  };

  return <GeoJSON key={JSON.stringify(predictions)} data={geoData} style={getStyle} onEachFeature={onEachFeature} />;
};

// Locate user button component
const LocateButton = () => {
  const map = useMap();

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };

  return null; // Button is rendered separately
};

const MapPage = () => {
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [legendOpen, setLegendOpen] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    api.getAllCityRisks()
        .then(res => {
            if (res.success) setPredictions(res.data);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
  }, []);

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 14, { animate: true });
          }
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <div className="relative w-full h-screen md:h-[calc(100vh-64px)] bg-navy overflow-hidden">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
            <div className="w-12 h-12 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold text-navy">Loading risk predictions...</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <MapContainer
        ref={mapRef}
        center={[12.8797, 121.7740]}
        zoom={6}
        className="w-full h-full"
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri'
        />
        <ProvincesLayer predictions={predictions} onProvinceClick={setSelectedProvince} />
        <LocateButton />
      </MapContainer>

      {/* Legend - Mobile Collapsible */}
      <div className="absolute bottom-24 md:bottom-6 right-4 md:right-6 z-40 max-w-xs">
        <button
          onClick={() => setLegendOpen(!legendOpen)}
          className="md:hidden flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-lg font-medium text-sm text-navy mb-2"
        >
          <MapPin size={16} />
          Risk Level
          <ChevronUp size={16} className={`transition-transform ${legendOpen ? '' : 'rotate-180'}`} />
        </button>

        {/* Legend Content */}
        <div className={`bg-white rounded-2xl shadow-xl p-4 transition-all duration-300 ${
          legendOpen ? 'opacity-100 visible' : 'md:opacity-100 md:visible opacity-0 invisible md:block'
        }`}>
          <h3 className="font-bold text-navy text-sm mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-navy rounded-full" />
            Risk Levels
          </h3>

          <div className="space-y-2 mb-4">
            {[
              { color: '#ef4444', label: 'High Risk', range: '≥70%' },
              { color: '#f97316', label: 'Medium-High', range: '≥40%' },
              { color: '#eab308', label: 'Medium', range: '≥20%' },
              { color: '#22c55e', label: 'Low Risk', range: '<20%' },
            ].map(({ color, label, range }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-md flex-shrink-0 border-2 border-white shadow-sm" style={{ backgroundColor: color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-ink">{label}</p>
                  <p className="text-xs text-ink/50">{range}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-ink/60 bg-navy/5 rounded-lg p-2 border border-navy/10">
            💡 Tap province for details • Hover on desktop
          </div>
        </div>
      </div>

      {/* Locate Me Button */}
      <button
        onClick={handleLocate}
        className="absolute bottom-32 md:bottom-24 right-4 md:right-6 z-40 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-navy/30"
        aria-label="Locate me"
        title="Show my location"
      >
        <Locate size={20} className="text-navy" />
      </button>

      {/* Bottom Sheet - Province Details (Mobile) */}
      {selectedProvince && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setSelectedProvince(null)}
          />

          {/* Bottom Sheet */}
          <div className="relative bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-navy/10 rounded-t-3xl px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: selectedProvince.color }}
                />
                <h2 className="text-lg font-bold text-navy truncate">{selectedProvince.name}</h2>
              </div>
              <button
                onClick={() => setSelectedProvince(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-navy/10 active:bg-navy/20 transition"
                aria-label="Close"
              >
                <X size={24} className="text-ink" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {selectedProvince.score !== null ? (
                <>
                  {/* Risk Score */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink/60">Risk Score</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-4xl font-black text-navy">{selectedProvince.score}</span>
                          <span className="text-lg text-ink/60">%</span>
                        </div>
                        <div className="w-full h-3 bg-navy/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${selectedProvince.score}%`,
                              backgroundColor: selectedProvince.color
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-black" style={{ color: selectedProvince.color }}>
                          ●
                        </p>
                        <p className="text-xs font-bold text-ink/60 mt-1">{selectedProvince.level}</p>
                      </div>
                    </div>
                  </div>

                  {/* Top NCR Cities */}
                  {isMetroManila(selectedProvince.name) && (
                    <div className="space-y-3 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-900">Top 3 NCR Cities</p>
                      <div className="space-y-2">
                        {getTopNCRCities(predictions).map((city, idx) => (
                          <div key={city.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-bold w-5 text-center text-blue-600">{idx + 1}.</span>
                              <span className="text-ink font-medium">{city.name}</span>
                            </div>
                            <span
                              className="font-bold px-2 py-1 rounded text-xs"
                              style={{
                                color: getRiskColor(city.riskPercentage),
                                backgroundColor: getRiskColor(city.riskPercentage) + '20'
                              }}
                            >
                              {city.riskPercentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Risk Factors */}
                  {selectedProvince.pred?.factors && (
                    <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-ink/60">Risk Factors</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-orange-900 font-semibold mb-1">Weather</p>
                          <p className="text-xl font-bold text-orange-600">{selectedProvince.pred.factors.weather?.score || 0}%</p>
                          <p className="text-xs text-orange-700 mt-1">{selectedProvince.pred.factors.weather?.temperature}°C</p>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-purple-900 font-semibold mb-1">History</p>
                          <p className="text-xl font-bold text-purple-600">{selectedProvince.pred.factors.historical?.score || 0}%</p>
                          <p className="text-xs text-purple-700 mt-1">{selectedProvince.pred.factors.historical?.totalCases || 0} cases</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-green-900 font-semibold mb-1">Season</p>
                          <p className="text-xl font-bold text-green-600">{selectedProvince.pred.factors.season?.score || 0}%</p>
                          <p className="text-xs text-green-700 mt-1">{selectedProvince.pred.factors.season?.isPeakSeason ? '⚠️ Peak' : '✅ Off'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {selectedProvince.pred?.recommendation && (
                    <div className="bg-alert/10 border-l-4 border-alert rounded-lg p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-alert mb-2">Recommendation</p>
                      <p className="text-sm text-ink/70 leading-relaxed">{selectedProvince.pred.recommendation}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertCircle size={32} className="text-ink/30 mb-2" />
                  <p className="text-sm text-ink/60">No prediction data available for this area</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Modal - Province Details */}
      {selectedProvince && window.innerWidth >= 768 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="border-b border-navy/10 px-6 py-4 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: selectedProvince.color }}
                />
                <h2 className="text-lg font-bold text-navy truncate">{selectedProvince.name}</h2>
              </div>
              <button
                onClick={() => setSelectedProvince(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-navy/10 active:bg-navy/20 transition"
              >
                <X size={24} className="text-ink" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {selectedProvince.score !== null ? (
                <>
                  {/* Risk Score */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink/60">Risk Score</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-4xl font-black text-navy">{selectedProvince.score}</span>
                          <span className="text-lg text-ink/60">%</span>
                        </div>
                        <div className="w-full h-3 bg-navy/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${selectedProvince.score}%`,
                              backgroundColor: selectedProvince.color
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-black" style={{ color: selectedProvince.color }}>
                          ●
                        </p>
                        <p className="text-xs font-bold text-ink/60 mt-1">{selectedProvince.level}</p>
                      </div>
                    </div>
                  </div>

                  {/* Top NCR Cities */}
                  {isMetroManila(selectedProvince.name) && (
                    <div className="space-y-3 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-900">Top 3 NCR Cities</p>
                      <div className="space-y-2">
                        {getTopNCRCities(predictions).map((city, idx) => (
                          <div key={city.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-bold w-5 text-center text-blue-600">{idx + 1}.</span>
                              <span className="text-ink font-medium">{city.name}</span>
                            </div>
                            <span
                              className="font-bold px-2 py-1 rounded text-xs"
                              style={{
                                color: getRiskColor(city.riskPercentage),
                                backgroundColor: getRiskColor(city.riskPercentage) + '20'
                              }}
                            >
                              {city.riskPercentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Risk Factors */}
                  {selectedProvince.pred?.factors && (
                    <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-ink/60">Risk Factors</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-orange-900 font-semibold mb-1">Weather</p>
                          <p className="text-xl font-bold text-orange-600">{selectedProvince.pred.factors.weather?.score || 0}%</p>
                          <p className="text-xs text-orange-700 mt-1">{selectedProvince.pred.factors.weather?.temperature}°C</p>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-purple-900 font-semibold mb-1">History</p>
                          <p className="text-xl font-bold text-purple-600">{selectedProvince.pred.factors.historical?.score || 0}%</p>
                          <p className="text-xs text-purple-700 mt-1">{selectedProvince.pred.factors.historical?.totalCases || 0} cases</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-green-900 font-semibold mb-1">Season</p>
                          <p className="text-xl font-bold text-green-600">{selectedProvince.pred.factors.season?.score || 0}%</p>
                          <p className="text-xs text-green-700 mt-1">{selectedProvince.pred.factors.season?.isPeakSeason ? '⚠️ Peak' : '✅ Off'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {selectedProvince.pred?.recommendation && (
                    <div className="bg-alert/10 border-l-4 border-alert rounded-lg p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-alert mb-2">Recommendation</p>
                      <p className="text-sm text-ink/70 leading-relaxed">{selectedProvince.pred.recommendation}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertCircle size={32} className="text-ink/30 mb-2" />
                  <p className="text-sm text-ink/60">No prediction data available for this area</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
