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
      className="py-20 md:py-32 bg-[#f7f9fb]"
    >
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="text-center mb-16 md:mb-24">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
          >
            Our Approach
          </h2>
          <p className="text-xl [font-family:'Fahkwang',Helvetica] text-[#626161] leading-relaxed max-w-2xl mx-auto">
            A Clear Path to Your Dream Interior
          </p>
        </div>

        <div 
          ref={stepsContainerRef}
          className="relative"
        >
          {/* Desktop Layout - Flex with fixed card widths and NO GAPS */}
          <div className="hidden md:flex justify-center items-center">
            {processSteps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Process Step Card - Fixed 340px width */}
                <div 
                  className="relative bg-white border-2 border-[#E5E5E5] rounded-3xl p-8 lg:p-12 xl:p-16 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:border-primary/30 min-h-[500px] lg:min-h-[550px] xl:min-h-[600px] flex flex-col justify-center"
                  style={{ width: '340px' }}
                >
                  {/* Step Number Circle with dotted border */}
                  <div className="relative w-24 h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mx-auto mb-8 lg:mb-10 xl:mb-12">
                    {/* Dotted border circle */}
                    <div className="absolute inset-0 border-2 border-dashed border-[#CCCCCC] rounded-full"></div>
                    {/* Inner solid circle */}
                    <div className="absolute inset-3 bg-white border-2 border-[#333333] rounded-full flex items-center justify-center">
                      <span className="text-[#333333] font-bold [font-family:'Fahkwang',Helvetica] text-2xl lg:text-3xl xl:text-4xl">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl lg:text-3xl xl:text-4xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6 lg:mb-8 xl:mb-10 leading-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-base lg:text-lg xl:text-xl leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow between steps (only if not the last step) - EXACT 118.47px width, NO GAPS */}
                {index < processSteps.length - 1 && (
                  <div className="flex justify-center items-center flex-shrink-0">
                    <img 
                      src={index === 0 ? "/approach-arrow-one.svg" : "/approach-arrow-two.svg"}
                      alt="Process Arrow" 
                      className="object-contain"
                      style={{ 
                        width: '118.47px',
                        height: 'auto'
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Layout - Single Column with 340px width */}
          <div className="md:hidden space-y-12 flex flex-col items-center">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="relative bg-white border-2 border-[#E5E5E5] rounded-3xl p-10 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:border-primary/30 min-h-[450px] flex flex-col justify-center"
                style={{ width: '340px' }}
              >
                {/* Step Number Circle with dotted border */}
                <div className="relative w-28 h-28 mx-auto mb-10">
                  {/* Dotted border circle */}
                  <div className="absolute inset-0 border-2 border-dashed border-[#CCCCCC] rounded-full"></div>
                  {/* Inner solid circle */}
                  <div className="absolute inset-3 bg-white border-2 border-[#333333] rounded-full flex items-center justify-center">
                    <span className="text-[#333333] font-bold [font-family:'Fahkwang',Helvetica] text-3xl">
                      {step.step}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-8 leading-tight">
                  {step.title}
                </h3>
                
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-lg leading-relaxed">
                  {step.description}
                </p>

                {/* Mobile arrow (only if not the last step) */}
                {index < processSteps.length - 1 && (
                  <div className="flex justify-center mt-10">
                    <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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