import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ProcessSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

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

    // Steps animation
    if (stepsContainerRef.current) {
      const steps = stepsContainerRef.current.children;
      
      gsap.fromTo(steps,
        {
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsContainerRef.current,
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

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Concept",
      description: "We Start By Understanding Your Lifestyle And Vision To Create A Personalized Design.",
    },
    {
      step: "02", 
      title: "Design & Material Selection",
      description: "We Craft A Personalized Design And Choose Sustainable, Premium Materials To Make It A Reality.",
    },
    {
      step: "03",
      title: "Execution & Finishing Touches", 
      description: "our team handles every detail, delivering a seamless transformation into a beautiful, functional space.",
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#f7f9fb]"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-20">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-4"
          >
            Our Approach
          </h2>
          <p className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] leading-relaxed">
            A Clear Path to Your Dream Interior
          </p>
        </div>

        <div 
          ref={stepsContainerRef}
          className="relative"
        >
          {/* Desktop Grid Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="relative bg-white border-2 border-[#E5E5E5] rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30"
              >
                {/* Step Number Circle with dotted border */}
                <div className="relative w-20 h-20 mx-auto mb-8">
                  {/* Dotted border circle */}
                  <div className="absolute inset-0 border-2 border-dashed border-[#CCCCCC] rounded-full"></div>
                  {/* Inner solid circle */}
                  <div className="absolute inset-2 bg-white border-2 border-[#333333] rounded-full flex items-center justify-center">
                    <span className="text-[#333333] font-bold [font-family:'Fahkwang',Helvetica] text-xl">
                      {step.step}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6 leading-tight">
                  {step.title}
                </h3>
                
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}

            {/* Arrow connectors positioned absolutely */}
            <div className="absolute top-10 left-0 right-0 flex justify-between items-center pointer-events-none">
              {/* First arrow between step 1 and 2 */}
              <div className="flex-1 flex justify-center" style={{ marginLeft: '33.333%', marginRight: '-16.666%' }}>
                <img 
                  src="/approach-arrow-one.svg" 
                  alt="Arrow" 
                  className="w-16 h-8 object-contain"
                />
              </div>
              {/* Second arrow between step 2 and 3 */}
              <div className="flex-1 flex justify-center" style={{ marginLeft: '16.666%', marginRight: '-33.333%' }}>
                <img 
                  src="/approach-arrow-two.svg" 
                  alt="Arrow" 
                  className="w-16 h-8 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout - Single Column */}
          <div className="md:hidden space-y-8">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="relative bg-white border-2 border-[#E5E5E5] rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30"
              >
                {/* Step Number Circle with dotted border */}
                <div className="relative w-20 h-20 mx-auto mb-8">
                  {/* Dotted border circle */}
                  <div className="absolute inset-0 border-2 border-dashed border-[#CCCCCC] rounded-full"></div>
                  {/* Inner solid circle */}
                  <div className="absolute inset-2 bg-white border-2 border-[#333333] rounded-full flex items-center justify-center">
                    <span className="text-[#333333] font-bold [font-family:'Fahkwang',Helvetica] text-xl">
                      {step.step}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6 leading-tight">
                  {step.title}
                </h3>
                
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};