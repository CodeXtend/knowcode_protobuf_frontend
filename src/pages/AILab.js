import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Sprout,
  Map,
  Ruler,
  Wheat,
  Droplet,
  Loader,
  ArrowRight,
  BrainCircuit
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const AILab = () => {
  const [formData, setFormData] = useState({
    location: '',
    land_area: '',
    soil_condition: '',
    crop_type: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [predictiveMode, setPredictiveMode] = useState(false);

  const soilConditions = [
    "Clay",
    "Sandy",
    "Loamy",
    "Silt",
    "Peaty",
    "Chalky",
  ];

  const cropTypes = [
    "Rice",
    "Wheat",
    "Sugarcane",
    "Cotton",
    "Maize",
    "Pulses",
  ];

  const predictiveData = [
    { month: 'April', waste: 480, recycled: 380, efficiency: 79 },
    { month: 'May', waste: 520, recycled: 425, efficiency: 82 },
    { month: 'June', waste: 580, recycled: 490, efficiency: 84 },
    { month: 'July', waste: 490, recycled: 420, efficiency: 86 },
    { month: 'August', waste: 540, recycled: 475, efficiency: 88 },
    { month: 'September', waste: 560, recycled: 505, efficiency: 90 }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        recommendation: "Based on your input, we recommend...",
        sustainability_score: 85,
        waste_estimation: "approximately 500kg per harvest",
        predictive_analysis: true
      });
      setPredictiveMode(true);
      setLoading(false);
    }, 2000);
  };

  const handlePredictive = () => {
    setLoading(true);
    // Simulate predictive analysis API call
    setTimeout(() => {
      setPredictiveMode(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-24 px-6 pb-20">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 rounded-xl bg-green-100 mb-4">
            <BrainCircuit className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            AI Agricultural Assistant
          </h1>
          <p className="text-green-700/80 text-lg max-w-2xl mx-auto">
            Get personalized recommendations for agricultural waste management using our advanced AI system
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-green-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Results Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-8 border border-green-100 shadow-xl"
          >
            {result && !predictiveMode ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePredictive}
                className="w-full px-6 py-4 mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                <Brain className="w-5 h-5" />
                <span>Generate Predictive Analysis</span>
              </motion.button>
            ) : null}

            {predictiveMode ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white/80 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Predictive Analysis</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={predictiveData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="waste"
                          stroke="#ef4444"
                          strokeWidth={2}
                          name="Waste Generated (kg)"
                        />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="recycled"
                          stroke="#22c55e"
                          strokeWidth={2}
                          name="Waste Recycled (kg)"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="efficiency"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Efficiency (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/80 rounded-xl p-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Peak Efficiency</h4>
                    <div className="text-3xl font-bold text-green-600">90%</div>
                    <p className="text-xs text-gray-500 mt-1">Expected by September</p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Waste Reduction</h4>
                    <div className="text-3xl font-bold text-blue-600">15%</div>
                    <p className="text-xs text-gray-500 mt-1">Monthly average</p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Cost Savings</h4>
                    <div className="text-3xl font-bold text-purple-600">₹12K</div>
                    <p className="text-xs text-gray-500 mt-1">Projected monthly</p>
                  </div>
                </div>

                <div className="bg-white/80 rounded-xl p-6">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">AI Recommendations</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Implement crop rotation to improve soil health
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Optimize irrigation scheduling
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Consider organic farming practices
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : result ? (
              <div className="space-y-6">
                <div className="bg-white/80 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">AI Recommendation</h3>
                  <p className="text-gray-600">{result.recommendation}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 rounded-xl p-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Sustainability Score</h4>
                    <div className="text-3xl font-bold text-green-600">{result.sustainability_score}%</div>
                  </div>
                  <div className="bg-white/80 rounded-xl p-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Waste Estimation</h4>
                    <div className="text-3xl font-bold text-green-600">{result.waste_estimation}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
                <Sprout className="w-16 h-16 text-green-500/50" />
                <p>Submit the form to get AI-powered recommendations</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AILab;
