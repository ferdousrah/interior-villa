import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const TestimonialsSection = (): JSX.Element => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

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

    // Testimonials animation
    if (testimonialsRef.current) {
      gsap.fromTo(testimonialsRef.current,
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "/avatar-image-1.png",
      rating: 5,
      text: "Interior Villa transformed our home beyond our wildest dreams. Their attention to detail and understanding of our lifestyle made the entire process seamless. We couldn't be happier with the results!"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Property Developer",
      image: "/avatar-image-1.png",
      rating: 5,
      text: "Working with Interior Villa on our residential project was exceptional. They delivered on time, within budget, and exceeded all our expectations. The quality of work is outstanding."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Interior Design Enthusiast",
      image: "/avatar-image-1.png",
      rating: 5,
      text: "The team at Interior Villa has an incredible eye for design. They took our ideas and elevated them to create a space that's both beautiful and functional. Highly recommended!"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Homeowner",
      image: "/avatar-image-1.png",
      rating: 5,
      text: "From concept to completion, Interior Villa provided exceptional service. Their professionalism and creativity made our home renovation a wonderful experience."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
          >
            What Our Clients Say
          </h2>
          <p className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with our residential interior design services.
          </p>
        </div>

        <div 
          ref={testimonialsRef}
          className="max-w-4xl mx-auto"
        >
          {/* Main Testimonial Display */}
          <Card className="bg-[#f7f9fb] border-none rounded-3xl p-8 md:p-12 mb-8">
            <CardContent className="p-0 text-center">
              <div className="mb-8">
                <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
                <motion.p 
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg md:text-xl [font-family:'Fahkwang',Helvetica] text-[#01190c] leading-relaxed mb-8 italic"
                >
                  "{testimonials[activeTestimonial].text}"
                </motion.p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover mb-4"
                />
                
                <h4 className="text-xl font-semibold [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-1">
                  {testimonials[activeTestimonial].name}
                </h4>
                
                <p className="text-[#626161] [font-family:'Fahkwang',Helvetica] text-sm mb-4">
                  {testimonials[activeTestimonial].role}
                </p>

                <div className="flex space-x-1">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial Navigation */}
          <div className="flex justify-center space-x-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'bg-primary scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Client Avatars */}
          <div className="flex justify-center space-x-4 mt-8">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setActiveTestimonial(index)}
                className={`relative transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'scale-110 ring-4 ring-primary ring-opacity-50' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};