import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Eye } from 'lucide-react';
import porfolioImage from '../assets/images/portfolio_screen.svg'

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        name: "E-Commerce Platform",
        description: "A modern e-commerce platform built with React and Node.js, featuring real-time inventory management and secure payment processing.",
        image: null, 
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/adam-elmekadem",
        category: "Web Development"
    },
    {
        id: 2,
        name: "Portfolio Website",
        description: "Interactive portfolio showcase with advanced GSAP animations and sophisticated card game mechanics.",
        image: porfolioImage,
        tech: ["React", "GSAP", "Tailwind CSS", "Vite"],
        liveUrl: "https://posting-smtp-behavioral-transition.trycloudflare.com",
        githubUrl: "https://github.com/Adam-Elmekadem/My-Portolio-Web-Site",
        category: "Web Development"
    },
    {
        id: 3,
        name: "Brand Identity Design",
        description: "Complete brand identity package including logo, business cards, and marketing materials for small businesses.",
        image: null, 
        tech: ["Photoshop", "Illustrator", "Figma"],
        liveUrl: "https://dribbble.com/adam-elmekadem",
        githubUrl: null,
        category: "Graphic Design"
    },
    {
        id: 4,
        name: "Social Media Posters",
        description: "Modern social media posters design with vibrant colors and engaging visuals.",
        image: null, 
        tech: ["Illustrator", "Photoshop"],
        liveUrl: "https://dribbble.com/adam-elmekadem",
        githubUrl: null,
        category: "UI/UX Design"
    },
    {
        id: 5,
        name: "Certi-Ease",
        description: "A School certifications (Medical Certification / school Certification ) management platform for organizations.",
        image: null,
        tech: ["Html", "Css / Bootstrap", "Javascript", "PHP"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/Adam-Elmekadem/CertifyEase",
        category: "Management System"
    }
];

export default function ProjectsSection() {
    const sectionRef = useRef(null);
    const blackHoleRef = useRef(null);
    const projectNamesRef = useRef([]);
    const [hoveredProject, setHoveredProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const hoverTimeoutRef = useRef(null);

    // Check if device is mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const blackHole = blackHoleRef.current;
        const projectNames = projectNamesRef.current;

        ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
                setIsVisible(true);
                
                if (!isMobile) {
                    gsap.fromTo(blackHole,
                        { scale: 0, rotation: 0 },
                        { 
                            scale: 1, 
                            rotation: 360,
                            duration: 1.5, 
                            ease: "power3.out" 
                        }
                    );
                }

                projectNames.forEach((name, index) => {
                    if (name) {
                        gsap.fromTo(name,
                            { 
                                opacity: 0, 
                                scale: 0,
                                y: isMobile ? 30 : 0
                            },
                            { 
                                opacity: 1, 
                                scale: 1,
                                y: 0,
                                duration: 0.8,
                                delay: 0.5 + index * 0.1,
                                ease: "back.out(1.7)"
                            }
                        );
                    }
                });
            }
        });

        if (isVisible && !isMobile && blackHole) {
            gsap.to(blackHole, {
                rotation: "+=360",
                duration: 20,
                ease: "none",
                repeat: -1
            });

            projectNames.forEach((name, index) => {
                if (name) {
                    gsap.to(name, {
                        y: "+=10",
                        duration: 2 + index * 0.3,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true
                    });
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, [isVisible, isMobile]);

    const handleProjectHover = (project) => {
        if (isMobile) return;
        
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setHoveredProject(project);
    };

    const handleProjectLeave = () => {
        if (isMobile) return;
        
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredProject(null);
        }, 300);
    };

    const handlePanelEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
    };

    const handlePanelLeave = () => {
        setHoveredProject(null);
    };

    const handleMobileProjectClick = (project) => {
        if (isMobile) {
            setSelectedProject(selectedProject?.id === project.id ? null : project);
        }
    };

    const getProjectSide = (project) => {
        if (isMobile) return 'center';
        
        const projectIndex = projects.findIndex(p => p.id === project.id);
        const position = getOrbitalPosition(projectIndex, projects.length);
        const xPosition = parseFloat(position.x);
        
        return xPosition < 50 ? 'left' : 'right';
    };

    const getOrbitalPosition = (index, total) => {
        let angle = (index / total) * 2 * Math.PI;
        let x, y;
        const radius = 280;
        const centerX = 50;
        const centerY = 50;
        const adjustedRadius = index === 4 ? 270 : radius;
        
        if (index === 4) {
            x = centerX + (Math.cos(-Math.PI / 2) * adjustedRadius / 10) + 20;
            y = centerY + (Math.sin(-Math.PI / 2) * adjustedRadius / 10);
        } else {
            x = centerX + (Math.cos(angle) * adjustedRadius / 10);
            y = centerY + (Math.sin(angle) * adjustedRadius / 10);
        }
        return { x: `${x}%`, y: `${y}%` };
    };

    const MobileProjectCard = ({ project, isSelected, onClick }) => (
        <div 
            className="bg-black/80 backdrop-blur-sm border border-white/30 rounded-2xl p-4 mb-4 cursor-pointer transition-all duration-300 hover:border-white/50"
            onClick={() => onClick(project)}
        >
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="text-lg font-bold text-white">{project.name}</h3>
                    <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full border border-white/20 mt-1 inline-block">
                        {project.category}
                    </span>
                </div>
                <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden">
                    {project.image ? (
                        <img 
                            src={project.image} 
                            alt={project.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 flex items-center justify-center">
                            <div className="text-white font-bold text-sm">
                                {project.name.split(' ').map(word => word[0]).join('')}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Expandable Content */}
            {isSelected && (
                <div className="mt-4 space-y-4 animate-fade-in">
                    <div className="relative w-full h-32 rounded-xl overflow-hidden">
                        {project.image ? (
                            <img 
                                src={project.image} 
                                alt={project.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-white font-bold text-2xl mb-1">
                                        {project.name.split(' ').map(word => word[0]).join('')}
                                    </div>
                                    <div className="text-gray-300 text-xs font-medium">
                                        {project.category}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {project.description}
                    </p>

                    <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, index) => (
                                <span 
                                    key={index}
                                    className="text-xs text-gray-300 bg-gray-800/50 px-2 py-1 rounded border border-gray-700"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <a 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium"
                        >
                            <Eye className="w-4 h-4" />
                            View Live
                        </a>
                        {project.githubUrl && (
                            <a 
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 border border-white/30 hover:border-white/50 text-gray-300 hover:text-white py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium hover:bg-white/10"
                            >
                                <Github className="w-4 h-4" />
                                Code
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <section 
            ref={sectionRef}
            className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 sm:px-8 py-16 relative overflow-hidden"
            id="projects"
        >
            <div className="pointer-events-none absolute inset-0 z-0">
                {[...Array(isMobile ? 10 : 20)].map((_, i) => {
                    const top = Math.random() * 100;
                    const left = Math.random() * 100;
                    const size = Math.random() * 2 + 1;
                    const duration = 2 + Math.random() * 3;
                    const delay = Math.random() * 3;
                    const isNeon = i % 5 === 0;
                    return (
                        <div
                            key={i}
                            style={{
                                top: `${top}%`,
                                left: `${left}%`,
                                width: `${size}px`,
                                height: `${size}px`,
                                animationDuration: `${duration}s`,
                                animationDelay: `${delay}s`,
                            }}
                            className={
                                `absolute rounded-full animate-star-twinkle ` +
                                (isNeon
                                    ? 'bg-white opacity-90 neon-star-glow'
                                    : 'bg-white/80 opacity-70 shadow-white/40 shadow-md')
                            }
                        />
                    );
                })}
            </div>


            <div className="absolute top-8 sm:top-16 left-1/2 transform -translate-x-1/2 z-10 px-4">
                <h2 className="text-2xl sm:text-4xl font-bold text-white text-center mb-2 sm:mb-4">
                    My Projects
                </h2>
                <p className="text-gray-300 min-w-2xl text-center text-sm sm:text-base px-4">
                    {isMobile 
                        ? "Explore my creative projects and innovations"
                        : "Explore my creative universe where each project orbits around innovation and design excellence"
                    }
                </p>
            </div>

            {/* Mobile Layout */}
            {isMobile ? (
                <div className="w-full max-w-md mx-auto mt-10 z-20">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={el => projectNamesRef.current[index] = el}
                        >
                            <MobileProjectCard 
                                project={project}
                                isSelected={selectedProject?.id === project.id}
                                onClick={handleMobileProjectClick}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                /* Desktop Layout */
                <div className="relative w-full max-w-6xl h-[600px] mx-auto">
                    
                    {/* Black Hole Center */}
                    <div 
                        ref={blackHoleRef}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                        <div className="relative w-32 h-32">
                            <div className="absolute inset-0 rounded-full bg-white/30 opacity-30 blur-xl animate-pulse"></div>
                            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-white/50 via-gray-300/50 to-white/50 opacity-60 blur-md"></div>
                            <div className="absolute inset-4 rounded-full bg-black shadow-2xl border-2 border-white/30 animate-neon-pulse"></div>
                            <div className="absolute inset-8 rounded-full bg-white animate-intense-glow"></div>
                            <div className="absolute inset-9 rounded-full bg-white/90 blur-sm animate-pulse"></div>
                            <div className="absolute inset-10 rounded-full border-2 border-white animate-neon-pulse"></div>
                            <div className="absolute inset-11 rounded-full bg-white animate-ping opacity-90"></div>
                        </div>
                    </div>

                    {/* Orbital Ring */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] border border-white/20 rounded-full animate-spin-slow"></div>

                    {projects.map((project, index) => {
                        const position = getOrbitalPosition(index, projects.length);
                        
                        return (
                            <div
                                key={project.id}
                                ref={el => projectNamesRef.current[index] = el}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
                                style={{
                                    left: position.x,
                                    top: position.y,
                                }}
                                onMouseEnter={() => handleProjectHover(project)}
                                onMouseLeave={handleProjectLeave}
                            >
                                <div className="relative">
                                    {/* Project Name */}
                                    <div className="px-6 py-3 bg-black/80 backdrop-blur-sm border border-white/30 rounded-full hover:border-white/50 transition-all duration-300 hover:shadow-lg hover:shadow-white/25 group-hover:scale-110">
                                        <span className="text-white font-semibold text-sm whitespace-nowrap group-hover:text-gray-200 transition-colors duration-300">
                                            {project.name}
                                        </span>
                                    </div>

                                    {/* Connecting Line to Center */}
                                    <div className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-r from-white/30 to-transparent group-hover:from-white/50 transition-colors duration-300"
                                         style={{
                                             height: index === 4 ? '270px' : '280px',
                                             transform: `rotate(${(index / projects.length) * 360 + 180}deg)`,
                                             transformOrigin: 'top center'
                                         }}>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {hoveredProject && (
                        <div 
                            className={`fixed top-1/2 transform -translate-y-1/2 w-96 bg-black/90 backdrop-blur-lg border border-white/30 rounded-2xl p-6 z-50 shadow-2xl shadow-white/20 ${
                                getProjectSide(hoveredProject) === 'left' ? 'left-8' : 'right-8'
                            }`}
                            onMouseEnter={handlePanelEnter}
                            onMouseLeave={handlePanelLeave}
                        >
                            {/* Project Image */}
                            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                                {hoveredProject.image ? (
                                    <img 
                                        src={hoveredProject.image} 
                                        alt={hoveredProject.name}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-white font-bold text-4xl mb-2">
                                                {hoveredProject.name.split(' ').map(word => word[0]).join('')}
                                            </div>
                                            <div className="text-gray-300 text-sm font-medium">
                                                {hoveredProject.category}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{hoveredProject.name}</h3>
                                    <span className="text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                                        {hoveredProject.category}
                                    </span>
                                </div>

                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {hoveredProject.description}
                                </p>

                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-2">Technologies:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {hoveredProject.tech.map((tech, index) => (
                                            <span 
                                                key={index}
                                                className="text-xs text-gray-300 bg-gray-800/50 px-2 py-1 rounded border border-gray-700"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <a 
                                        href={hoveredProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium hover:shadow-lg hover:shadow-white/25 hover:scale-105 border border-white"
                                    >
                                        <Eye className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                                        View Live
                                    </a>
                                    {hoveredProject.githubUrl && (
                                        <a 
                                            href={hoveredProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 border border-white/30 hover:border-white/50 text-gray-300 hover:text-white py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium hover:bg-white/10 hover:shadow-lg hover:shadow-white/25 hover:scale-105 group"
                                        >
                                            <Github className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                                            Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/50 rounded-full animate-ping opacity-30"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse opacity-40"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce opacity-25"></div>
            </div>
        </section>
    );
}