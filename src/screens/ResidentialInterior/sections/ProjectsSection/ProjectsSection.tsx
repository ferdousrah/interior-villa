import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../../components/ui/button";
import { ZoomIn } from "lucide-react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection = (): JSX.Element => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

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
      category: "Living Room",
      image: "/a-residential-interior-image.png",
      description: "Contemporary living space with clean lines and natural lighting"
    },
    {
      id: 2,
      title: "Project Title",
      category: "Bedroom",
      image: "/create-an-image-where-a-beautiful-girl-shows-her-bedroom-interio.png",
      description: "Elegant bedroom design with premium finishes and comfort"
    },
    {
      id: 3,
      title: "Project Title",
      category: "Kitchen",
      image: "/dining-interior.png",
      description: "Functional kitchen design with modern appliances and storage"
    },
    {
      id: 4,
      title: "Project Title",
      category: "Bathroom",
      image: "/rectangle-8.png",
      description: "Luxurious bathroom with spa-inspired design elements"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
          >
            Featured Projects
          </h2>
          <p className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-2xl mx-auto leading-relaxed">
            Explore our most recent projects that showcase our expertise and attention to detail.
          </p>
        </div>

        <div 
          ref={projectsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-2xl cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                height: '350px'
              }}
            >
              <a
                href={project.image}
                data-fancybox="residential-gallery"
                data-caption={`${project.title} - ${project.description}`}
                className="block w-full h-full"
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Project Information Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block">
                      Project Title
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold [font-family:'Fahkwang',Helvetica] mb-1">
                          {project.category}
                        </h3>
                        <p className="text-sm opacity-90 [font-family:'Fahkwang',Helvetica]">
                          View Details
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full [font-family:'Fahkwang',Helvetica] font-medium transition-all duration-300 hover:scale-105">
            View More
          </Button>
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