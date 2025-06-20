import React, { useEffect, useRef } from "react";
import { BeforeAfterSlider } from "../../../../components/ui/before-after-slider";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BeforeAfterSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Slider animation
    if (sliderRef.current) {
      gsap.fromTo(sliderRef.current,
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
            trigger: sliderRef.current,
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
          y: 40
        },
        {
          opacity: 1,
          y: 0,
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
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Before/After Slider */}
        <div 
          ref={sliderRef}
          className="mb-12 md:mb-16"
        >
          <BeforeAfterSlider
            beforeImage="/before.jpg"
            afterImage="/after.jpg"
            beforeLabel="BEFORE"
            afterLabel="AFTER"
            height="500px"
            className="w-full"
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: 'none'
            }}
          />
        </div>

        {/* Project Description */}
        <div 
          ref={descriptionRef}
          className="max-w-1xl mx-auto"
        >
          <div className="space-y-6">
            <p className="text-base [font-family:'Fahkwang',Helvetica] text-[#626161] leading-relaxed text-justify">
              When we started work on this project, we knew that creating a living space that was both functional and beautiful would be a priority. The client wanted to create a modern, sophisticated environment that would serve as both a comfortable family home and an elegant space for entertaining guests.
            </p>
            
            <p className="text-base [font-family:'Fahkwang',Helvetica] text-[#626161] leading-relaxed text-justify">
              Our team designed a space combining "light" to reflect the best of modern design while also respecting the original architecture of the home. The result is a home that feels both timeless and contemporary, with a sophisticated lighting plan that enhances the natural beauty of the space.
            </p>
            
            <p className="text-base [font-family:'Fahkwang',Helvetica] text-[#626161] leading-relaxed text-justify">
              The project was completed on schedule and within budget, and the client was thrilled with the results. The space now serves as a beautiful backdrop for family life and entertaining, and we're proud to have been a part of bringing this vision to life.
            </p>
            
            <p className="text-base [font-family:'Fahkwang',Helvetica] text-[#626161] leading-relaxed text-justify">
              In this project, traditional and contemporary design elements were combined to create a space that feels both timeless and current. The result is a home that feels both sophisticated and comfortable, with a design that will stand the test of time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};