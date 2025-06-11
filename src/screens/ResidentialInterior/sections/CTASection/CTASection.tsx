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
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C4 30%, #F0E1D2 70%, #F5E6D3 100%)'
      }}
    >
      {/* Decorative Background Circles - Warm beige/cream tones with subtle gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large main circle - bottom left, very soft and warm */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(245, 230, 211, 0.6) 0%, rgba(240, 225, 210, 0.4) 30%, rgba(235, 220, 205, 0.2) 60%, transparent 100%)',
            bottom: '-400px',
            left: '-300px',
            opacity: 0.8
          }}
        />
        
        {/* Large circle - top right area, overlapping for depth */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(240, 225, 210, 0.7) 0%, rgba(235, 220, 205, 0.5) 40%, rgba(230, 215, 200, 0.3) 70%, transparent 100%)',
            top: '-250px',
            right: '-200px',
            opacity: 0.9
          }}
        />
        
        {/* Medium circle - center left for layering */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(250, 240, 230, 0.8) 0%, rgba(245, 230, 211, 0.6) 35%, rgba(240, 225, 210, 0.3) 70%, transparent 100%)',
            top: '20%',
            left: '-150px',
            opacity: 0.7
          }}
        />
        
        {/* Medium circle - bottom right for balance */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(245, 235, 220, 0.6) 0%, rgba(240, 225, 210, 0.4) 40%, rgba(235, 220, 205, 0.2) 75%, transparent 100%)',
            bottom: '-200px',
            right: '-150px',
            opacity: 0.8
          }}
        />
        
        {/* Smaller accent circles for organic feel */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(250, 245, 235, 0.9) 0%, rgba(245, 230, 211, 0.6) 45%, rgba(240, 225, 210, 0.3) 80%, transparent 100%)',
            top: '15%',
            right: '20%',
            opacity: 0.6
          }}
        />
        
        <div 
          className="absolute rounded-full"
          style={{
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(245, 230, 211, 0.7) 0%, rgba(240, 225, 210, 0.5) 50%, rgba(235, 220, 205, 0.2) 85%, transparent 100%)',
            top: '60%',
            left: '15%',
            opacity: 0.7
          }}
        />

        {/* Additional layering circles for depth */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(250, 240, 230, 0.8) 0%, rgba(245, 235, 220, 0.5) 50%, transparent 85%)',
            bottom: '40%',
            right: '30%',
            opacity: 0.5
          }}
        />
        
        <div 
          className="absolute rounded-full"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(245, 230, 211, 0.9) 0%, rgba(240, 225, 210, 0.6) 45%, transparent 80%)',
            top: '45%',
            left: '60%',
            opacity: 0.6
          }}
        />

        {/* Very subtle background circles for texture */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(250, 245, 235, 0.4) 0%, rgba(245, 235, 220, 0.2) 60%, transparent 90%)',
            top: '30%',
            left: '40%',
            opacity: 0.4
          }}
        />
        
        <div 
          className="absolute rounded-full"
          style={{
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(240, 225, 210, 0.8) 0%, rgba(235, 220, 205, 0.4) 55%, transparent 85%)',
            bottom: '20%',
            left: '70%',
            opacity: 0.5
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <div ref={contentRef}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium [font-family:'Fahkwang',Helvetica] mb-16 leading-tight"
              style={{ color: '#2D2D2D' }}>
            Ready to transform your space?
          </h2>
          
          {/* Orange Button - Exact match to design */}
          <button 
            className="relative text-white px-12 py-4 rounded-lg [font-family:'Fahkwang',Helvetica] font-semibold text-lg transition-all duration-300 hover:scale-105 overflow-hidden group shadow-lg"
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