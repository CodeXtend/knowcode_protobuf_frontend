import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, TreesIcon, Mail, Calendar, Package, DollarSign, Leaf, Info } from 'lucide-react';

const FarmerDetail = () => {
  const { id } = useParams();
  
  // Example detailed farmer data
  const farmerData = {
    phone: "+91 9876543210",
    email: "farmer@example.com",
    location: "Maharashtra, India",
    farmSize: "50 acres",
    primaryCrops: ["Wheat", "Rice", "Sugarcane"],
    farmAddress: "123 Farm Road, Rural District",
    wasteTypes: ["Crop Residue", "Organic Waste"],
    availableQuantity: "500 kg",
    price: "₹2000/ton",
    harvestSchedule: "Monthly",
    certifications: ["Organic Certified", "Sustainable Farming"],
    description: "We are committed to sustainable farming practices and proper waste management. Our farm produces high-quality agricultural waste suitable for various applications."
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-24 px-6 pb-20">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-200/20 backdrop-blur-xl"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl border border-green-100 shadow-2xl p-8"
        >
          {/* Header Section */}
          <motion.div 
            className="flex items-center space-x-6 mb-8"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
              <TreesIcon className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Farm ID #{id}
              </h1>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="h-5 w-5 mr-2" />
                {farmerData.location}
              </div>
            </div>
          </motion.div>

          {/* Grid Layout for Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <motion.div 
              className="space-y-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white/50 rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-semibold text-green-700">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <span>{farmerData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <span>{farmerData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Info className="h-5 w-5 text-green-600" />
                    <span>{farmerData.farmAddress}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-semibold text-green-700">Farm Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Farm Size:</span>
                    <span className="font-medium">{farmerData.farmSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Primary Crops:</span>
                    <span className="font-medium">{farmerData.primaryCrops.join(", ")}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              className="space-y-6"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-white/50 rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-semibold text-green-700">Waste Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Waste Types:</span>
                    <span className="font-medium">{farmerData.wasteTypes.join(", ")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Available Quantity:</span>
                    <span className="font-medium">{farmerData.availableQuantity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-green-600">{farmerData.price}</span>
                  </div>
                </div>
              </div>

              <motion.button 
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="h-5 w-5" />
                <span>Contact Now</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmerDetail;
