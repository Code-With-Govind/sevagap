import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function CustomBarTooltip({ active, payload, label, unit = '' }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xs p-3 rounded-lg shadow-lg border border-slate-200 text-xs">
        <p className="font-bold text-slate-800 mb-1.5">{label}</p>
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 py-0.5">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-semibold text-slate-900">
              {entry.value}
              {unit}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function ReusableBarChart({
  data,
  xKey = 'name',
  bars = [{ key: 'value', name: 'Value', color: '#3b82f6' }],
  layout = 'horizontal',
  height = 300,
  title,
  subtitle,
  unit = '',
}) {
  const isVertical = layout === 'vertical';

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-base font-bold text-slate-900">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      )}

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout={layout}
            margin={{ top: 10, right: 15, left: isVertical ? 20 : -15, bottom: isVertical ? 5 : 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={isVertical} horizontal={!isVertical} stroke="#f1f5f9" />
            {isVertical ? (
              <>
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey={xKey} type="category" stroke="#64748b" fontSize={11} tickLine={false} width={80} />
              </>
            ) : (
              <>
                <XAxis
                  dataKey={xKey}
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              </>
            )}
            <Tooltip content={<CustomBarTooltip unit={unit} />} />
            {bars.length > 1 && (
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
              />
            )}
            {bars.map((bar) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                name={bar.name || bar.key}
                fill={bar.color || '#3b82f6'}
                radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
