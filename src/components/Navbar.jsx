import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');

    const navItems = [
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'about', label: 'Skills', href: '#skills' },
        { id: 'projects', label: 'Projects', href: '#projects' },
        { id: 'blog', label: 'Blog', href: '#blog' },
        { id: 'contact', label: 'Contact', href: '#contact' }
    ];

    return (
        <header role="banner" className="bg-black/90 border-b border-gray-800 py-4 px-26 backdrop-blur-sm">
            <nav role="navigation" aria-label="Main navigation" className="container mx-auto flex justify-between items-center text-white">
                <div className="text-xl font-bold">
                    <a href="#home" 
                       aria-label="Shino - Go to homepage" 
                       className={`transition-colors duration-200 ${activeSection === 'home' ? 'text-white' : 'hover:text-gray-300'}`}
                       onClick={() => setActiveSection('home')}>
                        Shino.
                    </a>
                </div>
                <ul className="flex space-x-4" role="menubar">
                    {navItems.map((item) => (
                        <li key={item.id} role="none">
                            <a href={item.href} 
                               role="menuitem" 
                               aria-label={`Navigate to ${item.label} section`}
                               className={`px-2 py-1 transition-colors duration-200 ${
                                   activeSection === item.id 
                                       ? 'text-white border-b border-white' 
                                       : 'hover:text-gray-300'
                               }`}
                               onClick={() => setActiveSection(item.id)}>
                                {item.label}
                            </a>
                        </li>
                    ))}

                </ul>
                
                <div>
                    <a href="#contact" 
                       className="bg-white text-black px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 hover:gap-3 group hover:shadow-lg hover:shadow-white/25 hover:bg-gray-100">
                        <span>Hire Me</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                </div>
            </nav>
        </header>
    );
}