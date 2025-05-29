import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-700 text-white py-6 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6">
        <div className="text-center lg:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-4">QUITNOW</h3>
          <div className="flex flex-col items-center lg:items-start space-y-2 sm:space-y-3 mb-4">
  <a
    href="#"
    className="bg-black text-white w-[220px] px-4 py-2 rounded-full inline-flex items-center justify-center space-x-1 hover:bg-gray-800 text-sm"
  >
    <span>Download on the</span>
    <span className="font-bold">App Store</span>
  </a>

  <a
    href="#"
    className="bg-black text-white w-[220px] px-4 py-2 rounded-full inline-flex items-center justify-center space-x-1 hover:bg-gray-800 text-sm"
  >
    <span>Get it on</span>
    <span className="font-bold">Google Play</span>
  </a>
</div>

          <select className="w-full sm:w-40 bg-white text-black border border-gray-300 rounded p-2 mx-auto text-sm">
            <option>English</option>
            <option>VietNamese</option>
          </select>
        </div>

        <div className="text-center lg:text-left">
          <h3 className="text-base sm:text-lg font-bold mb-4">Quick links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white text-sm sm:text-base">Home</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white text-sm sm:text-base">For insurers</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white text-sm sm:text-base">For companies</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white text-sm sm:text-base">Partnerships</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white text-sm sm:text-base">FAQ</a></li>
          </ul>
        </div>

        <div className="text-center lg:text-left">
          <h3 className="text-base sm:text-lg font-bold mb-4">Subscription</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white text-sm sm:text-base">Buy a gift code</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white text-sm sm:text-base">Redeem a code</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white text-sm sm:text-base">Subscription status</a></li>
          </ul>
        </div>

        <div className="text-center lg:text-left">
          <h3 className="text-base sm:text-lg font-bold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white text-sm sm:text-base">Privacy policy</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white text-sm sm:text-base">Terms & Conditions</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white text-sm sm:text-base">Cookies policy</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-6 sm:mt-8 text-gray-400 text-xs sm:text-sm">
        © 2025 Fewlaps SL — All rights reserved
      </div>
    </footer>
  );
};

export default Footer;