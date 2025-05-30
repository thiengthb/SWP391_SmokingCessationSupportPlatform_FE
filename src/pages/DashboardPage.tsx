import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import calendar from "../assets/images/calendar.png";
import cigarette from "../assets/images/cigarette.png";
import money from "../assets/images/money.png";
import clock from "../assets/images/clock.png";
import community from "../assets/images/community.png";
import achievement1 from "../assets/images/achievement1.png";
import achievement2 from "../assets/images/achievement2.png";
import achievement3 from "../assets/images/achievement3.png";
import achievement4 from "../assets/images/achievement4.png";
import healthcare from "../assets/images/healthcare.png";
import cravings from "../assets/images/craving.png";
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
          {/* Overall Progress */}
          <a href="/overall-progress" className="block no-underline">
            <Card className="bg-gray-800 hover:bg-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-bold mb-4">
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around text-center">
                  <div>
                    <img
                      src={calendar}
                      alt="Days Icon"
                      className="mx-auto mb-1 w-10 h-10"
                    />
                    <p className="text-sm text-gray-400">0 days quit</p>
                  </div>
                  <div>
                    <img
                      src={cigarette}
                      alt="Cigarettes Icon"
                      className="mx-auto mb-1 w-10 h-10"
                    />
                    <p className="text-sm text-gray-400">
                      0 cigarettes avoided
                    </p>
                  </div>
                  <div>
                    <img
                      src={money}
                      alt="Money Icon"
                      className="mx-auto mb-1 w-10 h-10"
                    />
                    <p className="text-sm text-gray-400">0.75 dong saved</p>
                  </div>
                  <div>
                    <img
                      src={clock}
                      alt="Time Won Icon"
                      className="mx-auto mb-1 w-10 h-10"
                    />
                    <p className="text-sm text-gray-400">4m won back</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>

          {/* Community */}
          <a href="/community" className="block no-underline">
            <Card className="bg-gray-800 hover:bg-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-bold mb-2">
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-left flex items-start">
                  <img
                    src={community}
                    alt="Community Icon"
                    className="mr-3 w-20 h-20"
                  />
                  <div>
                    <p className="text-sm text-gray-400">hmhintam</p>
                    <p className="text-sm text-gray-400">i need to smoke</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>

          {/* Achievements */}
          <a href="/achievements" className="block no-underline">
            <Card className="bg-gray-700 hover:bg-gray-600">
              <CardHeader className="flex items-center justify-between mb-4">
                <CardTitle className="text-lg font-bold">
                  Achievements
                </CardTitle>
                <Button
                  variant="link"
                  className="text-green-500 text-xs p-0 h-auto"
                >
                  <a href="/see-all-achievements">See all</a>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around">
                  <a
                    href="/achievement/first-cross"
                    className="bg-gray-600 p-2 rounded-lg hover:brightness-125 transition-all"
                  >
                    <div className="text-center">
                      <img
                        src={achievement1}
                        alt="First Cross Icon"
                        className="mx-auto mb-1 w-12 h-12"
                      />
                      <p className="text-xs text-gray-400">
                        First cross on th...
                      </p>
                      <p className="text-xs text-gray-400">
                        1 day without smoking
                      </p>
                    </div>
                  </a>
                  <a
                    href="/achievement/superpowers"
                    className="bg-gray-600 p-2 rounded-lg hover:brightness-125 transition-all"
                  >
                    <div className="text-center">
                      <img
                        src={achievement2}
                        alt="Superpowers Icon"
                        className="mx-auto mb-1 w-12 h-12"
                      />
                      <p className="text-xs text-gray-400">Superpowers</p>
                      <p className="text-xs text-gray-400">
                        1 hour of life regained
                      </p>
                    </div>
                  </a>
                  <a
                    href="/achievement/piggy-bank"
                    className="bg-gray-600 p-2 rounded-lg hover:brightness-125 transition-all"
                  >
                    <div className="text-center">
                      <img
                        src={achievement3}
                        alt="Piggy Bank Icon"
                        className="mx-auto mb-1 w-12 h-12"
                      />
                      <p className="text-xs text-gray-400">Piggy bank</p>
                      <p className="text-xs text-gray-400">10 đ saved</p>
                    </div>
                  </a>
                  <a
                    href="/achievement/saturday-night"
                    className="bg-gray-600 p-2 rounded-lg hover:brightness-125 transition-all"
                  >
                    <div className="text-center">
                      <img
                        src={achievement4}
                        alt="Saturday Night Icon"
                        className="mx-auto mb-1 w-12 h-12"
                      />
                      <p className="text-xs text-gray-400">
                        Saturday night f...
                      </p>
                      <p className="text-xs text-gray-400">
                        10 cigarettes avoided
                      </p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </a>

          {/* Health Improvements */}
          <a href="/health-improvements" className="block no-underline">
            <Card className="bg-gray-800 hover:bg-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white mb-4">
                  Health Improvements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <img
                    src={healthcare}
                    alt="Health Icon"
                    className="mr-4 w-20 h-20 flex-shrink-0"
                  />
                  <p className="text-white text-lg font-medium">
                    The carbon monoxide level in your blood drops to normal
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>

          {/* Beat Your Cravings */}
          <a href="/beat-your-cravings" className="block no-underline">
            <Card className="bg-gray-800 hover:bg-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white mb-4">
                  Beat Your Cravings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <img
                    src={cravings}
                    alt="Cravings Icon"
                    className="mr-4 w-20 h-20 flex-shrink-0"
                  />
                  <p className="text-white text-lg font-medium">
                    Small changes to your lifestyle to help you beat the
                    temptation to light up
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
