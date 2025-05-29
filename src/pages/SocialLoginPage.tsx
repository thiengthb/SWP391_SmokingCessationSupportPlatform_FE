import React from "react";
import { Link } from "react-router-dom";
import hello from "../assets/images/hello.png"; 
const SocialLoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-8">
      <div className="text-center text-white">
        <img
          src={hello}
          alt="Welcome to QuitNow"
          className="mx-auto mb-6 w-24 sm:w-32"
        />
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Sign In</h1>
        <div className="space-y-2 flex flex-col items-center">
        <Link
          to={"/"}
          className="w-[400px] bg-red-600 text-white py-3 flex items-center justify-center rounded-md hover:bg-red-500 mx-auto"
        >
          <span className="mr-2">G</span> Sign in with Google
        </Link>

        <Link
          to={"/"}
          className="w-[400px] bg-gray-800 text-white py-3 flex items-center justify-center rounded-md hover:bg-gray-500 mx-auto"
        >
          <span className="mr-2"></span> Sign in with Apple
        </Link>

        <Link
          to={"/"}
          className="w-[400px] bg-blue-600 text-white py-3 flex items-center justify-center rounded-md hover:bg-blue-500 mx-auto"
        >
          <span className="mr-2">f</span> Sign in with Facebook
        </Link>

        <Link
          to={"/SignIn"}
          className="w-[400px] text-green-800 py-3 flex items-center justify-center rounded-md border border-gray-500 hover:bg-green-500 mx-auto"
        >
          Sign in with email
        </Link>

        <Link
          to={"/SignUp"}
          className="w-[400px] text-green-800 py-3 flex items-center justify-center rounded-md border border-gray-500 hover:bg-green-500 mx-auto"
        >
          Create an account
        </Link>
        </div>
        <Link to="/login" className="block text-green-600 hover:underline mt-4">
          Back
        </Link>
      </div>
    </div>
  );
};

export default SocialLoginPage;
