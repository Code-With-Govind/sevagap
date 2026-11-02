import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

function CustomPieTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-white/95 backdrop-blur-xs p-2.5 rounded-lg shadow-lg border border-slate-200 text-xs">
        <p className="font-semibold text-slate-800">{item.name}</p>
        <p className="text-blue-600 font-bold mt-0.5">
          {item.value.toLocaleString()} {typeof item.value === 'number' && item.value <= 100 ? '%' : ''}
        </p>
      </div>
    );
  }
  return null;
}

export default function ReusablePieChart({
  data,
  title,
  subtitle,
  innerRadius = 55,
  outerRadius = 85,
  height = 300,
  dataKey = 'value',
  nameKey = 'name',
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5">
      {(title || subtitle) && (
        <div className="mb-2">
          {title && <h3 className="text-base font-bold text-slate-900">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      )}

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="48%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={3}
              dataKey={dataKey}
              nameKey={nameKey}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
