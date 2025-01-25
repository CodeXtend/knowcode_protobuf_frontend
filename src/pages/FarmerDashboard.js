import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { 
  User, MapPin, Phone, TreePine, Scale, 
  Package, Calendar, Plus, Trash2
} from 'lucide-react';

const FarmerDashboard = () => {
  const { id } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [showAddWasteModal, setShowAddWasteModal] = useState(false);
  const [newWaste, setNewWaste] = useState({
    type: '',
    quantity: '',
    price: '',
    availableFrom: '',
    description: ''
  });

  const [wasteListing, setWasteListing] = useState([
    {
      id: 1,
      type: 'Crop Residue',
      quantity: '500 kg',
      price: '₹2000/ton',
      availableFrom: '2024-02-01',
      description: 'Fresh crop residue from wheat harvest'
    }
  ]);

  useEffect(() => {
    // Fetch farmer details using id
    // For now using mock data
    setFarmer({
      name: 'John Doe',
      phone: '+91 9876543210',
      location: 'Maharashtra, India',
      farmSize: '50 acres',
      farmType: 'Organic Farm',
      primaryCrops: ['Wheat', 'Rice', 'Sugarcane'],
      address: '123 Farm Road, Rural District'
    });
  }, [id]);

  const handleAddWaste = (e) => {
    e.preventDefault();
    setWasteListing([...wasteListing, { ...newWaste, id: Date.now() }]);
    setNewWaste({
      type: '',
      quantity: '',
      price: '',
      availableFrom: '',
      description: ''
    });
    setShowAddWasteModal(false);
  };

  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Farmer Profile Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{farmer.name}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {farmer.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {farmer.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <TreePine className="w-4 h-4" />
                  {farmer.farmType}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Scale className="w-4 h-4" />
                  {farmer.farmSize}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Waste Listings */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Waste Listings</h2>
          <button
            onClick={() => setShowAddWasteModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Waste
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wasteListing.map((waste) => (
            <motion.div
              key={waste.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-green-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800">{waste.type}</h3>
                  <p className="text-sm text-gray-500">Available from {waste.availableFrom}</p>
                </div>
                <button 
                  onClick={() => {
                    setWasteListing(wasteListing.filter(w => w.id !== waste.id));
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{waste.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium text-green-600">{waste.price}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{waste.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Waste Modal */}
        {showAddWasteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold mb-4">Add New Waste Listing</h3>
              <form onSubmit={handleAddWaste} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
                  <input
                    type="text"
                    value={newWaste.type}
                    onChange={(e) => setNewWaste({...newWaste, type: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="text"
                      value={newWaste.quantity}
                      onChange={(e) => setNewWaste({...newWaste, quantity: e.target.value})}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="text"
                      value={newWaste.price}
                      onChange={(e) => setNewWaste({...newWaste, price: e.target.value})}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available From</label>
                  <input
                    type="date"
                    value={newWaste.availableFrom}
                    onChange={(e) => setNewWaste({...newWaste, availableFrom: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newWaste.description}
                    onChange={(e) => setNewWaste({...newWaste, description: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                    rows="3"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAddWasteModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Add Listing
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
