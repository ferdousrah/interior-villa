import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
            Fancybox.bind("[data-fancybox='residential-gallery']", {
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
      title: "Modern Living Room",
      category: "Living Room",
      image: "/a-residential-interior-image.png",
      description: "Contemporary living space with clean lines and natural lighting"
    },
    {
      id: 2,
      title: "Luxury Master Bedroom",
      category: "Bedroom",
      image: "/create-an-image-where-a-beautiful-girl-shows-her-bedroom-interio.png",
      description: "Elegant bedroom design with premium finishes and comfort"
    },
    {
      id: 3,
      title: "Gourmet Kitchen",
      category: "Kitchen",
      image: "/create-an-image-where-a-women-showing-her-kitchen-interior.svg",
      description: "Functional kitchen design with modern appliances and storage"
    },
    {
      id: 4,
      title: "Spa-like Bathroom",
      category: "Bathroom",
      image: "/rectangle-8.png",
      description: "Luxurious bathroom with spa-inspired design elements"
    },
    {
      id: 5,
      title: "Elegant Dining Room",
      category: "Dining Room",
      image: "/dining-interior.png",
      description: "Sophisticated dining space perfect for entertaining"
    },
    {
      id: 6,
      title: "Home Office",
      category: "Office",
      image: "/rectangle-9.png",
      description: "Productive workspace with ergonomic design and storage"
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
            Featured Residential Projects
          </h2>
          <p className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of stunning residential interior design projects that showcase our expertise and attention to detail.
          </p>
        </div>

        <div 
          ref={projectsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                height: index % 3 === 0 ? '400px' : index % 3 === 1 ? '300px' : '350px'
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
                  <div 
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: hoveredProject === project.id 
                        ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%)'
                        : 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
                      opacity: 1
                    }}
                  />
                  
                  {/* Project Information Overlay */}
                  <div 
                    className="absolute inset-0 flex flex-col justify-end p-6 text-white transition-all duration-500"
                    style={{
                      transform: hoveredProject === project.id ? 'translateY(0)' : 'translateY(20px)',
                      opacity: hoveredProject === project.id ? 1 : 0.8
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredProject === project.id ? 1 : 0.8,
                        y: hoveredProject === project.id ? 0 : 10
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="mb-2">
                        <span className="text-xs uppercase tracking-wider opacity-75 [font-family:'Fahkwang',Helvetica] bg-primary px-2 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 [font-family:'Fahkwang',Helvetica]">
                        {project.title}
                      </h3>
                      <p className="text-sm opacity-90 mb-4 [font-family:'Fahkwang',Helvetica]">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider opacity-75 [font-family:'Fahkwang',Helvetica]">
                          View Project
                        </span>
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <ZoomIn className="w-5 h-5" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
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