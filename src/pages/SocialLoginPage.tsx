import React from "react";
import { Link } from "react-router-dom";

const SocialLoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-8">
      <div className="text-center text-white">
        <img
          src="https://i.pinimg.com/736x/12/61/90/1261906eb08d214379c8b884bb795682.jpg"
          alt="Welcome to QuitNow"
          className="mx-auto mb-6 w-24 sm:w-32"
        />
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Sign In</h1>
        <Link
          to={"/"}
          className="w-64 bg-red-600 text-white py-2 mb-2 flex items-center justify-center rounded-md hover:bg-red-500"
        >
          <span className="mr-2">G</span> Sign in with Google
        </Link>
        <Link
          to={"/"}
          className="w-64 bg-gray-800 text-white py-2 mb-2 flex items-center justify-center rounded-md hover:bg-gray-500"
        >
          <span className="mr-2"></span> Sign in with Apple
        </Link>

        <Link
          to={"/"}
          className="w-64 bg-blue-600 text-white py-2 mb-2 flex items-center justify-center rounded-md hover:bg-blue-500"
        >
          <span className="mr-2">f</span> Sign in with Facebook
        </Link>
        <Link
          to={"/SignIn"}
          className="w-64 bg-black-600 text-green-800 py-2 mb-2 flex items-center justify-center rounded-md border border-gray-500 rounded px-4 py-2 hover:bg-green-500"
        >
          Sign in with email
        </Link>
        <Link
          to={"/SignUp"}
          className="w-64 bg-black-600 text-green-800 py-2 mb-2 flex items-center justify-center rounded-md border border-gray-500 rounded px-4 py-2 hover:bg-green-500"
        >
          Create at account
        </Link>
        <Link to="/login" className="block text-green-600 hover:underline mt-4">
          Back
        </Link>
      </div>
    </div>
  );
};

export default SocialLoginPage;
