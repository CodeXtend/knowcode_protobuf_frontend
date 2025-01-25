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
  BrainCircuit
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
      const response = await fetch('http://localhost:5000/predict', {
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
            {result ? (
              <div className="space-y-6">
                <div className="bg-white/80 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Prediction Results</h3>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Predicted Yield</p>
                        <p className="text-xl font-bold text-green-600">{result.predicted_yield} tons</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Predicted Waste</p>
                        <p className="text-xl font-bold text-amber-600">{result.predicted_waste} tons</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Price per Ton</p>
                        <p className="text-xl font-bold text-blue-600">₹{result.price_per_ton}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Waste Price per Ton</p>
                        <p className="text-xl font-bold text-blue-600">₹{result.waste_price_per_ton}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Crop Profit</p>
                        <p className="text-xl font-bold text-green-600">₹{result.crop_profit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Waste Profit</p>
                        <p className="text-xl font-bold text-green-600">₹{result.waste_profit}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600">Total Profit</p>
                      <p className="text-2xl font-bold text-emerald-600">₹{result.total_profit}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-600">
                {error}
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
