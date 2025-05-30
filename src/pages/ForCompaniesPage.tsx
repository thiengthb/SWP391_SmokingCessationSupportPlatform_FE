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
            Boost Employee Health and Productivity
          </h1>
          <p className="text-gray-600 mb-6">
            Invest in your workforce's well-being and reduce healthcare costs
          </p>
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                Improved Workplace Environment
              </h2>
              <p className="text-gray-600">
                A smoke-free workforce creates a healthier workplace
                environment, reducing exposure to secondhand smoke and improving
                overall air quality. This leads to higher employee morale and
                satisfaction (NIOSH). Promoting a smoke-free environment
                demonstrates a company’s commitment to health and safety,
                fostering a positive corporate culture.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                Enhanced Employee Well-being
              </h2>
              <p className="text-gray-600">
                Quitting smoking significantly improves employee health,
                reducing risks of heart disease, stroke, and respiratory issues.
                Within a year of quitting, the risk of coronary heart disease
                drops by half (American Cancer Society). Healthier employees are
                more engaged and have higher morale, leading to better
                performance and lower turnover rates.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                Increased Productivity
              </h2>
              <p className="text-gray-600">
                Employees who quit smoking are more productive and take fewer
                sick days. Smokers are absent from work an average of 2.6 more
                days per year than non-smokers (CDC). Tobacco use is also a
                leading cause of presenteeism, where employees are present but
                not fully productive (American Productivity Audit). By helping
                employees quit, companies can reduce absenteeism and
                presenteeism, enhancing overall productivity.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                Lower Healthcare Costs
              </h2>
              <p className="text-gray-600">
                Supporting smoking cessation can lead to substantial cost
                savings. Smoking-related illnesses cost the U.S. over $300
                billion annually, including nearly $170 billion for direct
                medical care and over $156 billion in lost productivity (CDC).
                Reducing smoking rates among employees can significantly lower
                health insurance premiums and related healthcare expenses,
                benefiting a company’s bottom line.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                Seamless Integrations with Top Health Providers
              </h2>
              <p className="text-gray-600">
                QuitNow has extensive experience integrating with third-party
                health providers like Workplace Options (WPO) and OpenLoop,
                enhancing our ability to offer comprehensive support and
                resources for a seamless user experience. We are also ready and
                willing to integrate with any additional partners you may have,
                ensuring a tailored and effective smoking cessation solution.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default ForCompaniesPage;
