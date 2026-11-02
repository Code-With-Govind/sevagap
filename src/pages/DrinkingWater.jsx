import { useState, useEffect } from 'react';
import {
  Droplet,
  CheckCircle,
  FlaskConical,
  ShieldCheck,
  ExternalLink,
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

  useEffect(() => {
    async function load() {
      try {
        const res = await sevagapApi.getDrinkingWaterData();
        setWaterData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !waterData) {
    return <div className="p-12 text-center text-slate-500 text-sm">Loading Drinking Water Indicators...</div>;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        badge="Jal Jeevan Mission (JJM)"
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
        {waterData.kpis.map((kpi, idx) => (
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
            data={waterData.districtProgress}
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
            data={waterData.waterSupplySourceBreakdown}
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
          {waterData.districtProgress.map((item, idx) => (
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
