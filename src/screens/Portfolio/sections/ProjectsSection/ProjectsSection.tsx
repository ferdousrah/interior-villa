import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  category: string;
  image: string;
  title: string;
  description: string;
  subtitle: string;
}

export const ProjectsSection = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTabWidth, setActiveTabWidth] = useState(0);
  const [activeTabLeft, setActiveTabLeft] = useState(0);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Refs for animations
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" }
  ];

  useEffect(() => {
    const activeTab = tabRefs.current[selectedCategory];
    if (activeTab) {
      setActiveTabWidth(activeTab.offsetWidth);
      setActiveTabLeft(activeTab.offsetLeft);
    }
  }, [selectedCategory]);

  // Animation effects
  useEffect(() => {
    if (!sectionRef.current) return;

    // Header animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "top 50%",
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

    // Tabs animation
    if (tabsContainerRef.current) {
      gsap.fromTo(tabsContainerRef.current,
        {
          opacity: 0,
          x: 30,
          scale: 0.98
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tabsContainerRef.current,
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
          const galleryElements = document.querySelectorAll("[data-fancybox='portfolio-gallery']");
          
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
  }, [selectedCategory]);

  const projects: Project[] = [
    {
      id: 1,
      category: "residential",
      image: "/a-residential-interior-image.png",
      title: "House Renovation",
      subtitle: "Residential Interior Design",
      description: "Modern residential interior with contemporary design elements"
    },
    {
      id: 2,
      category: "commercial",
      image: "/a-office-interior-image.png",
      title: "Office Space",
      subtitle: "Commercial Interior Design",
      description: "Professional office space designed for productivity and collaboration"
    },
    {
      id: 3,
      category: "commercial",
      image: "/rectangle-9.png",
      title: "Restaurant Design",
      subtitle: "Commercial Interior Design",
      description: "Elegant restaurant interior with modern dining experience"
    },
    {
      id: 4,
      category: "residential",
      image: "/create-an-image-where-a-beautiful-girl-shows-her-bedroom-interio.png",
      title: "Bedroom Suite",
      subtitle: "Residential Interior Design",
      description: "Luxurious bedroom design with premium finishes and comfort"
    }
  ];

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div ref={headerRef}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6">
              Our Portfolio
            </h2>
          </div>
          <p 
            ref={descriptionRef}
            className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-4xl mx-auto leading-relaxed"
          >
            Explore our diverse range of interior design projects, from cozy residential spaces to innovative commercial environments. Each project reflects our commitment to creativity, functionality and client satisfaction.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Mobile Dropdown */}
          <div className="block md:hidden w-full relative">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full bg-[#f7f9fb] text-[#4E545A] rounded-[88px] flex items-center justify-between px-6 py-3 border border-gray-200"
              whileTap={{ scale: 0.98 }}
            >
              <span className="[font-family:'Fahkwang',Helvetica] font-normal">
                {categories.find(cat => cat.value === selectedCategory)?.label || "All Projects"}
              </span>
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
                >
                  {categories.map((category) => (
                    <motion.button
                      key={category.value}
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left relative overflow-hidden"
                      whileHover={{ backgroundColor: "rgba(117, 191, 68, 0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="[font-family:'Fahkwang',Helvetica] font-normal text-[#4E545A] relative z-10">
                        {category.label}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Tabs */}
          <div 
            ref={tabsContainerRef}
            className="hidden md:block w-auto mx-auto"
          >
            <div className="bg-[#f7f9fb] h-auto p-1 gap-2 rounded-[88px] flex flex-nowrap relative border border-gray-200">
              <motion.div
                className="absolute bg-white rounded-[88px] transition-all duration-300 shadow-sm"
                layoutId="activeTab"
                style={{
                  width: activeTabWidth,
                  height: "calc(100% - 8px)",
                  top: "4px",
                  left: activeTabLeft + 4,
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
              {categories.map((category) => (
                <button
                  key={category.value}
                  ref={el => tabRefs.current[category.value] = el}
                  onMouseEnter={() => setHoveredTab(category.value)}
                  onMouseLeave={() => setHoveredTab(null)}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`relative [font-family:'Fahkwang',Helvetica] font-normal text-[#4E545A] text-sm whitespace-nowrap leading-[18.8px] px-6 py-2 rounded-[88px] transition-all duration-300 hover:text-primary ${
                    selectedCategory === category.value 
                      ? 'text-primary z-10' 
                      : ''
                  }`}
                  style={{
                    transform: hoveredTab === category.value && category.value !== selectedCategory ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <span className="relative z-10">{category.label}</span>
                  {hoveredTab === category.value && category.value !== selectedCategory && (
                    <motion.div
                      layoutId="hoverBackground"
                      className="absolute inset-0 bg-white/50 rounded-[88px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div 
          ref={projectsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
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
                  height: '500px'
                }}
              >
                <a
                  href={project.image}
                  data-fancybox="portfolio-gallery"
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
                    
                    {/* Dark overlay for better contrast */}
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Project Information Overlay - Always visible at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <h3 className="text-2xl font-semibold [font-family:'Fahkwang',Helvetica]">
                          {project.title}
                        </h3>
                        <p className="text-sm opacity-90 [font-family:'Fahkwang',Helvetica]">
                          {project.subtitle}
                        </p>
                      </motion.div>
                    </div>

                    {/* Hover overlay with enhanced contrast */}
                    <AnimatePresence>
                      {hoveredProject === project.id && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-black/40"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
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