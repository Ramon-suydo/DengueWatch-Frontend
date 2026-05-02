import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import api from '../services/api';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const HeatMapLayer = () => {
  const map = useMap();

  useEffect(() => {
    let heat;

    api.getHotspots(1)
      .then(res => {
        if (res.success && res.data.length > 0) {
          const heatData = res.data
            .filter(h => h.latitude && h.longitude)
            .map(h => [
              parseFloat(h.latitude),
              parseFloat(h.longitude),
              Math.min(parseFloat(h.totalCases) / 100, 1.0)
            ]);

          heat = L.heatLayer(heatData, {
            radius: 25,
            blur: 15,
            maxZoom: 10,
            gradient: {
              0.2: 'blue',
              0.4: 'lime',
              0.6: 'yellow',
              0.8: 'orange',
              1.0: 'red'
            }
          }).addTo(map);
        }
      })
      .catch(err => console.error('Failed to load hotspot data:', err));

    return () => {
      if (heat) map.removeLayer(heat);
    };
  }, [map]);

  return null;
};

const MapPage = () => {
  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[14.5995, 120.9842]} // Centered on Manila
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatMapLayer />
      </MapContainer>
    </div>
  );
};

export default MapPage;