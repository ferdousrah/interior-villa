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
              {/* Circular paint filling animation from left bottom corner */}
              <div className="absolute inset-0 overflow-hidden rounded-[5px]">
                {/* Main circular paint fill - starts from left bottom corner */}
                <div 
                  className="absolute w-[400%] h-[400%] -bottom-[300%] -left-[300%] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-2500 ease-out transform scale-0 group-hover:scale-100"
                  style={{
                    background: 'radial-gradient(circle at center, #F0FDF4 0%, #DCFCE7 20%, #BBF7D0 40%, #86EFAC 60%, #4ADE80 80%, #22C55E 100%)',
                    transformOrigin: 'bottom left',
                  }}
                />
                
                {/* Secondary lighter circle for depth */}
                <div 
                  className="absolute w-[350%] h-[350%] -bottom-[275%] -left-[275%] rounded-full opacity-0 group-hover:opacity-80 transition-all duration-2200 ease-out transform scale-0 group-hover:scale-100"
                  style={{
                    background: 'radial-gradient(circle at center, #F7FEF7 0%, #ECFDF5 30%, #D1FAE5 60%, #A7F3D0 90%)',
                    transformOrigin: 'bottom left',
                    animationDelay: '200ms'
                  }}
                />

                {/* Tertiary ultra-light circle for smooth blending */}
                <div 
                  className="absolute w-[300%] h-[300%] -bottom-[250%] -left-[250%] rounded-full opacity-0 group-hover:opacity-60 transition-all duration-2000 ease-out transform scale-0 group-hover:scale-100"
                  style={{
                    background: 'radial-gradient(circle at center, #FEFFFE 0%, #F9FDF9 40%, #F0FDF4 80%)',
                    transformOrigin: 'bottom left',
                    animationDelay: '400ms'
                  }}
                />

                {/* Paint brush texture overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-3000 ease-out"
                  style={{
                    background: `
                      repeating-linear-gradient(
                        30deg,
                        transparent,
                        transparent 1px,
                        rgba(255, 255, 255, 0.1) 1px,
                        rgba(255, 255, 255, 0.1) 2px
                      ),
                      repeating-linear-gradient(
                        -30deg,
                        transparent,
                        transparent 2px,
                        rgba(255, 255, 255, 0.05) 2px,
                        rgba(255, 255, 255, 0.05) 4px
                      )
                    `,
                    animationDelay: '800ms'
                  }}
                />

                {/* Gentle shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-15 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-2500 ease-out delay-1000" />

                {/* Soft glow effect from bottom left */}
                <div 
                  className="absolute w-32 h-32 -bottom-16 -left-16 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-2000 ease-out"
                  style={{
                    background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                    animationDelay: '1200ms'
                  }}
                />
              </div>

              <CardContent className="p-0 text-justify relative z-10">
                <img
                  src={approach.icon}
                  className="w-8 h-8 mb-4 transition-all duration-700 group-hover:scale-125 group-hover:brightness-110 group-hover:drop-shadow-lg group-hover:filter group-hover:saturate-150"
                />
                <h3 className="text-base md:text-1xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-4 text-left transition-all duration-700 group-hover:text-[#166534] group-hover:drop-shadow-sm group-hover:transform group-hover:scale-105">
                  {approach.title}
                </h3>
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-base md:text-base leading-relaxed transition-all duration-700 group-hover:text-[#15803D] group-hover:drop-shadow-sm">
                  {approach.description}
                </p>
              </CardContent>

              {/* Floating paint droplets */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-2500 delay-1500">
                <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-white rounded-full animate-float-gentle" style={{ animationDelay: '0s', animationDuration: '5s' }} />
                <div className="absolute top-1/2 right-1/5 w-0.5 h-0.5 bg-green-100 rounded-full animate-float-gentle" style={{ animationDelay: '1s', animationDuration: '6s' }} />
                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-float-gentle" style={{ animationDelay: '2s', animationDuration: '7s' }} />
                <div className="absolute top-3/4 right-1/3 w-0.5 h-0.5 bg-green-50 rounded-full animate-float-gentle" style={{ animationDelay: '3s', animationDuration: '5s' }} />
                <div className="absolute top-1/3 left-2/3 w-1 h-1 bg-white rounded-full animate-float-gentle" style={{ animationDelay: '4s', animationDuration: '6s' }} />
              </div>

              {/* Subtle ripple effect from bottom left */}
              <div className="absolute -bottom-4 -left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-2000 ease-out">
                <div className="absolute inset-0 rounded-full border-2 border-green-200 animate-ripple" style={{ animationDelay: '1500ms' }} />
                <div className="absolute inset-0 rounded-full border-2 border-green-100 animate-ripple" style={{ animationDelay: '1800ms' }} />
                <div className="absolute inset-0 rounded-full border-2 border-green-50 animate-ripple" style={{ animationDelay: '2100ms' }} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-8px) translateX(3px);
            opacity: 1;
          }
          50% {
            transform: translateY(-4px) translateX(-2px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-12px) translateX(5px);
            opacity: 0.9;
          }
        }

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

        .animate-float-gentle {
          animation: float-gentle 5s ease-in-out infinite;
        }

        .animate-ripple {
          animation: ripple 2s ease-out infinite;
        }

        /* Smooth circular expansion from bottom left */
        @keyframes circularPaintFill {
          0% {
            transform: scale(0);
            opacity: 0;
            transform-origin: bottom left;
          }
          20% {
            transform: scale(0.3);
            opacity: 0.4;
          }
          40% {
            transform: scale(0.6);
            opacity: 0.7;
          }
          60% {
            transform: scale(0.8);
            opacity: 0.9;
          }
          80% {
            transform: scale(0.95);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Enhanced hover effects with gentle breathing */
        @keyframes breathe-gentle {
          0%, 100% {
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(1.01) translateY(-2px);
          }
        }

        .group:hover {
          animation: breathe-gentle 6s ease-in-out infinite;
        }

        /* Smooth transitions for all elements */
        .group * {
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Enhanced shadow effects with light green tint */
        .group:hover {
          box-shadow: 
            0 25px 50px -12px rgba(34, 197, 94, 0.15),
            0 0 30px rgba(74, 222, 128, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        /* Subtle border glow on hover */
        .group:hover::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 5px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(74, 222, 128, 0.1));
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.7s ease;
        }

        .group:hover::before {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};