import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = (): JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Header animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
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
            trigger: headerRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

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

    // Form animation
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        {
          opacity: 0,
          x: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
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
    setFormData({ name: "", email: "", subject: "", message: "" });
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
      icon: Mail,
      title: "Email Address",
      content: "info@interiorvillabd.com",
      iconBg: "bg-primary"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div 
          ref={headerRef}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6">
            Get In Touch With Us
          </h2>
          <p className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards - Updated to match design */}
        <div 
          ref={contactInfoRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.div
                key={index}
                className="bg-[#f7f9fb] rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-16 h-16 ${info.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-4">
                  {info.title}
                </h3>
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-base leading-relaxed">
                  {info.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef}>
            <div className="bg-[#f7f9fb] rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-8">
                Send Us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    placeholder="Your Name*"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white border-gray-200 rounded-lg px-4 py-4 text-base [font-family:'Fahkwang',Helvetica] placeholder:text-gray-500 focus:border-primary focus:ring-primary h-auto"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email*"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white border-gray-200 rounded-lg px-4 py-4 text-base [font-family:'Fahkwang',Helvetica] placeholder:text-gray-500 focus:border-primary focus:ring-primary h-auto"
                    required
                  />
                </div>

                <Input
                  placeholder="Subject*"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="bg-white border-gray-200 rounded-lg px-4 py-4 text-base [font-family:'Fahkwang',Helvetica] placeholder:text-gray-500 focus:border-primary focus:ring-primary h-auto"
                  required
                />

                <Textarea
                  placeholder="Your Message*"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="bg-white border-gray-200 rounded-lg px-4 py-4 text-base [font-family:'Fahkwang',Helvetica] placeholder:text-gray-500 focus:border-primary focus:ring-primary min-h-[150px] resize-none"
                  required
                />

                <Button 
                  type="submit"
                  className="w-full bg-primary text-white px-8 py-4 rounded-lg [font-family:'Fahkwang',Helvetica] font-medium text-lg hover:bg-primary-hover transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div ref={mapRef}>
            <div className="bg-gray-200 rounded-2xl overflow-hidden h-full min-h-[500px] relative">
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
              
              {/* Map Overlay with Address */}
              <div className="absolute bottom-6 left-6 right-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-1">
                      Interior Villa Office
                    </h5>
                    <p className="text-sm text-[#626161] [font-family:'Fahkwang',Helvetica]">
                      18/10-A, Block-F, Ring Road<br />
                      Mohammadpur, Dhaka-1207
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};