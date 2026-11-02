import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  AlertCircle,
  Layers,
  MapPin,
  Info,
} from 'lucide-react';

// Create custom SVG Leaflet Marker Icon to avoid default png asset path resolution issues in Vite
const createFacilityIcon = (type, isSelected) => {
  const isDh = type?.includes('District Hospital') || type?.includes('Tertiary');
  const bgColor = isDh ? '#0284c7' : '#0d9488';
  const size = isSelected ? 36 : 28;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${bgColor};
        border: 2px solid #ffffff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
        color: white;
        font-size: 14px;
        cursor: pointer;
        transition: transform 0.2s ease;
        ${isSelected ? 'box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.4); transform: scale(1.1);' : ''}
      ">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 6v12M6 12h12"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

export default function HealthcareMap({
  facilities = [],
  title = 'Interactive GIS Healthcare Map (Leaflet)',
  subtitle = 'Spatial mapping of Maharashtra public hospitals & facilities. Powered by Leaflet OpenStreetMap.',
}) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedFacility, setSelectedFacility] = useState(facilities[0] || null);
  const [showBuffers, setShowBuffers] = useState(true);

  // Maharashtra Center: approx [19.5, 75.8], Zoom: 7
  const defaultCenter = [19.5, 75.8];
  const defaultZoom = 7;

  const filteredFacilities = activeFilter === 'All'
    ? facilities
    : facilities.filter((f) => f.type.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
              <AlertCircle className="w-3 h-3" />
              DEMO DATA / PLACEHOLDER
            </span>
          </div>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
            {['All', 'District Hospital', 'Sub-District', 'Rural'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowBuffers(!showBuffers)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              showBuffers
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            5km Buffer
          </button>
        </div>
      </div>

      {/* Main Map & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Leaflet Map Viewer */}
        <div className="lg:col-span-2 relative h-[420px] sm:h-[480px] z-10">
          <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            scrollWheelZoom={false}
            className="w-full h-full"
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredFacilities.map((fac) => {
              const isSelected = selectedFacility?.id === fac.id;
              return (
                <div key={fac.id}>
                  {showBuffers && (
                    <Circle
                      center={[fac.lat, fac.lng]}
                      radius={5000} // 5 km buffer radius
                      pathOptions={{
                        color: isSelected ? '#ef4444' : '#0284c7',
                        fillColor: isSelected ? '#f87171' : '#38bdf8',
                        fillOpacity: 0.15,
                        weight: 1.5,
                      }}
                    />
                  )}

                  <Marker
                    position={[fac.lat, fac.lng]}
                    icon={createFacilityIcon(fac.type, isSelected)}
                    eventHandlers={{
                      click: () => setSelectedFacility(fac),
                    }}
                  >
                    <Popup className="text-xs">
                      <div className="p-1">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 mb-1">
                          DEMO DATA
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm leading-tight">{fac.name}</h4>
                        <p className="text-slate-500 text-xs mt-0.5">{fac.type}</p>
                        <p className="text-blue-600 font-semibold mt-1">Beds: {fac.beds}</p>
                        <p className="text-slate-400 font-mono text-[10px] mt-0.5">
                          {fac.lat.toFixed(4)}°N, {fac.lng.toFixed(4)}°E
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                </div>
              );
            })}
          </MapContainer>

          {/* Banner Over Map */}
          <div className="absolute bottom-3 left-3 z-[1000] bg-slate-900/90 backdrop-blur-xs text-white px-3 py-2 rounded-lg text-xs max-w-xs shadow-md border border-slate-700 pointer-events-none">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-0.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Placeholder Coordinates</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Showing {filteredFacilities.length} sample health facilities. Actual GIS geocoded points will replace these once validated.
            </p>
          </div>
        </div>

        {/* Selected Facility Inspector */}
        <div className="p-5 bg-slate-50/60 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Facility Inspector
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                DEMO DATA
              </span>
            </div>

            {selectedFacility ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {selectedFacility.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    District ID: {selectedFacility.district_id || selectedFacility.district}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Classification</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block">{selectedFacility.type}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Beds</span>
                    <span className="font-semibold text-blue-600 mt-0.5 block text-sm">{selectedFacility.beds} Beds</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Latitude:</span>
                    <span className="font-mono text-slate-900">{selectedFacility.lat}° N</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Longitude:</span>
                    <span className="font-mono text-slate-900">{selectedFacility.lng}° E</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Catchment Buffer:</span>
                    <span className="font-semibold text-emerald-700">5.0 km radius</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>
                    This map is powered by Leaflet and OpenStreetMap. Coordinate positions are development placeholders. Do not treat as actual project results.
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Select a marker on the map to inspect facility attributes.
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-200 mt-4 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Projection: EPSG:3857 (WGS 84 Web Mercator)</span>
            <span className="font-semibold text-blue-600">Leaflet v1.9</span>
          </div>
        </div>
      </div>
    </div>
  );
}
