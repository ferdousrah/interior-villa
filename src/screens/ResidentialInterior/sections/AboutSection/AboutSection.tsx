import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = (): JSX.Element => {
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
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div ref={contentRef}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-8 leading-tight">
            Transforming Your Home Into a Sanctuary of Style and Comfort.
          </h2>
          
          <p className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] leading-relaxed max-w-3xl mx-auto">
            We specialize in creating personalized residential interior design solutions that reflect your unique lifestyle and taste. Our expert team brings years of experience in transforming homes into beautiful, functional environments.
          </p>
        </div>
      </div>
    </section>
  );
};