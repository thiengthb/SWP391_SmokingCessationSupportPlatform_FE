import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 sm:p-6 bg-white shadow-md">
      <Link to="/" className="text-xl sm:text-2xl font-bold text-black mb-4 md:mb-0 hover:underline">
        QUITNOW
      </Link>
      <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <li>
            <Link to="/" className="text-green-600 font-semibold text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2">
              Home
            </Link>
          </li>
          <li>
            <Link to="/for-insurers" className="text-green-600 font-semibold text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2">
              For insurers
            </Link>
          </li>
          <li>
            <Link to="/for-companies" className="text-green-600 font-semibold text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2">
              For companies
            </Link>
          </li>
          <li>
            <Link to="/partnerships" className="text-green-600 font-semibold text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2">
              Partnerships
            </Link>
          </li>
        </ul>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
          <Link to="/login" className="text-green-600 font-semibold text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2">
            Sign In
          </Link>
          <Link to="/start" className="text-green-600 font-semibold text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 bg-green-100 hover:bg-green-200 rounded-md">
            Start
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;