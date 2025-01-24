import React from 'react';
import { Link } from 'react-router-dom';

const TopNavigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-dark-background shadow-sm z-50 md:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold dark:text-white">Logo</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
