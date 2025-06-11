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
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Rounded Container with cta-bg.svg Background */}
        <div 
          className="relative overflow-hidden rounded-[40px] py-20 md:py-28"
          style={{
            backgroundImage: 'url(/cta-bg.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Content - Centered */}
          <div className="relative z-10 text-center px-6 md:px-12">
            <div ref={contentRef}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium [font-family:'Fahkwang',Helvetica] mb-12 leading-tight"
                  style={{ color: '#2D2D2D' }}>
                Ready to transform your space?
              </h2>
              
              {/* Green Gradient Button with Advanced Animation */}
              <button 
                className="relative text-white px-10 py-4 rounded-lg [font-family:'Fahkwang',Helvetica] font-semibold text-lg transition-all duration-500 hover:scale-105 overflow-hidden group shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #A9F577 0%, #75BF44 100%)', // Light to dark green
                  borderRadius: '8px'
                }}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                {/* Green Liquid Filling Animation - Multiple Layers */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  {/* Primary green wave that flows from bottom-left */}
                  <div 
                    className="absolute w-0 h-0 opacity-0 group-hover:opacity-100 transition-all duration-1200 ease-out group-hover:w-[250%] group-hover:h-[250%] rounded-full"
                    style={{
                      bottom: '-75%',
                      left: '-75%',
                      background: 'radial-gradient(circle at center, #E9FFDA 0%, #D4F7B8 25%, #C0F096 50%, #ACEB74 75%, #98E652 100%)',
                      transform: 'scale(0)',
                      transformOrigin: 'center center',
                      transition: 'all 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }}
                  />
                  
                  {/* Secondary green layer for depth */}
                  <div 
                    className="absolute w-0 h-0 opacity-0 group-hover:opacity-90 transition-all duration-1400 ease-out group-hover:w-[230%] group-hover:h-[230%] rounded-full"
                    style={{
                      bottom: '-65%',
                      left: '-65%',
                      background: 'radial-gradient(circle at center, #D4F7B8 0%, #C0F096 30%, #ACEB74 60%, #98E652 85%, #84D93E 100%)',
                      transform: 'scale(0)',
                      transformOrigin: 'center center',
                      transition: 'all 1400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transitionDelay: '100ms'
                    }}
                  />

                  {/* Third green layer for smooth gradient transition */}
                  <div 
                    className="absolute w-0 h-0 opacity-0 group-hover:opacity-80 transition-all duration-1600 ease-out group-hover:w-[210%] group-hover:h-[210%] rounded-full"
                    style={{
                      bottom: '-55%',
                      left: '-55%',
                      background: 'radial-gradient(circle at center, #C0F096 0%, #ACEB74 25%, #98E652 50%, #84D93E 75%, #70CC2A 100%)',
                      transform: 'scale(0)',
                      transformOrigin: 'center center',
                      transition: 'all 1600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transitionDelay: '200ms'
                    }}
                  />

                  {/* Final dark green layer */}
                  <div 
                    className="absolute w-0 h-0 opacity-0 group-hover:opacity-70 transition-all duration-1800 ease-out group-hover:w-[190%] group-hover:h-[190%] rounded-full"
                    style={{
                      bottom: '-45%',
                      left: '-45%',
                      background: 'radial-gradient(circle at center, #ACEB74 0%, #98E652 20%, #84D93E 40%, #70CC2A 60%, #5CBF16 80%, #4A7D2A 100%)',
                      transform: 'scale(0)',
                      transformOrigin: 'center center',
                      transition: 'all 1800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transitionDelay: '300ms'
                    }}
                  />

                  {/* Organic liquid surface effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-800">
                    <div 
                      className="absolute w-full h-full"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 100%)',
                        transform: 'translateX(-100%) skewX(-15deg)',
                        transition: 'transform 1500ms ease-out',
                        transitionDelay: '800ms'
                      }}
                    />
                  </div>

                  {/* Floating green bubbles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-1000">
                    <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
                    <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.8s', animationDuration: '2.5s' }} />
                    <div className="absolute bottom-1/2 left-1/3 w-2.5 h-2.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1.1s', animationDuration: '4s' }} />
                    <div className="absolute bottom-2/3 left-2/3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1.4s', animationDuration: '3.5s' }} />
                    <div className="absolute bottom-3/4 left-3/4 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1.7s', animationDuration: '2.8s' }} />
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-2000 ease-out delay-1200" />

                  {/* Ripple effect from center */}
                  <div className="absolute top-1/2 left-1/2 w-0 h-0 border-2 border-white opacity-0 group-hover:opacity-60 rounded-full transform -translate-x-1/2 -translate-y-1/2 group-hover:w-20 group-hover:h-20 transition-all duration-1500 ease-out delay-1000" />
                </div>
                
                {/* Button Content */}
                <span className="relative z-10 transition-all duration-500 group-hover:text-white group-hover:drop-shadow-lg font-semibold">
                  Book an Appointment
                </span>

                {/* Enhanced glow effect with green colors */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300" 
                     style={{
                       boxShadow: '0 12px 32px rgba(117, 191, 68, 0.5), 0 0 20px rgba(169, 245, 119, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                     }} 
                />

                {/* Pulsing green aura */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500 animate-pulse" 
                     style={{
                       boxShadow: '0 0 40px rgba(117, 191, 68, 0.4)'
                     }} 
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Enhanced Green Liquid Animation */
        .group:hover div[style*="bottom: -75%"] {
          transform: scale(1) !important;
        }

        .group:hover div[style*="bottom: -65%"] {
          transform: scale(1) !important;
        }

        .group:hover div[style*="bottom: -55%"] {
          transform: scale(1) !important;
        }

        .group:hover div[style*="bottom: -45%"] {
          transform: scale(1) !important;
        }

        /* Liquid shimmer animation */
        .group:hover div[style*="translateX(-100%)"] {
          transform: translateX(100%) skewX(-15deg) !important;
        }

        /* Enhanced button hover effects with green theme */
        .group:hover {
          transform: scale(1.05) translateY(-3px);
          box-shadow: 
            0 15px 35px rgba(117, 191, 68, 0.4),
            0 5px 15px rgba(0, 0, 0, 0.2),
            0 0 25px rgba(169, 245, 119, 0.3);
        }

        /* Smooth water-like transitions */
        .group * {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Organic green bubble animation */
        @keyframes organicGreenFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          25% {
            transform: translateY(-8px) scale(1.1);
            opacity: 0.9;
          }
          50% {
            transform: translateY(-15px) scale(1.3);
            opacity: 1;
          }
          75% {
            transform: translateY(-8px) scale(1.1);
            opacity: 0.9;
          }
        }

        .group:hover .animate-ping {
          animation: organicGreenFloat 3s ease-in-out infinite;
        }

        /* Green water surface effect */
        @keyframes greenWaterSurface {
          0%, 100% {
            clip-path: polygon(0% 100%, 100% 100%, 100% 85%, 95% 80%, 85% 85%, 75% 80%, 65% 85%, 55% 80%, 45% 85%, 35% 80%, 25% 85%, 15% 80%, 5% 85%, 0% 80%);
            filter: hue-rotate(0deg);
          }
          25% {
            clip-path: polygon(0% 100%, 100% 100%, 100% 80%, 95% 85%, 85% 80%, 75% 85%, 65% 80%, 55% 85%, 45% 80%, 35% 85%, 25% 80%, 15% 85%, 5% 80%, 0% 85%);
            filter: hue-rotate(5deg);
          }
          50% {
            clip-path: polygon(0% 100%, 100% 100%, 100% 88%, 95% 83%, 85% 88%, 75% 83%, 65% 88%, 55% 83%, 45% 88%, 35% 83%, 25% 88%, 15% 83%, 5% 88%, 0% 83%);
            filter: hue-rotate(10deg);
          }
          75% {
            clip-path: polygon(0% 100%, 100% 100%, 100% 82%, 95% 87%, 85% 82%, 75% 87%, 65% 82%, 55% 87%, 45% 82%, 35% 87%, 25% 82%, 15% 87%, 5% 82%, 0% 87%);
            filter: hue-rotate(5deg);
          }
        }

        /* Apply water surface animation to green layers */
        .group:hover div[style*="radial-gradient"] {
          animation: greenWaterSurface 4s ease-in-out infinite;
        }

        /* Enhanced ripple effect */
        @keyframes greenRipple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
            border-color: rgba(169, 245, 119, 0.8);
          }
          50% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0.6;
            border-color: rgba(117, 191, 68, 0.6);
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
            border-color: rgba(74, 125, 42, 0.2);
          }
        }

        .group:hover div[style*="border-2 border-white"] {
          animation: greenRipple 2s ease-out infinite;
        }

        /* Text shadow enhancement on hover */
        .group:hover span {
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        /* Gradient shift animation */
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .group:hover {
          background: linear-gradient(135deg, #A9F577 0%, #75BF44 25%, #5CBF16 50%, #4A7D2A 75%, #355423 100%);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
      `}</style>
    </section>
  );
};