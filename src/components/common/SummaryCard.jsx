import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function SummaryCard({
  title,
  value,
  change,
  trend = 'neutral',
  benchmark,
  icon: Icon,
  sector = 'default',
  description,
  isPlaceholder = true,
  onClick,
}) {
  const sectorStyles = {
    water: 'border-l-sky-500 text-sky-600 bg-sky-50',
    education: 'border-l-indigo-500 text-indigo-600 bg-indigo-50',
    healthcare: 'border-l-emerald-500 text-emerald-600 bg-emerald-50',
    all: 'border-l-blue-600 text-blue-600 bg-blue-50',
    default: 'border-l-slate-400 text-slate-600 bg-slate-50',
  };

  const trendIcon = {
    up: <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />,
    down: <TrendingDown className="w-3.5 h-3.5 text-rose-600" />,
    neutral: <Minus className="w-3.5 h-3.5 text-slate-500" />,
  };

  const trendColor = {
    up: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    down: 'text-rose-700 bg-rose-50 border-rose-200',
    neutral: 'text-slate-700 bg-slate-100 border-slate-200',
  };

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 p-5 border-l-4 ${
        sectorStyles[sector] || sectorStyles.default
      } ${onClick ? 'cursor-pointer hover:border-slate-300' : ''}`}
    >
      {/* Visual Demo/Placeholder Tag */}
      {isPlaceholder && (
        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider uppercase bg-amber-100 text-amber-800 border border-amber-200">
          Demo
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 pr-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
          </div>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg shrink-0 ${sectorStyles[sector] || sectorStyles.default}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        {change && (
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium border ${
              trendColor[trend] || trendColor.neutral
            }`}
          >
            {trendIcon[trend]}
            {change}
          </span>
        )}
        {benchmark && <span className="text-slate-700 font-medium">{benchmark}</span>}
      </div>

      {description && (
        <p className="mt-2 text-xs text-slate-700 line-clamp-2 leading-relaxed border-t border-slate-100 pt-2">
          {description}
        </p>
      )}
    </div>
  );
}
