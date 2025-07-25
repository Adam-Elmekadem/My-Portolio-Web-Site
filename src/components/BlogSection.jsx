import "./style.css";

import { useState, useEffect, useRef } from 'react';

// Example blog data
const blogPosts = [
  {
    id: 1,
    title: 'The Art of Cosmic Design',
    excerpt: 'Exploring how the universe inspires modern UI/UX and digital experiences.',
    url: '#',
    position: { x: 10, y: 50 },
  },
  {
    id: 2,
    title: 'React & the Rhythm of Orbits',
    excerpt: 'How component logic can mimic the harmony of celestial mechanics.',
    url: '#',
    position: { x: 25, y: 15 },
  },
  {
    id: 3,
    title: 'Gemini: Duality in Design',
    excerpt: 'Balancing light and dark, motion and stillness, in web interfaces.',
    url: '#',
    position: { x: 50, y: 5 },
  },
  {
    id: 4,
    title: 'Stardust Animations',
    excerpt: 'Subtle motion and micro-interactions for a luxury cosmic feel.',
    url: '#',
    position: { x: 75, y: 15 },
  },
  {
    id: 5,
    title: 'Nebula of Ideas',
    excerpt: 'How creative chaos forms new digital galaxies.',
    url: '#',
    position: { x: 90, y: 50 },
  },
  {
    id: 6,
    title: 'Celestial Typography',
    excerpt: 'Fonts and forms that shine in the dark.',
    url: '#',
    position: { x: 75, y: 85 },
  },
  {
    id: 7,
    title: 'Orbiting Inspiration',
    excerpt: 'Staying in creative motion.',
    url: '#',
    position: { x: 50, y: 95 },
  },
  {
    id: 8,
    title: 'Supernova Launches',
    excerpt: 'Big ideas that explode onto the scene.',
    url: '#',
    position: { x: 25, y: 85 },
  },
];

// Define constellation lines (by index in blogPosts array)
const lines = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], // outer octagon
  [0, 2], [2, 4], [4, 6], [6, 0], // diagonals
  [1, 3], [3, 5], [5, 7], [7, 1], // other diagonals
  [0, 4], [1, 5], [2, 6], [3, 7]  // cross connections
];

// Zodiac background constellations
const zodiacConstellations = [
  {
    name: 'Leo',
    stars: [
      { x: 15, y: 20 }, { x: 25, y: 25 }, { x: 35, y: 22 }, { x: 45, y: 18 }, 
      { x: 52, y: 30 }, { x: 40, y: 35 }, { x: 28, y: 32 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 6], [6, 1]]
  },
  {
    name: 'Orion',
    stars: [
      { x: 75, y: 25 }, { x: 85, y: 30 }, { x: 80, y: 40 }, { x: 90, y: 45 }, 
      { x: 82, y: 50 }, { x: 78, y: 55 }, { x: 88, y: 60 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [0, 2], [1, 4]]
  },
  {
    name: 'Cassiopeia',
    stars: [
      { x: 5, y: 75 }, { x: 15, y: 82 }, { x: 25, y: 78 }, { x: 35, y: 85 }, { x: 45, y: 80 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4]]
  },
  {
    name: 'Ursa Minor',
    stars: [
      { x: 70, y: 75 }, { x: 78, y: 70 }, { x: 85, y: 78 }, { x: 90, y: 85 }, 
      { x: 82, y: 90 }, { x: 75, y: 88 }, { x: 68, y: 82 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]]
  }
];

export default function BlogSection() {
  const [hovered, setHovered] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [zodiacVisible, setZodiacVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const svgRef = useRef(null);
  const sectionRef = useRef(null);

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
    // Show zodiac constellations immediately with initial visibility (desktop only)
    if (!isMobile) {
      setTimeout(() => setZodiacVisible(true), 500);
    }
    
    // Load GSAP from CDN (desktop only)
    if (!isMobile) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.onload = () => {
        setupScrollTrigger();
      };
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [isMobile]);

  const setupScrollTrigger = () => {
    if (!sectionRef.current || isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            if (window.gsap) {
              startConstellationAnimation();
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  };

  const animateZodiacConstellations = () => {
    if (!window.gsap || isMobile) return;

    const { gsap } = window;
    
    zodiacConstellations.forEach((constellation, constellationIndex) => {
      const constellationEl = document.querySelector(`#zodiac-${constellation.name.toLowerCase()}`);
      if (!constellationEl) return;

      const lines = constellationEl.querySelectorAll('line');
      const stars = constellationEl.querySelectorAll('circle');
      
      // Animate stars first
      gsap.to(stars, {
        opacity: 0.4,
        duration: 2,
        delay: constellationIndex * 0.3 + 0.5,
        stagger: 0.1,
        ease: "power2.out"
      });
      
      // Then animate lines
      gsap.to(lines, {
        opacity: 0.25,
        duration: 1.5,
        delay: constellationIndex * 0.3 + 1,
        stagger: 0.2,
        ease: "power2.out"
      });
      
      // Subtle twinkling effect
      gsap.to(stars, {
        opacity: 0.6,
        duration: 4,
        delay: constellationIndex * 0.3 + 2.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
        ease: "sine.inOut"
      });
    });
  };

  const startConstellationAnimation = () => {
    if (!window.gsap || !svgRef.current || isMobile) return;

    const { gsap } = window;
    const lineElements = svgRef.current.querySelectorAll('line');
    
    // Set initial state
    lineElements.forEach((lineEl, i) => {
      const [from, to] = lines[i];
      const startPos = blogPosts[from].position;
      
      gsap.set(lineEl, {
        attr: {
          x1: `${startPos.x}%`,
          y1: `${startPos.y}%`,
          x2: `${startPos.x}%`,
          y2: `${startPos.y}%`
        },
        opacity: 0.4
      });
    });

    const tl = gsap.timeline({
      onComplete: () => {
        animateZodiacConstellations();
      }
    });

    lineElements.forEach((lineEl, i) => {
      const [from, to] = lines[i];
      const endPos = blogPosts[to].position;
      const delay = i * 0.12;
      
      tl.to(lineEl, {
        duration: 0.3,
        opacity: 0.6,
        delay: delay
      }, 0);
      
      tl.to(lineEl, {
        duration: 1.8,
        ease: "power2.out",
        attr: {
          x2: `${endPos.x}%`,
          y2: `${endPos.y}%`
        },
        opacity: 0.22,
        delay: delay + 0.2
      }, 0);
    });

    tl.to(lineElements, {
      duration: 1.5,
      opacity: 0.35,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.08
    }, "+=0.8");
  };

  // Mobile blog card component
  const MobileBlogCard = ({ post, index, isSelected, onSelect }) => (
    <div 
      className="bg-black/80 backdrop-blur-sm border border-white/30 rounded-2xl p-4 mb-4 cursor-pointer transition-all duration-300 hover:border-white/50 relative overflow-hidden"
      onClick={() => onSelect(post.id === selectedPost ? null : post.id)}
    >
      {/* Animated star background */}
      <div className="absolute top-4 right-4 w-3 h-3">
        <div 
          className="w-full h-full rounded-full bg-white animate-pulse"
          style={{
            boxShadow: '0 0 8px 2px #fff, 0 0 16px 4px #b5eaff',
            filter: 'brightness(1.5)'
          }}
        />
      </div>

      {/* Blog header */}
      <div className="pr-8">
        <h3 className="text-lg font-bold text-white mb-2 leading-tight">
          {post.title}
        </h3>
        <div className="text-xs text-gray-400 mb-3">
          Blog Post #{index + 1}
        </div>
      </div>

      {/* Expandable content */}
      {isSelected && (
        <div className="mt-4 space-y-4 animate-fade-in">
          <p className="text-gray-300 text-sm leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex gap-3 pt-2">
            <a 
              href={post.url}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium"
            >
              Read More
            </a>
          </div>
        </div>
      )}

      {/* Expand indicator */}
      <div className="absolute bottom-4 right-4 text-white/50 text-xs">
        {isSelected ? '−' : '+'}
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef} 
      id="blog" 
      className="relative min-h-[600px] flex flex-col items-center justify-center py-16 sm:py-24 px-4 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Starfield background */}
      <div className="absolute inset-0 w-full h-full">
        {[...Array(isMobile ? 50 : 100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <h2 className="text-2xl sm:text-4xl font-bold text-white text-center mb-4 z-10 relative">
        {isMobile ? "Thoughts & Ideas" : "Constellation of Thoughts"}
      </h2>
      <p className="text-gray-300 text-center max-w-2xl mb-8 sm:mb-12 z-10 relative text-sm sm:text-base px-4">
        {isMobile 
          ? "Explore my latest blog posts and creative insights."
          : "Each post is a star in the cosmic web of ideas. Explore the constellation below."
        }
      </p>

      {/* Mobile Layout */}
      {isMobile ? (
        <div className="w-full max-w-md mx-auto z-10">
          {blogPosts.map((post, index) => (
            <MobileBlogCard
              key={post.id}
              post={post}
              index={index}
              isSelected={selectedPost === post.id}
              onSelect={setSelectedPost}
            />
          ))}
        </div>
      ) : (
        /* Desktop Layout */
        <div className="relative w-full max-w-4xl h-[500px] mx-auto z-10">
          {/* Background Zodiac Constellations */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {zodiacConstellations.map((constellation) => (
              <svg 
                key={constellation.name}
                id={`zodiac-${constellation.name.toLowerCase()}`}
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 1 }}
              >
                {/* Zodiac constellation lines */}
                {constellation.connections.map(([from, to], i) => (
                  <line
                    key={`line-${i}`}
                    x1={`${constellation.stars[from].x}%`}
                    y1={`${constellation.stars[from].y}%`}
                    x2={`${constellation.stars[to].x}%`}
                    y2={`${constellation.stars[to].y}%`}
                    stroke="#6b7280"
                    strokeWidth="1.5"
                    opacity={zodiacVisible ? "0.2" : "0"}
                    style={{
                      filter: 'drop-shadow(0 0 2px #6b7280)',
                      transition: 'opacity 1s ease-in-out'
                    }}
                  />
                ))}
                {/* Zodiac stars */}
                {constellation.stars.map((star, i) => (
                  <circle
                    key={`star-${i}`}
                    cx={`${star.x}%`}
                    cy={`${star.y}%`}
                    r="2"
                    fill="#9ca3af"
                    opacity={zodiacVisible ? "0.3" : "0"}
                    style={{
                      filter: 'drop-shadow(0 0 4px #9ca3af)',
                      transition: 'opacity 1.5s ease-in-out'
                    }}
                  />
                ))}
              </svg>
            ))}
          </div>

          {/* Main constellation SVG */}
          <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: 5}}>
            {lines.map(([from, to], i) => {
              const a = blogPosts[from].position;
              const b = blogPosts[to].position;
              return (
                <line
                  key={i}
                  x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`}
                  stroke="#fff"
                  strokeWidth="2.5"
                  opacity={0.22}
                  style={{filter:'drop-shadow(0 0 8px #fff) drop-shadow(0 0 24px #b5eaff)'}}
                />
              );
            })}
          </svg>

          {/* Star dots at intersections */}
          {Array.from(new Set(lines.flat())).map(idx => {
            const pos = blogPosts[idx].position;
            return (
              <div
                key={idx}
                className="absolute"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  zIndex: 10
                }}
              >
                <div style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 0 8px 2px #fff, 0 0 16px 4px #b5eaff',
                  filter: 'brightness(2.5) blur(0.2px)'
                }} />
              </div>
            );
          })}

          {/* Blog post stars */}
          {blogPosts.map((post, i) => (
            <div
              key={post.id}
              className="absolute flex flex-col items-center group cursor-pointer"
              style={{ 
                left: `${post.position.x}%`, 
                top: `${post.position.y}%`, 
                transform: 'translate(-50%, -50%)',
                zIndex: 15
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                  hovered === i ? 'ring-2 ring-white/70 scale-150' : ''
                }`}
                style={{
                  boxShadow: hovered === i
                    ? '0 0 24px 8px #fff, 0 0 48px 16px #b5eaff, 0 0 80px 32px #e0eaff'
                    : '0 0 8px 2px #fff, 0 0 16px 4px #b5eaff',
                  filter: hovered === i ? 'brightness(2) saturate(1.3)' : 'brightness(1.5) saturate(1.1)',
                }}
              />
              <span className="mt-2 text-white text-xs font-semibold text-center whitespace-nowrap drop-shadow-lg select-none max-w-32 truncate">
                {post.title}
              </span>
              
              {/* Preview panel */}
              {hovered === i && (
                <div 
                  className="absolute left-1/2 top-[-100px] -translate-x-1/2 w-64 bg-black/90 rounded-xl p-4 shadow-xl backdrop-blur-md border border-gray-600"
                  style={{ zIndex: 20 }}
                >
                  <div className="text-white font-bold mb-1">{post.title}</div>
                  <div className="text-gray-300 text-sm">{post.excerpt}</div>
                  <a 
                    href={post.url} 
                    className="inline-block mt-3 text-xs text-white bg-white/10 rounded px-3 py-1 border border-gray-600 hover:border-white/25 hover:shadow-lg hover:shadow-white/25 hover:bg-white/15 backdrop-blur-sm transition-all"
                  >
                    Read More
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}