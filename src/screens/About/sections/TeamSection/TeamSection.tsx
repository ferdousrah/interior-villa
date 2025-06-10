import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const TeamSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);

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

    // Team members animation
    if (teamGridRef.current) {
      const members = teamGridRef.current.children;
      
      gsap.fromTo(members,
        {
          opacity: 0,
          y: 80,
          rotationY: -20,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamGridRef.current,
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

  const teamMembers = [
    {
      name: "John Doe",
      position: "Lead Designer",
      image: "/avatar-image-1.png"
    },
    {
      name: "Jane Smith",
      position: "Project Manager",
      image: "/avatar-image-1.png"
    },
    {
      name: "Mike Johnson",
      position: "Senior Architect",
      image: "/avatar-image-1.png"
    },
    {
      name: "Sarah Wilson",
      position: "Interior Stylist",
      image: "/avatar-image-1.png"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 bg-[#f7f9fb]"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <motion.h2 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
          >
            Meet Our Team
          </motion.h2>
          <motion.p 
            ref={descriptionRef}
            className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-4xl mx-auto leading-relaxed"
          >
            Our team of talented professionals brings together diverse expertise and creative vision to deliver exceptional results.
          </motion.p>
        </div>

        <div 
          ref={teamGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="relative mb-8 group">
                <div className="w-48 h-48 md:w-56 md:h-56 mx-auto bg-gray-200 rounded-3xl overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-2">
                {member.name}
              </h3>
              <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-base md:text-lg mb-6">
                {member.position}
              </p>
              <div className="flex justify-center space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full hover:bg-primary transition-colors duration-300 cursor-pointer"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-full hover:bg-primary transition-colors duration-300 cursor-pointer"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-full hover:bg-primary transition-colors duration-300 cursor-pointer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};