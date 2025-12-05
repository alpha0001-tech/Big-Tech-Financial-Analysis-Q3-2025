import { SimulationResult } from '../types';

/**
 * Box-Muller transform to generate standard normal distributed numbers
 */
function boxMullerTransform(): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0;
}

/**
 * Runs a Monte Carlo simulation for stock prices using Geometric Brownian Motion
 */
export const runMonteCarlo = (
  startPrice: number,
  mu: number,
  sigma: number,
  days: number = 252,
  simulations: number = 1000
): SimulationResult => {
  const dt = 1 / days;
  const pricePaths: number[][] = Array.from({ length: simulations }, () => {
    const path = new Array(days).fill(0);
    path[0] = startPrice;
    return path;
  });

  // Run simulations
  for (let s = 0; s < simulations; s++) {
    for (let t = 1; t < days; t++) {
      const drift = (mu - 0.5 * Math.pow(sigma, 2)) * dt;
      const shock = sigma * Math.sqrt(dt) * boxMullerTransform();
      pricePaths[s][t] = pricePaths[s][t - 1] * Math.exp(drift + shock);
    }
  }

  // Calculate aggregates (Mean, Upper 95%, Lower 5%)
  const meanPath: number[] = [];
  const upperPath: number[] = [];
  const lowerPath: number[] = [];

  for (let t = 0; t < days; t++) {
    const pricesAtT = pricePaths.map((path) => path[t]);
    pricesAtT.sort((a, b) => a - b);

    const sum = pricesAtT.reduce((acc, val) => acc + val, 0);
    meanPath.push(sum / simulations);
    
    // 5th and 95th percentiles
    lowerPath.push(pricesAtT[Math.floor(0.05 * simulations)]);
    upperPath.push(pricesAtT[Math.floor(0.95 * simulations)]);
  }

  return {
    mean: meanPath,
    upper: upperPath,
    lower: lowerPath,
    targetPrice: Number(meanPath[days - 1].toFixed(2)),
    days: Array.from({ length: days }, (_, i) => i),
  };
};
