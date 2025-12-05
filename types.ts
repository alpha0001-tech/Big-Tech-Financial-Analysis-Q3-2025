export interface CompanyFinancials {
  name: string;
  ticker: string;
  revenue: number;
  opIncome: number;
  netIncome: number;
  cashAndEquiv: number;
  opMargin: number;
  yoyGrowth: number;
  estSharePrice: number;
  volatility: number;
  color: string;
}

export interface SimulationResult {
  mean: number[];
  upper: number[];
  lower: number[];
  targetPrice: number;
  days: number[];
}

export interface ForecastData {
  company: string;
  simulation: SimulationResult;
  color: string;
}
