import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Phone, MapPin, Ruler, Scale, Wheat,
  Tractor, Leaf, CircleDollarSign, TreePine
} from 'lucide-react';

const FarmerRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, getAccessTokenSilently } = useAuth0();
  const selectedRole = location.state?.selectedRole || 'seller';
  const [formData, setFormData] = useState({
    phoneNo: '',
    location: '',
    farmSize: '',
    primaryCrops: '',
    farmAddress: '',
  });

  const farmTypes = [
    "Organic Farm",
    "Traditional Farm",
    "Mixed Farming",
    "Sustainable Agriculture"
  ];

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch("https://knowcode-protobuf-backend-k16r.vercel.app/api/v1/users/register/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          picture: user.picture,
          auth0Id: user.sub.split("|")[1],
          role: selectedRole,
          phone: formData.phoneNo,
          location: formData.location,
          farmDetails: {
            location: formData.location,
            farmSize: formData.farmSize,
            primaryCrops: formData.primaryCrops.split(',').map(crop => crop.trim()),
            address: formData.farmAddress,
            farmType: formData.farmType || "Traditional Farm",
            harvestSchedule: {
              spring: false,
              summer: false,
              winter: false
            }
          },
          isVerified: false,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const userData = await response.json();
      console.log("Registration successful:", userData);

      if (response.ok) {
        alert("Registration successful");
      }

      // Store user data in localStorage
      localStorage.setItem('user_role', 'seller');
      localStorage.setItem('user_data', JSON.stringify(userData.data.user));

      // Redirect to dashboard
      navigate('/farmerDashboard');

    } catch (error) {
      console.error("Registration error:", error);
      // Handle error (show error message to user)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Welcome to Agricultural Waste Management
          </h1>
          <p className="text-green-700/80 max-w-2xl mx-auto text-lg">
            Join our network of sustainable farmers and contribute to a greener future
          </p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-green-100 overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
            <h2 className="text-2xl font-semibold">{selectedRole} Registration</h2>
            <p className="text-green-50">Complete your profile to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Farm Information Section */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Tractor className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Farm Information</h3>
                </div>
              </div>

              {/* Contact Details */}
              <motion.div className="form-group" whileHover={{ scale: 1.01 }}>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-300"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </motion.div>

              <motion.div className="form-group" whileHover={{ scale: 1.01 }}>
                <label className="block text-gray-700 font-medium mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-300"
                    placeholder="State, Country"
                  />
                </div>
              </motion.div>

              {/* Farm Details */}
              <motion.div className="md:col-span-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <TreePine className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-800">Farm Details</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <label className="block text-gray-700 font-medium mb-2">Farm Size (acres)</label>
                    <div className="relative">
                      <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="farmSize"
                        value={formData.farmSize}
                        onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
                        placeholder="Enter farm size"
                      />
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }}>
                    <label className="block text-gray-700 font-medium mb-2">Farm Type</label>
                    <div className="relative">
                      <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="farmType"
                        onChange={(e) => setFormData({ ...formData, farmType: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none appearance-none bg-white"
                      >
                        <option value="">Select farm type</option>
                        {farmTypes.map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Primary Crops */}
              <motion.div className="md:col-span-2" whileHover={{ scale: 1.01 }}>
                <label className="block text-gray-700 font-medium mb-2">Primary Crops</label>
                <div className="relative">
                  <Wheat className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="primaryCrops"
                    value={formData.primaryCrops}
                    onChange={(e) => setFormData({ ...formData, primaryCrops: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
                    placeholder="Enter crops (comma separated)"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">Example: Rice, Wheat, Sugarcane</p>
              </motion.div>

              {/* Farm Address */}
              <motion.div className="md:col-span-2" whileHover={{ scale: 1.01 }}>
                <label className="block text-gray-700 font-medium mb-2">Farm Address</label>
                <textarea
                  name="farmAddress"
                  value={formData.farmAddress}
                  onChange={(e) => setFormData({ ...formData, farmAddress: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
                  placeholder="Enter complete farm address"
                />
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-8 w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all flex items-center justify-center gap-2"
            >
              <CircleDollarSign className="w-5 h-5" />
              Complete Registration
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmerRegistration;
