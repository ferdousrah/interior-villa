import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = (): JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const sectionRef = useRef<HTMLElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Contact info animation
    if (contactInfoRef.current) {
      const cards = contactInfoRef.current.children;
      
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Form section animation
    if (formSectionRef.current) {
      gsap.fromTo(formSectionRef.current,
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
            trigger: formSectionRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Map animation
    if (mapRef.current) {
      gsap.fromTo(mapRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      content: "18/10-A, Block-F, Ring Road, Mohammadpur, Dhaka-1207.",
      iconBg: "bg-primary"
    },
    {
      icon: Phone,
      title: "Have Any Question",
      content: "+88 01748981590",
      iconBg: "bg-primary"
    },
    {
      icon: Send,
      title: "Email Address",
      content: "info@interiorvillabd.com",
      iconBg: "bg-primary"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-white"
    >
      {/* Contact Info Cards Section - Matching Exact Design */}
      <div className="bg-[#F5F3F0] py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div 
            ref={contactInfoRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-0 relative"
          >
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <React.Fragment key={index}>
                  <motion.div
                    className="text-center py-12 px-8 relative"
                  >
                    {/* Green Circular Icon */}
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#2D2D2D] mb-4">
                      {info.title}
                    </h3>
                    
                    {/* Content */}
                    <p className="text-[#666666] [font-family:'Fahkwang',Helvetica] text-base leading-relaxed">
                      {info.content}
                    </p>
                  </motion.div>
                  
                  {/* Vertical Divider Line - Only between columns, not after last */}
                  {index < contactInfo.length - 1 && (
                    <div className="hidden md:block absolute top-8 bottom-8 w-px bg-[#D0D0D0]" 
                         style={{ left: `${((index + 1) * 100) / 3}%` }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Section - Matching Design */}
      <div 
        ref={formSectionRef}
        className="py-16 md:py-20 bg-white"
      >
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-12">
            Need Any Help? Drop us a Line
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-4 text-base [font-family:'Fahkwang',Helvetica] placeholder:text-gray-500 focus:border-primary focus:ring-primary h-auto w-full"
              required
            />

            <Input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-4 text-base [font-family:'Fahkwang',Helvetica] placeholder:text-gray-500 focus:border-primary focus:ring-primary h-auto w-full"
              required
            />

            <Textarea
              placeholder="Type your Message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-4 text-base [font-family:'Fahkwang',Helvetica] placeholder:text-gray-500 focus:border-primary focus:ring-primary min-h-[120px] resize-none w-full"
              required
            />

            <Button 
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-lg [font-family:'Fahkwang',Helvetica] font-medium text-base hover:bg-primary-hover transition-all duration-300 hover:scale-105"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>

      {/* Map Section - Matching Design */}
      <div ref={mapRef}>
        <div className="w-full h-[400px] bg-gray-200 relative">
          {/* Placeholder for Google Maps */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-medium [font-family:'Fahkwang',Helvetica] text-gray-600 mb-2">
                Find Us Here
              </h4>
              <p className="text-gray-500 [font-family:'Fahkwang',Helvetica]">
                Interactive map will be integrated here
              </p>
            </div>
          </div>
          
          {/* Map Pin Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};