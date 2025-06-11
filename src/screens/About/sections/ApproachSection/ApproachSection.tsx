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
              {/* Full card paint filling background */}
              <div 
                className="absolute inset-0 rounded-[5px] opacity-0 group-hover:opacity-100 transition-all duration-[2000ms] ease-out"
                style={{
                  background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 25%, #BBF7D0 50%, #86EFAC 75%, #4ADE80 100%)',
                  transform: 'scale(0)',
                  transformOrigin: 'bottom left',
                }}
              />

              {/* Circular paint effect overlay */}
              <div className="absolute inset-0 overflow-hidden rounded-[5px]">
                <div 
                  className="absolute w-[600%] h-[600%] -bottom-[500%] -left-[500%] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-[2500ms] ease-out transform scale-0 group-hover:scale-100"
                  style={{
                    background: 'radial-gradient(circle at center, #F0FDF4 0%, #DCFCE7 20%, #BBF7D0 40%, #86EFAC 60%, #4ADE80 80%, #22C55E 100%)',
                    transformOrigin: 'bottom left',
                  }}
                />
              </div>

              {/* Paint brush texture */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-[2000ms] ease-out delay-500"
                style={{
                  background: `
                    repeating-linear-gradient(
                      25deg,
                      transparent,
                      transparent 2px,
                      rgba(255, 255, 255, 0.1) 2px,
                      rgba(255, 255, 255, 0.1) 4px
                    )
                  `,
                }}
              />

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-15 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-[2000ms] ease-out delay-1000" />

              <CardContent className="p-0 text-justify relative z-10">
                <img
                  src={approach.icon}
                  className="w-8 h-8 mb-4 transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <h3 className="text-base md:text-1xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-4 text-left transition-all duration-700 group-hover:text-[#166534]">
                  {approach.title}
                </h3>
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-base md:text-base leading-relaxed transition-all duration-700 group-hover:text-[#15803D]">
                  {approach.description}
                </p>
              </CardContent>

              {/* Floating paint droplets */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms] delay-1000">
                <div className="absolute top-1/4 left-1/6 w-1.5 h-1.5 bg-white rounded-full animate-float" style={{ animationDelay: '0s' }} />
                <div className="absolute top-1/2 right-1/5 w-1 h-1 bg-green-100 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-green-50 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Ensure the paint fill covers the entire card */
        .group:hover > div:first-child {
          transform: scale(1) !important;
        }

        /* Smooth transitions */
        .group * {
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </section>
  );
};