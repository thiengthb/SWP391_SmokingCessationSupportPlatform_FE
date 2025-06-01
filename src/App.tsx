import Hero from "./components/template/home/hero";
import Section from "./components/template/home/section";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Section
        title="Community Support"
        description="Connect with others on the same journey. Share experiences, tips, and motivation in our supportive community chat."
      />
      <Section
        title="Track Your Progress"
        description="Monitor your smoke-free days, health improvements, and money saved. Every milestone counts!"
        background="bg-gray-100"
      />
      <Section
        title="Leaderboard Champions"
        description="Compete with others, earn achievements, and climb the ranks. See who's leading the smoke-free challenge!"
      />
      <Section
        title="Expert Insights"
        description="Access professional advice, success stories, and helpful tips through our curated blog articles"
        background="bg-gray-100"
      />
      <Section
        title="Health Journey Timeline"
        description="Visualize your body's recovery progress and celebrate health improvements at each stage"
      />
      <Section
        title="Join Our Growing Community"
        description="Take the first step towards a healthier life with thousands of others"
        background="bg-gray-100"
      >
        <div className="flex flex-col space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <h3 className="text-2xl font-bold text-gray-700">50K+</h3>
              <p>Active Members</p>
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-bold text-gray-700">1M+</h3>
              <p>Smoke-free Days</p>
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-bold text-gray-700">95%</h3>
              <p>Success Rate</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/register"
              className="bg-black text-white px-8 py-3 rounded-full flex items-center justify-center hover:bg-gray-800 text-base font-semibold"
            >
              Start Your Journey
            </a>
            <a
              href="/community"
              className="bg-black text-white px-8 py-3 rounded-full flex items-center justify-center hover:bg-gray-800 text-base font-semibold"
            >
              Explore Community
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default App;
