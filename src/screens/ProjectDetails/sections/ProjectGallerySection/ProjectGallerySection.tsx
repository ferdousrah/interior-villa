import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  type: 'photo' | 'video' | 'plan';
  height: number; // For masonry layout
}

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

  const tabs = [
    { id: "photo-gallery", label: "Photo Gallery" },
    { id: "video-tour", label: "Video Tour" },
    { id: "floor-plan", label: "Floor Plan" }
  ];

  // Gallery items for different tabs
  const galleryItems: { [key: string]: GalleryItem[] } = {
    "photo-gallery": [
      {
        id: 1,
        src: "/a-residential-interior-image.png",
        alt: "Living Room Design",
        type: 'photo',
        height: 400 // Large image
      },
      {
        id: 2,
        src: "/create-an-image-where-a-beautiful-girl-shows-her-bedroom-interio.png",
        alt: "Bedroom Interior",
        type: 'photo',
        height: 200 // Small image
      },
      {
        id: 3,
        src: "/a-office-interior-image.png",
        alt: "Office Space",
        type: 'photo',
        height: 250 // Medium image
      },
      {
        id: 4,
        src: "/dining-interior.png",
        alt: "Dining Area",
        type: 'photo',
        height: 200 // Small image
      },
      {
        id: 5,
        src: "/rectangle-8.png",
        alt: "Modern Kitchen",
        type: 'photo',
        height: 300 // Medium-large image
      }
    ],
    "video-tour": [
      {
        id: 6,
        src: "/a-residential-interior-image.png",
        alt: "Video Tour 1",
        type: 'video',
        height: 300
      },
      {
        id: 7,
        src: "/a-office-interior-image.png",
        alt: "Video Tour 2",
        type: 'video',
        height: 250
      }
    ],
    "floor-plan": [
      {
        id: 8,
        src: "/dining-interior.png",
        alt: "Floor Plan 1",
        type: 'plan',
        height: 350
      },
      {
        id: 9,
        src: "/rectangle-8.png",
        alt: "Floor Plan 2",
        type: 'plan',
        height: 280
      }
    ]
  };

  const currentItems = galleryItems[activeTab] || [];

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
            className="text-2xl md:text-3xl lg:text-4xl font-medium [font-family:'Fahkwang',Helvetica] text-[#01190c] mb-6"
          >
            Project Gallery
          </h2>
          <p 
            ref={descriptionRef}
            className="text-base [font-family:'Fahkwang',Helvetica] text-[#626161] max-w-3xl mx-auto leading-relaxed"
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

        {/* Masonry Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            ref={galleryRef}
            className="masonry-container"
            style={{
              columnCount: 'auto',
              columnWidth: '300px',
              columnGap: '20px',
              columnFill: 'balance'
            }}
          >
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="masonry-item relative group overflow-hidden cursor-pointer mb-5"
                onMouseEnter={() => setHoveredImage(item.id)}
                onMouseLeave={() => setHoveredImage(null)}
                style={{
                  breakInside: 'avoid',
                  pageBreakInside: 'avoid',
                  height: `${item.height}px`,
                  display: 'inline-block',
                  width: '100%'
                }}
              >
                <a
                  href={item.src}
                  data-fancybox="project-gallery"
                  data-caption={item.alt}
                  className="block w-full h-full"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div 
                      className="absolute inset-0 transition-all duration-500"
                      style={{
                        background: hoveredImage === item.id 
                          ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(117, 191, 68, 0.2) 100%)'
                          : 'transparent',
                        opacity: hoveredImage === item.id ? 1 : 0
                      }}
                    />
                    
                    {/* Zoom Icon */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                      style={{
                        opacity: hoveredImage === item.id ? 1 : 0,
                        transform: hoveredImage === item.id ? 'scale(1)' : 'scale(0.8)'
                      }}
                    >
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>

                    {/* Video Play Icon for video items */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        /* Masonry Layout Styles */
        .masonry-container {
          column-count: 3;
          column-gap: 20px;
          column-fill: balance;
        }

        .masonry-item {
          break-inside: avoid;
          page-break-inside: avoid;
          display: inline-block;
          width: 100%;
          margin-bottom: 20px;
        }

        /* Responsive masonry */
        @media (max-width: 1024px) {
          .masonry-container {
            column-count: 2;
          }
        }

        @media (max-width: 640px) {
          .masonry-container {
            column-count: 1;
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