import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Left content animation
    if (leftContentRef.current) {
      gsap.fromTo(leftContentRef.current,
        {
          opacity: 0,
          x: -60,
          y: 30
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Right content animation
    if (rightContentRef.current) {
      gsap.fromTo(rightContentRef.current,
        {
          opacity: 0,
          x: 60,
          y: 30
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightContentRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Stats animation
    if (statsRef.current) {
      const statItems = statsRef.current.children;
      
      gsap.fromTo(statItems,
        {
          opacity: 0,
          y: 40,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
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

  const stats = [
    { number: "500+", label: "Homes Designed" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Awards Won" }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div ref={leftContentRef} className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6 leading-tight">
                Creating Beautiful Homes That Reflect Your Lifestyle
              </h2>
              
              <p className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] leading-relaxed mb-6">
                Our residential interior design services focus on creating spaces that are not only visually stunning but also functional and comfortable for everyday living. We understand that your home is your sanctuary, and we work closely with you to bring your vision to life.
              </p>

              <p className="text-base [font-family:'Fahkwang',Helvetica] text-[#626161] leading-relaxed">
                From concept to completion, we handle every aspect of your residential project with attention to detail and a commitment to excellence. Our team of experienced designers combines creativity with practical solutions to transform your space into something extraordinary.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                "Personalized design solutions tailored to your lifestyle",
                "Complete project management from start to finish",
                "High-quality materials and expert craftsmanship",
                "Timely delivery within agreed timelines"
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-base">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div ref={rightContentRef} className="space-y-8">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/a-residential-interior-image.png"
                alt="Residential Interior Design"
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Stats Grid */}
            <div 
              ref={statsRef}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <Card 
                  key={index}
                  className="bg-[#f7f9fb] border-none rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-0">
                    <div className="text-3xl md:text-4xl font-bold [font-family:'Fahkwang',Helvetica] text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm md:text-base [font-family:'Fahkwang',Helvetica] text-[#626161] font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};