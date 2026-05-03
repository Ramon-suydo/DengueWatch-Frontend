<<<<<<< HEAD
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
=======
function MapPage() {
  return (
    <main className="py-8 sm:py-10">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="rounded-[2rem] bg-paper/95 px-6 py-8 shadow-soft sm:px-8">
          <h1 className="text-3xl font-black tracking-[-0.04em] text-navy sm:text-4xl">
            Map View
          </h1>
          <p className="mt-4 text-base text-ink/70">
            Interactive map showing dengue cases and risk areas in your barangay.
          </p>
          <div className="mt-8 h-96 rounded-lg border border-navy/10 bg-sand flex items-center justify-center">
            <p className="text-ink/50">Map visualization coming soon</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MapPage;
>>>>>>> origin/frontend-ui-updates
