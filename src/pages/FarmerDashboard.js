import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import {  Calendar } from 'lucide-react';
import { 
  User, MapPin, Phone, TreePine, Scale, 
  Package, Plus, Trash2, Mail, Sprout, BarChart, Award
} from 'lucide-react';

const FarmerDashboard = () => {
  const { user } = useAuth0();
  const [farmer, setFarmer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddWasteModal, setShowAddWasteModal] = useState(false);
  const [newWaste, setNewWaste] = useState({
    type: '',
    quantity: '',
    price: '',
    availableFrom: '',
    description: ''
  });
  const [wasteListing, setWasteListing] = useState([]);

  useEffect(() => {
    const fetchFarmerData = async () => {
      if (!user?.sub) return;

      try {
        const auth0Id = user.sub.split('|')[1];
        const response = await fetch(
          `https://knowcode-protobuf-backend-k16r.vercel.app/api/v1/users/data/${auth0Id}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch farmer data');
        }

        const { data } = await response.json();
        setFarmer({
          name: data.name,
          phone: data.phone,
          location: data.location,
          picture: data.picture,
          farmDetails: {
            farmSize: data.farmDetails.farmSize,
            farmType: data.farmDetails.farmType,
            primaryCrops: data.farmDetails.primaryCrops,
            address: data.farmDetails.address
          }
        });

        // Set waste listings if they exist
        if (data.wasteListing && Array.isArray(data.wasteListing)) {
          setWasteListing(data.wasteListing);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching farmer data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFarmerData();
  }, [user]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  // No data state
  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">No farmer data found</div>
      </div>
    );
  }

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
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center overflow-hidden">
              {farmer.picture ? (
                <img 
                  src={farmer.picture} 
                  alt={farmer.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{farmer.name}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {farmer.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {farmer.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  {farmer.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <TreePine className="w-4 h-4" />
                  {farmer.farmDetails.farmType}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Scale className="w-4 h-4" />
                  {farmer.farmDetails.farmSize}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {farmer.experience} Years Experience
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Sprout className="w-4 h-4" />
                  {farmer.primaryCrops}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BarChart className="w-4 h-4" />
                  Annual Revenue: ₹{farmer.revenue}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-4 h-4" />
                  {farmer.certification || 'No Certifications'}
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
