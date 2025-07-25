import BlogSection from './components/BlogSection';

import Navbar from './components/Navbar.jsx';
import HeroSection from './components/heroSection.jsx';
import Skills from './components/skills.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ContactSection from './components/ContactSection.jsx';

export default function App() {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <HeroSection />
        <Skills />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </div>
    )
}
