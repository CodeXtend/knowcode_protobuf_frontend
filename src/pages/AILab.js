import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Add these imports
import {
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import {
  Brain,
  Sprout,
  Map,
  Ruler,
  Wheat,
  Droplet,
  Loader,
  BrainCircuit,
  TrendingUp,
  DollarSign,
  Recycle
} from 'lucide-react';

const AILab = () => {
  const [formData, setFormData] = useState({
    location: '',
    land_area: '',
    soil_condition: '',
    crop_type: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const soilConditions = [
    'Sandy',
    'Clay',
    'Loamy'
  ];

  const cropTypes = [
    "Rice",
    "Wheat",
    "Maize",
    "Sorghum",
    "Pearl Millet",
    "Finger Millet",
    "Chickpeas",
    "Pigeon Peas",
    "Lentils",
    "Black Gram",
    "Green Gram",
    "Groundnut",
    "Rapeseed",
    "Mustard",
    "Soybean",
    "Sunflower",
    "Sesame",
    "Sugarcane",
    "Cotton",
    "Jute",
    "Tobacco",
    "Tea",
    "Coffee",
    "Rubber",
    "Coconut",
    "Arecanut",
    "Mango",
    "Banana",
    "Apple",
    "Grapes",
    "Orange",
    "Pineapple",
    "Guava",
    "Papaya",
    "Litchi",
    "Pomegranate",
    "Potato",
    "Tomato",
    "Onion",
    "Brinjal",
    "Okra",
    "Cabbage",
    "Cauliflower",
    "Carrot",
    "Peas",
    "Spinach",
    "Chillies",
    "Turmeric",
    "Ginger",
    "Garlic",
    "Cardamom",
    "Black Pepper",
    "Coriander",
    "Cumin",
    "Fenugreek",
    "Rose",
    "Marigold",
    "Jasmine",
    "Chrysanthemum",
    "Gladiolus"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://knowcode-protobuf-ml-lmds.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: formData.location,
          land_area: parseFloat(formData.land_area),
          soil_condition: formData.soil_condition.toLowerCase(),
          crop_type: formData.crop_type.toLowerCase(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch predictions');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to get predictions. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center p-2 rounded-xl bg-green-100 mb-3">
            <BrainCircuit className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            AI Agricultural Assistant
          </h1>
          <p className="text-base md:text-lg text-green-700/80 max-w-2xl mx-auto">
            Get personalized recommendations for agricultural waste management
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Form Card */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-24 h-fit"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <Map className="w-4 h-4 mr-2 text-green-600" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="Enter your location"
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <Ruler className="w-4 h-4 mr-2 text-green-600" />
                    Land Area (in acres)
                  </label>
                  <input
                    type="number"
                    value={formData.land_area}
                    onChange={(e) => setFormData({...formData, land_area: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                    placeholder="Enter land area"
                  />
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <Droplet className="w-4 h-4 mr-2 text-green-600" />
                    Soil Condition
                  </label>
                  <select
                    value={formData.soil_condition}
                    onChange={(e) => setFormData({...formData, soil_condition: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  >
                    <option value="">Select soil condition</option>
                    {soilConditions.map((condition) => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <Wheat className="w-4 h-4 mr-2 text-green-600" />
                    Crop Type
                  </label>
                  <select
                    value={formData.crop_type}
                    onChange={(e) => setFormData({...formData, crop_type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  >
                    <option value="">Select crop type</option>
                    {cropTypes.map((crop) => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    <span>Generate Recommendations</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Results Card */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-8 border border-green-100 shadow-xl"
          >
            {result ? (
              <div className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-green-50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-medium text-green-800">Yield</p>
                    </div>
                    <p className="text-xl font-bold text-green-700">{result.predicted_yield} tons</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-amber-50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Recycle className="w-4 h-4 text-amber-600" />
                      <p className="text-sm font-medium text-amber-800">Waste</p>
                    </div>
                    <p className="text-xl font-bold text-amber-700">{result.predicted_waste} tons</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-blue-50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-800">Profit</p>
                    </div>
                    <p className="text-xl font-bold text-blue-700">₹{result.total_profit}</p>
                  </motion.div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {/* Profit Distribution */}
                  <div className="bg-white/80 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Profit Distribution</h4>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer>
                        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                          <Pie
                            data={[
                              { 
                                name: 'Crop Profit', 
                                value: parseFloat(result.crop_profit),
                              },
                              { 
                                name: 'Waste Profit', 
                                value: parseFloat(result.waste_profit),
                              }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            <Cell fill="#059669" />
                            <Cell fill="#D97706" />
                          </Pie>
                          <Tooltip 
                            formatter={(value) => `₹${parseInt(value).toLocaleString()}`}
                            contentStyle={{ 
                              backgroundColor: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                            }}
                          />
                          <Legend 
                            verticalAlign="bottom"
                            align="center"
                            layout="horizontal"
                            iconType="circle"
                            iconSize={8}
                            wrapperStyle={{
                              paddingTop: '20px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Price Analysis */}
                  <div className="bg-white/80 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Price Comparison (per ton)</h4>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer>
                        <BarChart
                          data={[
                            { 
                              name: 'Crop Price', 
                              value: parseFloat(result.price_per_ton),
                            },
                            { 
                              name: 'Waste Price', 
                              value: parseFloat(result.waste_price_per_ton),
                            }
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                          />
                          <Tooltip
                            formatter={(value) => `₹${parseInt(value).toLocaleString()}`}
                            contentStyle={{ 
                              backgroundColor: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                            }}
                            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                            labelStyle={{ color: '#6B7280' }}
                          />
                          <Bar 
                            dataKey="value"
                            radius={[4, 4, 0, 0]}
                          >
                            <Cell fill="#059669" />
                            <Cell fill="#D97706" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-1.5 bg-green-100 rounded-lg">
                      <Brain className="w-4 h-4 text-green-600" />
                    </div>
                    <h4 className="text-base font-semibold text-gray-800">Smart Analysis Summary</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                      <p className="text-sm text-green-800 font-medium">
                        Analysis for {result.crop} cultivation in {result.location}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Expected Yield Revenue</p>
                        <p className="text-base font-semibold text-green-700">
                          {result.predicted_yield} tons
                        </p>
                        <p className="text-sm font-medium text-green-600">
                          ₹{parseInt(result.crop_profit).toLocaleString()}
                        </p>
                      </div>

                      <div className="p-3 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Waste Management</p>
                        <p className="text-base font-semibold text-amber-700">
                          {result.predicted_waste} tons
                        </p>
                        <p className="text-sm font-medium text-amber-600">
                          ₹{parseInt(result.waste_profit).toLocaleString()}
                        </p>
                      </div>

                      <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Total Earnings</p>
                        <p className="text-base font-semibold text-blue-700">
                          ₹{parseInt(result.total_profit).toLocaleString()}
                        </p>
                        <p className="text-xs text-blue-600/80">Combined Revenue</p>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                        <p className="text-xs font-medium text-blue-800">Key Insights</p>
                      </div>
                      <ul className="space-y-1.5">
                        <li className="flex items-center gap-2 text-xs text-gray-600">
                          <div className="w-1 h-1 rounded-full bg-green-500"></div>
                          Main crop revenue contributes {((result.crop_profit / result.total_profit) * 100).toFixed(1)}% of total earnings
                        </li>
                        <li className="flex items-center gap-2 text-xs text-gray-600">
                          <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                          Waste management adds ₹{parseInt(result.waste_profit).toLocaleString()} in additional revenue
                        </li>
                        <li className="flex items-center gap-2 text-xs text-gray-600">
                          <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                          Price per ton: Crop ₹{parseInt(result.price_per_ton).toLocaleString()} | Waste ₹{parseInt(result.waste_price_per_ton).toLocaleString()}
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
                <Sprout className="w-12 h-12 text-green-500/50 mb-3" />
                <p className="text-sm">Submit the form to get AI-powered recommendations</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AILab;
