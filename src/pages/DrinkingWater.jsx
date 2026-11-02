import { useState, useEffect } from 'react';
import {
  Droplet,
  CheckCircle,
  FlaskConical,
  ShieldCheck,
  ExternalLink,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import SummaryCard from '../components/common/SummaryCard';
import ReusableBarChart from '../components/charts/ReusableBarChart';
import ReusablePieChart from '../components/charts/ReusablePieChart';
import PercentageIndicator from '../components/common/PercentageIndicator';
import { sevagapApi } from '../services/api';

export default function DrinkingWater() {
  const [waterData, setWaterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await sevagapApi.getDrinkingWaterData();
        if (!ignore) {
          setWaterData(res.data);
          setError(null);
        }
      } catch (e) {
        if (!ignore) {
          console.error(e);
          setError('Unable to fetch drinking water indicators from server. Displaying offline development data.');
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
        <div className="w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Loading Drinking Water Indicators...</p>
      </div>
    );
  }

  if (error && !waterData) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-8 text-center max-w-lg mx-auto my-8">
        <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-rose-900 mb-1">Failed to Load Drinking Water Data</h3>
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
          <span>Sample values shown for UI testing. Jal Jeevan Mission official district metrics will be synced soon.</span>
        </div>
      </div>

      <SectionHeader
        badge="Jal Jeevan Mission (JJM) Sample"
        title="Rural Drinking Water Supply & Saturation"
        subtitle="Tracking Functional Household Tap Connections (FHTC), water quality testing, and village saturation"
        action={
          <a
            href="https://ejalshakti.gov.in/jjmreport/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-sky-600 hover:text-sky-800 shadow-xs transition-colors"
          >
            <span>JJM Official Reports</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {waterData?.kpis?.map((kpi, idx) => (
          <SummaryCard
            key={idx}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            benchmark={kpi.target}
            trend={kpi.status === 'good' ? 'up' : 'neutral'}
            sector="water"
            icon={idx === 0 ? Droplet : idx === 1 ? CheckCircle : idx === 2 ? FlaskConical : ShieldCheck}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReusableBarChart
            data={waterData?.districtProgress || []}
            xKey="district"
            bars={[
              { key: 'progress', name: 'Tap Water Coverage (FHTC %)', color: '#0ea5e9' },
            ]}
            height={340}
            title="District-Wise Tap Connection Coverage (%)"
            subtitle="Comparing rural household tap water penetration against 100% saturation goal"
            unit="%"
          />
        </div>

        <div>
          <ReusablePieChart
            data={waterData?.waterSupplySourceBreakdown || []}
            title="Rural Water Supply Infrastructure"
            subtitle="Distribution of piped schemes, borewells, and surface water supplies"
            height={340}
          />
        </div>
      </div>

      {/* District Coverage Quick Inspection */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">District Tap Connection Progress Indicators</h3>
            <p className="text-xs text-slate-500">
              Household tap saturation status for monitored Maharashtra districts
            </p>
          </div>
          <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
            Target: 100% Har Ghar Jal
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {waterData?.districtProgress?.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">{item.district}</span>
                <span
                  className={`text-[11px] font-bold ${
                    item.progress >= 85
                      ? 'text-emerald-700'
                      : item.progress >= 70
                      ? 'text-amber-700'
                      : 'text-rose-700'
                  }`}
                >
                  {item.progress}%
                </span>
              </div>
              <PercentageIndicator
                value={item.progress}
                target="100%"
                status={item.progress >= 85 ? 'good' : item.progress >= 70 ? 'warning' : 'caution'}
                showLabel={false}
                height="h-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
