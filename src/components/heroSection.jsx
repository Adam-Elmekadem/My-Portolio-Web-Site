import { ExternalLink, Linkedin, Github, Dribbble } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import wiframe from '../assets/images/wireframe.jpg'
import nature from '../assets/images/nature.jpg'
import simple from '../assets/images/simple_photo.jpg'

export default function HeroSection() {
    const titleRef = useRef(null);
    const paragraphRef = useRef(null);
    const socialRef = useRef(null);
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Animation du titre
        tl.fromTo(titleRef.current, 
            { opacity: 0, y: 50, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
        )
        // Animation du paragraphe
        .fromTo(paragraphRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.5"
        )
        .fromTo(socialRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.3"
        )
        // Animation des cartes - entrée avec rotations initiales
        .fromTo([card1Ref.current, card2Ref.current, card3Ref.current],
            { opacity: 0, scale: 0.8 },
            { 
                opacity: 1, 
                scale: 1, 
                rotation: (index) => [12, 6, 0][index],
                duration: 1.2, 
                ease: "back.out(1.7)",
                stagger: 0.2
            },
            "-=0.8"
        );

        // Gestion des hovers avec GSAP
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
        const initialRotations = [12, 6, 0];

        cards.forEach((card, index) => {
            if (card) {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        scale: 1.05,
                        rotation: 0,
                        y: -16,
                        zIndex: 50,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        scale: 1,
                        rotation: initialRotations[index],
                        y: 0,
                        zIndex: [10, 20, 30][index],
                        duration: 0.5,
                        ease: "power2.out"
                    });
                });
            }
        });

        // Cleanup
        return () => {
            cards.forEach((card) => {
                if (card) {
                    card.removeEventListener('mouseenter', () => {});
                    card.removeEventListener('mouseleave', () => {});
                }
            });
        };

    }, []);
    
    return (
        <main className="flex-1 bg-black" id="home">
            <section className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-26 gap-16">
                <div className="text-white w-3/5 flex flex-col justify-center pr-16">
                    <h1 ref={titleRef} className="text-5xl font-bold text-white leading-tight">Turning Ideas into Visual Stories</h1>
                    <p ref={paragraphRef} className="mt-4 text-lg text-gray-300">I'm <span className="text-white font-bold border-b-2 border-white animate-pulse">Adam Elmekadem</span>, a graphic designer and web developer from Morocco.
                            I create clean, creative visuals and bring ideas to life through design and code.</p>

                    <div ref={socialRef} className="mt-8">
                        <h4 className="text-xl font-semibold flex items-center gap-2 text-white">
                            <ExternalLink className="w-5 h-5" />
                            My Social Media
                        </h4>
                        <ul className="list-inside flex space-x-6 mt-4">
                            <li>
                                <a href="https://www.linkedin.com/in/adam-elmekadem" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   className="text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 group px-4 py-2 rounded-lg border border-gray-600 hover:border-white hover:shadow-lg hover:shadow-white/25 hover:bg-white/10 backdrop-blur-sm">
                                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="hover:underline font-medium">LinkedIn</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/adam-elmekadem" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   className="text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 group px-4 py-2 rounded-lg border border-gray-600 hover:border-white hover:shadow-lg hover:shadow-white/25 hover:bg-white/10 backdrop-blur-sm">
                                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="hover:underline font-medium">GitHub</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://dribbble.com/adam-elmekadem" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   className="text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 group px-4 py-2 rounded-lg border border-gray-600 hover:border-white hover:shadow-lg hover:shadow-white/25 hover:bg-white/10 backdrop-blur-sm">
                                    <Dribbble className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="hover:underline font-medium">Dribbble</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                
                <div className="w-2/5 flex items-center justify-center pl-8">
                    <div className="relative w-full max-w-lg mx-auto h-80">
                        <div ref={card1Ref} className="absolute top-16 left-0 cursor-pointer">
                            <img src={simple} alt="Portfolio Image 1" 
                                 className="w-64 h-48 object-cover rounded-xl shadow-2xl hover:shadow-white/30 transition-shadow duration-500" />
                        </div>

                        <div ref={card2Ref} className="absolute top-12 left-20 cursor-pointer">
                            <img src={wiframe} alt="Portfolio Image 2" 
                                 className="w-64 h-48 object-cover rounded-xl shadow-2xl hover:shadow-white/30 transition-shadow duration-500" />
                        </div>

                        <div ref={card3Ref} className="absolute top-8 left-40 cursor-pointer">
                            <img src={nature} alt="Portfolio Image 3" 
                                 className="w-64 h-48 object-cover rounded-xl shadow-2xl hover:shadow-white/30 transition-shadow duration-500" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}