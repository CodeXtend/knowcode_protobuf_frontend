import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  LeafIcon, 
  BarChart2, 
  ShoppingBag, 
  TruckIcon, 
  Users2,
  BookOpen,
  X 
} from 'lucide-react';

const TopNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <BarChart2 className="w-4 h-4" /> },
    { href: "/marketplace", label: "Marketplace", icon: <ShoppingBag className="w-4 h-4" /> },
    { href: "/supply-chain", label: "Supply Chain", icon: <TruckIcon className="w-4 h-4" /> },
    { href: "/partners", label: "Partners", icon: <Users2 className="w-4 h-4" /> },
    { href: "/learn", label: "Resources", icon: <BookOpen className="w-4 h-4" /> }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    closed: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 px-2 sm:px-4 py-2 sm:py-4 z-50 flex justify-center overflow-x-hidden">
        <nav className="w-[95%] max-w-7xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-green-100/20 px-3 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <LeafIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Greenify
                </span>
                <span className="text-xs text-green-600 hidden sm:block">Smart Waste Management</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <NavLink key={index} href={item.href}>
                  <div className="flex items-center space-x-1">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              ))}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="hidden sm:flex items-center space-x-2 px-4 sm:px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all">
                <Users2 className="w-4 h-4" />
                <span>Sign In</span>
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-green-50 text-green-600 transition-colors relative"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation with AnimatePresence */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            
            {/* Mobile Menu */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden fixed top-[4.5rem] left-0 right-0 z-50 bg-white/70 backdrop-blur-lg shadow-xl border-t border-green-100/20 mx-2 rounded-2xl overflow-hidden"
            >
              <motion.div 
                className="flex flex-col p-4 space-y-2"
                initial="closed"
                animate="open"
                exit="closed"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-green-50 text-gray-600 hover:text-green-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={itemVariants}
                >
                  <button 
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-green-500/30 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users2 className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink = ({ href, children }) => (
  <Link
    to={href}
    className="font-medium text-gray-600 hover:text-green-600 transition-colors"
  >
    {children}
  </Link>
);

export default TopNavigation;
