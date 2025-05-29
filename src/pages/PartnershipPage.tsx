import Header from "../components/template/home/header";
import React from "react";
import Footer from "../components/template/home/footer";
const ForCompaniesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 py-8">
        <div className="text-center max-w-6xl mx-auto px-4">
          <img
            src="https://i.pinimg.com/736x/12/61/90/1261906eb08d214379c8b884bb795682.jpg"
            alt="QuitNow Illustration"
            className="mx-auto mb-6 w-48 sm:w-64"
          />
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
            Partner with Us to Transform Lives and Create Healthier Communities
          </h1>
          <p className="text-gray-600 mb-6">
            Join forces to help more people quit smoking and improve public health
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default ForCompaniesPage;
