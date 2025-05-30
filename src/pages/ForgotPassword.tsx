import React from "react";
import { Link } from "react-router-dom";
import hello from "../assets/images/hello.png"; 
const Forgotpassword: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-xl text-center text-white">
        <img
          src={hello}
          alt=""
          className="mx-auto mb-6 w-24 sm:w-32"
        />
        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <Link
            to="/"
            className="w-full bg-green-600 text-white py-3 rounded-md flex items-center justify-center"
          >
            Reset the password
          </Link>
        </form>
        <p className="mt-4 text-sm text-gray-300">
          You will receive an email to reset your password.
        </p>
      </div>
    </div>
  );
};

export default Forgotpassword;
