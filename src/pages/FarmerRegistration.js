import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FarmerRegistration = () => {
  const [formData, setFormData] = useState({
    phoneNo: '',
    location: '',
    farmSize: '',
    primaryCrops: '',
    farmAddress: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-blue-100 py-12 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 left-20 w-48 h-48 bg-green-200 rounded-full opacity-30 blur-2xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 right-20 w-48 h-48 bg-blue-200 rounded-full opacity-30 blur-2xl"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto"
      >
        <motion.div 
          className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h1 
            className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Farmer Registration
          </motion.h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={itemVariants}
            >
              <div className="form-group">
                <label className="block text-gray-700 font-semibold mb-3">
                  Phone Number
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 font-semibold mb-3">
                  Location
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-300"
                  placeholder="Enter your location"
                />
              </div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mt-8 border border-green-100 shadow-lg"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-800">
                Farm Details
              </h2>
              <div className="space-y-6">
                <motion.div 
                  className="form-group"
                  whileHover={{ scale: 1.01 }}
                >
                  <label className="block text-gray-700 font-semibold mb-3">
                    Farm Size
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="farmSize"
                    value={formData.farmSize}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-300"
                    placeholder="Enter farm size in acres"
                  />
                </motion.div>

                <motion.div 
                  className="form-group"
                  whileHover={{ scale: 1.01 }}
                >
                  <label className="block text-gray-700 font-semibold mb-3">
                    Primary Crops
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="primaryCrops"
                    value={formData.primaryCrops}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-300"
                    placeholder="Enter primary crops"
                  />
                </motion.div>

                <motion.div 
                  className="form-group"
                  whileHover={{ scale: 1.01 }}
                >
                  <label className="block text-gray-700 font-semibold mb-3">
                    Farm Address
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    name="farmAddress"
                    value={formData.farmAddress}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-300"
                    placeholder="Enter complete farm address"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-10 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white py-5 px-8 rounded-xl text-xl font-bold hover:shadow-lg hover:shadow-green-200 transition-all duration-300"
            >
              Submit Registration
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FarmerRegistration;
