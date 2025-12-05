import React from 'react';
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from 'recharts';
import { SimulationResult } from '../types';

interface ForecastChartProps {
  data: SimulationResult;
  companyName: string;
  color: string;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data, companyName, color }) => {
  // Transform data for Recharts
  const chartData = data.mean.map((mean, i) => ({
    day: i,
    mean: mean,
    range: [data.lower[i], data.upper[i]],
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
      <h4 className="font-bold text-lg mb-2" style={{ color: color }}>{companyName}</h4>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id={`colorRange-${companyName}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" hide />
            <YAxis 
                domain={['auto', 'auto']} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                width={40}
                tickFormatter={(val) => `${Math.round(val)}`}
            />
            <Tooltip
              labelFormatter={(label) => `Day ${label}`}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              formatter={(value: any, name: string) => {
                if (name === 'Confidence Interval') return [`$${Math.round(value[0])} - $${Math.round(value[1])}`, name];
                return [`$${Number(value).toFixed(2)}`, name];
              }}
            />
            <Area
              type="monotone"
              dataKey="range"
              stroke="none"
              fill={`url(#colorRange-${companyName})`}
              name="Confidence Interval"
            />
            <Line
              type="monotone"
              dataKey="mean"
              stroke={color}
              strokeWidth={2}
              dot={false}
              name="Mean Forecast"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-4 w-full bg-slate-50 p-2 rounded-lg">
        <div className="text-sm text-slate-500">12-Month Target (Mean)</div>
        <div className="text-xl font-bold text-slate-800">${data.targetPrice}</div>
        <div className="text-xs text-slate-400 mt-1">
          Range: ${Math.round(data.lower[data.lower.length - 1])} - ${Math.round(data.upper[data.upper.length - 1])}
        </div>
      </div>
    </div>
  );
};
