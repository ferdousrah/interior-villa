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
      description: "We begin by understanding your needs, preferences, and lifestyle to create a tailored design plan.",
      details: [
        "Initial Consultation",
        "Space Assessment", 
        "Lifestyle Analysis",
        "Budget Planning"
      ]
    },
    {
      step: "02",
      title: "Design & Material Selection",
      description: "Our team develops detailed designs, including material selections, layouts, and 3D visualizations.",
      details: [
        "Concept Development",
        "Material Selection",
        "3D Visualization",
        "Design Refinement"
      ]
    },
    {
      step: "03",
      title: "Execution & Finishing Touches",
      description: "We manage all aspects of the project, from sourcing materials to overseeing construction and installation.",
      details: [
        "Project Management",
        "Quality Control",
        "Installation Oversight",
        "Final Styling"
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#f7f9fb]"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
          >
            Our Approach
          </h2>
          <p className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-2xl mx-auto leading-relaxed">
            A step-by-step process designed to bring your vision to life
          </p>
        </div>

        <div 
          ref={stepsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="flex justify-between items-center px-16">
              <div className="w-16 h-0.5 bg-primary"></div>
              <div className="w-16 h-0.5 bg-primary"></div>
            </div>
          </div>

          {processSteps.map((step, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Step Number Circle */}
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="text-white font-bold [font-family:'Fahkwang',Helvetica] text-xl">
                  {step.step}
                </span>
              </div>

              <h3 className="text-xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-4">
                {step.title}
              </h3>
              
              <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-sm leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Details List */}
              <div className="space-y-2">
                {step.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center justify-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-xs [font-family:'Fahkwang',Helvetica] text-[#626161]">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};