import React, { useState } from 'react';

const FarmerProductCard = ({ 
  productImage, 
  farmerName, 
  initialQuantity, 
  description, 
  price 
}) => {
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleBuy = () => {
    alert(`Buying ${quantity} units from ${farmerName}`);
  };

  return (
    <div className="w-72 p-4 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
      <div>
        <div className="relative mb-4">
          <img 
            src={productImage} 
            alt={`Product from ${farmerName}`} 
            className="w-full h-48 object-cover rounded-md hover:opacity-95 transition-opacity"
          />
          <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full font-semibold">
            ₹{price}/quintal
          </div>
        </div>
        
        <div className="mb-3">
          <h2 className="text-xl font-bold text-green-800 hover:text-green-700 transition-colors">
            {farmerName}
          </h2>
          <p className="text-sm text-gray-500">Certified Organic Farmer</p>
        </div>
        
        <div className="mb-3">
          <p className="text-gray-600 font-medium flex items-center gap-1">
            <span>Available:</span>
            <span className="text-green-700 font-semibold">{quantity} quintals</span>
          </p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
          <span className="text-gray-700 font-medium">Select Quantity:</span>
          <div className="flex items-center">
            <button 
              onClick={() => handleQuantityChange('decrease')}
              className="bg-white px-3 py-1 rounded-l-md hover:bg-gray-100 border border-gray-200"
            >
              -
            </button>
            <span className="px-4 py-1 bg-white border-t border-b border-gray-200 font-medium">
              {quantity}
            </span>
            <button 
              onClick={() => handleQuantityChange('increase')}
              className="bg-white px-3 py-1 rounded-r-md hover:bg-gray-100 border border-gray-200"
            >
              +
            </button>
          </div>
        </div>
        
        <button 
          onClick={handleBuy} 
          className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
        >
          <span>Buy Now</span>
          <span className="font-bold">• ₹{price * quantity}</span>
        </button>
      </div>
    </div>
  );
};

export default FarmerProductCard;
