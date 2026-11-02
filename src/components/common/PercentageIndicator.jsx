export default function PercentageIndicator({
  label,
  value,
  max = 100,
  unit = '%',
  target,
  status = 'default',
  showLabel = true,
  height = 'h-2.5',
}) {
  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;
  const percentage = Math.min(Math.max((numericValue / max) * 100, 0), 100);

  // Status-based colors
  const getColor = () => {
    if (status === 'good' || percentage >= 80) return { bar: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' };
    if (status === 'warning' || (percentage >= 60 && percentage < 80)) return { bar: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' };
    if (status === 'caution' || percentage < 60) return { bar: 'bg-rose-500', text: 'text-rose-700', bg: 'bg-rose-50' };
    return { bar: 'bg-blue-600', text: 'text-blue-700', bg: 'bg-blue-50' };
  };

  const colors = getColor();

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
          <span className="truncate pr-2">{label}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`font-semibold ${colors.text}`}>
              {numericValue}
              {unit}
            </span>
            {target && <span className="text-slate-400 text-[11px]">(Goal: {target})</span>}
          </div>
        </div>
      )}

      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height} relative`}>
        <div
          className={`${colors.bar} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
        {target && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-slate-700/60 z-10"
            title={`Benchmark: ${target}`}
            style={{ left: `${(parseFloat(target) / max) * 100}%` }}
          />
        )}
      </div>
    </div>
  );
}
