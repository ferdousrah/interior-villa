import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ProjectGallerySection = (): JSX.Element => {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("photo-gallery");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
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

    // Tabs animation
    if (tabsRef.current) {
      gsap.fromTo(tabsRef.current,
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
            trigger: tabsRef.current,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Gallery animation
    if (galleryRef.current) {
      const images = galleryRef.current.children;
      
      gsap.fromTo(images,
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
            trigger: galleryRef.current,
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
          const galleryElements = document.querySelectorAll("[data-fancybox='project-gallery']");
          
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
  }, [activeTab]);

  const galleryImages = [
    {
      id: 1,
      src: "/a-residential-interior-image.png",
      alt: "Living Room Design",
      size: "large" // Takes full width on left
    },
    {
      id: 2,
      src: "/create-an-image-where-a-beautiful-girl-shows-her-bedroom-interio.png",
      alt: "Bedroom Interior",
      size: "medium" // Top right
    },
    {
      id: 3,
      src: "/a-office-interior-image.png",
      alt: "Office Space",
      size: "medium" // Middle right
    },
    {
      id: 4,
      src: "/dining-interior.png",
      alt: "Dining Area",
      size: "small" // Bottom right top
    },
    {
      id: 5,
      src: "/rectangle-8.png",
      alt: "Modern Kitchen",
      size: "small" // Bottom right bottom
    }
  ];

  const tabs = [
    { id: "photo-gallery", label: "Photo Gallery", active: true },
    { id: "video-tour", label: "Video Tour", active: false },
    { id: "floor-plan", label: "Floor Plan", active: false }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
          >
            Project Gallery
          </h2>
          <p 
            ref={descriptionRef}
            className="text-lg [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-3xl mx-auto leading-relaxed"
          >
            Explore a curated collection of captivating visuals that showcase the transformation of this space into a harmonious blend of style and functionality.
          </p>
        </div>

        {/* Tabs */}
        <div 
          ref={tabsRef}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-2 text-lg [font-family:'Fahkwang',Helvetica] font-medium transition-colors duration-300 ${
                  activeTab === tab.id 
                    ? 'text-primary' 
                    : 'text-[#626161] hover:text-primary'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid - Masonry Layout matching the design */}
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6"
        >
          {/* Large Image - Left Side (spans 7 columns) */}
          <motion.div
            className="lg:col-span-7 relative group overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredImage(1)}
            onMouseLeave={() => setHoveredImage(null)}
            style={{ height: '600px' }}
          >
            <a
              href={galleryImages[0].src}
              data-fancybox="project-gallery"
              data-caption={galleryImages[0].alt}
              className="block w-full h-full"
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div 
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: hoveredImage === 1 
                      ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(117, 191, 68, 0.2) 100%)'
                      : 'transparent',
                    opacity: hoveredImage === 1 ? 1 : 0
                  }}
                />
                
                {/* Zoom Icon */}
                <div 
                  className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                  style={{
                    opacity: hoveredImage === 1 ? 1 : 0,
                    transform: hoveredImage === 1 ? 'scale(1)' : 'scale(0.8)'
                  }}
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Right Side Grid (spans 5 columns) */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Top Right Image */}
            <motion.div
              className="md:col-span-2 relative group overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredImage(2)}
              onMouseLeave={() => setHoveredImage(null)}
              style={{ height: '180px' }}
            >
              <a
                href={galleryImages[1].src}
                data-fancybox="project-gallery"
                data-caption={galleryImages[1].alt}
                className="block w-full h-full"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: hoveredImage === 2 
                        ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(117, 191, 68, 0.2) 100%)'
                        : 'transparent',
                      opacity: hoveredImage === 2 ? 1 : 0
                    }}
                  />
                  
                  {/* Zoom Icon */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                    style={{
                      opacity: hoveredImage === 2 ? 1 : 0,
                      transform: hoveredImage === 2 ? 'scale(1)' : 'scale(0.8)'
                    }}
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Middle Right Image */}
            <motion.div
              className="md:col-span-2 relative group overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredImage(3)}
              onMouseLeave={() => setHoveredImage(null)}
              style={{ height: '200px' }}
            >
              <a
                href={galleryImages[2].src}
                data-fancybox="project-gallery"
                data-caption={galleryImages[2].alt}
                className="block w-full h-full"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: hoveredImage === 3 
                        ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(117, 191, 68, 0.2) 100%)'
                        : 'transparent',
                      opacity: hoveredImage === 3 ? 1 : 0
                    }}
                  />
                  
                  {/* Zoom Icon */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                    style={{
                      opacity: hoveredImage === 3 ? 1 : 0,
                      transform: hoveredImage === 3 ? 'scale(1)' : 'scale(0.8)'
                    }}
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Bottom Right - Two Small Images */}
            <motion.div
              className="relative group overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredImage(4)}
              onMouseLeave={() => setHoveredImage(null)}
              style={{ height: '180px' }}
            >
              <a
                href={galleryImages[3].src}
                data-fancybox="project-gallery"
                data-caption={galleryImages[3].alt}
                className="block w-full h-full"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={galleryImages[3].src}
                    alt={galleryImages[3].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: hoveredImage === 4 
                        ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(117, 191, 68, 0.2) 100%)'
                        : 'transparent',
                      opacity: hoveredImage === 4 ? 1 : 0
                    }}
                  />
                  
                  {/* Zoom Icon */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                    style={{
                      opacity: hoveredImage === 4 ? 1 : 0,
                      transform: hoveredImage === 4 ? 'scale(1)' : 'scale(0.8)'
                    }}
                  >
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>

            <motion.div
              className="relative group overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredImage(5)}
              onMouseLeave={() => setHoveredImage(null)}
              style={{ height: '180px' }}
            >
              <a
                href={galleryImages[4].src}
                data-fancybox="project-gallery"
                data-caption={galleryImages[4].alt}
                className="block w-full h-full"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={galleryImages[4].src}
                    alt={galleryImages[4].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: hoveredImage === 5 
                        ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(117, 191, 68, 0.2) 100%)'
                        : 'transparent',
                      opacity: hoveredImage === 5 ? 1 : 0
                    }}
                  />
                  
                  {/* Zoom Icon */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                    style={{
                      opacity: hoveredImage === 5 ? 1 : 0,
                      transform: hoveredImage === 5 ? 'scale(1)' : 'scale(0.8)'
                    }}
                  >
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
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

        /* Mobile responsive adjustments */
        @media (max-width: 1023px) {
          .lg\\:col-span-7 {
            grid-column: span 1 !important;
            height: 400px !important;
          }
          
          .lg\\:col-span-5 {
            grid-column: span 1 !important;
          }
          
          .lg\\:col-span-5 > div {
            grid-template-columns: 1fr 1fr !important;
          }
          
          .md\\:col-span-2 {
            grid-column: span 2 !important;
            height: 200px !important;
          }
        }

        @media (max-width: 767px) {
          .md\\:col-span-2 {
            grid-column: span 1 !important;
            height: 250px !important;
          }
          
          .lg\\:col-span-5 > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};