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
              {/* Paint brush filling animation */}
              <div className="absolute inset-0 overflow-hidden rounded-[5px]">
                {/* Main paint stroke - horizontal sweep */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[#E9FFDA] via-[#D4F7B8] to-[#C0F096] opacity-0 group-hover:opacity-100 transition-all duration-1200 ease-out transform -translate-x-full group-hover:translate-x-0"
                  style={{
                    clipPath: 'polygon(0% 0%, 85% 0%, 95% 15%, 100% 30%, 95% 45%, 100% 60%, 90% 75%, 100% 90%, 85% 100%, 0% 100%)',
                    animationDelay: '0ms'
                  }}
                />
                
                {/* Secondary paint layer - vertical brush strokes */}
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-[#D4F7B8] via-[#C0F096] to-[#ACEB74] opacity-0 group-hover:opacity-80 transition-all duration-1400 ease-out transform translate-y-full group-hover:translate-y-0"
                  style={{
                    clipPath: 'polygon(0% 0%, 20% 5%, 15% 20%, 25% 35%, 20% 50%, 30% 65%, 25% 80%, 35% 95%, 100% 100%, 100% 0%)',
                    animationDelay: '200ms'
                  }}
                />
                
                {/* Texture overlay - paint brush texture */}
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-[#C0F096] via-[#ACEB74] to-[#98E652] opacity-0 group-hover:opacity-60 transition-all duration-1600 ease-out transform scale-110 group-hover:scale-100"
                  style={{
                    clipPath: 'polygon(0% 10%, 15% 0%, 30% 8%, 45% 2%, 60% 12%, 75% 5%, 90% 15%, 100% 8%, 100% 100%, 0% 100%)',
                    animationDelay: '400ms'
                  }}
                />

                {/* Paint drips effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-600">
                  <div className="absolute top-0 left-1/4 w-1 h-8 bg-[#ACEB74] rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
                  <div className="absolute top-0 right-1/3 w-0.5 h-6 bg-[#C0F096] rounded-full animate-pulse" style={{ animationDelay: '1.2s' }} />
                  <div className="absolute top-0 left-2/3 w-1.5 h-10 bg-[#D4F7B8] rounded-full animate-pulse" style={{ animationDelay: '1.6s' }} />
                </div>

                {/* Paint splatter dots */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1200 delay-800">
                  <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-[#98E652] rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
                  <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-[#ACEB74] rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
                  <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#C0F096] rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
                  <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-[#D4F7B8] rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2s' }} />
                </div>

                {/* Brush stroke highlight */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1800 ease-out delay-300" />
              </div>

              <CardContent className="p-0 text-justify relative z-10">
                <img
                  src={approach.icon}
                  className="w-8 h-8 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 group-hover:drop-shadow-lg"
                />
                <h3 className="text-base md:text-1xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-4 text-left transition-all duration-500 group-hover:text-[#2D5016] group-hover:drop-shadow-sm">
                  {approach.title}
                </h3>
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-base md:text-base leading-relaxed transition-all duration-500 group-hover:text-[#4A6B2A] group-hover:drop-shadow-sm">
                  {approach.description}
                </p>
              </CardContent>

              {/* Paint brush cursor effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-1000">
                <div className="absolute top-1/4 left-1/6 w-3 h-1 bg-[#75bf44] rounded-full transform rotate-45 animate-pulse" style={{ animationDelay: '0s', animationDuration: '2s' }} />
                <div className="absolute top-1/2 right-1/5 w-2 h-0.5 bg-[#75bf44] rounded-full transform -rotate-12 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
                <div className="absolute bottom-1/3 left-1/3 w-4 h-1.5 bg-[#75bf44] rounded-full transform rotate-30 animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes paintFill {
          0% {
            transform: translateX(-100%) scale(1.1);
            opacity: 0;
          }
          30% {
            transform: translateX(-50%) scale(1.05);
            opacity: 0.6;
          }
          70% {
            transform: translateX(0%) scale(1.02);
            opacity: 0.9;
          }
          100% {
            transform: translateX(0%) scale(1);
            opacity: 1;
          }
        }

        @keyframes brushStroke {
          0% {
            clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
          }
          25% {
            clip-path: polygon(0% 0%, 30% 5%, 25% 95%, 0% 100%);
          }
          50% {
            clip-path: polygon(0% 0%, 60% 8%, 55% 92%, 0% 100%);
          }
          75% {
            clip-path: polygon(0% 0%, 85% 12%, 80% 88%, 0% 100%);
          }
          100% {
            clip-path: polygon(0% 0%, 100% 15%, 100% 85%, 0% 100%);
          }
        }

        .group:hover .paint-stroke-1 {
          animation: paintFill 1.2s ease-out forwards;
        }

        .group:hover .paint-stroke-2 {
          animation: brushStroke 1.4s ease-out forwards 0.2s;
        }

        .group:hover .paint-stroke-3 {
          animation: paintFill 1.6s ease-out forwards 0.4s;
        }

        /* Paint drip animation */
        @keyframes paintDrip {
          0% {
            height: 0;
            opacity: 0;
          }
          50% {
            height: 20px;
            opacity: 1;
          }
          100% {
            height: 40px;
            opacity: 0.8;
          }
        }

        .group:hover .paint-drip {
          animation: paintDrip 2s ease-out infinite;
        }

        /* Splatter effect */
        @keyframes splatter {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 0.8;
          }
        }

        .group:hover .paint-splatter {
          animation: splatter 1.5s ease-out infinite;
        }

        /* Brush texture effect */
        @keyframes brushTexture {
          0%, 100% {
            transform: translateY(0) scaleY(1);
          }
          50% {
            transform: translateY(-2px) scaleY(1.1);
          }
        }

        .group:hover .brush-texture {
          animation: brushTexture 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};