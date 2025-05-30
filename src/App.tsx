import { ModeToggle } from './components/theme/theme-toggle';
import Header from './components/template/home/header';
import Hero from './components/template/home/hero';
import Section from './components/template/home/section';
import Footer from './components/template/home/footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Section
        title="Share the journey"
        description="Quitting smoking is easier with buddies who share your experiences"
      />
      <Section
        title="Small achievements, big goals"
        description="With every step, your task of quitting smoking gets closer"
        background="bg-blue-200"
      />
      <Section
        title="Recover your health"
        description="Celebrate your accomplishment and all it brings"
      />
      <Section
        title="Over 10 million downloads"
        description=""
        background="bg-blue-200"
      >
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-800 text-sm sm:text-base"
          >
            <span>Download on the</span>
            <span className="font-bold">App Store</span>
          </a>
          <a
            href="#"
            className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-800 text-sm sm:text-base"
          >
            <span>Get it on</span>
            <span className="font-bold">Google Play</span>
          </a>
        </div>
      </Section>
    </div>
  );
}

export default App;