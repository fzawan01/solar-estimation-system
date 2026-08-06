import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface SolarEstimation {
  systemSize: string;
  systemType: string;
  installationCost: string;
  installationTime: string;
  annualEnergy: string;
  monthlySavings: string;
  annualSavings: string;
  paybackPeriod: string;
  roi: string;
  withoutSolar: number;
  withSolar: number;
  recommendations: string[];
  monthlyGeneration?: string;
  co2Offset?: string;
  panels?: string;
  inverter?: string;
  batteryBackup?: string;
  warranty?: string;
}

interface EstimationResultProps {
  estimation: SolarEstimation | null;
  onBack: () => void;
  onReset: () => void;
}

export default function EstimationResult({
  estimation,
  onReset,
}: EstimationResultProps) {
  if (!estimation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl p-8 shadow-lg">
          <p className="text-xl text-gray-600">No estimation data available.</p>
          <button
            onClick={onReset}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Prepare data for the chart - 25 year savings projection
  const chartData = Array.from({ length: 26 }, (_, i) => {
    const year = i;
    const withoutSolar = estimation.withoutSolar * (year + 1);
    const withSolar = estimation.withSolar * (year + 1);
    return {
      year: `Year ${year}`,
      'Without Solar': Math.round(withoutSolar),
      'With Solar': Math.round(withSolar),
    };
  });

  // Format currency
  const formatCurrency = (value: number | string) => {
    if (typeof value === 'string') {
      return value;
    }
    return `PKR ${value.toLocaleString()}`;
  };

  // Custom tooltip formatter
  const tooltipFormatter = (value: any) => {
    if (typeof value === 'number') {
      return [`PKR ${value.toLocaleString()}`, ''];
    }
    return [String(value), ''];
  };

  // Calculate total savings over 25 years
  const totalSavings = (estimation.withoutSolar - estimation.withSolar) * 25;

  return (
    <div>
      {/* Header */}
    <div>
        <h2 className="text-6xl mr-150 text-left pt-25 font-bold text-black drop-shadow-lg mb-2 ">
          Your Solar Estimate is Ready!
        </h2>

        <p className="text-black/90 text-lg drop-shadow-md">
          Here's your personalized solar solution.
        </p>
      </div>

      {/* Key Metrics Cards - 4 columns matching the image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 pt-5">
        {/* System Size */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-1 border-black p-5 text-center hover:shadow-xl transition-shadow">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">System Size</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{estimation.systemSize}</p>
          <p className="text-gray-500 text-xs mt-1">Ideal for your property</p>
        </div>

        {/* Est. Monthly Generation */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-1 border-black p-5 text-center hover:shadow-xl transition-shadow">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Est. Monthly Generation</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{estimation.monthlyGeneration || '850 kWh'}</p>
          <p className="text-gray-500 text-xs mt-1">Clean energy for your home</p>
        </div>

        {/* Est. Savings */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-1 border-black p-5 text-center hover:shadow-xl transition-shadow">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Est. Savings</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">{estimation.monthlySavings}</p>
          <p className="text-gray-500 text-xs mt-1">on electricity bills</p>
        </div>

        {/* CO₂ Offset */}
        <div className="bg-white/95 backdrop-blur-sm gap-30 rounded-2xl shadow-lg border-1 border-black p-5 text-center hover:shadow-xl transition-shadow">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">CO₂ Offset</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">{estimation.co2Offset || '5.2 tons / year'}</p>
          <p className="text-gray-500 text-xs mt-1">Better for the planet</p>
        </div>
      </div>

      {/* Savings Over 25 Years Section */}
      <div className="flex flex-col sm:flex-row gap-10 " >
        <div className="bg-white/95 w-full lg:w-[800px] backdrop-blur-sm rounded-3xl shadow-lg border-1 border-black p-6 mb-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-2 text-center">
            Your Savings Over 25 Years
            </h3>
            <p className="text-center text-gray-500 text-sm mb-6">Total Savings</p>
            
            <div className="w-full h-[220px] sm:h-[280px] lg:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 10 }}
                    interval={4}
                />
                <YAxis 
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    tick={{ fontSize: 10 }}
                />
                <Tooltip 
                    formatter={tooltipFormatter}
                    labelFormatter={(label) => label}
                />
                <Legend />
                <Line 
                    type="monotone" 
                    dataKey="Without Solar" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={false}
                />
                <Line 
                    type="monotone" 
                    dataKey="With Solar" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={false}
                />
                </LineChart>
            </ResponsiveContainer>
            </div>

            {/* Savings Summary */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4 pt-4 border-1 border-black">
            <div className="text-center">
                <p className="text-3xl font-bold text-green-600">PKR {(totalSavings / 1000).toFixed(0)}k</p>
                <p className="text-sm text-gray-500">Total Savings</p>
            </div>
            <div className="flex gap-8">
                <div className="text-center">
                <p className="text-lg font-semibold text-red-500">PKR {(estimation.withoutSolar * 25 / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500">Without Solar</p>
                </div>
                <div className="text-center">
                <p className="text-lg font-semibold text-green-500">PKR {(estimation.withSolar * 25 / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500">With Solar</p>
                </div>
            </div>
            </div>
        </div>
        

        {/* System Overview - Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-1 md:w-125 h-90 gap-6 mb-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border-1 border-black p-6">
            <h4 className="text-xl font-bold text-blue-800 mb-4">System Overview</h4>
            <div className="space-y-3 pt-5">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-600">Recommended System</span>
                <span className="font-medium text-blue-600">Premium Performance</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-600">Panels</span>
                <span className="font-medium text-gray-800">{estimation.panels || '14 x 445W'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-600">Inverter</span>
                <span className="font-medium text-gray-800">{estimation.inverter || '6 kW'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-600">Battery Backup</span>
                <span className="font-medium text-gray-800">{estimation.batteryBackup || 'Optional'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-600">Warranty</span>
                <span className="font-medium text-gray-800">{estimation.warranty || '25 Years Performance'}</span>
                </div>
                <div className="flex justify-between items-center">
                <span className="text-gray-600">Installation Time</span>
                <span className="font-medium text-gray-800">{estimation.installationTime || '2 – 3 Weeks'}</span>
                </div>
            </div>
            </div>
        </div>
      </div>

        {/* Recommendations (hidden by default, shown if needed) */}
      {estimation.recommendations && estimation.recommendations.length > 0 && (
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border-1 border-black p-6 mb-8 w-full max-w-6xl mx-auto">
          <h3 className="text-xl font-bold text-blue-800 mb-4">💡 Recommendations</h3>
          <div className="space-y-3">
            {estimation.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-600 font-bold mt-0.5">{index + 1}.</span>
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    <div className="flex justify-center gap-6 pb-5">
    <button
        onClick={() => window.print()}
        className="w-48 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
    >
        Download Report
    </button>

    <button
        onClick={onReset}
        className="w-48 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
    >
        🔄 Start New Estimate
    </button>
    </div>

    </div>
  );
}