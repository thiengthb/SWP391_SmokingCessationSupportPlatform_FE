import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-8">
      <div className="text-center">
        <img
          src="https://i.pinimg.com/736x/12/61/90/1261906eb08d214379c8b884bb795682.jpg"
          alt="Welcome to QuitNow"
          className="mx-auto mb-6 w-24 sm:w-32"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Welcome to QuitNow</h1>
        <div className="space-y-4">
          <Link
            to="/"
            className="block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-full max-w-xs text-sm sm:text-base"
          >
            Start
          </Link>
          <Link
            to="/social-login"
            className="block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-full max-w-xs text-sm sm:text-base"
          >
            Sign In
          </Link>
          <Link to="/" className="block text-green-600 hover:underline text-sm sm:text-base">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;