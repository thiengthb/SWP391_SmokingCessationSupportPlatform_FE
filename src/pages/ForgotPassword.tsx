import React from "react";
import { Link } from "react-router-dom";

const Forgotpassword: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-8">
      <div className="text-center text-white">
        <img
          src="https://i.pinimg.com/736x/12/61/90/1261906eb08d214379c8b884bb795682.jpg"
          alt=""
          className="mx-auto mb-6 w-24 sm:w-32"
        />
        <form className="w-full max-w-md mx-auto space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <Link
            to="/"
            className="w-full bg-green-600 text-white py-2 rounded-md flex items-center justify-center"
          >
            Reset the password
          </Link>
        </form>
        <p>
            You will receive an email to reset your password.
        </p>
      </div>
    </div>
  );
};

export default Forgotpassword;
