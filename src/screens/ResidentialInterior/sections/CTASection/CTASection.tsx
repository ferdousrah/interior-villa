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
        {/* Rounded Container with Beige Background and Two Circle.svg Shapes */}
        <div 
          className="relative overflow-hidden rounded-[40px] py-20 md:py-28"
          style={{
            background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C4 30%, #F0E1D2 70%, #F5E6D3 100%)'
          }}
        >
          {/* Two Decorative Circle.svg Shapes - Positioned exactly as in your design */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large Circle - Lower Left (extending off left edge) */}
            <div 
              className="absolute"
              style={{
                width: '500px',
                height: '500px',
                bottom: '-150px',
                left: '-200px',
                opacity: 0.25
              }}
            >
              <img 
                src="/circle.svg" 
                alt="Decorative Circle" 
                className="w-full h-full object-contain"
                style={{
                  filter: 'brightness(0.8) contrast(1.2)'
                }}
              />
            </div>
            
            {/* Medium Circle - Upper Right (extending off right edge) */}
            <div 
              className="absolute"
              style={{
                width: '400px',
                height: '400px',
                top: '-120px',
                right: '-150px',
                opacity: 0.2
              }}
            >
              <img 
                src="/circle.svg" 
                alt="Decorative Circle" 
                className="w-full h-full object-contain"
                style={{
                  filter: 'brightness(0.75) contrast(1.3)'
                }}
              />
            </div>
          </div>

          {/* Content - Positioned in the center space between circles */}
          <div className="relative z-10 text-center px-6 md:px-12">
            <div ref={contentRef}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium [font-family:'Fahkwang',Helvetica] mb-12 leading-tight"
                  style={{ color: '#2D2D2D' }}>
                Ready to transform your space?
              </h2>
              
              {/* Orange Button - Exact match to design */}
              <button 
                className="relative text-white px-10 py-4 rounded-lg [font-family:'Fahkwang',Helvetica] font-semibold text-lg transition-all duration-300 hover:scale-105 overflow-hidden group shadow-lg"
                style={{
                  background: '#EE5428',
                  borderRadius: '8px'
                }}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                {/* Hover overlay effect */}
                <div 
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(135deg, #F2886C 0%, #EE5428 100%)'
                  }}
                />
                
                {/* Button Content */}
                <span className="relative z-10 transition-all duration-300 group-hover:text-white font-semibold">
                  Book an Appointment
                </span>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                     style={{
                       boxShadow: '0 8px 32px rgba(238, 84, 40, 0.4)'
                     }} 
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Enhanced button hover effects */
        .group:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 
            0 12px 24px rgba(238, 84, 40, 0.3),
            0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Smooth transitions */
        .group * {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </section>
  );
};