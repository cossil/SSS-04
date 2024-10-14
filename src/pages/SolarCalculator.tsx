import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

const SolarCalculator: React.FC = () => {
  const [systemSize, setSystemSize] = useState(5);
  const [systemEfficiency, setSystemEfficiency] = useState(80);
  const [generationHours, setGenerationHours] = useState(5);
  const [systemCost, setSystemCost] = useState(15000);
  const [electricityRate, setElectricityRate] = useState(0.12);
  const [monthlyBill, setMonthlyBill] = useState(150);
  const [years, setYears] = useState(25);

  const [calculationResults, setCalculationResults] = useState<any[]>([]);

  useEffect(() => {
    calculateSavings();
  }, [systemSize, systemEfficiency, generationHours, systemCost, electricityRate, monthlyBill, years]);

  const calculateSavings = () => {
    const dailyGeneration = systemSize * (systemEfficiency / 100) * generationHours;
    const annualGeneration = dailyGeneration * 365;
    const annualSavings = annualGeneration * electricityRate;
    const annualCostWithoutSolar = monthlyBill * 12;

    let results = [];
    let cumulativeSavings = 0;
    let cumulativeCostWithoutSolar = 0;

    for (let year = 0; year <= years; year++) {
      cumulativeSavings += year === 0 ? 0 : annualSavings;
      cumulativeCostWithoutSolar += year === 0 ? 0 : annualCostWithoutSolar;

      const costWithSolar = year === 0 ? systemCost : systemCost + (annualCostWithoutSolar - annualSavings) * year;
      const costWithoutSolar = cumulativeCostWithoutSolar;

      results.push({
        year,
        annualGeneration: Math.round(annualGeneration),
        annualSavings: Math.round(annualSavings),
        cumulativeSavings: Math.round(cumulativeSavings),
        costWithSolar: Math.round(costWithSolar),
        costWithoutSolar: Math.round(costWithoutSolar),
      });
    }

    setCalculationResults(results);
  };

  const totalSavings = calculationResults[calculationResults.length - 1]?.cumulativeSavings || 0;
  const roiYear = calculationResults.findIndex(result => result.costWithoutSolar > result.costWithSolar);

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Solar Savings Calculator</h1>
          <p className="text-xl">Estimate your potential savings with solar energy</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Size (kW)
                </label>
                <input
                  type="number"
                  value={systemSize}
                  onChange={(e) => setSystemSize(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Efficiency (%)
                </label>
                <input
                  type="number"
                  value={systemEfficiency}
                  onChange={(e) => setSystemEfficiency(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Generation Hours per Day
                </label>
                <input
                  type="number"
                  value={generationHours}
                  onChange={(e) => setGenerationHours(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Cost ($)
                </label>
                <input
                  type="number"
                  value={systemCost}
                  onChange={(e) => setSystemCost(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Electricity Rate ($/kWh)
                </label>
                <input
                  type="number"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Monthly Electricity Bill ($)
                </label>
                <input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years to Calculate
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <div className="flex flex-col items-center mb-4">
                <DollarSign className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="text-xl font-semibold text-center">Total Savings</h3>
              </div>
              <p className="text-3xl font-bold text-green-600 text-center">${totalSavings.toLocaleString()}</p>
              <p className="text-gray-600 text-center">Over {years} years</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <div className="flex flex-col items-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="text-xl font-semibold text-center">ROI Achieved</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600 text-center">{roiYear} years</p>
              <p className="text-gray-600 text-center">Time to break even</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
              <div className="flex flex-col items-center mb-4">
                <Calendar className="w-8 h-8 text-yellow-500 mb-2" />
                <h3 className="text-xl font-semibold text-center">Annual Savings</h3>
              </div>
              <p className="text-3xl font-bold text-yellow-600 text-center">${Math.round(totalSavings / years).toLocaleString()}</p>
              <p className="text-gray-600 text-center">Average per year</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">ROI Graph</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={calculationResults}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                <YAxis yAxisId="left" label={{ value: 'Cumulative Cost ($)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line yAxisId="left" type="monotone" dataKey="costWithSolar" name="Cost with Solar" stroke="#8884d8" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="costWithoutSolar" name="Cost without Solar" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Savings Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Year</th>
                    <th className="p-2">Annual Generation (kWh)</th>
                    <th className="p-2">Annual Savings ($)</th>
                    <th className="p-2">Cumulative Savings ($)</th>
                    <th className="p-2">Cost with Solar ($)</th>
                    <th className="p-2">Cost without Solar ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {calculationResults.map((result) => (
                    <tr key={result.year} className="border-b">
                      <td className="p-2">{result.year}</td>
                      <td className="p-2">{result.annualGeneration.toLocaleString()}</td>
                      <td className="p-2">{result.annualSavings.toLocaleString()}</td>
                      <td className="p-2">{result.cumulativeSavings.toLocaleString()}</td>
                      <td className="p-2">{result.costWithSolar.toLocaleString()}</td>
                      <td className="p-2">{result.costWithoutSolar.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolarCalculator;