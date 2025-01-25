import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  Sprout, 
  MapPin, 
  Phone, 
  Trees,
  ArrowRight,
  Check,
  ShieldCheck,
  GanttChartSquare,
  Wheat,
  TreePine,
  Scale,
  Ruler,
  Calendar
} from 'lucide-react';

const FarmerRegistration = () => {
  const navigate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState({
    phoneNo: '',
    location: '',
    farmSize: '',
    primaryCrops: '',
    farmAddress: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const formSteps = [
    {
      title: "Personal Details",
      icon: <Phone className="w-6 h-6 text-white" />,
      description: "Basic contact information"
    },
    {
      title: "Farm Information",
      icon: <Trees className="w-6 h-6 text-white" />,
      description: "Details about your farm"
    },
    {
      title: "Location Details",
      icon: <MapPin className="w-6 h-6 text-white" />,
      description: "Your farm's address"
    }
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
          role: "farmer",
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

      if(response.ok){
        alert("Registration successful");
      }
      
      // Store user data in localStorage
      localStorage.setItem('user_role', 'seller');
      localStorage.setItem('user_data', JSON.stringify(userData.data.user));
      
      // Redirect to dashboard
      navigate('/dashboard');

    } catch (error) {
      console.error("Registration error:", error);
      // Handle error (show error message to user)
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
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

  const farmTypes = [
    "Organic Farm",
    "Traditional Farm",
    "Mixed Farming",
    "Sustainable Agriculture"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-green-600 mb-2 block">REGISTRATION</span>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Join Our Farmer Network
          </h1>
          <p className="text-green-700/80 max-w-2xl mx-auto">
            Complete your registration to start managing agricultural waste effectively
          </p>
        </motion.div>

        {/* Registration Benefits */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
              title: "Verified Profile",
              description: "Get a verified farmer profile"
            },
            {
              icon: <GanttChartSquare className="w-6 h-6 text-green-600" />,
              title: "Waste Management",
              description: "Access smart waste tracking tools"
            },
            {
              icon: <Check className="w-6 h-6 text-green-600" />,
              title: "Market Access",
              description: "Connect with potential buyers"
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-green-100 shadow-sm"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          {formSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`flex flex-col items-center ${
                  index !== formSteps.length - 1 ? 'w-40' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep > index 
                    ? 'bg-green-600' 
                    : currentStep === index + 1 
                    ? 'bg-green-500' 
                    : 'bg-gray-200'
                } transition-colors duration-200`}>
                  {step.icon}
                </div>
                <span className="text-sm font-medium text-gray-600 mt-2">{step.title}</span>
                {index < formSteps.length - 1 && (
                  <div className={`h-1 w-full mt-4 ${currentStep > index ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <motion.div
          className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-green-100 p-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Step Fields */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Form Fields Based on Current Step */}
              {currentStep === 1 && (
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
              )}

              {currentStep === 2 && (
                <motion.div 
                  className="space-y-8"
                  variants={itemVariants}
                >
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 shadow-lg">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                        <TreePine className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">Farm Details</h2>
                        <p className="text-sm text-gray-600">Tell us about your agricultural practices</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Farm Size Input with Icon */}
                      <motion.div 
                        className="form-group"
                        whileHover={{ scale: 1.01 }}
                      >
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                          <Ruler className="w-4 h-4 text-green-600" />
                          Farm Size
                        </label>
                        <div className="relative">
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="farmSize"
                            value={formData.farmSize}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-300"
                            placeholder="Enter size in acres"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                            acres
                          </span>
                        </div>
                      </motion.div>

                      {/* Farm Type Selection */}
                      <motion.div
                        className="form-group"
                        whileHover={{ scale: 1.01 }}
                      >
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                          <Scale className="w-4 h-4 text-green-600" />
                          Farm Type
                        </label>
                        <select
                          className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-300 appearance-none bg-white"
                          name="farmType"
                          onChange={handleChange}
                        >
                          <option value="">Select farm type</option>
                          {farmTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                          ))}
                        </select>
                      </motion.div>

                      {/* Primary Crops with Tags */}
                      <motion.div 
                        className="form-group md:col-span-2"
                        whileHover={{ scale: 1.01 }}
                      >
                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                          <Wheat className="w-4 h-4 text-green-600" />
                          Primary Crops
                        </label>
                        <div className="relative">
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="primaryCrops"
                            value={formData.primaryCrops}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-300"
                            placeholder="Enter crops (comma separated)"
                          />
                          <div className="absolute left-4 top-1/2 -translate-y-1/2">
                            <Wheat className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Example: Rice, Wheat, Sugarcane
                        </p>
                      </motion.div>

                      {/* Harvest Calendar */}
                      <motion.div 
                        className="md:col-span-2 bg-green-50/50 rounded-xl p-6 border border-green-100"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <Calendar className="w-5 h-5 text-green-600" />
                          <h3 className="font-semibold text-gray-800">Harvest Schedule</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {['Spring', 'Summer', 'Winter'].map((season, index) => (
                            <motion.div
                              key={season}
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center gap-2 p-3 bg-white rounded-lg border border-green-100 cursor-pointer hover:border-green-400 transition-colors"
                            >
                              <input
                                type="checkbox"
                                id={season}
                                className="rounded text-green-600 focus:ring-green-500"
                              />
                              <label htmlFor={season} className="text-sm text-gray-700 cursor-pointer">
                                {season}
                              </label>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
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
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-6 py-3 rounded-xl border-2 border-green-500 text-green-600 font-medium hover:bg-green-50 transition-colors"
                >
                  Previous
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => currentStep < totalSteps ? setCurrentStep(prev => prev + 1) : handleSubmit()}
                className="ml-auto px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all flex items-center gap-2"
              >
                {currentStep === totalSteps ? 'Complete Registration' : 'Next Step'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmerRegistration;
