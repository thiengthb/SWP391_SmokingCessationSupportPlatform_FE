import React from "react";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-8">
      <div className="text-center text-white">
        <img
          src="https://i.pinimg.com/736x/12/61/90/1261906eb08d214379c8b884bb795682.jpg"
          alt="Welcome to QuitNow"
          className="mx-auto mb-6 w-24 sm:w-32"
        />
        <form className="w-full max-w-md mx-auto space-y-4">
          <div>
            <input
              type="text or email"
              placeholder="Username"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <Link
            to="/social-login"
            className="w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center"
          >
            Sign In
          </Link>
        </form>
        <Link
          to="/forgot-password"
          className="block text-green-600 hover:underline mt-4"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
