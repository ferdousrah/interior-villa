import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Award, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ApproachSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Description animation
    if (descriptionRef.current) {
      gsap.fromTo(descriptionRef.current,
        {
          opacity: 0,
          y: 30,
          filter: "blur(5px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Cards animation
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.children;
      
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 60,
          rotationX: -15,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
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

  const approaches = [
    {
      icon: 'search-icon.svg',
      title: "Discovery & Planning",
      description: "We begin by understanding your needs, preferences, and lifestyle to create a tailored design plan."
    },
    {
      icon: 'design-icon.svg',
      title: "Design Development",
      description: "Our team develops detailed designs, including material selections, layouts, and 3D visualizations."
    },
    {
      icon: 'execute-icon.svg',
      title: "Execution & Management",
      description: "We manage all aspects of the project, from sourcing materials to overseeing construction and installation."
    },
    {
      icon: 'final-touch-icon.svg',
      title: "Final Touches",
      description: "We add the finishing touches to bring your vision to life, ensuring every detail is perfect."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 bg-[#f7f9fb]"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <motion.h2 
            ref={headingRef}
            className="text-3xl md:text-3xl lg:text-4xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
          >
            Our Approach
          </motion.h2>
          <motion.p 
            ref={descriptionRef}
            className="text-base [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-5xl mx-auto leading-relaxed"
          >
            At Interior Villa, we believe that your home should be a reflection of your unique personality and lifestyle. We are a leading interior design firm in Bangladesh, passionate about creating spaces that are not only beautiful but also functional, comfortable, and inspiring.
          </motion.p>
        </div>

        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {approaches.map((approach, index) => (
            <Card 
              key={index}
              className="bg-white border-none rounded-[5px] p-6 md:p-8 h-full transition-all duration-700 hover:-translate-y-3 cursor-pointer group relative overflow-hidden"
            >
              {/* Round bubble filling animation */}
              <div className="absolute inset-0 overflow-hidden rounded-[5px]">
                {/* Main bubble that expands from bottom-left corner */}
                <div 
                  className="absolute w-0 h-0 bg-gradient-to-br from-[#E9FFDA] via-[#D4F7B8] to-[#C0F096] opacity-0 group-hover:opacity-100 transition-all duration-1200 ease-out group-hover:w-[200%] group-hover:h-[200%] rounded-full"
                  style={{
                    bottom: '-50%',
                    left: '-50%',
                    transformOrigin: 'center center',
                    transform: 'scale(0)',
                    transition: 'all 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                />
                
                {/* Secondary bubble layer for depth */}
                <div 
                  className="absolute w-0 h-0 bg-gradient-to-br from-[#D4F7B8] via-[#C0F096] to-[#ACEB74] opacity-0 group-hover:opacity-80 transition-all duration-1400 ease-out group-hover:w-[180%] group-hover:h-[180%] rounded-full"
                  style={{
                    bottom: '-40%',
                    left: '-40%',
                    transformOrigin: 'center center',
                    transform: 'scale(0)',
                    transition: 'all 1400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transitionDelay: '100ms'
                  }}
                />

                {/* Third bubble layer for smooth gradient */}
                <div 
                  className="absolute w-0 h-0 bg-gradient-to-br from-[#C0F096] via-[#ACEB74] to-[#98E652] opacity-0 group-hover:opacity-60 transition-all duration-1600 ease-out group-hover:w-[160%] group-hover:h-[160%] rounded-full"
                  style={{
                    bottom: '-30%',
                    left: '-30%',
                    transformOrigin: 'center center',
                    transform: 'scale(0)',
                    transition: 'all 1600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transitionDelay: '200ms'
                  }}
                />

                {/* Floating bubbles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500">
                  <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
                  <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.8s', animationDuration: '2.5s' }} />
                  <div className="absolute bottom-2/3 left-1/2 w-2.5 h-2.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1.1s', animationDuration: '3s' }} />
                  <div className="absolute bottom-1/2 left-2/3 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1.4s', animationDuration: '2s' }} />
                  <div className="absolute bottom-3/4 left-3/4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '1.7s', animationDuration: '2.8s' }} />
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1800 ease-out delay-700" />

                {/* Ripple effect from center */}
                {/*<div className="absolute top-1/2 left-1/2 w-0 h-0 border-2 border-white opacity-0 group-hover:opacity-100 rounded-full transform -translate-x-1/2 -translate-y-1/2 group-hover:w-20 group-hover:h-20 transition-all duration-1000 ease-out delay-800" />*/}
              </div>

              <CardContent className="p-0 text-justify relative z-10">
                <img
                  src={approach.icon}
                  className="w-8 h-8 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 group-hover:drop-shadow-lg"
                />
                <h3 className="text-base md:text-1xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-4 text-left transition-all duration-500 group-hover:text-[#2D5016]">
                  {approach.title}
                </h3>
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-base md:text-base leading-relaxed transition-all duration-500 group-hover:text-[#4A6B2A]">
                  {approach.description}
                </p>
              </CardContent>

              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-1000">
                <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
                <div className="absolute top-1/2 right-1/5 w-0.5 h-0.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
                <div className="absolute top-3/4 right-1/3 w-0.5 h-0.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2s' }} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Enhanced bubble scaling animation */
        .group:hover div[style*="bottom: -50%"] {
          transform: scale(1) !important;
        }

        .group:hover div[style*="bottom: -40%"] {
          transform: scale(1) !important;
        }

        .group:hover div[style*="bottom: -30%"] {
          transform: scale(1) !important;
        }

        /* Smooth bubble expansion */
        @keyframes bubbleExpand {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Floating bubble animation */
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-40px) scale(0);
            opacity: 0;
          }
        }

        .group:hover .floating-bubble {
          animation: floatUp 2s ease-out infinite;
        }

        /* Ripple effect */
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }

        /* Enhanced glow effect */
        .group:hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(238, 84, 40, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: ripple 2s ease-out infinite;
          z-index: 1;
        }

        /* Smooth transitions for all elements */
        .group * {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </section>
  );
};