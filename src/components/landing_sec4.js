import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, ShoppingBag, CircleDollarSign } from 'lucide-react';
import screenshot1 from '../assets/screenshot1.jpeg';


const Landing_sec4 = () => {
  const appFeatures = [
    {
      title: "Smart Waste Management",
      description: "Real-time tracking and optimization of agricultural waste collection with instant buyer matching and automated price suggestions.",
      image: screenshot1,
      stats: [
        { icon: <TrendingUp/>, value: "50%", label: "Higher Resource Utilization" },
        { icon: <Users/>, value: "1000+", label: "Connected Partners" },
      ]
    },
    {
      title: "Analytics & Insights",
      description: "Data-driven insights to maximize waste value, optimize collection routes, and identify market opportunities for agricultural byproducts.",
      image: screenshot1,
      stats: [
        { icon: <ShoppingBag/>, value: "₹2M+", label: "Waste Value Generated" },
        { icon: <CircleDollarSign/>, value: "30%", label: "Cost Optimization" },
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-green-600 mb-2 block">OUR PLATFORM</span>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Powerful Features for Waste Management
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive platform designed to revolutionize agricultural waste management
          </p>
        </motion.div>

        <div className="space-y-24">
          {appFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 0 ? 'md:grid-flow-row' : 'md:grid-flow-row-dense'
              }`}
            >
              {/* Feature Description */}
              <div className={index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-8">{feature.description}</p>
                
                <div className="grid grid-cols-2 gap-6">
                  {feature.stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-4 rounded-xl shadow-lg border border-green-100"
                    >
                      <div className="text-green-600 mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Updated Feature Image Container with smaller size */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative max-w-sm mx-auto md:max-w-md lg:max-w-lg ${
                  index % 2 === 0 ? 'md:order-last' : ''
                }`}
              >
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-xl transform rotate-3" />
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl -rotate-3" />
                
                {/* Browser-like Frame */}
                <div className="relative z-10 bg-white rounded-xl shadow-2xl overflow-hidden border border-green-100/20">
                  {/* Browser Header */}
                  <div className="bg-gray-50 px-3 py-1.5 border-b border-gray-100 flex items-center space-x-1.5">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                  </div>

                  {/* Image Container with fixed height */}
                  <div className="relative h-[240px] sm:h-[280px] md:h-[320px] overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="object-cover object-top w-full h-full transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Decorative Dots */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-dots-green/20 rounded-full blur-sm" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing_sec4;
