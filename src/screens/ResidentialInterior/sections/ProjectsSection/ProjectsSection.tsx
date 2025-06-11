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
                        {/* Gradient Overlay - Only on hover */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                        />
                        
                        {/* Project Information Overlay - Only on hover */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="absolute bottom-6 left-6 right-6"
                        >
                          {/* Green Project Title Badge */}
                          <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block [font-family:'Fahkwang',Helvetica]">
                            Project Title
                          </div>
                          
                          {/* Details Button */}
                          <div className="flex items-center justify-between">
                            <div className="bg-white text-black px-6 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 hover:bg-gray-100 hover:scale-105">
                              <span className="text-sm font-medium [font-family:'Fahkwang',Helvetica]">
                                Details
                              </span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="text-center">
          <button 
            ref={exploreButtonRef}
            className="bg-black text-white px-8 py-3 rounded-full [font-family:'Fahkwang',Helvetica] font-medium transition-all duration-300 hover:scale-105 hover:bg-gray-800 flex items-center space-x-3 mx-auto"
          >
            <span>Explore more</span>
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </button>
        </div>
      </div>

      <style jsx global>{`
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