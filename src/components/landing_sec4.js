import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Truck, CircleDollarSign, Star, Quote } from 'lucide-react';

const Landing_sec4 = () => {
  const stats = [
    { icon: <TrendingUp/>, value: "50%", label: "Reduction in Transportation Costs" },
    { icon: <Users/>, value: "1000+", label: "Farmers and Buyers Connected" },
    { icon: <Truck/>, value: "30%", label: "More Efficient Waste Collection" },
    { icon: <CircleDollarSign/>, value: "₹2M+", label: "Revenue Generated for Farmers" }
  ];

  const testimonials = [
    {
      quote: "This platform has transformed how we handle agricultural waste. The efficiency gains are remarkable.",
      author: "Rajesh Kumar",
      role: "Farmer, Punjab",
      rating: 5
    },
    {
      quote: "We've seen a significant reduction in costs and improved our environmental impact.",
      author: "Priya Patel",
      role: "Agri-business Owner",
      rating: 5
    },
    {
      quote: "Greenify has made waste management effortless and helped me connect with buyers efficiently. It's a game-changer for small farmers like me.",
      author: "Suresh Pawar",
      role: "Farmer, Maharashtra",
      rating: 5
    }
  ];

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white py-12 sm:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"/>
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"/>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-100 shadow-xl"
            >
              <div className="text-green-600 mb-4">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-sm font-semibold text-green-600 mb-2 block">TESTIMONIALS</span>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            What Our Users Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"/>
        </motion.div>

        {/* Updated grid to show 3 cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-100 shadow-xl relative group hover:shadow-2xl transition-all duration-300"
            >
              <Quote className="absolute top-4 right-4 text-green-200 w-10 h-10"/>
              <div className="flex space-x-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current"/>
                ))}
              </div>
              <p className="text-gray-700 text-base mb-4 italic line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                {testimonial.quote}
              </p>
              <div>
                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing_sec4;
