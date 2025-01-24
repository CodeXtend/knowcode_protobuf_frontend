import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Phone, TreesIcon } from 'lucide-react';

const Marketplace = () => {
  // Example data - replace with your actual data
  const farmersData = [
    {
      phone: "+91 9876543210",
      location: "Maharashtra, India",
      farmSize: "50 acres",
      primaryCrops: "Wheat, Rice, Sugarcane",
      farmAddress: "123 Farm Road, Rural District",
      wasteTypes: ["Crop Residue", "Organic Waste"],
      availableQuantity: "500 kg",
      price: "₹2000/ton"
    },
    {
      phone: "+91 9876543211",
      location: "Punjab, India",
      farmSize: "75 acres",
      primaryCrops: "Cotton, Wheat",
      farmAddress: "456 Agriculture Lane, Rural Area",
      wasteTypes: ["Cotton Stalks", "Wheat Straw"],
      availableQuantity: "750 kg",
      price: "₹1800/ton"
    },
    // Add more farmer data as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-24 px-6 pb-20">
      <div className="container mx-auto">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Agricultural Waste Marketplace
          </h1>
          <p className="text-green-700/80 text-lg">
            Connect with farmers and purchase agricultural waste for sustainable use
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location, waste type..."
              className="w-full pl-12 pr-4 py-2 rounded-xl border border-green-100 focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white/70 backdrop-blur-sm"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-2 bg-white/70 backdrop-blur-sm rounded-xl border border-green-100 text-green-700 hover:bg-green-50 transition-colors">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Farmers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmersData.map((farmer, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-green-100 shadow-lg hover:shadow-xl transition-all p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
                    <TreesIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Farm ID #{index + 1}</h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {farmer.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Farm Size:</span>
                  <span className="font-medium text-gray-800">{farmer.farmSize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Waste Types:</span>
                  <span className="font-medium text-gray-800">{farmer.wasteTypes.join(", ")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available Quantity:</span>
                  <span className="font-medium text-gray-800">{farmer.availableQuantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium text-green-600">{farmer.price}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                  <Phone className="h-4 w-4" />
                  <span>{farmer.phone}</span>
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all">
                  Contact Farmer
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
