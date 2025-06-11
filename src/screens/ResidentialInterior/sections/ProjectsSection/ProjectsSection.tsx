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

        {/* Explore More Button with Water Drop Animation */}
        <div className="text-center">
          <button 
            ref={exploreButtonRef}
            className="relative bg-black text-white px-8 py-3 rounded-full [font-family:'Fahkwang',Helvetica] font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-3 mx-auto overflow-hidden group"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {/* Water Drop Filling Animation */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {/* Main water drop that expands from bottom-left corner */}
              <div 
                className="absolute w-0 h-0 opacity-0 group-hover:opacity-100 transition-all duration-1500 ease-out group-hover:w-[300%] group-hover:h-[300%] rounded-full"
                style={{
                  bottom: '-100%',
                  left: '-100%',
                  background: 'radial-gradient(circle at center, #75BF44 0%, #68AB3C 40%, #5FA032 80%, #4A7D2A 100%)',
                  transform: 'scale(0)',
                  transformOrigin: 'center center',
                  transition: 'all 1500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              />
              
              {/* Secondary water layer for depth and organic feel */}
              <div 
                className="absolute w-0 h-0 opacity-0 group-hover:opacity-80 transition-all duration-1700 ease-out group-hover:w-[280%] group-hover:h-[280%] rounded-full"
                style={{
                  bottom: '-90%',
                  left: '-90%',
                  background: 'radial-gradient(circle at center, #A9F577 0%, #75BF44 50%, #68AB3C 100%)',
                  transform: 'scale(0)',
                  transformOrigin: 'center center',
                  transition: 'all 1700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transitionDelay: '100ms'
                }}
              />

              {/* Third layer for smooth gradient transition */}
              <div 
                className="absolute w-0 h-0 opacity-0 group-hover:opacity-60 transition-all duration-1900 ease-out group-hover:w-[260%] group-hover:h-[260%] rounded-full"
                style={{
                  bottom: '-80%',
                  left: '-80%',
                  background: 'radial-gradient(circle at center, #E9FFDA 0%, #A9F577 30%, #75BF44 70%, #68AB3C 100%)',
                  transform: 'scale(0)',
                  transformOrigin: 'center center',
                  transition: 'all 1900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transitionDelay: '200ms'
                }}
              />

              {/* Liquid surface ripples */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-800">
                <div 
                  className="absolute w-full h-full"
                  style={{
                    background: 'linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 2000ms ease-out',
                    transitionDelay: '800ms'
                  }}
                />
              </div>

              {/* Floating bubbles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-1000">
                <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
                <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.8s', animationDuration: '2.5s' }} />
                <div className="absolute bottom-1/2 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1.1s', animationDuration: '4s' }} />
                <div className="absolute bottom-2/3 left-2/3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1.4s', animationDuration: '3.5s' }} />
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-2000 ease-out delay-1200" />
            </div>

            {/* Button Content */}
            <span className="relative z-10 transition-all duration-500 group-hover:text-white group-hover:drop-shadow-lg">
              Explore more
            </span>
            <div className="relative z-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:scale-125 group-hover:rotate-45">
              <ArrowRight className="w-3 h-3 text-white group-hover:text-primary transition-all duration-500" />
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500" 
                 style={{
                   boxShadow: '0 0 30px rgba(117, 191, 68, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                 }} 
            />
          </button>
        </div>
      </div>

      <style jsx global>{`
        /* Enhanced Water Drop Animation */
        .group:hover div[style*="bottom: -100%"] {
          transform: scale(1) !important;
        }

        .group:hover div[style*="bottom: -90%"] {
          transform: scale(1) !important;
        }

        .group:hover div[style*="bottom: -80%"] {
          transform: scale(1) !important;
        }

        /* Liquid shimmer animation */
        .group:hover div[style*="translateX(-100%)"] {
          transform: translateX(100%) !important;
        }

        /* Enhanced button hover effects */
        .group:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 
            0 15px 35px rgba(117, 191, 68, 0.4),
            0 5px 15px rgba(0, 0, 0, 0.2);
        }

        /* Smooth water-like transitions */
        .group * {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Organic bubble animation */
        @keyframes organicFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-15px) scale(1.2);
            opacity: 1;
          }
        }

        .group:hover .animate-ping {
          animation: organicFloat 3s ease-in-out infinite;
        }

        /* Water surface effect */
        @keyframes waterSurface {
          0%, 100% {
            clip-path: polygon(0% 100%, 100% 100%, 100% 85%, 95% 80%, 85% 85%, 75% 80%, 65% 85%, 55% 80%, 45% 85%, 35% 80%, 25% 85%, 15% 80%, 5% 85%, 0% 80%);
          }
          50% {
            clip-path: polygon(0% 100%, 100% 100%, 100% 80%, 95% 85%, 85% 80%, 75% 85%, 65% 80%, 55% 85%, 45% 80%, 35% 85%, 25% 80%, 15% 85%, 5% 80%, 0% 85%);
          }
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