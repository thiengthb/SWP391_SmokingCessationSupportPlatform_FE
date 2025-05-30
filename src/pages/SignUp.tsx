import React from "react";
import { Link } from "react-router-dom";
import hello from "../assets/images/hello.png"; 
const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-xl mx-auto text-white">
        <img
          src={hello}
          alt="Welcome to QuitNow"
          className="mx-auto mb-6 w-24 sm:w-32"
        />
        <form className="w-full space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <Link
            to="/social-login"
            className="w-full bg-green-600 text-white py-3 rounded-md flex items-center justify-center font-semibold"
          >
            Sign Up
          </Link>
        </form>
        <Link
          to="/social-login"
          className="block text-green-600 hover:underline mt-6 text-center"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
