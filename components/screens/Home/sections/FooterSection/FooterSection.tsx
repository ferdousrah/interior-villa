import { CopyrightIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Button } from "../../../../ui/button";
import { Card, CardContent } from "../../../../ui/card";
import { Input } from "../../../../ui/input";
import { Separator } from "../../../../ui/separator";
import { Textarea } from "../../../../ui/textarea";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const FooterSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const footerHeadingRef = useRef<HTMLHeadingElement>(null);
  const footerHeadingWrapperRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const socialSectionRef = useRef<HTMLDivElement>(null);
  const footerMenusRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);

  // Add hover animation for footer heading
  useEffect(() => {
    if (!footerHeadingRef.current) return;

    // Split text into characters
    const splitText = new SplitText(footerHeadingRef.current, { 
      type: "chars,words",
      charsClass: "char",
      wordsClass: "word"
    });

    // Add hover animation
    if (footerHeadingWrapperRef.current) {
      footerHeadingWrapperRef.current.addEventListener('mousemove', (e) => {
        const rect = footerHeadingWrapperRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        gsap.to(splitText.chars, {
          duration: 0.5,
          y: (i, target) => (y - 0.5) * 15 * Math.sin((i + 1) * 0.5),
          x: (i, target) => (x - 0.5) * 15 * Math.cos((i + 1) * 0.5),
          rotationY: (x - 0.5) * 20,
          rotationX: (y - 0.5) * -20,
          ease: "power2.out",
          stagger: {
            amount: 0.3,
            from: "center"
          }
        });
      });

      footerHeadingWrapperRef.current.addEventListener('mouseleave', () => {
        gsap.to(splitText.chars, {
          duration: 1,
          y: 0,
          x: 0,
          rotationY: 0,
          rotationX: 0,
          ease: "elastic.out(1, 0.3)",
          stagger: {
            amount: 0.3,
            from: "center"
          }
        });
      });
    }

    // Cleanup function
    return () => {
      splitText.revert();
      if (footerHeadingWrapperRef.current) {
        footerHeadingWrapperRef.current.removeEventListener('mousemove', () => {});
        footerHeadingWrapperRef.current.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Left content animation (excluding h2)
    if (leftContentRef.current) {
      const children = leftContentRef.current.children;
      // Skip the h2 (first child) and animate the rest
      const elementsToAnimate = Array.from(children).slice(1);
      
      gsap.fromTo(elementsToAnimate,
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
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax for left content
      gsap.to(leftContentRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });
    }

    // Social section animation
    if (socialSectionRef.current) {
      const socialIcons = socialSectionRef.current.querySelectorAll('[style*="background-image"]');
      
      gsap.fromTo(socialIcons,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialSectionRef.current,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Footer menus animation
    if (footerMenusRef.current) {
      const menuColumns = footerMenusRef.current.children;
      
      gsap.fromTo(menuColumns,
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
            trigger: footerMenusRef.current,
            start: "top 85%",
            end: "top 55%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax for footer menus
      gsap.to(footerMenusRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
          invalidateOnRefresh: true
        }
      });
    }

    // Bottom section animation
    if (bottomSectionRef.current) {
      gsap.fromTo(bottomSectionRef.current,
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomSectionRef.current,
            start: "top 90%",
            end: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Background elements parallax
    if (backgroundElementsRef.current) {
      gsap.to(backgroundElementsRef.current, {
        yPercent: -15,
        rotation: 45,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Footer menu data for mapping
  const footerMenus = [
    {
      title: "Services",
      items: ["Footer Menu One", "Footer Menu Two", "Footer Menu Three"],
    },
    {
      title: "About Us",
      items: ["Footer Menu Four", "Footer Menu Five", "Footer Menu Six"],
    },
    {
      title: "Usefull Links",
      items: ["Footer Menu Seven", "Footer Menu Eight", "Footer Menu Nine"],
    },
    {
      title: "Service",
      items: ["Footer Menu Ten", "Footer Menu Eleven", "Footer Menu Twelve"],
    },
  ];

  // Social media containers
  const socialMediaContainers = [
    "/container-2.svg",
    "/container-1.svg",
    "/container-3.svg",
    "/container.svg",
  ];

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#1b1b1b] py-20 relative overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        zIndex: 1
      }}
    >
      {/* Background decorative elements */}
      <div 
        ref={backgroundElementsRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        <div className="absolute top-20 left-10 w-8 h-8 bg-primary rounded-full opacity-8 animate-pulse" />
        <div className="absolute top-1/3 right-20 w-6 h-6 bg-secondary rounded-full opacity-12 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-10 h-10 bg-primary rounded-full opacity-6 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-secondary rounded-full opacity-10 animate-pulse" style={{ animationDelay: '3s' }} />
        
        {/* Geometric shapes */}
        <div className="absolute top-40 right-10 w-16 h-16 border-2 border-primary opacity-5 rotate-45" />
        <div className="absolute bottom-40 left-16 w-20 h-20 border border-secondary opacity-8 rounded-full" />
        <div className="absolute top-1/2 left-10 w-12 h-12 border-2 border-primary opacity-6" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="mb-20">
          <div 
            ref={leftContentRef}
            className="will-change-transform"
            style={{
              transformOrigin: 'center center',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            {/* H2 heading - WITH HOVER ANIMATION */}
            <div 
              ref={footerHeadingWrapperRef}
              className="perspective-[1000px] cursor-default"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h2 
                ref={footerHeadingRef}
                className="text-[40px] leading-[56px] font-medium [font-family:'Fahkwang',Helvetica] text-[#fff] bg-gradient-to-b from-white to-[#fff] bg-clip-text"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(0)',
                }}
              >
                Let&apos;s Work Together and <br />
                Create Something Extraordinary!
              </h2>
            </div>

          </div>
        </div>

        <div 
          ref={footerMenusRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-16 will-change-transform"
          style={{
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {/* Contact Us Column */}
          <div className="relative group">
            {/* Background card effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm border border-white/10"></div>
            
            <div className="relative p-6 flex flex-col items-start gap-6">
              {/* Column Header with Icon */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="[font-family:'Fahkwang',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[26px]">
                  Contact Us
                </h4>
              </div>
              
              <div className="flex flex-col items-start gap-4 w-full">
                <a
                  href="tel:+8801748981590"
                  className="flex items-center gap-3 [font-family:'Fahkwang',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-6 transition-all duration-300 hover:text-primary hover:translate-x-2 relative group/item overflow-hidden p-2 rounded-lg hover:bg-white/5"
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="relative z-10">+88 01748981590</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-out group-hover/item:w-full"></span>
                </a>
                
                <a
                  href="mailto:info@interiorvillabd.com"
                  className="flex items-center gap-3 [font-family:'Fahkwang',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-6 transition-all duration-300 hover:text-primary hover:translate-x-2 relative group/item overflow-hidden p-2 rounded-lg hover:bg-white/5"
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <span className="relative z-10">info@interiorvillabd.com</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-out group-hover/item:w-full"></span>
                </a>
                
                <div className="flex items-start gap-3 p-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="[font-family:'Fahkwang',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-6">
                    18/10-A, Block-F, Ring Road, Mohammadpur, Dhaka-1207.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="relative group">
            {/* Background card effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm border border-secondary/10"></div>
            
            <div className="relative p-6 flex flex-col items-start gap-6">
              {/* Column Header with Icon */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="[font-family:'Fahkwang',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[26px]">
                  Services
                </h4>
              </div>

              <div className="flex flex-col items-start gap-3 w-full">
                <a
                  href="/residential-interior"
                  className="flex items-center gap-3 [font-family:'Fahkwang',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-6 transition-all duration-300 hover:text-secondary hover:translate-x-2 relative group/item overflow-hidden p-2 rounded-lg hover:bg-white/5 w-full"
                >
                  <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                  <span className="relative z-10">Residential Interior</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-secondary transition-all duration-500 ease-out group-hover/item:w-full"></span>
                </a>
                <a
                  href="/commercial-interior"
                  className="flex items-center gap-3 [font-family:'Fahkwang',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-6 transition-all duration-300 hover:text-secondary hover:translate-x-2 relative group/item overflow-hidden p-2 rounded-lg hover:bg-white/5 w-full"
                >
                  <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                  <span className="relative z-10">Commercial Interior</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-secondary transition-all duration-500 ease-out group-hover/item:w-full"></span>
                </a>
                <a
                  href="/architectural-consultancy"
                  className="flex items-center gap-3 [font-family:'Fahkwang',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-6 transition-all duration-300 hover:text-secondary hover:translate-x-2 relative group/item overflow-hidden p-2 rounded-lg hover:bg-white/5 w-full"
                >
                  <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                  <span className="relative z-10">Architectural Consultancy</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-secondary transition-all duration-500 ease-out group-hover/item:w-full"></span>
                </a>
              </div>
            </div>
          </div>

          {/* Important Links Column */}
          <div className="relative group">
            {/* Background card effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm border border-blue-500/10"></div>
            
            <div className="relative p-6 flex flex-col items-start gap-6">
              {/* Column Header with Icon */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h4 className="[font-family:'Fahkwang',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[26px]">
                  Important Links
                </h4>
              </div>

              <div className="flex flex-col items-start gap-3 w-full">
                <a
                  href="/about"
                  className="flex items-center gap-3 [font-family:'Fahkwang',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-6 transition-all duration-300 hover:text-blue-400 hover:translate-x-2 relative group/item overflow-hidden p-2 rounded-lg hover:bg-white/5 w-full"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                  <span className="relative z-10">About Us</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-400 transition-all duration-500 ease-out group-hover/item:w-full"></span>
                </a>
                <a
                  href="/portfolio"
                  className="flex items-center gap-3 [font-family:'Fahkwang',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-6 transition-all duration-300 hover:text-blue-400 hover:translate-x-2 relative group/item overflow-hidden p-2 rounded-lg hover:bg-white/5 w-full"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                  <span className="relative z-10">Portfolio</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-400 transition-all duration-500 ease-out group-hover/item:w-full"></span>
                </a>
                <a
                  href="/blog"
                  className="flex items-center gap-3 [font-family:'Fahkwang',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-6 transition-all duration-300 hover:text-blue-400 hover:translate-x-2 relative group/item overflow-hidden p-2 rounded-lg hover:bg-white/5 w-full"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                  <span className="relative z-10">Blog</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-400 transition-all duration-500 ease-out group-hover/item:w-full"></span>
                </a>
                <a
                  href="/contact"
                  className="flex items-center gap-3 [font-family:'Fahkwang',Helvetica] font-normal text-white/90 text-sm tracking-[0] leading-6 transition-all duration-300 hover:text-blue-400 hover:translate-x-2 relative group/item overflow-hidden p-2 rounded-lg hover:bg-white/5 w-full"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                  <span className="relative z-10">Contact Us</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-400 transition-all duration-500 ease-out group-hover/item:w-full"></span>
                </a>
              </div>
            </div>
          </div>

          {/* Follow Us Column */}
          <div className="relative group">
            {/* Background card effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm border border-purple-500/10"></div>
            
            <div className="relative p-6 flex flex-col items-start gap-6">
              {/* Column Header with Icon */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="[font-family:'Fahkwang',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[26px]">
                  Follow Us
                </h4>
              </div>
              
              <p className="[font-family:'Fahkwang',Helvetica] font-normal text-white/80 text-xs tracking-[0] leading-5 mb-4">
                Stay connected and inspired! Follow us on our social media platforms to keep up with the latest design trends.
              </p>
              
              <div className="grid grid-cols-2 gap-3 w-full">
                {[
                  { icon: Facebook, name: "Facebook", color: "#1877F2" },
                  { icon: Twitter, name: "Twitter", color: "#1DA1F2" },
                  { icon: Instagram, name: "Instagram", color: "#E4405F" },
                  { icon: Linkedin, name: "LinkedIn", color: "#0A66C2" }
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <div
                      key={index}
                      className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer relative overflow-hidden group/social transform-gpu transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-1 flex items-center justify-center"
                    >
                      {/* Glow effect on hover */}
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/social:opacity-30 transition-opacity duration-500 blur-sm scale-110"
                        style={{ backgroundColor: social.color }}
                      ></div>
                      
                      {/* Ripple effect */}
                      <div 
                        className="absolute inset-0 rounded-xl border-2 opacity-0 group-hover/social:opacity-100 group-hover/social:scale-125 transition-all duration-700 ease-out"
                        style={{ borderColor: social.color }}
                      ></div>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/social:opacity-20 transform -skew-x-12 -translate-x-full group-hover/social:translate-x-full transition-all duration-1000 ease-out"></div>
                      
                      {/* Icon */}
                      <IconComponent 
                        className="w-5 h-5 text-white transition-all duration-500 ease-out group-hover/social:rotate-12 group-hover/social:scale-110 relative z-10"
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 mb-8" />

        <div 
          ref={bottomSectionRef}
          className="flex flex-col sm:flex-row items-center justify-between py-6 will-change-transform"
          style={{
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <CopyrightIcon className="w-4 h-4 text-white" />
              <div className="[font-family:'Fahkwang',Helvetica] font-normal text-white text-sm tracking-[0] leading-6">
                2025 Interior Villa. All rights reserved.
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a
                href="/privacy-policy"
                className="[font-family:'Fahkwang',Helvetica] font-normal text-white text-sm tracking-[0] leading-6 transition-colors duration-300 hover:text-primary relative group overflow-hidden cursor-pointer"
              >
                <span className="relative z-10">Privacy Policy</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
              </a>
              
              <a
                href="/terms-of-service"
                className="[font-family:'Fahkwang',Helvetica] font-normal text-white text-sm tracking-[0] leading-6 transition-colors duration-300 hover:text-primary relative group overflow-hidden cursor-pointer"
              >
                <span className="relative z-10">Terms of Service</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="[font-family:'Fahkwang',Helvetica] font-normal text-white text-sm tracking-[0] leading-6">
              Designed with ❤️ by Interior Villa Team
            </div>
          </div>
        </div>
      </div>

      {/* Background blur effects */}
      <div className="absolute w-[443px] h-[449px] right-0 top-20 bg-[#999999] blur-[294px] pointer-events-none" />
      <div className="absolute w-[443px] h-[449px] left-0 bottom-20 bg-[#999999] blur-[322px] pointer-events-none" />
    </section>
  );
};