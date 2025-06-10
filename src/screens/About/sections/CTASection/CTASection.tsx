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
    if (!sectionRef.current || !contentRef.current) return;

    // Content animation
    gsap.fromTo(contentRef.current,
      {
        opacity: 0,
        y: 80,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          end: "top 55%",
          toggleActions: "play none none reverse"
        }
      }
    );

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
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <motion.div
          ref={contentRef}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg md:text-xl [font-family:'Fahkwang',Helvetica] text-[#626161] mb-12 max-w-3xl mx-auto leading-relaxed">
            Let's work together to create the interior of your dreams. Contact us today for a consultation and discover how we can bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button className="bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-full text-lg [font-family:'Fahkwang',Helvetica] font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
              START A PROJECT
            </Button>
            <Button variant="outline" className="border-2 border-[#01190c] text-[#01190c] hover:bg-[#01190c] hover:text-white px-10 py-4 rounded-full text-lg [font-family:'Fahkwang',Helvetica] font-medium transition-all duration-300 hover:scale-105">
              CONTACT US
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};