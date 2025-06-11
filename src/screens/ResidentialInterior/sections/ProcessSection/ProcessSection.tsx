import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
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
      title: "Initial Consultation",
      description: "We start with a detailed consultation to understand your needs, preferences, lifestyle, and budget requirements.",
      icon: "/create-a-svg-icon-of-chat-between-two-users.svg"
    },
    {
      step: "02",
      title: "Design Concept",
      description: "Our team creates initial design concepts and mood boards that capture your vision and style preferences.",
      icon: "/design--tools-pen-tool.png"
    },
    {
      step: "03",
      title: "3D Visualization",
      description: "We provide detailed 3D renderings and virtual walkthroughs so you can visualize your space before implementation.",
      icon: "/create-a-svg-geometry-icon.png"
    },
    {
      step: "04",
      title: "Material Selection",
      description: "Together, we select high-quality materials, finishes, furniture, and accessories that align with your design and budget.",
      icon: "/create-a-svg-tic-mark-icon.png"
    },
    {
      step: "05",
      title: "Project Execution",
      description: "Our experienced team manages the entire implementation process, ensuring quality workmanship and timely completion.",
      icon: "/create-a-svg-icon-for-interior-deployment-process--transparent-a.png"
    },
    {
      step: "06",
      title: "Final Styling",
      description: "We add the finishing touches with carefully selected accessories and styling to bring your vision to life.",
      icon: "/create-an-line-icon-of-happy-customer.png"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
          >
            Our Design Process
          </h2>
          <p className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-3xl mx-auto leading-relaxed">
            We follow a systematic approach to ensure your residential interior design project is completed to perfection, on time and within budget.
          </p>
        </div>

        <div 
          ref={stepsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {processSteps.map((step, index) => (
            <Card 
              key={index}
              className="bg-[#f7f9fb] border-none rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
              
              <CardContent className="p-0 relative z-10">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold [font-family:'Fahkwang',Helvetica] text-lg">
                      {step.step}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-4 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};