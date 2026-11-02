import { useState } from 'react';
import {
  Layers,
  Hospital,
  AlertCircle,
  CheckCircle2,
  Info,
} from 'lucide-react';

export default function InteractiveMapPlaceholder({
  locations = [],
  title = 'Geographic Healthcare Accessibility & Hospital Mapping',
  subtitle = 'Spatial distribution of healthcare facilities across Maharashtra districts',
}) {
  const [selectedFacility, setSelectedFacility] = useState(locations[0] || null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showBuffers, setShowBuffers] = useState(true);

  const filteredLocations = activeFilter === 'All'
    ? locations
    : locations.filter((loc) => loc.type.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
              <AlertCircle className="w-3 h-3" />
              GIS Validation in Progress
            </span>
          </div>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>

        {/* Map Control Buttons */}
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

      {/* Main Map Viewer Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Map Canvas / Simulated GIS Layer */}
        <div className="lg:col-span-2 relative bg-slate-900 h-[380px] sm:h-[440px] flex items-center justify-center overflow-hidden select-none">
          {/* Stylized Maharashtra / District Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Regional Contour Outline Simulation */}
          <div className="absolute inset-8 rounded-3xl border border-sky-500/20 bg-sky-950/20 backdrop-blur-[1px] pointer-events-none" />

          {/* District Boundary Contours / Regions */}
          <div className="absolute top-12 left-16 text-[11px] font-mono text-sky-400/40 uppercase">
            Konkan Division
          </div>
          <div className="absolute top-16 right-20 text-[11px] font-mono text-sky-400/40 uppercase">
            Vidarbha / Nagpur
          </div>
          <div className="absolute bottom-16 left-28 text-[11px] font-mono text-sky-400/40 uppercase">
            Western Maharashtra / Pune
          </div>
          <div className="absolute top-28 left-48 text-[11px] font-mono text-sky-400/40 uppercase">
            Marathwada Division
          </div>

          {/* Facility Location Pins */}
          {filteredLocations.map((loc, idx) => {
            // Map lat/long approximately into relative canvas percentages for demo visual
            const xPercent = Math.min(Math.max(((loc.lng - 72.8) / (80.5 - 72.8)) * 80 + 10, 10), 90);
            const yPercent = Math.min(Math.max((1 - (loc.lat - 16.0) / (21.8 - 16.0)) * 75 + 12, 10), 90);
            const isSelected = selectedFacility?.id === loc.id;

            return (
              <div
                key={loc.id || idx}
                onClick={() => setSelectedFacility(loc)}
                style={{ top: `${yPercent}%`, left: `${xPercent}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                {/* 5km Radius Buffer Ring */}
                {showBuffers && (
                  <div className="absolute -inset-4 rounded-full border border-sky-400/30 bg-sky-400/10 pointer-events-none animate-pulse" />
                )}

                {/* Pin Icon */}
                <div
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-transform duration-200 group-hover:scale-125 ${
                    isSelected
                      ? 'bg-rose-600 border-white text-white shadow-lg ring-4 ring-rose-500/40'
                      : loc.status === 'Verified'
                      ? 'bg-emerald-600 border-white text-white shadow-md'
                      : 'bg-amber-500 border-white text-white shadow-md'
                  }`}
                >
                  <Hospital className="w-4 h-4" />
                </div>

                {/* Hover Label */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-slate-900/90 text-white text-[11px] px-2 py-1 rounded shadow-md z-30 pointer-events-none">
                  {loc.name}
                </div>
              </div>
            );
          })}

          {/* Map Status Badge Overlay */}
          <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-xs border border-slate-700 text-white px-3 py-2 rounded-lg text-xs max-w-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-slate-200">GIS Coordinate Engine</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Geospatial pins ready for validated hospital lat/long dataset ingestion. Showing {filteredLocations.length} plotted nodes.
            </p>
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-1.5">
            <div className="bg-slate-900/90 backdrop-blur-xs border border-slate-700 text-white p-1.5 rounded-md text-[10px] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Verified Facility</span>
            </div>
            <div className="bg-slate-900/90 backdrop-blur-xs border border-slate-700 text-white p-1.5 rounded-md text-[10px] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Validating GIS</span>
            </div>
          </div>
        </div>

        {/* Selected Facility Details Sidebar */}
        <div className="p-5 bg-slate-50/50 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Facility Inspector
              </span>
              {selectedFacility && (
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    selectedFacility.status === 'Verified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {selectedFacility.status}
                </span>
              )}
            </div>

            {selectedFacility ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {selectedFacility.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">District: {selectedFacility.district}</p>
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
                    <span>GPS Latitude:</span>
                    <span className="font-mono text-slate-900">{selectedFacility.lat}° N</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GPS Longitude:</span>
                    <span className="font-mono text-slate-900">{selectedFacility.lng}° E</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Catchment Radius:</span>
                    <span className="font-semibold text-emerald-700">~ 5.0 km</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-sky-50 border border-sky-100 text-[11px] text-sky-800 flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 text-sky-600 mt-0.5" />
                  <span>
                    Actual hospital geocoordinates and validated bed capacities will overwrite this preview once the team's GIS mapping pipeline completes.
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Select a facility pin on the map to inspect its attributes.
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-200 mt-4 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Projection: WGS 84 (EPSG:4326)</span>
            <span className="font-medium text-blue-600">GeoJSON Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
