import { useState, useEffect } from 'react';
import {
  Users,
  Zap,
  Laptop,
  ExternalLink,
  School,
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

  useEffect(() => {
    async function load() {
      try {
        const res = await sevagapApi.getEducationData();
        setEduData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !eduData) {
    return <div className="p-12 text-center text-slate-500 text-sm">Loading Education Indicators...</div>;
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        badge="UDISE+ School Indicators"
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
        {eduData.kpis.map((kpi, idx) => (
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
            data={eduData.ptrByDivision}
            xKey="name"
            bars={[
              { key: 'ptr', name: 'Pupil-Teacher Ratio (PTR)', color: '#6366f1' },
              { key: 'digitalLabs', name: 'Digital Labs (%)', color: '#10b981' },
            ]}
            height={340}
            title="Administrative Division Comparison"
            subtitle="Comparing Pupil-Teacher Ratio against digital classroom penetration"
          />
        </div>

        <div>
          <ReusablePieChart
            data={eduData.schoolTypesDistribution}
            title="School Management Typology"
            subtitle="Proportional split of school categories across Maharashtra"
            height={340}
          />
        </div>
      </div>

      {/* School Amenities & Infrastructure Readiness Grid */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6">
        <div className="mb-6">
          <h3 className="text-base font-bold text-slate-900">Foundational School Amenities Coverage</h3>
          <p className="text-xs text-slate-500">
            Percentage of recognized schools equipped with essential physical facilities according to RTE standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {eduData.infrastructureReadiness.map((item, idx) => (
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
