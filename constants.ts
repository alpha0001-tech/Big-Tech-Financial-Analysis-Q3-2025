import { CompanyFinancials } from './types';

export const FINANCIAL_DATA: Record<string, CompanyFinancials> = {
  NVIDIA: {
    name: 'NVIDIA',
    ticker: 'NVDA',
    revenue: 57.0,
    opIncome: 36.0,
    netIncome: 31.9,
    cashAndEquiv: 60.6,
    opMargin: 63.1,
    yoyGrowth: 62.0,
    estSharePrice: 183.68,
    volatility: 0.45,
    color: '#16a34a', // Green-600
  },
  Alphabet: {
    name: 'Alphabet',
    ticker: 'GOOGL',
    revenue: 90.2,
    opIncome: 30.6,
    netIncome: 34.5,
    cashAndEquiv: 95.3,
    opMargin: 34.0,
    yoyGrowth: 12.0,
    estSharePrice: 168.00,
    volatility: 0.25,
    color: '#2563eb', // Blue-600
  },
  Meta: {
    name: 'Meta',
    ticker: 'META',
    revenue: 51.2,
    opIncome: 20.5,
    netIncome: 2.7,
    cashAndEquiv: 44.5,
    opMargin: 40.0,
    yoyGrowth: 26.0,
    estSharePrice: 756.00,
    volatility: 0.35,
    color: '#9333ea', // Purple-600
  },
};
