import React, { useMemo } from 'react';
import { FINANCIAL_DATA } from './constants';
import { runMonteCarlo } from './services/simulationService';
import { MetricCard } from './components/MetricCard';
import { RevenueChart } from './components/RevenueChart';
import { ForecastChart } from './components/ForecastChart';
import { MarginTable } from './components/MarginTable';
import { ForecastData } from './types';

const App: React.FC = () => {
  const companyData = Object.values(FINANCIAL_DATA);

  // Memoize simulation results to prevent re-running on every render
  const forecasts: ForecastData[] = useMemo(() => {
    return companyData.map((company) => {
      // Conservative drift estimate: 50% of current YoY growth converted to decimal
      const drift = (company.yoyGrowth / 100) * 0.5;
      const simulation = runMonteCarlo(company.estSharePrice, drift, company.volatility);
      return {
        company: company.name,
        simulation,
        color: company.color,
      };
    });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Big Tech Financials <span className="text-slate-400 font-light">| Q3 2025</span></h1>
          </div>
          <button 
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            onClick={() => window.print()}
          >
            Export Report
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Executive Summary Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">1. Executive Summary</h2>
          <p className="text-slate-600 mb-8 max-w-4xl leading-relaxed">
            The late 2025 fiscal landscape is defined by the <strong>Artificial Intelligence infrastructure build-out</strong>. 
            <span className="text-green-600 font-semibold"> NVIDIA</span> remains the primary beneficiary with 62% growth. 
            <span className="text-purple-600 font-semibold"> Meta</span> and <span className="text-blue-600 font-semibold">Alphabet</span> are 
            demonstrating resilience in core advertising while heavily increasing CAPEX.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
              title="NVIDIA"
              subtitle="The Growth Engine"
              description="Dominating with 63% Operating Margins driven by massive Data Center demand and the Blackwell platform."
              borderColor="border-green-600"
            />
            <MetricCard 
              title="Alphabet"
              subtitle="The Cash Fortress"
              description="Holding $95.3B in liquidity while growing Cloud revenue by 28%, proving diversification success."
              borderColor="border-blue-600"
            />
            <MetricCard 
              title="Meta"
              subtitle="Efficiency vs. Investment"
              description="26% Revenue Growth offset by Reality Labs investment. Core ad pricing power remains very strong."
              borderColor="border-purple-600"
            />
          </div>
        </section>

        {/* Charts & Graphs Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <RevenueChart data={companyData} />
            </div>
            <div className="lg:col-span-1">
                {/* Operating Margin Visualization via Simple Bar */}
                <div className="bg-white p-6 rounded-xl shadow-sm h-full">
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">Operating Margin Comparison</h3>
                    <div className="space-y-6">
                        {companyData.map(c => (
                            <div key={c.name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-slate-700">{c.name}</span>
                                    <span className="font-bold text-slate-900">{c.opMargin}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5">
                                    <div 
                                        className="h-2.5 rounded-full" 
                                        style={{ width: `${c.opMargin}%`, backgroundColor: c.color }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-8">
                        *Meta's Net Income was impacted by a $15.9B one-time tax charge, though Operating Margin remains robust at 40%.
                    </p>
                </div>
            </div>
          </div>
        </section>

        {/* Forecasting Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            2. Algorithmic Price Forecasting 
            <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded">12-Month Horizon</span>
          </h2>
          <p className="text-slate-600 mb-6">
            Utilizing a <strong>Monte Carlo Simulation</strong> (Geometric Brownian Motion) with 1,000 iterations per asset. 
            Drift is derived from 50% of current revenue growth momentum.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {forecasts.map((item) => (
              <ForecastChart 
                key={item.company}
                data={item.simulation}
                companyName={item.company}
                color={item.color}
              />
            ))}
          </div>
        </section>

        {/* Deep Dive Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">3. Strategic Deep Dive</h2>
          <MarginTable data={companyData} />
        </section>

      </main>

      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200 mt-12 text-center">
        <p className="text-xs text-slate-400">
            Disclaimer: This report is for informational purposes only. Price forecasts are simulated based on historical volatility 
            and reported growth rates (Oct 2025 / Sep 2025 / Mar 2025 filings) and do not constitute financial advice.
        </p>
        <p className="text-xs text-slate-400 mt-2">Generated by Financial Analysis Module v2.1</p>
      </footer>
    </div>
  );
};

export default App;
