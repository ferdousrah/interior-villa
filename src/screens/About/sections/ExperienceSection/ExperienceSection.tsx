import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Counter } from "../../../../components/ui/counter";
import { motion } from "framer-motion";
import { CheckCircle, Building } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Left column animation
    if (leftColumnRef.current) {
      const elements = leftColumnRef.current.children;
      
      gsap.fromTo(elements,
        {
          opacity: 0,
          x: -60,
          y: 30
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftColumnRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Right column animation
    if (rightColumnRef.current) {
      const cards = rightColumnRef.current.children;
      
      gsap.fromTo(cards,
        {
          opacity: 0,
          x: 60,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightColumnRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Play button animation
    if (playButtonRef.current) {
      gsap.fromTo(playButtonRef.current,
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: playButtonRef.current,
            start: "top 90%",
            end: "top 70%",
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
      className="py-12 md:py-16 lg:py-20 bg-white"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Title and Description */}
          <div ref={leftColumnRef} className="space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] leading-tight">
              Experience Interior Villa: Where Design Meets Lifestyle
            </h2>
            
            <p className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] leading-relaxed">
              At Interior Villa, we believe that your home should be a reflection of your unique personality and lifestyle. We are a leading interior design firm in Bangladesh, passionate about creating spaces that are not only beautiful but also functional, comfortable, and inspiring.
            </p>

            {/* Intro Video Button */}
            <button 
              ref={playButtonRef}
              className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-[#1a1a2e] rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                <svg 
                  className="w-5 h-5 text-white ml-0.5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="text-[#1a1a2e] [font-family:'Fahkwang',Helvetica] font-medium group-hover:text-primary transition-colors duration-300">
                Intro Video
              </span>
            </button>
          </div>

          {/* Right Column - Statistics Cards */}
          <div ref={rightColumnRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Projects Completed Card */}
            <Card 
              className="border border-[#000] rounded-[5px] p-6 md:p-8 text-center h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: '#EBF8F7' }}
            >
              <CardContent className="p-0 space-y-4">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold [font-family:'Fahkwang',Helvetica] text-[#01190c]">
                  <Counter 
                    end={1000} 
                    suffix="+" 
                    duration={2500}
                    className="inline-block"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c]">
                  Projects Completed
                </h3>
                
                {/* Icon Circle with tic-icon.svg */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  style={{ backgroundColor: '#AAEBEB' }}
                >
                  <img 
                    src="/tic-icon.svg" 
                    alt="Tick icon" 
                    className="w-8 h-8"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Corporate Served Card */}
            <Card 
              className="border border-[#000] rounded-[5px] p-6 md:p-8 text-center h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: '#FEFCEC' }}
            >
              <CardContent className="p-0 space-y-4">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold [font-family:'Fahkwang',Helvetica] text-[#01190c]">
                  <Counter 
                    end={100} 
                    suffix="+" 
                    duration={2000}
                    className="inline-block"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c]">
                  Corporate Served
                </h3>
                
                {/* Icon Circle with corporate-icon.svg */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  style={{ backgroundColor: '#EFE058' }}
                >
                  <img 
                    src="/corporate-icon.svg" 
                    alt="Corporate icon" 
                    className="w-8 h-8"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};