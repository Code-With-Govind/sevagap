import { useState, useEffect } from 'react';
import {
  Activity,
  Hospital,
  AlertTriangle,
  Ambulance,
  Bed,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import SummaryCard from '../components/common/SummaryCard';
import ReusableBarChart from '../components/charts/ReusableBarChart';
import ReusablePieChart from '../components/charts/ReusablePieChart';
import InteractiveMapPlaceholder from '../components/dashboard/InteractiveMapPlaceholder';
import { sevagapApi } from '../services/api';

export default function Healthcare() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await sevagapApi.getHealthcareData();
        setHealthData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !healthData) {
    return <div className="p-12 text-center text-slate-500 text-sm">Loading Healthcare Indicators...</div>;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        badge="Public Healthcare Analytics"
        title="Public Healthcare Facilities & GIS Spatial Mapping"
        subtitle="Assessing PHC coverage catchments, hospital bed ratios, and spatial access disparities"
        action={
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 text-xs font-semibold text-amber-800">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>GIS Dataset Ingestion in Progress</span>
            </span>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthData.kpis.map((kpi, idx) => (
          <SummaryCard
            key={idx}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            benchmark={`Target: ${kpi.target}`}
            trend={kpi.status === 'good' ? 'up' : kpi.status === 'caution' ? 'down' : 'neutral'}
            sector="healthcare"
            icon={idx === 0 ? Hospital : idx === 1 ? Activity : idx === 2 ? Bed : Ambulance}
          />
        ))}
      </div>

      {/* Interactive Map Placeholder Section - Dedicated for hospital data */}
      <section>
        <InteractiveMapPlaceholder
          locations={healthData.hospitalLocationsPlaceholder}
          title="Interactive GIS Hospital & Healthcare Facility Map"
          subtitle="Spatial clustering of secondary and tertiary care centres across Maharashtra. Ready for validated coordinate overlay."
        />
      </section>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReusableBarChart
            data={healthData.bedAvailabilityByDivision}
            xKey="name"
            bars={[
              { key: 'bedsPer10k', name: 'Govt Beds / 10k Pop', color: '#10b981' },
              { key: 'avgDistanceKm', name: 'Avg Distance to PHC (km)', color: '#f59e0b' },
            ]}
            height={340}
            title="Hospital Bed Density & Transit Burden by Division"
            subtitle="Evaluating hospital bed availability alongside average travel distance to primary care"
          />
        </div>

        <div>
          <ReusablePieChart
            data={healthData.facilityTypesDistribution}
            title="Public Health Facility Hierarchy"
            subtitle="Proportional network of Sub-Centres, PHCs, CHCs, and District Hospitals"
            height={340}
          />
        </div>
      </div>

      {/* Data Validation Pipeline Status Callout */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              GIS Coordinates Curation & Hospital Registry Note
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The healthcare facility location dataset is currently undergoing manual and automated geocoding verification (lat/long coordinate cross-checking against the Maharashtra Public Health Department and OpenStreetMap gazetteers). The map above demonstrates the interactive rendering layer, ready to receive the finalized dataset.
          </p>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-800/60 border border-emerald-600/40 text-xs font-semibold text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Map Ready for GeoJSON Ingestion</span>
          </span>
        </div>
      </div>
    </div>
  );
}
