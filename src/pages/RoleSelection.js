import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import farmer2 from '../assets/farmer2.png';
const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'seller') {
      navigate('/farmer-registration');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Choose Your Role
        </h1>
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05, borderColor: '#34D399', boxShadow: '0 0 20px rgba(71, 109, 215, 0.8)' }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 max-w-md cursor-pointer rounded-2xl p-8 border-3 transition-all ${
              selectedRole === 'buyer'
                ? 'border-blue-500 bg-blue-50 shadow-blue-200 shadow-lg'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
            }`}
            onClick={() => handleRoleSelect('buyer')}
          >
            <div className="flex flex-col items-center space-y-4">
              <img 
                src={farmer2} 
                alt="Buyer"
                className="w-32 h-32 object-cover rounded-full"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                Buyer
              </h2>
              <p className="text-gray-600 text-center">
                Browse and purchase agricultural products
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, borderColor: '#87cefa', boxShadow: '0 0 20px rgba(52, 211, 153, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 max-w-md cursor-pointer rounded-2xl p-8 border-3 transition-all ${
              selectedRole === 'seller'
                ? 'border-green-500 bg-green-50 shadow-green-200 shadow-lg'
                : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
            }`}
            onClick={() => handleRoleSelect('seller')}
          >
            <div className="flex flex-col items-center space-y-4">
              <img 
                src={farmer2} 
                alt="Farmer"
                className="w-32 h-32 object-cover rounded-full"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                Farmer
              </h2>
              <p className="text-gray-600 text-center">
                List and sell your agricultural products
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelection;
