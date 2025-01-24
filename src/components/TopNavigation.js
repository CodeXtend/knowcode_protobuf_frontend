import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, 
  LeafIcon, 
  BarChart2, 
  ShoppingBag, 
  TruckIcon, 
  Users2,
  BookOpen 
} from 'lucide-react';


const TopNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <BarChart2 className="w-4 h-4" /> },  // Using BarChart2
    { href: "/marketplace", label: "Marketplace", icon: <ShoppingBag className="w-4 h-4" /> },
    { href: "/supply-chain", label: "Supply Chain", icon: <TruckIcon className="w-4 h-4" /> },
    { href: "/partners", label: "Partners", icon: <Users2 className="w-4 h-4" /> },
    { href: "/learn", label: "Resources", icon: <BookOpen className="w-4 h-4" /> }
  ];

  return (
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
              className="md:hidden p-2 rounded-xl hover:bg-green-50 text-green-600 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

      {/* Mobile Navigation with AnimatePresence */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-2 p-4 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-green-100/20"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <NavLink key={index} href={item.href}>
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              ))}
              <button className="w-full px-4 py-2 mt-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold flex items-center justify-center space-x-2">
                <Users2 className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </div>
          </motion.div>
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
