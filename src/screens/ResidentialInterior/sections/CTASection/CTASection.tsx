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
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C4 50%, #F0E1D2 100%)'
      }}
    >
      {/* Decorative Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large circle - top left */}
        <div 
          className="absolute rounded-full opacity-20"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(238, 84, 40, 0.15) 0%, rgba(238, 84, 40, 0.05) 70%, transparent 100%)',
            top: '-200px',
            left: '-200px'
          }}
        />
        
        {/* Medium circle - top right */}
        <div 
          className="absolute rounded-full opacity-25"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(245, 230, 211, 0.8) 0%, rgba(245, 230, 211, 0.3) 70%, transparent 100%)',
            top: '-100px',
            right: '-150px'
          }}
        />
        
        {/* Small circle - bottom left */}
        <div 
          className="absolute rounded-full opacity-30"
          style={{
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(240, 225, 210, 0.6) 0%, rgba(240, 225, 210, 0.2) 70%, transparent 100%)',
            bottom: '-100px',
            left: '10%'
          }}
        />
        
        {/* Medium circle - bottom right */}
        <div 
          className="absolute rounded-full opacity-20"
          style={{
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(238, 84, 40, 0.1) 0%, rgba(238, 84, 40, 0.03) 70%, transparent 100%)',
            bottom: '-175px',
            right: '-100px'
          }}
        />
        
        {/* Additional small decorative circles */}
        <div 
          className="absolute rounded-full opacity-40"
          style={{
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(245, 230, 211, 0.7) 0%, rgba(245, 230, 211, 0.2) 70%, transparent 100%)',
            top: '20%',
            left: '15%'
          }}
        />
        
        <div 
          className="absolute rounded-full opacity-35"
          style={{
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle, rgba(240, 225, 210, 0.8) 0%, rgba(240, 225, 210, 0.3) 70%, transparent 100%)',
            top: '60%',
            right: '20%'
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <div ref={contentRef}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium [font-family:'Fahkwang',Helvetica] text-[#2D2D2D] mb-12 leading-tight">
            Ready to transform your space?
          </h2>
          
          {/* Orange Button - Simple Design */}
          <button 
            className="relative text-white px-12 py-4 rounded-lg [font-family:'Fahkwang',Helvetica] font-medium text-lg transition-all duration-300 hover:scale-105 overflow-hidden group shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #EE5428 0%, #DC3F1A 100%)'
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