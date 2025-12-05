import React from 'react';
import { CompanyFinancials } from '../types';

interface MarginTableProps {
  data: CompanyFinancials[];
}

export const MarginTable: React.FC<MarginTableProps> = ({ data }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
      <table className="min-w-full text-left text-sm whitespace-nowrap bg-white">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th scope="col" className="px-6 py-4 font-semibold text-slate-700">Company</th>
            <th scope="col" className="px-6 py-4 font-semibold text-slate-700">Key Growth Driver</th>
            <th scope="col" className="px-6 py-4 font-semibold text-slate-700">Op Margin</th>
            <th scope="col" className="px-6 py-4 font-semibold text-slate-700">Liquidity (Cash+Securities)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((company) => (
            <tr key={company.ticker} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-bold" style={{ color: company.color }}>
                {company.name} <span className="text-slate-400 font-normal ml-1">({company.ticker})</span>
              </td>
              <td className="px-6 py-4 text-slate-600">
                {company.name === 'NVIDIA' && 'Blackwell Platform & Data Center'}
                {company.name === 'Alphabet' && 'Google Cloud & Search Resilience'}
                {company.name === 'Meta' && 'Ad Pricing Power & Impressions'}
              </td>
              <td className="px-6 py-4 text-slate-800 font-medium">
                {company.opMargin}%
              </td>
              <td className="px-6 py-4 text-slate-800">
                ${company.cashAndEquiv} Billion
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
