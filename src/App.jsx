
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/heroSection.jsx';
import Skills from './components/skills.jsx';
import States from './practicing/Sates.jsx';

export default function App() {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <HeroSection />
        <Skills />
        {/* <States /> */}
      </div>
    )
}
