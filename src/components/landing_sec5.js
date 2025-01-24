import React from 'react';
import { motion } from 'framer-motion';
import { RocketIcon, ArrowRight, PlayCircle } from 'lucide-react';

const Landing_sec5 = () => {
  return (
    <div className="bg-gradient-to-br from-green-900 to-emerald-800 py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4ade8066,#22c55e66)] mix-blend-multiply"/>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent"/>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <RocketIcon className="w-16 h-16 text-white/80 mx-auto mb-8"/>
            <span className="text-green-50/90 font-semibold mb-2 block">JOIN GREENIFY</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Transform Agricultural <br/> Waste Management?
            </h2>
            <p className="text-xl text-green-50/90 mb-12">
              Join thousands of farmers and businesses already benefiting from our platform
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white text-green-800 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-green-800 text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-green-50/20 hover:bg-green-700 transition-all duration-300 flex items-center space-x-2"
              >
                <PlayCircle className="w-5 h-5"/>
                <span>Watch Demo</span>
              </motion.button>
            </div>

            <p className="text-green-50/80 text-sm mt-8">
              No credit card required · Free 14-day trial · Cancel anytime
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landing_sec5;
