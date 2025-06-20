import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const MissionVisionSection = (): JSX.Element => {
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
          x: (index) => index === 0 ? -80 : 80,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.3,
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

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 bg-white"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <motion.h2 
            ref={headingRef}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
          >
            Mission & Vision
          </motion.h2>
          <motion.p 
            ref={descriptionRef}
             className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-4xl mx-auto leading-relaxed"
                   >
                      Guided by our core values, we strive to create spaces that inspire and transform everyday living.
                    </motion.p>
        </div>

        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
        >
          <Card className="bg-[#01190c] text-white rounded-3xl p-8 md:p-12 h-full">
            <CardContent className="p-0">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-6">
                  
                    <img
                      src="/mission.svg"
                      className="w-8 h-8 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 group-hover:drop-shadow-lg"
                    />
                  
                </div>
                <h3 className="text-1xl md:text-2xl font-bold [font-family:'Fahkwang',Helvetica]">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-300 [font-family:'Fahkwang',Helvetica] leading-relaxed text-base md:text-lg">
                To transform spaces into beautiful, functional environments that enhance the quality of life for our clients. We are committed to delivering exceptional design solutions that reflect individual style while maintaining the highest standards of craftsmanship and service excellence.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#01190c] text-white rounded-3xl p-8 md:p-12 h-full">
            <CardContent className="p-0">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-6">
                  <img
                      src="/mission.svg"
                      className="w-8 h-8 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 group-hover:drop-shadow-lg"
                    />
                </div>
                <h3 className="text-1xl md:text-2xl font-bold [font-family:'Fahkwang',Helvetica]">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-300 [font-family:'Fahkwang',Helvetica] leading-relaxed text-base md:text-lg">
                To be the leading interior design firm recognized for innovation, sustainability, and excellence in creating spaces that inspire and delight. We envision a future where every space we design becomes a testament to the perfect harmony between aesthetics and functionality.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};