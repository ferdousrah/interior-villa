import React, { useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CTASection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Content animation
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
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
      className="py-16 md:py-24 bg-[#f7f9fb]"
    >
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div ref={contentRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-8 leading-tight">
            Ready to transform your space?
          </h2>
          
          <Button className="bg-primary hover:bg-primary-hover text-white px-12 py-4 rounded-full text-lg [font-family:'Fahkwang',Helvetica] font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};