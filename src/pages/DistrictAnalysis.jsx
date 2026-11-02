import { useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Award,
  CheckCircle2,
} from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import PercentageIndicator from '../components/common/PercentageIndicator';
import ReusableBarChart from '../components/charts/ReusableBarChart';
import { MAHARASHTRA_DISTRICTS, DISTRICT_COMPARISON_DATA } from '../data/placeholderData';

export default function DistrictAnalysis() {
  const [searchParams, setSearchParams] = useSearchParams();
  const districtParam = searchParams.get('id');

  const selectedDistrictId = districtParam || MAHARASHTRA_DISTRICTS[0].id;

  const currentDistrict =
    MAHARASHTRA_DISTRICTS.find((d) => d.id === selectedDistrictId) ||
    MAHARASHTRA_DISTRICTS[0];

  const currentComparison =
    DISTRICT_COMPARISON_DATA.find((d) => d.district.toLowerCase() === currentDistrict.name.toLowerCase()) || {
      education: 75,
      healthcare: 70,
      water: 72,
      composite: currentDistrict.compositeScore,
    };

  const handleDistrictChange = (id) => {
    setSearchParams({ id });
  };

  // Sorted districts for comparison ranking
  const sortedDistricts = [...MAHARASHTRA_DISTRICTS].sort(
    (a, b) => b.compositeScore - a.compositeScore
  );

  return (
    <div className="space-y-8">
      {/* Demo Notice */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-900">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded font-black bg-amber-200 text-amber-900 text-[10px]">
            DEMO DATA
          </span>
          <span>District scores and indicators are mock development placeholders. Final metrics will be computed by backend statistical analysis.</span>
        </div>
      </div>

      <SectionHeader
        badge="Spatial & District Benchmarking (Sample)"
        title="District Disparity & Composite Service Index"
        subtitle="Evaluating intra-state variations, tribal gap indicators, and cross-district service access."
        action={
          <div className="flex items-center gap-2">
            <label htmlFor="district-select" className="text-xs font-semibold text-slate-700">
              Select District:
            </label>
            <select
              id="district-select"
              value={selectedDistrictId}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {MAHARASHTRA_DISTRICTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.division})
                </option>
              ))}
            </select>
          </div>
        }
      />

      {/* Selected District Profile Spotlight */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                <MapPin className="w-3.5 h-3.5" />
                {currentDistrict.division} Division
              </span>
              <span className="text-xs text-slate-500">• {currentDistrict.type}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentDistrict.name} District
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Estimated Demographic Population: <strong>{currentDistrict.population}</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Composite Score
              </span>
              <span className="text-2xl font-black text-slate-900 font-mono">
                {currentDistrict.compositeScore}
              </span>
              <span className="text-xs text-slate-400"> / 100</span>
            </div>
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md ${
                currentDistrict.compositeScore >= 75
                  ? 'bg-emerald-600'
                  : currentDistrict.compositeScore >= 60
                  ? 'bg-amber-500'
                  : 'bg-rose-600'
              }`}
            >
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Sector Indicators for Selected District */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-900 uppercase">Education Index</span>
              <span className="text-sm font-bold text-indigo-700 font-mono">{currentComparison.education}%</span>
            </div>
            <PercentageIndicator
              label="UDISE+ Infrastructure Score"
              value={currentComparison.education}
              target="85%"
              status={currentComparison.education >= 80 ? 'good' : 'warning'}
            />
            <p className="text-[11px] text-slate-500 mt-2">
              Evaluates PTR compliance, school electrification, and digital classroom availability.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-900 uppercase">Healthcare Index</span>
              <span className="text-sm font-bold text-emerald-700 font-mono">{currentComparison.healthcare}%</span>
            </div>
            <PercentageIndicator
              label="Health Network Accessibility"
              value={currentComparison.healthcare}
              target="80%"
              status={currentComparison.healthcare >= 75 ? 'good' : 'warning'}
            />
            <p className="text-[11px] text-slate-500 mt-2">
              Reflects PHC coverage radius, emergency response buffer, and hospital bed ratio.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-900 uppercase">Drinking Water Index</span>
              <span className="text-sm font-bold text-sky-700 font-mono">{currentComparison.water}%</span>
            </div>
            <PercentageIndicator
              label="JJM Rural Tap Coverage"
              value={currentComparison.water}
              target="100%"
              status={currentComparison.water >= 80 ? 'good' : 'caution'}
            />
            <p className="text-[11px] text-slate-500 mt-2">
              Measures Functional Household Tap Connection (FHTC) saturation and testing labs.
            </p>
          </div>
        </div>
      </div>

      {/* District Composite Score Ranking Chart */}
      <ReusableBarChart
        data={sortedDistricts}
        xKey="name"
        bars={[{ key: 'compositeScore', name: 'Composite Score (0-100)', color: '#3b82f6' }]}
        height={340}
        title="District Composite Performance Ranking"
        subtitle="Comparative assessment of all monitored districts based on multi-sector weighted indicator synthesis"
        unit=" pts"
      />

      {/* Disparity Analysis Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">District Disparity Breakdown</h3>
            <p className="text-xs text-slate-500">
              Detailed comparative data highlighting regional gaps and developmental categories
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {MAHARASHTRA_DISTRICTS.length} Districts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] bg-slate-50/60">
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Division</th>
                <th className="py-2.5 px-3">Typology</th>
                <th className="py-2.5 px-3 text-right">Composite Score</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedDistricts.map((d, index) => {
                const isSelected = d.id === selectedDistrictId;
                return (
                  <tr
                    key={d.id}
                    onClick={() => handleDistrictChange(d.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/70 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 text-slate-400 font-mono">#{index + 1}</td>
                    <td className="py-2.5 px-3 text-slate-900 flex items-center gap-1.5">
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      <span>{d.name}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{d.division}</td>
                    <td className="py-2.5 px-3 text-slate-500">{d.type}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {d.compositeScore}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDistrictChange(d.id);
                        }}
                        className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
