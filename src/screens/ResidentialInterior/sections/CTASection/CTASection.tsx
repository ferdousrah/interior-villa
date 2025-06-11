import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CTASection = (): JSX.Element => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Content animation
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#f7f9fb]"
    >
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div ref={contentRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-8 leading-tight">
            Ready to transform your space?
          </h2>
          
          {/* Orange Water Drop Button without Arrow - Light to Dark Gradient */}
          <button 
            className="relative bg-black text-white px-12 py-4 rounded-full [font-family:'Fahkwang',Helvetica] font-medium text-lg transition-all duration-300 hover:scale-105 overflow-hidden group"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {/* Orange Water Drop Filling Animation - Light to Dark */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {/* Main water drop that expands from bottom-left corner - Light to Dark */}
              <div 
                className="absolute w-0 h-0 opacity-0 group-hover:opacity-100 transition-all duration-1500 ease-out group-hover:w-[300%] group-hover:h-[300%] rounded-full"
                style={{
                  bottom: '-100%',
                  left: '-100%',
                  background: 'radial-gradient(circle at center, #FEF4F2 0%, #FBD1C8 20%, #F2886C 40%, #EE5428 60%, #DC3F1A 80%, #B83318 100%)',
                  transform: 'scale(0)',
                  transformOrigin: 'center center',
                  transition: 'all 1500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              />
              
              {/* Secondary water layer for depth and organic feel - Light to Dark */}
              <div 
                className="absolute w-0 h-0 opacity-0 group-hover:opacity-80 transition-all duration-1700 ease-out group-hover:w-[280%] group-hover:h-[280%] rounded-full"
                style={{
                  bottom: '-90%',
                  left: '-90%',
                  background: 'radial-gradient(circle at center, #FDE6E1 0%, #F7B2A2 30%, #F2886C 50%, #EE5428 70%, #DC3F1A 100%)',
                  transform: 'scale(0)',
                  transformOrigin: 'center center',
                  transition: 'all 1700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transitionDelay: '100ms'
                }}
              />

              {/* Third layer for smooth gradient transition - Light to Dark */}
              <div 
                className="absolute w-0 h-0 opacity-0 group-hover:opacity-60 transition-all duration-1900 ease-out group-hover:w-[260%] group-hover:h-[260%] rounded-full"
                style={{
                  bottom: '-80%',
                  left: '-80%',
                  background: 'radial-gradient(circle at center, #FFFFFF 0%, #FEF4F2 15%, #FBD1C8 30%, #F2886C 50%, #EE5428 70%, #DC3F1A 90%, #B83318 100%)',
                  transform: 'scale(0)',
                  transformOrigin: 'center center',
                  transition: 'all 1900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transitionDelay: '200ms'
                }}
              />

              {/* Liquid surface ripples with enhanced light reflection */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-800">
                <div 
                  className="absolute w-full h-full"
                  style={{
                    background: 'linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 2000ms ease-out',
                    transitionDelay: '800ms'
                  }}
                />
              </div>

              {/* Floating bubbles effect with enhanced visibility */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-1000">
                <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping shadow-lg" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
                <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white rounded-full animate-ping shadow-md" style={{ animationDelay: '0.8s', animationDuration: '2.5s' }} />
                <div className="absolute bottom-1/2 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-ping shadow-lg" style={{ animationDelay: '1.1s', animationDuration: '4s' }} />
                <div className="absolute bottom-2/3 left-2/3 w-1 h-1 bg-white rounded-full animate-ping shadow-md" style={{ animationDelay: '1.4s', animationDuration: '3.5s' }} />
              </div>

              {/* Enhanced shimmer effect for better light reflection */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-2000 ease-out delay-1200" />
            </div>

            {/* Button Content - Just Text, No Arrow */}
            <span className="relative z-10 transition-all duration-500 group-hover:text-white group-hover:drop-shadow-lg font-semibold">
              Get Started Today
            </span>

            {/* Enhanced glow effect with light orange tones */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500" 
                 style={{
                   boxShadow: '0 0 40px rgba(254, 244, 242, 0.8), 0 0 20px rgba(238, 84, 40, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.2)'
                 }} 
            />
          </button>
        </div>
      </div>

      <style jsx global>{`
        /* Enhanced Orange Water Drop Animation - Light to Dark */
        .group:hover div[style*="bottom: -100%"] {
          transform: scale(1) !important;
        }

        .group:hover div[style*="bottom: -90%"] {
          transform: scale(1) !important;
        }

        .group:hover div[style*="bottom: -80%"] {
          transform: scale(1) !important;
        }

        /* Enhanced liquid shimmer animation */
        .group:hover div[style*="translateX(-100%)"] {
          transform: translateX(100%) !important;
        }

        /* Enhanced button hover effects with light-to-dark theme */
        .group:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 
            0 20px 40px rgba(254, 244, 242, 0.3),
            0 15px 35px rgba(238, 84, 40, 0.4),
            0 5px 15px rgba(0, 0, 0, 0.2);
        }

        /* Smooth water-like transitions */
        .group * {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Enhanced organic bubble animation */
        @keyframes organicFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-15px) scale(1.2);
            opacity: 1;
          }
        }

        .group:hover .animate-ping {
          animation: organicFloat 3s ease-in-out infinite;
        }

        /* Enhanced water surface effect */
        @keyframes waterSurface {
          0%, 100% {
            clip-path: polygon(0% 100%, 100% 100%, 100% 85%, 95% 80%, 85% 85%, 75% 80%, 65% 85%, 55% 80%, 45% 85%, 35% 80%, 25% 85%, 15% 80%, 5% 85%, 0% 80%);
          }
          50% {
            clip-path: polygon(0% 100%, 100% 100%, 100% 80%, 95% 85%, 85% 80%, 75% 85%, 65% 80%, 55% 85%, 45% 80%, 35% 85%, 25% 80%, 15% 85%, 5% 80%, 0% 85%);
          }
        }

        /* Enhanced text contrast for better readability */
        .group:hover span {
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
};