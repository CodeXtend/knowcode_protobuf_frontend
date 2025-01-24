// import React from 'react';

// export default function FarmerWasteCard({ imageUrl, quantity, farmerName, description, onBuy }) {
//   return (
//     <div className="w-full max-w-sm overflow-hidden border rounded-lg shadow-sm">
//       <div className="p-0">
//         <div className="relative h-48 w-full">
//           <img 
//             src={imageUrl || "/placeholder.svg"} 
//             alt="Farmer waste product" 
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//       <div className="p-4">
//         <div className="mb-2">
//           <span className="text-sm font-semibold text-gray-600">Quantity:</span>
//           {/* <span className="ml-2 text-lg font-bold">{quantity}</span> */}
//         </div>
//         <h3 className="text-xl font-semibold mb-2">{farmerName}</h3>
//         <p className="text-gray-600">{description}</p>
//       </div>
//       <div className="p-4 border-t">
//         <button 
//           onClick={onBuy} 
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//         >
//           Buy Now
//         </button>
//       </div>
//     </div>
//   )
// }
