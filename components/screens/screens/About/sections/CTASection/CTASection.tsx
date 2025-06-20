import React, { useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CTASection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

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

  const handleAppointmentClick = () => {
    window.location.href = '/book-appointment';
  };

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 bg-white"
    >
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <motion.div
          ref={contentRef}
        >
          
          <motion.h2 
                      ref={headingRef}
                      className="text-2xl md:text-3xl lg:text-4xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
                    >
                      Ready to Transform Your Space?
                    </motion.h2>
          <motion.p 
            ref={descriptionRef}
            className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-4xl mx-auto leading-relaxed"
            >
            Whether you're renovating, building from scratch, or simply looking to refresh your space, our team is ready to bring your vision to life.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <Button onClick={handleAppointmentClick} className="bg-[#132A13] hover:bg-primary-hover text-white px-[62px] py-[30px] rounded-[46px] text-lg [font-family:'Fahkwang',Helvetica] font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Book an Appointment
            </Button>

            <Button onClick={handleContactClick} variant="outline" className="border-2 border-[#01190c] text-[#01190c] hover:bg-[#01190c] hover:text-white px-[62px] py-[30px] rounded-[46px] text-lg [font-family:'Fahkwang',Helvetica] font-medium transition-all duration-300 hover:scale-105">
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};