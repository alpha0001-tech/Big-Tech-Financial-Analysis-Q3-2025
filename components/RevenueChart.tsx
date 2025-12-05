import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CompanyFinancials } from '../types';

interface RevenueChartProps {
  data: CompanyFinancials[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Revenue ($B) vs. YoY Growth (%)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" scale="band" padding={{ left: 20, right: 20 }} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" orientation="left" stroke="#64748b" tickFormatter={(val) => `$${val}B`} axisLine={false} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" stroke="#ef4444" tickFormatter={(val) => `${val}%`} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            formatter={(value: number, name: string) => [
                name === 'Revenue' ? `$${value}B` : `${value}%`, 
                name
            ]}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar yAxisId="left" dataKey="revenue" name="Revenue" barSize={60} radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="yoyGrowth"
            name="YoY Growth"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 6, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
