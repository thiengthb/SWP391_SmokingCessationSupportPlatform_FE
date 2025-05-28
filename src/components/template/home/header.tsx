import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 sm:p-6 bg-white shadow-md">
      <div className="text-xl sm:text-2xl font-bold text-black mb-4 md:mb-0">QUITNOW</div>
      <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm sm:text-base">Home</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm sm:text-base">For insurers</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm sm:text-base">For companies</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm sm:text-base">Partnerships</a></li>
        </ul>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
          <Link
            to="/login"
            className="text-green-600 font-semibold text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2"
          >
            Sign In
          </Link>
          <Link
            to="/login"
            className="text-green-600 font-semibold text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 bg-green-100 hover:bg-green-200 rounded-md"
          >
            Start
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;