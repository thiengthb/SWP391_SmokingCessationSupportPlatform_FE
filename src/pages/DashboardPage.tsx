import React from "react";
import calendar from "../assets/images/calendar.png";
import cigarette from "../assets/images/cigarette.png";
import money from "../assets/images/money.png";
import clock from "../assets/images/clock.png";
import community from "../assets/images/community.png";

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="fixed bottom-0 left-0 w-full bg-green-600 text-white p-2 text-center z-10">
        <span>Upgrade QuitNow</span>
        <span className="ml-2">
          Improve your health + Create your own goals + Unlimited access to the
          community + Forget the advertising
        </span>
      </div>

      <main className="flex-grow pt-16 pb-16">
        <div className="text-center max-w-4xl mx-auto px-4 py-8">
          <img
            src="https://i.pinimg.com/736x/12/61/90/1261906eb08d214379c8b884bb795682.jpg"
            alt="QuitNow Illustration"
            className="mx-auto mb-6 w-48 sm:w-64"
          />
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Welcome to Your QuitNow Dashboard
          </h1>
          <p className="text-gray-400 mb-6">
            Track your progress and stay motivated on your journey to a
            smoke-free life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 flex flex-col gap-6 mb-6">
          <a
            href="/overall-progress"
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700"
          >
            <h2 className="text-lg font-bold mb-4">Overall Progress</h2>
            <div className="flex justify-around text-center">
              <div>
                <img
                  src={calendar}
                  alt="Days Icon"
                  className="mx-auto mb-1 w-10 h-10"
                />
                <p className="text-lg text-white-400 font-bold">0</p>
                <p className="text-lg text-gray-400">days quit</p>
                
              </div>
              <div>
                <img
                  src={cigarette}
                  alt="Cigarettes Icon"
                  className="mx-auto mb-1 w-10 h-10"
                />
                <p className="text-lg text-white-400 font-bold">0</p>
                <p className="text-lg text-gray-400">cigarettes avoided</p>
                
              </div>
              <div>
                <img
                  src={money}
                  alt="Money Icon"
                  className="mx-auto mb-1 w-10 h-10"
                />
                <p className="text-lg text-white-400 font-bold">0.75</p>
                <p className="text-lg text-gray-400">dong saved</p>
                
              </div>
              <div>
                <img
                  src={clock}
                  alt="Time Won Icon"
                  className="mx-auto mb-1 w-10 h-10"
                />
                <p className="text-lg text-white-400 font-bold">4m</p>
                <p className="text-lg text-gray-400">won back</p>
              </div>
            </div>
          </a>

          <a
            href="/community"
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700"
          >
            <h2 className="text-lg font-bold mb-2">Community</h2>
            <div className="text-left flex items-center">
              <img
                src={community}
                alt="Community Icon"
                className="mr-3 w-20 h-20" 
              />
              <div>
                <p className="text-sm text-gray-400">swpteam</p>
                <p className="text-sm text-gray-400">dafda</p>
              </div>
            </div>
          </a>
          <a
            href="/achievements"
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700"
          >
            <h2 className="text-lg font-bold mb-2">Achievements</h2>
            <div className="flex justify-between">
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Achievement 1"
                  className="mx-auto mb-1"
                />
                <p className="text-xs">To infinity and b...</p>
                <p className="text-xs text-gray-400">5 cigarettes avoided</p>
              </div>
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Achievement 2"
                  className="mx-auto mb-1"
                />
                <p className="text-xs">First cross on th...</p>
                <p className="text-xs text-gray-400">1 day without smoking</p>
              </div>
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Achievement 3"
                  className="mx-auto mb-1"
                />
                <p className="text-xs">Superpowers</p>
                <p className="text-xs text-gray-400">1 hour of life regained</p>
              </div>
            </div>
            <a
              href="/see-all-achievements"
              className="text-green-500 text-xs mt-2 block text-center"
            >
              See all achievements
            </a>
          </a>

          {/* Health Improvements */}
          <a
            href="/health-improvements"
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700"
          >
            <h2 className="text-lg font-bold mb-2">Health Improvements</h2>
            <div className="text-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Health Icon"
                className="mx-auto mb-1"
              />
              <p className="text-xs text-gray-400">
                Your heart rate and blood pressure drop
              </p>
            </div>
          </a>

          {/* Beat Your Cravings */}
          <a
            href="/beat-your-cravings"
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700"
          >
            <h2 className="text-lg font-bold mb-2">Beat Your Cravings</h2>
            <div className="text-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Cravings Icon"
                className="mx-auto mb-1"
              />
              <p className="text-xs text-gray-400">
                Small changes to your lifestyle to help you beat the temptation
                to light up
              </p>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
