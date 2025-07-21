import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    // État pour gérer quelles cartes sont retournées
    const [flippedCards, setFlippedCards] = useState(new Set());
    // État pour gérer les cartes tirées du deck
    const [pulledCards, setPulledCards] = useState(new Set());
    // État pour gérer l'ordre de sélection des cartes
    const [cardOrder, setCardOrder] = useState(new Map());
    // État pour gérer les cartes qui montrent leur dos noir pendant l'animation
    const [showingBack, setShowingBack] = useState(new Set());
    // État pour gérer l'ordre de retour des cartes au deck
    const [returningOrder, setReturningOrder] = useState(new Map());
    
    // Références pour GSAP
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    // Animation GSAP au scroll
    useEffect(() => {
        const cards = cardsRef.current.filter(card => card !== null);
        
        if (cards.length === 0) return;

        // Animation qui se répète à chaque fois qu'on entre/sort de la section
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
                // Animation d'entrée spectaculaire
                gsap.fromTo(cards, 
                    {
                        opacity: 0, 
                        y: 100, 
                        scale: 0.8,
                        rotateY: -90
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotateY: 0,
                        duration: 1.2,
                        ease: "back.out(1.7)",
                        stagger: {
                            amount: 0.8,
                            from: "center"
                        }
                    }
                );
            },
            onLeave: () => {
                // Animation de sortie douce
                gsap.to(cards, {
                    opacity: 0.3,
                    scale: 0.95,
                    duration: 0.5
                });
            },
            onEnterBack: () => {
                // Animation de retour
                gsap.to(cards, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });
            },
            onLeaveBack: () => {
                // Animation de sortie par le haut
                gsap.to(cards, {
                    opacity: 0,
                    y: -50,
                    scale: 0.9,
                    duration: 0.5
                });
            }
        });

        // Animation de hover GSAP
        cards.forEach((card, index) => {
            if (card) {
                const onEnter = () => {
                    gsap.to(card, {
                        y: -10,
                        scale: 1.05,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                };
                
                const onLeave = () => {
                    gsap.to(card, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                };

                card.addEventListener('mouseenter', onEnter);
                card.addEventListener('mouseleave', onLeave);

                // Nettoyage
                return () => {
                    card.removeEventListener('mouseenter', onEnter);
                    card.removeEventListener('mouseleave', onLeave);
                };
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Liste des compétences
    const skills = [
        { id: 0, title: 'HTML', category: 'Frontend' },
        { id: 1, title: 'Css', category: 'Styling' },
        { id: 2, title: 'JavaScript', category: 'Programming' },
        { id: 3, title: 'React', category: 'Frontend' },
        { id: 4, title: 'JavaScript', category: 'Programming' },
        { id: 5, title: 'Tailwind CSS', category: 'Styling' },
        { id: 6, title: 'Illustrator', category: 'Design' },
        { id: 7, title: 'Photoshop', category: 'Design' },
        { id: 8, title: 'Figma', category: 'Design' },
        { id: 9, title: 'Git', category: 'Tools' },
        { id: 10, title: 'MongoDB', category: 'Database' },
        { id: 11, title: 'GSAP', category: 'Animation' },
    ];

    // Fonction pour tirer et retourner une carte avec animation
    const handleCardClick = (cardId) => {
        if (pulledCards.has(cardId)) {
            // Remettre la carte dans le deck - enregistrer l'ordre de retour
            setReturningOrder(prev => {
                const newMap = new Map(prev);
                newMap.set(cardId, Date.now());
                return newMap;
            });
            
            // D'abord défliper puis remettre en place
            setFlippedCards(prev => {
                const newSet = new Set(prev);
                newSet.delete(cardId);
                return newSet;
            });
            setShowingBack(prev => {
                const newSet = new Set(prev);
                newSet.delete(cardId);
                return newSet;
            });
            setTimeout(() => {
                setPulledCards(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(cardId);
                    return newSet;
                });
                // Nettoyer après l'animation
                setTimeout(() => {
                    setReturningOrder(prev => {
                        const newMap = new Map(prev);
                        newMap.delete(cardId);
                        return newMap;
                    });
                    setCardOrder(prev => {
                        const newMap = new Map(prev);
                        newMap.delete(cardId);
                        return newMap;
                    });
                }, 300);
            }, 400);
        } else {
            // Tirer la carte du deck
            setPulledCards(prev => new Set([...prev, cardId]));
            setCardOrder(prev => {
                const newMap = new Map(prev);
                newMap.set(cardId, Date.now());
                return newMap;
            });
            
            // Si c'est la 2ème carte ou plus, montrer d'abord le dos noir
            if (pulledCards.size >= 1) {
                setTimeout(() => {
                    setShowingBack(prev => new Set([...prev, cardId]));
                }, 200);
                setTimeout(() => {
                    setFlippedCards(prev => new Set([...prev, cardId]));
                }, 700);
            } else {
                // Première carte : animation normale
                setTimeout(() => {
                    setFlippedCards(prev => new Set([...prev, cardId]));
                }, 500);
            }
        }
    };

    return (
        <section ref={sectionRef} className="px-8 h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center" id='skills'>
            <div className="max-w-4xl mx-auto text-center">
                <div className="mt-20">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        My Skills
                    </h2>
                    <p className="text-lg text-gray-300 mb-8">
                        Click on the cards to reveal my skills - elegantly arranged in a curve!
                    </p>
                </div>

                <div className="relative w-full h-96 -mt-10 flex items-center justify-center">
                    {skills.map((skill, index) => {
                        const isFlipped = flippedCards.has(skill.id);
                        const isPulled = pulledCards.has(skill.id);
                        const isShowingBack = showingBack.has(skill.id);
                        const isReturning = returningOrder.has(skill.id);
                        const totalCards = skills.length;
                        const middleIndex = (totalCards - 1) / 2;
                        
                        // Calcul de la position en courbe - centré
                        const angleOffset = (index - middleIndex) * 8; // Angle entre les cartes
                        const xOffset = (index - middleIndex) * 40; // Espacement horizontal élargi
                        const yOffset = Math.abs(index - middleIndex) * 4; // Réduit la courbe
                        const zIndex = totalCards - Math.abs(index - middleIndex); // Z-index pour l'empilement
                        
                        // Animation de tirage
                        let cardTransform = `translateX(${xOffset}px) translateY(${yOffset}px) rotate(${angleOffset}deg)`;
                        let cardScale = 1;
                        let dynamicZIndex = zIndex;
                        
                        if (isPulled && isFlipped) {
                            // Carte tirée et flippée - ORGANISÉE EN COURBE - PRIORITÉ MAXIMALE
                            const pulledArray = Array.from(pulledCards);
                            const pulledIndex = pulledArray.indexOf(skill.id);
                            const totalPulled = pulledArray.length;
                            const pulledMiddle = (totalPulled - 1) / 2;
                            
                            // Position en courbe pour les cartes sélectionnées
                            const curveAngle = (pulledIndex - pulledMiddle) * 15; // Angle plus large
                            const curveX = (pulledIndex - pulledMiddle) * 80; // Espacement plus large
                            const curveY = -80 + Math.abs(pulledIndex - pulledMiddle) * 8; // Légère courbe verticale
                            
                            cardTransform = `translateX(${curveX}px) translateY(${curveY}px) rotate(${curveAngle}deg)`;
                            cardScale = 1.3;
                            const selectionOrder = cardOrder.get(skill.id) || 0;
                            dynamicZIndex = 25000 + Math.floor(selectionOrder / 1000); // PRIORITÉ MAXIMALE pour cartes ACTIVES
                        } else if (isPulled || cardOrder.has(skill.id)) {
                            // Carte tirée OU en animation - POSITION EN COURBE - PRIORITÉ ÉLEVÉE
                            if (isPulled) {
                                const pulledArray = Array.from(pulledCards);
                                const pulledIndex = pulledArray.indexOf(skill.id);
                                const totalPulled = pulledArray.length;
                                const pulledMiddle = (totalPulled - 1) / 2;
                                
                                // Position en courbe pour les cartes sélectionnées
                                const curveAngle = (pulledIndex - pulledMiddle) * 15;
                                const curveX = (pulledIndex - pulledMiddle) * 80;
                                const curveY = -80 + Math.abs(pulledIndex - pulledMiddle) * 8;
                                
                                cardTransform = `translateX(${curveX}px) translateY(${curveY}px) rotate(${curveAngle}deg)`;
                                cardScale = 1.3;
                            }
                            const selectionOrder = cardOrder.get(skill.id) || 0;
                            dynamicZIndex = 20000 + Math.floor(selectionOrder / 1000); // PRIORITÉ ÉLEVÉE pour cartes ACTIVES
                        } else if (isReturning) {
                            // Carte en cours de retour - SOUS LES CARTES ACTIVES
                            const returningTime = returningOrder.get(skill.id) || 0;
                            dynamicZIndex = 5000 + Math.floor(returningTime / 1000); // SOUS les cartes actives
                        } else if (isFlipped) {
                            // Carte flippée mais pas tirée - au-dessus du deck mais sous les cartes tirées
                            dynamicZIndex = 100 + skill.id;
                        } else {
                            // Carte normale dans le deck - z-index basé sur la position
                            dynamicZIndex = zIndex;
                        }
                        
                        return (
                            <div
                                key={skill.id}
                                ref={el => cardsRef.current[index] = el}
                                className={`absolute w-28 h-40 cursor-pointer perspective-1000 transition-all duration-700 ease-out ${
                                    (isPulled || cardOrder.has(skill.id) || isReturning) ? 'hover:z-[30000]' : isFlipped ? 'hover:z-[150]' : 'hover:z-[50]'
                                }`}
                                style={{
                                    transform: cardTransform,
                                    scale: cardScale,
                                    zIndex: dynamicZIndex,
                                }}
                                onClick={() => handleCardClick(skill.id)}
                            >
                                <div
                                    className={`relative w-full h-full transition-transform duration-700`}
                                    style={{ 
                                        transformStyle: 'preserve-3d',
                                        filter: isPulled ? 'drop-shadow(0 15px 35px rgba(255,255,255,0.2))' : 'none'
                                    }}
                                >
                                    {/* Face avant de la carte (🔥 SKILL CARD) - visible par défaut */}
                                    <div 
                                        className="absolute inset-0 w-full h-full"
                                        style={{ 
                                            backfaceVisibility: 'hidden',
                                            transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                                            transition: 'transform 0.7s ease'
                                        }}
                                    >
                                        <div className={`w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg border-2 shadow-xl flex items-center justify-center transition-all duration-500 ${
                                            isPulled 
                                                ? 'border-white shadow-2xl shadow-white/40 scale-105' 
                                                : 'border-gray-600 hover:border-white hover:shadow-2xl hover:shadow-white/30 hover:scale-105'
                                        }`}>
                                            <div className="text-center">
                                                {/* Montrer le dos noir si isShowingBack est true, sinon montrer le design normal */}
                                                {isShowingBack ? (
                                                    <div className="text-center">
                                                        <div className="text-4xl mb-2 drop-shadow-lg">🔥</div>
                                                        <div className="text-xs text-gray-300 font-bold drop-shadow-md">BACK</div>
                                                        <div className="text-xs text-gray-300 drop-shadow-md">SIDE</div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className={`text-4xl mb-2 drop-shadow-lg transition-transform duration-300 ${
                                                            isPulled ? 'animate-bounce' : ''
                                                        }`}>🔥</div>
                                                        <div className="text-xs text-gray-300 font-bold drop-shadow-md">SKILL</div>
                                                        <div className="text-xs text-gray-300 drop-shadow-md">CARD</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div 
                                        className="absolute inset-0 w-full h-full"
                                        style={{ 
                                            backfaceVisibility: 'hidden',
                                            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                                            transition: 'transform 0.7s ease'
                                        }}
                                    >
                                        <div className={`w-full h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-lg border-2 shadow-xl flex flex-col items-center justify-center p-4 transition-all duration-500 ${
                                            isPulled 
                                                ? 'border-black shadow-2xl shadow-black/40 scale-105' 
                                                : 'border-gray-300 hover:border-black hover:shadow-2xl hover:shadow-black/30 hover:scale-105'
                                        }`}>
                                            {/* Contenu de la carte retournée */}
                                            <div className="text-center">
                                                <h3 className={`text-lg font-bold text-black mb-2 drop-shadow-sm transition-all duration-300 ${
                                                    isPulled && isFlipped ? 'text-blue-600' : ''
                                                }`}>
                                                    {skill.title}
                                                </h3>
                                                <div className={`text-xs text-gray-600 px-2 py-1 bg-gray-200 rounded-full border border-gray-300 drop-shadow-sm transition-all duration-300 ${
                                                    isPulled && isFlipped ? 'bg-blue-100 border-blue-300 text-blue-700' : ''
                                                }`}>
                                                    {skill.category}
                                                </div>
                                            </div>
                                            
                                            <div className="absolute top-2 left-2 text-xs text-gray-400">
                                                {skill.id}
                                            </div>
                                            <div className="absolute bottom-2 right-2 text-xs text-gray-400 rotate-180">
                                                {skill.id}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bouton pour retourner toutes les cartes */}
                <div className="text-center -mt-12 p-12">
                    <button
                        onClick={() => {
                            setFlippedCards(new Set());
                            setShowingBack(new Set());
                            setReturningOrder(new Map());
                            setCardOrder(new Map());
                            setTimeout(() => setPulledCards(new Set()), 400);
                        }}
                        className="bg-white text-black hover:bg-gray-200 hover:cursor-pointer px-6 py-3 rounded-full font-semibold transition-all duration-300 mr-4 hover:shadow-lg hover:shadow-white/50"
                    >
                        Reset All Cards
                    </button>
                    <button
                        onClick={() => {
                            const allIds = skills.map(s => s.id);
                            setPulledCards(new Set(allIds));
                            const orderMap = new Map();
                            allIds.forEach((id, index) => {
                                orderMap.set(id, Date.now() + index);
                            });
                            setCardOrder(orderMap);
                            // Pour reveal all, montrer les dos noirs puis flipper
                            setTimeout(() => {
                                setShowingBack(new Set(allIds));
                            }, 200);
                            setTimeout(() => setFlippedCards(new Set(allIds)), 700);
                        }}
                        className="border border-white text-white hover:bg-white hover:text-black hover:cursor-pointer px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/50"
                    >
                        Reveal All Cards
                    </button>
                </div>
            </div>
        </section>
    );
}
