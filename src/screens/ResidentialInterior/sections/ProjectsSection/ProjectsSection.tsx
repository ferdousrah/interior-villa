import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection = (): JSX.Element => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);

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
          y: 30
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

    // Projects grid animation
    if (projectsGridRef.current) {
      const projects = projectsGridRef.current.children;
      
      gsap.fromTo(projects,
        {
          opacity: 0,
          y: 80,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsGridRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Explore button animation
    if (exploreButtonRef.current) {
      gsap.fromTo(exploreButtonRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: exploreButtonRef.current,
            start: "top 90%",
            end: "top 70%",
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

  // Initialize Fancybox
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const initializeFancybox = () => {
      timeoutId = setTimeout(() => {
        try {
          const galleryElements = document.querySelectorAll("[data-fancybox='residential-gallery']");
          
          if (galleryElements.length > 0) {
            Fancybox.bind(Array.from(galleryElements), {
              animated: true,
              showClass: "fancybox-fadeIn",
              hideClass: "fancybox-fadeOut",
              dragToClose: false,
              
              Image: {
                zoom: true,
                fit: "contain"
              },
              
              Toolbar: {
                display: [
                  "prev",
                  "counter",
                  "next", 
                  "zoom",
                  "slideshow",
                  "fullscreen",
                  "close"
                ]
              }
            });
          }
        } catch (error) {
          console.error("Error initializing Fancybox:", error);
        }
      }, 100);
    };

    initializeFancybox();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      Fancybox.destroy();
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Project Title",
      image: "/a-residential-interior-image.png",
      description: "Contemporary living space with clean lines and natural lighting"
    },
    {
      id: 2,
      title: "Project Title",
      image: "/create-an-image-where-a-beautiful-girl-shows-her-bedroom-interio.png",
      description: "Elegant bedroom design with premium finishes and comfort"
    },
    {
      id: 3,
      title: "Project Title",
      image: "/dining-interior.png",
      description: "Functional kitchen design with modern appliances and storage"
    },
    {
      id: 4,
      title: "Project Title",
      image: "/rectangle-8.png",
      description: "Luxurious bathroom with spa-inspired design elements"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#f7f9fb]"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
          >
            Featured Projects
          </h2>
          <p 
            ref={descriptionRef}
            className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-2xl mx-auto leading-relaxed"
          >
            Guided by our core values, we strive to create spaces that inspire and transform everyday living.
          </p>
        </div>

        {/* Projects Grid - 2x2 Layout */}
        <div 
          ref={projectsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 max-w-5xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-3xl cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                height: '400px'
              }}
            >
              <a
                href={project.image}
                data-fancybox="residential-gallery"
                data-caption={`${project.title} - ${project.description}`}
                className="block w-full h-full"
              >
                <div className="relative w-full h-full overflow-hidden rounded-3xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* ONLY show overlay and content on hover */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <>
                        {/* Dark overlay for better contrast - Only on hover */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-black/30"
                        />
                        
                        {/* Bright Green Overlay Bar at Bottom - Only on hover */}
                        <motion.div 
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 100 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="absolute bottom-0 left-0 right-0 h-20 flex items-center justify-between px-6"
                          style={{
                            background: 'linear-gradient(135deg, #A9F577 0%, #75BF44 100%)', // Bright lime-like green
                            borderRadius: '0 0 24px 24px' // Match the card's border radius
                          }}
                        >
                          {/* Project Title on the left */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <span className="text-black font-semibold text-lg [font-family:'Fahkwang',Helvetica]">
                              Project Title
                            </span>
                          </motion.div>
                          
                          {/* Details Button on the right */}
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <div className="bg-white text-black px-6 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 hover:bg-gray-100 hover:scale-105 shadow-md">
                              <span className="text-sm font-medium [font-family:'Fahkwang',Helvetica]">
                                Details
                              </span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </motion.div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Explore More Button with Ripple Effect */}
        <div className="text-center">
          <button 
            ref={exploreButtonRef}
            className="relative bg-black text-white px-8 py-3 rounded-full [font-family:'Fahkwang',Helvetica] font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-3 mx-auto overflow-hidden group"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {/* Multiple Ripple Layers for Rich Color Effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {/* Primary Ripple - Green */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-primary via-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform scale-0 group-hover:scale-150 rounded-full"
                style={{
                  transformOrigin: 'center center',
                  animation: isButtonHovered ? 'ripple-primary 1.2s ease-out' : 'none'
                }}
              />
              
              {/* Secondary Ripple - Lighter Green */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-primary-light via-primary to-primary-light opacity-0 group-hover:opacity-80 transition-all duration-900 ease-out transform scale-0 group-hover:scale-125 rounded-full"
                style={{
                  transformOrigin: 'center center',
                  animation: isButtonHovered ? 'ripple-secondary 1.4s ease-out 0.1s' : 'none'
                }}
              />
              
              {/* Tertiary Ripple - Accent Color */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary-hover to-secondary opacity-0 group-hover:opacity-60 transition-all duration-1100 ease-out transform scale-0 group-hover:scale-100 rounded-full"
                style={{
                  transformOrigin: 'center center',
                  animation: isButtonHovered ? 'ripple-tertiary 1.6s ease-out 0.2s' : 'none'
                }}
              />

              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out delay-300 rounded-full" />
              
              {/* Pulse Effect */}
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
            </div>

            {/* Button Content */}
            <span className="relative z-10 transition-all duration-300 group-hover:text-white">
              Explore more
            </span>
            <div className="relative z-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:scale-110">
              <ArrowRight className="w-3 h-3 text-white group-hover:text-primary transition-colors duration-300" />
            </div>

            {/* Floating Particles Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
              <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{ animationDelay: '0.8s', animationDuration: '2.5s' }} />
              <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1.1s', animationDuration: '3s' }} />
              <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1.4s', animationDuration: '2s' }} />
            </div>
          </button>
        </div>
      </div>

      <style jsx global>{`
        /* Ripple Animation Keyframes */
        @keyframes ripple-primary {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes ripple-secondary {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: scale(1.25);
            opacity: 0;
          }
        }

        @keyframes ripple-tertiary {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        /* Enhanced Button Hover Effects */
        .group:hover {
          box-shadow: 0 20px 40px rgba(117, 191, 68, 0.3), 0 0 30px rgba(238, 84, 40, 0.2);
        }

        /* Fancybox Styles */
        .fancybox__container {
          --fancybox-bg: rgba(0, 0, 0, 0.95);
        }

        .fancybox__toolbar {
          --fancybox-color: #fff;
          --fancybox-hover-color: #75bf44;
        }

        .fancybox__content {
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fancybox__content img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          display: block;
        }

        .fancybox-fadeIn {
          animation: fancybox-fadeIn 0.3s ease-out;
        }

        .fancybox-fadeOut {
          animation: fancybox-fadeOut 0.3s ease-out;
        }

        @keyframes fancybox-fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fancybox-fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }
      `}</style>
    </section>
  );
};