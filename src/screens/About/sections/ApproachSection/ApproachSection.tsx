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
              className="bg-white border-none rounded-[5px] p-6 md:p-8 h-full shadow-lg transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 cursor-pointer group relative overflow-hidden"
            >
              {/* Smooth paint filling animation - covers entire card */}
              <div className="absolute inset-0 overflow-hidden rounded-[5px]">
                {/* Base paint layer - full coverage */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#E9FFDA] via-[#D4F7B8] to-[#C0F096] opacity-0 group-hover:opacity-100 transition-all duration-2000 ease-out transform translate-y-full group-hover:translate-y-0"
                  style={{
                    background: 'linear-gradient(135deg, #E9FFDA 0%, #D4F7B8 25%, #C0F096 50%, #ACEB74 75%, #98E652 100%)',
                  }}
                />
                
                {/* Paint brush stroke texture overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-2500 ease-out"
                  style={{
                    background: `
                      repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 2px,
                        rgba(255, 255, 255, 0.1) 2px,
                        rgba(255, 255, 255, 0.1) 4px
                      ),
                      repeating-linear-gradient(
                        -45deg,
                        transparent,
                        transparent 3px,
                        rgba(255, 255, 255, 0.05) 3px,
                        rgba(255, 255, 255, 0.05) 6px
                      )
                    `,
                    animationDelay: '500ms'
                  }}
                />

                {/* Smooth paint flow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-3000 ease-out"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                    transform: 'scale(0.8)',
                    animation: 'group-hover:paintFlow 3s ease-out infinite'
                  }}
                />

                {/* Subtle shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-2000 ease-out delay-1000" />
              </div>

              <CardContent className="p-0 text-justify relative z-10">
                <img
                  src={approach.icon}
                  className="w-8 h-8 mb-4 transition-all duration-700 group-hover:scale-125 group-hover:brightness-110 group-hover:drop-shadow-lg group-hover:filter group-hover:saturate-150"
                />
                <h3 className="text-base md:text-1xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-4 text-left transition-all duration-700 group-hover:text-[#2D5016] group-hover:drop-shadow-sm group-hover:transform group-hover:scale-105">
                  {approach.title}
                </h3>
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-base md:text-base leading-relaxed transition-all duration-700 group-hover:text-[#4A6B2A] group-hover:drop-shadow-sm">
                  {approach.description}
                </p>
              </CardContent>

              {/* Floating paint particles */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-2000 delay-1500">
                <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-white rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '4s' }} />
                <div className="absolute top-1/2 right-1/5 w-0.5 h-0.5 bg-white rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '5s' }} />
                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '6s' }} />
                <div className="absolute top-3/4 right-1/3 w-0.5 h-0.5 bg-white rounded-full animate-float" style={{ animationDelay: '3s', animationDuration: '4s' }} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes paintFlow {
          0% {
            transform: scale(0.8) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.1) rotate(180deg);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.9) rotate(360deg);
            opacity: 0.1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.7;
          }
          25% {
            transform: translateY(-10px) translateX(5px);
            opacity: 1;
          }
          50% {
            transform: translateY(-5px) translateX(-3px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-15px) translateX(8px);
            opacity: 0.9;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        /* Smooth paint filling keyframes */
        @keyframes smoothPaintFill {
          0% {
            transform: translateY(100%) scale(1.1);
            opacity: 0;
          }
          20% {
            transform: translateY(80%) scale(1.05);
            opacity: 0.3;
          }
          40% {
            transform: translateY(60%) scale(1.02);
            opacity: 0.6;
          }
          60% {
            transform: translateY(40%) scale(1.01);
            opacity: 0.8;
          }
          80% {
            transform: translateY(20%) scale(1);
            opacity: 0.9;
          }
          100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
        }

        /* Enhanced hover effects */
        .group:hover .paint-base {
          animation: smoothPaintFill 2s ease-out forwards;
        }

        /* Subtle breathing effect for painted cards */
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        .group:hover {
          animation: breathe 4s ease-in-out infinite;
        }

        /* Smooth transitions for all elements */
        .group * {
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced shadow effects */
        .group:hover {
          box-shadow: 
            0 25px 50px -12px rgba(117, 191, 68, 0.25),
            0 0 30px rgba(117, 191, 68, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};