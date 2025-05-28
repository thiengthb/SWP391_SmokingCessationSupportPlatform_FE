import React from 'react';

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
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
          <button className="text-green-600 font-semibold hover:underline text-sm sm:text-base">Sign in</button>
          <button className="bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-green-700 text-sm sm:text-base">Start</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;