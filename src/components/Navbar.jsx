import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'about', label: 'Skills', href: '#skills' },
        { id: 'projects', label: 'Projects', href: '#projects' },
        { id: 'blog', label: 'Blog', href: '#blog' },
        { id: 'contact', label: 'Contact', href: '#contact' }
    ];

    const handleNavClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsMobileMenuOpen(false); // Close mobile menu when item is clicked
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header role="banner" className="py-4 px-4 md:px-8 lg:px-26 backdrop-blur-sm fixed w-full top-0 z-50">
            <nav role="navigation" aria-label="Main navigation" className="container mx-auto flex justify-between items-center text-white relative">
                {/* Logo */}
                <div className="text-xl font-bold z-50">
                    <a href="#home" 
                       aria-label="Shino - Go to homepage" 
                       className={`transition-colors duration-200 ${activeSection === 'home' ? 'text-white' : 'hover:text-gray-300'}`}
                       onClick={() => handleNavClick('home')}>
                        Shino.
                    </a>
                </div>

                {/* Desktop Navigation - Centered */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                    <ul className="flex space-x-6 lg:space-x-8" role="menubar">
                        {navItems.map((item) => (
                            <li key={item.id} role="none">
                                <a href={item.href} 
                                   role="menuitem" 
                                   aria-label={`Navigate to ${item.label} section`}
                                   className={`px-3 py-2 transition-colors duration-200 ${
                                       activeSection === item.id 
                                           ? 'text-white border-b border-white' 
                                           : 'hover:text-gray-300'
                                   }`}
                                   onClick={() => handleNavClick(item.id)}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Desktop CTA Button - Right aligned */}
                <div className="hidden md:flex items-center">
                    <a href="#contact" 
                       className="bg-white text-black px-4 py-2 lg:px-6 lg:py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 hover:gap-3 group hover:shadow-lg hover:shadow-white/25 hover:bg-gray-100 text-sm lg:text-base">
                        <span>Hire Me</span>
                        <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 z-50"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Mobile Menu */}
                <div className={`fixed top-0 right-0 h-full w-full max-w-xs bg-black/90 backdrop-blur-xl border-l border-white/10 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    <div className="flex flex-col h-full pt-20 px-2">
                        <div className="bg-black/95 rounded-2xl p-4 flex-1 flex flex-col justify-start">
                            {/* Mobile Navigation Items */}
                            <ul className="flex flex-col space-y-4" role="menubar">
                                {navItems.map((item, index) => (
                                    <li key={item.id} role="none" 
                                        className={`transform transition-all duration-300 ${
                                            isMobileMenuOpen 
                                                ? 'translate-x-0 opacity-100' 
                                                : 'translate-x-8 opacity-0'
                                        }`}
                                        style={{ transitionDelay: `${index * 50}ms` }}>
                                        <a href={item.href} 
                                           role="menuitem" 
                                           aria-label={`Navigate to ${item.label} section`}
                                           className={`block text-lg font-medium py-4 px-5 rounded-xl transition-all duration-200 bg-black/70 border border-white/10 ${
                                               activeSection === item.id 
                                                   ? 'text-white bg-white/20 border-white/30 shadow-lg shadow-white/10' 
                                                   : 'text-gray-300 hover:text-white hover:bg-white/15 hover:border-white/20 hover:shadow-md hover:shadow-white/5'
                                           }`}
                                           onClick={() => handleNavClick(item.id)}>
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            {/* Mobile CTA Button */}
                            <div className={`mt-4 mb-8 transform transition-all duration-300 ${
                                isMobileMenuOpen 
                                    ? 'translate-y-0 opacity-100' 
                                    : 'translate-y-4 opacity-0'
                            }`}
                            style={{ transitionDelay: '250ms' }}>
                                <a href="#contact" 
                                   onClick={() => setIsMobileMenuOpen(false)}
                                   className="bg-white/90 backdrop-blur-sm text-black px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:gap-3 group hover:shadow-lg hover:shadow-white/25 hover:bg-white border border-white/20 w-full">
                                    <span>Hire Me</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}