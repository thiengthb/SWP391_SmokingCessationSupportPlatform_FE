import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-300 py-8 sm:py-16 text-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4">
        Quit smoking. Own your health.
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 mx-4">
        Join more than 10 million people who have already quit smoking with
        QuitNow.
      </p>
      <button className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-gray-800 text-sm sm:text-base">
        Take the quiz
      </button>
    </section>
  );
};

export default Hero;
