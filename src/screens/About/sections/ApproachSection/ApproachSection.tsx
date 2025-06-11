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
              className="bg-white border-none rounded-[5px] p-6 md:p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group relative overflow-hidden"
            >
              {/* Liquid filling animation layers */}
              <div className="absolute inset-0 overflow-hidden rounded-[5px]">
                {/* Base liquid layer */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#E9FFDA] via-[#D4F7B8] to-[#C0F096] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out transform translate-y-full group-hover:translate-y-0"
                  style={{
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 85%, 95% 80%, 85% 85%, 75% 80%, 65% 85%, 55% 80%, 45% 85%, 35% 80%, 25% 85%, 15% 80%, 5% 85%, 0% 80%)',
                    animationDelay: '0ms'
                  }}
                />
                
                {/* Second wave layer */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#D4F7B8] via-[#C0F096] to-[#ACEB74] opacity-0 group-hover:opacity-80 transition-all duration-1200 ease-out transform translate-y-full group-hover:translate-y-0"
                  style={{
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 90%, 90% 85%, 80% 90%, 70% 85%, 60% 90%, 50% 85%, 40% 90%, 30% 85%, 20% 90%, 10% 85%, 0% 90%)',
                    animationDelay: '100ms'
                  }}
                />
                
                {/* Third wave layer */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#C0F096] via-[#ACEB74] to-[#98E652] opacity-0 group-hover:opacity-60 transition-all duration-1400 ease-out transform translate-y-full group-hover:translate-y-0"
                  style={{
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 95%, 85% 90%, 75% 95%, 65% 90%, 55% 95%, 45% 90%, 35% 95%, 25% 90%, 15% 95%, 5% 90%, 0% 95%)',
                    animationDelay: '200ms'
                  }}
                />

                {/* Bubble effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.8s' }} />
                  <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1.1s' }} />
                  <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1.4s' }} />
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1500 ease-out delay-500" />
              </div>

              <CardContent className="p-0 text-justify relative z-10">
                <img
                  src={approach.icon}
                  className="w-8 h-8 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <h3 className="text-base md:text-1xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-4 text-left transition-all duration-500 group-hover:text-[#2D5016]">
                  {approach.title}
                </h3>
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-base md:text-base leading-relaxed transition-all duration-500 group-hover:text-[#4A6B2A]">
                  {approach.description}
                </p>
              </CardContent>

              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-700">
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
        @keyframes liquidFill {
          0% {
            transform: translateY(100%) scale(1);
            opacity: 0;
          }
          50% {
            transform: translateY(50%) scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
        }

        @keyframes waveMotion {
          0%, 100% {
            clip-path: polygon(0% 100%, 100% 100%, 100% 85%, 95% 80%, 85% 85%, 75% 80%, 65% 85%, 55% 80%, 45% 85%, 35% 80%, 25% 85%, 15% 80%, 5% 85%, 0% 80%);
          }
          50% {
            clip-path: polygon(0% 100%, 100% 100%, 100% 80%, 95% 85%, 85% 80%, 75% 85%, 65% 80%, 55% 85%, 45% 80%, 35% 85%, 25% 80%, 15% 85%, 5% 80%, 0% 85%);
          }
        }

        .group:hover .liquid-wave-1 {
          animation: waveMotion 3s ease-in-out infinite;
        }

        .group:hover .liquid-wave-2 {
          animation: waveMotion 3s ease-in-out infinite 0.5s;
        }

        .group:hover .liquid-wave-3 {
          animation: waveMotion 3s ease-in-out infinite 1s;
        }

        /* Enhanced bubble animations */
        @keyframes bubbleFloat {
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

        .group:hover .bubble {
          animation: bubbleFloat 2s ease-out infinite;
        }

        /* Ripple effect */
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        .group:hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 10px;
          height: 10px;
          background: rgba(117, 191, 68, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: ripple 1.5s ease-out infinite;
          z-index: 1;
        }
      `}</style>
    </section>
  );
};