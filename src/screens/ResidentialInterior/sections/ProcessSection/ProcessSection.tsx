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
          stagger: 0.1,
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
          {/* Desktop Grid Layout - 5 columns with proper arrow positioning */}
          <div className="hidden md:grid md:grid-cols-5 gap-4 lg:gap-8 items-center">
            {processSteps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Process Step Card */}
                <div className="relative bg-white border-2 border-[#E5E5E5] rounded-2xl p-6 lg:p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 col-span-1">
                  {/* Step Number Circle with dotted border */}
                  <div className="relative w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 lg:mb-8">
                    {/* Dotted border circle */}
                    <div className="absolute inset-0 border-2 border-dashed border-[#CCCCCC] rounded-full"></div>
                    {/* Inner solid circle */}
                    <div className="absolute inset-2 bg-white border-2 border-[#333333] rounded-full flex items-center justify-center">
                      <span className="text-[#333333] font-bold [font-family:'Fahkwang',Helvetica] text-lg lg:text-xl">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-4 lg:mb-6 leading-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-sm lg:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow between steps (only if not the last step) */}
                {index < processSteps.length - 1 && (
                  <div className="col-span-1 flex justify-center items-center">
                    <img 
                      src={index === 0 ? "/approach-arrow-one.svg" : "/approach-arrow-two.svg"}
                      alt="Process Arrow" 
                      className="w-12 h-6 lg:w-16 lg:h-8 object-contain"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
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

                {/* Mobile arrow (only if not the last step) */}
                {index < processSteps.length - 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};