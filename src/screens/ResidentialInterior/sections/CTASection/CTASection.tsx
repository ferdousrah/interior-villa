import React, { useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CTASection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

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
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div ref={leftContentRef} className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6 leading-tight">
                Ready to Transform Your Home?
              </h2>
              
              <p className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] leading-relaxed mb-8">
                Let's work together to create the home of your dreams. Our team of expert designers is ready to bring your vision to life with personalized residential interior design solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full text-lg [font-family:'Fahkwang',Helvetica] font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  START YOUR PROJECT
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" className="border-2 border-[#01190c] text-[#01190c] hover:bg-[#01190c] hover:text-white px-8 py-4 rounded-full text-lg [font-family:'Fahkwang',Helvetica] font-medium transition-all duration-300 hover:scale-105">
                  VIEW PORTFOLIO
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-4">
                Get in Touch
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-sm">Call us</p>
                    <p className="text-[#01190c] [font-family:'Fahkwang',Helvetica] font-medium">+880 1234 567890</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-sm">Email us</p>
                    <p className="text-[#01190c] [font-family:'Fahkwang',Helvetica] font-medium">info@interiorvilla.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-sm">Visit us</p>
                    <p className="text-[#01190c] [font-family:'Fahkwang',Helvetica] font-medium">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div ref={rightContentRef}>
            <Card className="bg-white border-none rounded-3xl shadow-xl">
              <CardContent className="p-8 md:p-10">
                <h3 className="text-2xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6 text-center">
                  Get Your Free Consultation
                </h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 [font-family:'Fahkwang',Helvetica]"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 [font-family:'Fahkwang',Helvetica]"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 [font-family:'Fahkwang',Helvetica]"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 [font-family:'Fahkwang',Helvetica]"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-2">
                      Project Type
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 [font-family:'Fahkwang',Helvetica]">
                      <option value="">Select project type</option>
                      <option value="living-room">Living Room</option>
                      <option value="bedroom">Bedroom</option>
                      <option value="kitchen">Kitchen</option>
                      <option value="bathroom">Bathroom</option>
                      <option value="dining-room">Dining Room</option>
                      <option value="home-office">Home Office</option>
                      <option value="full-home">Full Home Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-2">
                      Project Details
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 [font-family:'Fahkwang',Helvetica] resize-none"
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl text-lg [font-family:'Fahkwang',Helvetica] font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};