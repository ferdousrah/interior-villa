import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

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

    // Cards animation
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.children;
      
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 80,
          rotationX: -15,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
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

  const services = [
    {
      title: "Living Room Design",
      description: "Create stunning living spaces that combine comfort with style, perfect for relaxation and entertainment.",
      image: "/a-residential-interior-image.png",
      features: ["Space Planning", "Furniture Selection", "Color Coordination", "Lighting Design"]
    },
    {
      title: "Bedroom Design",
      description: "Design peaceful and luxurious bedrooms that provide the perfect retreat for rest and relaxation.",
      image: "/create-an-image-where-a-beautiful-girl-shows-her-bedroom-interio.png",
      features: ["Master Suite Design", "Walk-in Closets", "Lighting Solutions", "Storage Solutions"]
    },
    {
      title: "Kitchen Design",
      description: "Transform your kitchen into a functional and beautiful space that's perfect for cooking and gathering.",
      image: "/create-an-image-where-a-women-showing-her-kitchen-interior.svg",
      features: ["Layout Optimization", "Cabinet Design", "Appliance Integration", "Storage Solutions"]
    },
    {
      title: "Bathroom Design",
      description: "Create spa-like bathrooms that combine luxury with functionality for your daily routines.",
      image: "/rectangle-8.png",
      features: ["Fixture Selection", "Tile Design", "Storage Solutions", "Lighting Design"]
    },
    {
      title: "Dining Room Design",
      description: "Design elegant dining spaces that bring family and friends together for memorable meals.",
      image: "/dining-interior.png",
      features: ["Table Selection", "Seating Arrangements", "Ambient Lighting", "Decor Elements"]
    },
    {
      title: "Home Office Design",
      description: "Create productive and inspiring home office spaces that enhance your work-from-home experience.",
      image: "/rectangle-9.png",
      features: ["Ergonomic Design", "Storage Solutions", "Technology Integration", "Productivity Zones"]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#f7f9fb]"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
          >
            Our Residential Services
          </h2>
          <p className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive residential interior design services to transform every room in your home into a beautiful and functional space.
          </p>
        </div>

        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <Card 
              key={index}
              className="bg-white border-none rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-3">
                  {service.title}
                </h3>
                
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-2">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-xs [font-family:'Fahkwang',Helvetica] text-[#626161]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};