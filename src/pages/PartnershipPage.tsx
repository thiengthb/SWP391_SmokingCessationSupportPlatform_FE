import React from "react";
import Header from "../components/template/home/header";
import Footer from "../components/template/home/footer";

const PartnershipPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <div className="text-center max-w-6xl mx-auto px-4 py-8">
          <img
            src="https://i.pinimg.com/736x/12/61/90/1261906eb08d214379c8b884bb795682.jpg"
            alt="QuitNow Illustration"
            className="mx-auto mb-6 w-48 sm:w-64"
          />
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
            Partner with Us to Transform Lives and Create Healthier Communities
          </h1>
          <p className="text-gray-600 mb-6">
            Join forces to help more people quit smoking and improve public
            health
          </p>
        </div>

        <section className="bg-blue-400 py-8 w-full">
          <div className="px-4 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
              {/* Text Section */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="text-xl font-bold mb-3 text-white">
                  Let's explore Partnership Opportunities
                </h2>
                <p className="text-white mb-3 text-sm leading-relaxed">
                  Whether you're interested in collaborating with QuitNow or have
                  ideas for how we can work together, we'd love to hear from you.
                  Fill out the form below, and one of our team members will be in
                  touch to discuss how we can create impactful initiatives to help
                  people quit smoking.
                </p>
                <p className="text-white text-sm">
                  We're open to all partnership possibilities—let's see how we can
                  make a difference together!
                </p>
              </div>

              {/* Form Section */}
              <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
                <form className="bg-white p-6 rounded-lg shadow-md text-gray-800">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder="Message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-vertical"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-start text-xs text-gray-600">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="leading-tight">
                        I agree to the QuitNow{" "}
                        <a href="#" className="text-green-600 hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-green-600 hover:underline">
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2.5 rounded-md hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PartnershipPage;