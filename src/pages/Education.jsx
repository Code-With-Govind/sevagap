import { useState, useEffect } from 'react';
import {
  Users,
  Zap,
  Laptop,
  ExternalLink,
  School,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import SummaryCard from '../components/common/SummaryCard';
import PercentageIndicator from '../components/common/PercentageIndicator';
import ReusableBarChart from '../components/charts/ReusableBarChart';
import ReusablePieChart from '../components/charts/ReusablePieChart';
import { sevagapApi } from '../services/api';

export default function Education() {
  const [eduData, setEduData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await sevagapApi.getEducationData();
        if (!ignore) {
          setEduData(res.data);
          setError(null);
        }
      } catch (e) {
        if (!ignore) {
          console.error(e);
          setError('Unable to fetch education indicators from server. Displaying offline development data.');
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
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Loading Education Indicators...</p>
      </div>
    );
  }

  if (error && !eduData) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-8 text-center max-w-lg mx-auto my-8">
        <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-rose-900 mb-1">Failed to Load Education Data</h3>
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
      {/* Demo Data Notice */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded font-black bg-amber-200 text-amber-900 text-[10px]">
            DEMO DATA
          </span>
          <span>Sample values shown for UI testing. Verified UDISE+ district datasets will be ingested soon.</span>
        </div>
      </div>

      <SectionHeader
        badge="UDISE+ School Indicators (Sample)"
        title="School Education Infrastructure & Parity"
        subtitle="Analyzing pupil-teacher ratios, digital readiness, and foundational amenities across Maharashtra"
        action={
          <a
            href="https://udiseplus.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-blue-600 hover:text-blue-800 shadow-xs transition-colors"
          >
            <span>UDISE+ Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {eduData?.kpis?.map((kpi, idx) => (
          <SummaryCard
            key={idx}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            benchmark={`Goal: ${kpi.target}`}
            trend={kpi.status === 'good' ? 'up' : kpi.status === 'caution' ? 'down' : 'neutral'}
            sector="education"
            icon={idx === 0 ? Zap : idx === 1 ? School : idx === 2 ? Laptop : Users}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReusableBarChart
            data={eduData?.ptrByDivision || []}
            xKey="name"
            bars={[
              { key: 'ptr', name: 'Pupil-Teacher Ratio (PTR)', color: '#6366f1' },
              { key: 'digitalLabs', name: 'Digital Labs (%)', color: '#10b981' },
            ]}
            height={340}
            title="Administrative Division Comparison"
            subtitle="Comparing Pupil-Teacher Ratio against digital classroom penetration (Sample Extract)"
          />
        </div>

        <div>
          <ReusablePieChart
            data={eduData?.schoolTypesDistribution || []}
            title="School Management Typology"
            subtitle="Proportional split of school categories across Maharashtra"
            height={340}
          />
        </div>
      </div>

      {/* School Amenities & Infrastructure Readiness Grid */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Foundational School Amenities Coverage</h3>
            <p className="text-xs text-slate-500">
              Percentage of recognized schools equipped with essential physical facilities according to RTE standards
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
            DEMO DATA
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {eduData?.infrastructureReadiness?.map((item, idx) => (
            <div key={idx} className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200/70">
              <PercentageIndicator
                label={item.facility}
                value={item.coverage}
                target="100%"
                status={item.coverage >= 90 ? 'good' : item.coverage >= 75 ? 'warning' : 'caution'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
