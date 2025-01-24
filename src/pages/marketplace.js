import React from 'react';
import Card from '../components/card';

const Marketplace = () => {
  // Example data - replace with your actual data
  const farmersData = [
    {
      phone: "+91 9876543210",
      location: "Maharashtra, India",
      farmSize: "50 acres",
      primaryCrops: "Wheat, Rice, Sugarcane",
      farmAddress: "123 Farm Road, Rural District"
    },
    {
      phone: "+91 9876543211",
      location: "Punjab, India",
      farmSize: "75 acres",
      primaryCrops: "Cotton, Wheat",
      farmAddress: "456 Agriculture Lane, Rural Area"
    },
    // Add more farmer data as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20 px-6">
      <div className="container mx-auto">
        {/* <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">
          Marketplace
        </h1> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {farmersData.map((farmer, index) => (
            <Card key={index} farmerData={farmer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
