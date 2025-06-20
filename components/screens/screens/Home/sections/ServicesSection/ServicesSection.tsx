import { ArrowRightIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../../../components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Service data for mapping
const services = [
  {
    title: "Residential interior",
    icon: "/create-an-svg-home-icon.png",
    description:
      "There are many variations of passages of lorem ipsum available",
    iconBg: "#f5fdfd",
    link: "/residential-interior"
  },
  {
    title: "Commercial Interior",
    icon: "/create-a-svg-long-stroied-building-icon.png",
    description:
      "There are many variations of passages of lorem ipsum available",
    iconBg: "#f5fdfd",
    link: "/commercial-interior"
  },
  {
    title: "Architectural consultancy",
    icon: "/create-a-svg-geometry-icon.png",
    description:
      "There are many variations of passages of lorem ipsum available",
    iconBg: "#f5fdfd",
    link: "/architectural-consultancy"
  },
];

export const ServicesSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eventHandlersRef = useRef<Array<{
    element: HTMLDivElement;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
  }>>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Clear previous event handlers
    eventHandlersRef.current = [];

    // Parallax effect for background grid
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: true
        }
      });
    }

    // Header animation with parallax
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtle parallax for header
      gsap.to(headerRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }

    // Staggered card animations with individual parallax
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Initial entrance animation
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 80,
          rotationX: -15,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Individual parallax movement for each card
      gsap.to(card, {
        yPercent: -5 - (index * 3), // Different speeds for depth
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1 + (index * 0.2), // Different scrub speeds
          invalidateOnRefresh: true
        }
      });

      // Create named event handlers for proper cleanup
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -12,
          scale: 1.03,
          rotationY: 2,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      // Add event listeners
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      // Store handlers for cleanup
      eventHandlersRef.current.push({
        element: card,
        handleMouseEnter,
        handleMouseLeave
      });
    });

    // Grid container parallax
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Remove event listeners using the exact same function references
      eventHandlersRef.current.forEach(({ element, handleMouseEnter, handleMouseLeave }) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      // Clear the handlers array
      eventHandlersRef.current = [];
    };
  }, []);

  const handleServiceClick = (link: string) => {
    if (link && link !== "#") {
      window.location.href = link;
    }
  };

  const handleReadMoreClick = (link: string) => {
    if (link && link !== "#") {
      window.location.href = link;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full py-32 bg-[#f7f9fb] relative overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="flex flex-col items-center text-center will-change-transform"
          style={{
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)',
            marginBottom: '130px'
          }}
        >
          <h2 className="font-medium text-[40px] leading-[55px] tracking-normal [font-family:'Fahkwang',Helvetica]">
            Services We Offer
          </h2>
        </div>

        {/* Service Cards */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 will-change-transform"
          style={{
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="will-change-transform group cursor-pointer"
              style={{
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',
                transform: 'translate3d(0, 0, 0)',
                transformStyle: 'preserve-3d'
              }}
              onClick={() => handleServiceClick(service.link)}
            >
              <Card className="rounded-[5px] overflow-hidden transition-all duration-500 hover:shadow-2xl relative">
                {/* Color filling animation overlay */}
                <div className="absolute inset-0 bg-[#A9F577] opacity-0 transition-all duration-700 ease-out group-hover:opacity-10 z-0"></div>
                
                {/* Animated border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#A9F577] transition-all duration-500 rounded-[5px] z-0"></div>
                
                {/* Gradient wave effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#A9F577] to-transparent opacity-0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full group-hover:opacity-20 transition-all duration-1000 ease-out z-0"></div>
                
                {/* Radial glow effect */}
                <div className="absolute inset-0 bg-radial-gradient from-[#A9F577] via-transparent to-transparent opacity-0 group-hover:opacity-15 transition-all duration-700 ease-out scale-0 group-hover:scale-150 z-0"></div>

                <CardContent className="p-11 pt-11 bg-white relative z-10 transition-all duration-500 group-hover:bg-white/95">
                  <div className="flex gap-6">
                    <div
                      className="w-[82px] h-[82px] rounded-full border border-solid border-black flex items-center justify-center overflow-hidden flex-shrink-0"
                      style={{ 
                        backgroundColor: service.iconBg,
                        aspectRatio: '1 / 1',
                        minWidth: '82px',
                        maxWidth: '82px',
                        minHeight: '82px',
                        maxHeight: '82px'
                      }}
                    >
                      <img
                        className="w-11 h-11 object-contain"
                        alt={`${service.title} icon`}
                        src={service.icon}
                      />
                    </div>
                    <div className="mt-[6px] flex-1">
                      <h3 className="[font-family:'Fahkwang',Helvetica] font-medium text-[#010212] text-xl leading-9">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="opacity-80 [font-family:'Fahkwang',Helvetica] font-normal text-[#000000] text-sm leading-8">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-0 relative z-10">
                  <div className="w-full h-[49px] bg-[#EEEEEE] hover:bg-[#A9F577] rounded-[5px] flex items-center justify-center transition-all duration-500 group relative overflow-hidden">
                    {/* Sliding fill effect for read more button */}
                    <div className="absolute inset-0 bg-[#A9F577] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                    
                    <Button
                      variant="ghost"
                      className="[font-family:'Fahkwang',Helvetica] text-base text-[#000000] hover:text-[#010212] hover:bg-transparent transition-all duration-500 hover:scale-105 relative z-10 group-hover:text-[#010212]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadMoreClick(service.link);
                      }}
                    >
                      Read More
                      <ArrowRightIcon className="ml-2 w-[22px] h-[22px] transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Background with Parallax */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        {/* Vertical lines */}
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={`vline-${index}`}
            className="absolute top-6 bottom-6 w-px bg-[url(/line-7.svg)] opacity-30"
            style={{ left: `${(index + 1) * 7.8}%` }}
          />
        ))}

        {/* Horizontal lines */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`hline-${index}`}
            className="absolute left-0 right-0 h-px bg-[url(/line-14.svg)] opacity-30"
            style={{ top: `${(index + 1) * 140 + 26}px` }}
          />
        ))}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-32 right-16 w-6 h-6 bg-secondary rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />

      <style jsx>{`
        .bg-radial-gradient {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
};