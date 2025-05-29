import React from "react";
import { Link } from "react-router-dom";
import hello from "../assets/images/hello.png";
const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <img
          src={hello}
          alt="Welcome to QuitNow"
          className="mx-auto mb-6 w-24 sm:w-32"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Welcome to QuitNow
        </h1>
        <div className="space-y-4">
          <Link
            to="/"
            className="block bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 w-[300px] sm:w-[400px] text-sm sm:text-base"
          >
            Start
          </Link>

          <Link
            to="/social-login"
            className="block bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 w-[300px] sm:w-[400px] text-sm sm:text-base"
          >
            Sign In
          </Link>
          <Link
            to="/"
            className="block text-green-600 hover:underline text-sm sm:text-base"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
