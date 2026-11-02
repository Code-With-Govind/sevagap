import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Activity,
  Droplet,
  ArrowRight,
  ShieldAlert,
  Search,
  BarChart2,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import SummaryCard from '../components/common/SummaryCard';
import SectionHeader from '../components/common/SectionHeader';
import DistrictComparisonChart from '../components/charts/DistrictComparisonChart';
import { sevagapApi } from '../services/api';
import { MAHARASHTRA_DISTRICTS } from '../data/placeholderData';

export default function Home() {
  const [stats, setStats] = useState([]);
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchDistrict, setSearchDistrict] = useState('');
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const [statsRes, compRes] = await Promise.all([
          sevagapApi.getOverviewStats(),
          sevagapApi.getDistrictComparisons(),
        ]);
        if (!ignore) {
          setStats(statsRes.data);
          setComparisons(compRes.data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Failed to load overview data', err);
          setError('Unable to reach backend API. Displaying verified development placeholders.');
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

  const filteredDistricts = MAHARASHTRA_DISTRICTS.filter((d) =>
    d.name.toLowerCase().includes(searchDistrict.toLowerCase()) ||
    d.division.toLowerCase().includes(searchDistrict.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Prominent Demo Data Watermark Banner */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-black bg-amber-200 text-amber-900 tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-amber-900" />
            DEMO DATA / PLACEHOLDER
          </span>
          <p className="text-xs text-amber-900 font-medium">
            All metrics shown below are developmental sample placeholders. Final verified findings will be published upon dataset validation.
          </p>
        </div>
        <span className="text-[11px] font-mono font-semibold text-amber-800 shrink-0">
          State: Initial Pipeline
        </span>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            Empirical Spatial Analytics
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Maharashtra Public Service Infrastructure & Regional Equity Index
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            SevaGap bridges administrative data silos across School Education (UDISE+), Healthcare Facilities, and Rural Drinking Water (JJM) to assess district-wise infrastructure parity.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/district-analysis"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <span>Explore District Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg border border-white/20 backdrop-blur-xs transition-all"
            >
              <span>Methodology & Sources</span>
            </Link>
          </div>
        </div>

        {/* Informative Status Banner in Hero */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Analytical Phase: Data cleaning & GIS hospital coordinate validation in progress.</span>
          </div>
          <span className="font-mono text-slate-400">Status: Illustrative Frontend Architecture</span>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-8 text-slate-500 text-xs gap-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span>Syncing indicators with Express REST API...</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={handleRetry} className="inline-flex items-center gap-1 font-bold underline">
            <RefreshCw className="w-3 h-3" /> Retry
          </button>
        </div>
      )}

      {/* Overview KPI Cards */}
      <section>
        <SectionHeader
          badge="High-Level State Metrics (Sample)"
          title="Core Infrastructure Indicators"
          subtitle="Key performance benchmarks across primary public services in Maharashtra"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const getIcon = () => {
              if (stat.sector === 'water') return Droplet;
              if (stat.sector === 'education') return GraduationCap;
              if (stat.sector === 'healthcare') return Activity;
              return BarChart2;
            };

            return (
              <SummaryCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                trend={stat.trend}
                benchmark={stat.benchmark}
                icon={getIcon()}
                sector={stat.sector}
                description={stat.description}
              />
            );
          })}
        </div>
      </section>

      {/* Multi-Sector Comparison Visualisation */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DistrictComparisonChart
            data={comparisons}
            height={380}
            title="Cross-Sector District Parity Comparison"
            subtitle="Normalized 0–100 scores across Education, Healthcare, and Drinking Water (Demo Data)"
          />
        </div>

        {/* Sector Quick-Nav Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider text-xs text-slate-400">
              Sector Dashboards
            </h3>

            <div className="space-y-3">
              <Link
                to="/education"
                className="group flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
              >
                <div className="p-2 rounded-md bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1">
                    Education Analytics
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    UDISE+ PTR, school electrification, digital labs & sanitation.
                  </p>
                </div>
              </Link>

              <Link
                to="/healthcare"
                className="group flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all"
              >
                <div className="p-2 rounded-md bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 flex items-center gap-1">
                    Healthcare & Leaflet GIS Map
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    PHC catchments, bed availability & interactive hospital mapping.
                  </p>
                </div>
              </Link>

              <Link
                to="/drinking-water"
                className="group flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50/30 transition-all"
              >
                <div className="p-2 rounded-md bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 flex items-center gap-1">
                    Drinking Water (JJM)
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Jal Jeevan Mission household tap connections & water lab testing.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Data Note */}
          <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-4 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Developer Notice</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Charts display placeholder metrics to validate the UI architecture. Actual values will populate once user data cleaning and GIS analysis finishes.
            </p>
          </div>
        </div>
      </section>

      {/* District Quick Explorer */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">District Index Overview</h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                DEMO DATA
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Composite service index rankings across sample Maharashtra districts
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search district or division..."
              value={searchDistrict}
              onChange={(e) => setSearchDistrict(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Division</th>
                <th className="py-2.5 px-3">Regional Classification</th>
                <th className="py-2.5 px-3">Population</th>
                <th className="py-2.5 px-3 text-right">Composite Score</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDistricts.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    <Link
                      to={`/district-analysis?id=${d.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {d.name}
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{d.division}</td>
                  <td className="py-2.5 px-3 text-slate-500">{d.type}</td>
                  <td className="py-2.5 px-3 text-slate-600">{d.population}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                    {d.compositeScore}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        d.compositeScore >= 75
                          ? 'bg-emerald-100 text-emerald-800'
                          : d.compositeScore >= 60
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {d.compositeScore >= 75
                        ? 'Leading'
                        : d.compositeScore >= 60
                        ? 'Moderate'
                        : 'Lagging Gap'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
