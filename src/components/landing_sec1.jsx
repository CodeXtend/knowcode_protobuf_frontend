import React from 'react';
import { motion } from 'framer-motion';
import { LeafIcon, TruckIcon, RecycleIcon } from 'lucide-react';

const Landing_sec1 = () => {
  return (
    <div className="relative bg-green-50 min-h-screen flex items-center justify-center overflow-hidden">
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
        className="absolute top-10 right-20 w-48 h-48 bg-green-200 rounded-full opacity-30 blur-2xl"
      />

      <motion.div 
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center relative z-10"
      >
        {/* Text Content */}
        <div className="space-y-6">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl font-bold text-green-900"
          >
            Transforming Agricultural Waste
          </motion.h1>
          
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl text-green-700"
          >
            Optimize waste management, create value, and drive sustainable agriculture
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex space-x-4"
          >
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105">
              <LeafIcon />
              <span>Platform</span>
            </button>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105">
              <TruckIcon />
              <span>Dashboard</span>
            </button>
          </motion.div>
        </div>

        {/* Illustration */}
        <motion.div 
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center"
        >
          <motion.div 
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <RecycleIcon 
              size={400} 
              className="text-green-500 opacity-70"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing_sec1;
