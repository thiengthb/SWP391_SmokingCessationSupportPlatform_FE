import React from 'react';
import Footer from '../components/template/home/footer';
import Header from '../components/template/home/header';
const InsurersPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <Header />
      <main className="flex-grow bg-gray-100 py-8">
        <div className="text-center max-w-6xl mx-auto px-4">
          <img
            src="https://i.pinimg.com/736x/12/61/90/1261906eb08d214379c8b884bb795682.jpg" // Thay bằng hình minh họa nhân vật thực tế
            alt="QuitNow Illustration"
            className="mx-auto mb-6 w-48 sm:w-64"
          />
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
            Empower your clients to quit smoking with our proven solution
          </h1>
          <p className="text-gray-600 mb-6">
            Enhance client health and reduce insurance claims with our quit smoking app
          </p>
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800">Reduced health claims</h2>
              <p className="text-gray-600">
                Partnering with QuitNow can significantly reduce health claims related to smoking-related illnesses. Quitting smoking reduces risks of diseases such as cardiovascular issues, COPD, and various cancers. Studies from sources like the Surgeon General's Report show that quitting smoking before age 40 reduces the risk of premature death by 90%. With over 10 million downloads and a recommendation from the WHO, QuitNow has a proven track record in promoting healthier lifestyles, reducing health claims for insurers.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">Improved client health</h2>
              <p className="text-gray-600">
                QuitNow empowers clients to quit smoking through a supportive community, enhancing their overall health. Healthier clients mean fewer chronic illnesses and lower medical expenses. The CDC reports that within a year of quitting, the risk of coronary heart disease drops by half, and lung function improves within weeks. This improvement in health strengthens clients' relationships with their insurance providers.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">Cost savings</h2>
              <p className="text-gray-600">
                QuitNow helps insurance companies save on smoking-related healthcare costs, which exceed $300 billion annually in the U.S., according to the Surgeon General's Report. By supporting clients in quitting smoking, insurers can lower these expenses. QuitNow's recognition as "App of the Day" on the App Store on multiple occasions highlights its effectiveness and popularity, contributing to financial savings through reduced health claims.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">Brand reputation</h2>
              <p className="text-gray-600">
                Aligning with QuitNow enhances an insurer's reputation as a health-conscious provider. Being associated with a WHO-recommended app that has gained widespread recognition positions your company as a leader in preventive healthcare. This partnership attracts health-conscious clients and fosters loyalty among existing ones, demonstrating a commitment to their well-being, as noted by the National Cancer Institute and the American Cancer Society.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InsurersPage;