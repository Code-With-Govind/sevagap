import { useState, useEffect } from 'react';
import {
  Activity,
  Hospital,
  AlertTriangle,
  Ambulance,
  Bed,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import SummaryCard from '../components/common/SummaryCard';
import ReusableBarChart from '../components/charts/ReusableBarChart';
import ReusablePieChart from '../components/charts/ReusablePieChart';
import HealthcareMap from '../components/dashboard/HealthcareMap';
import { sevagapApi } from '../services/api';

export default function Healthcare() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await sevagapApi.getHealthcareData();
        if (!ignore) {
          setHealthData(res.data);
          setError(null);
        }
      } catch (e) {
        if (!ignore) {
          console.error(e);
          setError('Unable to fetch healthcare metrics from backend. Displaying offline development data.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => {
      ignore = true;
    };
  }, [reloadTrigger]);

  const handleRetry = () => {
    setLoading(true);
    setReloadTrigger((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-3">
        <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Loading Healthcare Indicators & GIS Coordinates...</p>
      </div>
    );
  }

  if (error && !healthData) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-8 text-center max-w-lg mx-auto my-8">
        <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-rose-900 mb-1">Failed to Load Healthcare Data</h3>
        <p className="text-xs text-rose-700 mb-4">{error}</p>
        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Notice Pill */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded font-black bg-amber-200 text-amber-900 text-[10px]">
            DEMO DATA
          </span>
          <span>Sample values shown for UI testing. Actual validated hospital GIS points will replace these.</span>
        </div>
      </div>

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
        {healthData?.kpis?.map((kpi, idx) => (
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

      {/* Interactive Leaflet Map Component */}
      <section>
        <HealthcareMap
          facilities={healthData?.hospitalLocationsPlaceholder || []}
          title="Interactive GIS Hospital & Healthcare Facility Map"
          subtitle="Spatial clustering of secondary and tertiary care centres across Maharashtra. Powered by Leaflet."
        />
      </section>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReusableBarChart
            data={healthData?.bedAvailabilityByDivision || []}
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
            data={healthData?.facilityTypesDistribution || []}
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
            The healthcare facility location dataset is currently undergoing manual and automated geocoding verification (lat/long coordinate cross-checking against the Maharashtra Public Health Department and OpenStreetMap gazetteers). The map above demonstrates the interactive Leaflet rendering layer, ready to receive the finalized dataset.
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
