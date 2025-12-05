import React from 'react';

interface MetricCardProps {
  title: string;
  subtitle: string;
  description: string;
  borderColor: string;
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  subtitle,
  description,
  borderColor,
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${borderColor} transition-transform hover:scale-105 duration-200`}>
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
      <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">{subtitle}</div>
      <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};
