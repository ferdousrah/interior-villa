import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  X, ChevronDown, Home as HomeIcon, User, Briefcase, 
  FolderOpen, BookOpen, Mail, ChevronRight 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = (): JSX.Element => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const navItems = [
    { name: "Home", icon: HomeIcon, href: "/" },
    { name: "About Us", icon: User, href: "/about" },
    { 
      name: "Services", 
      icon: Briefcase, 
      href: "/services",
      subItems: [
        { name: "Residential Interior", href: "/residential-interior" },
        { name: "Commercial Interior", href: "/commercial-interior" },
        { name: "Architectural Consultancy", href: "/architectural-consultancy" }
      ]
    },
    { name: "Portfolio", icon: FolderOpen, href: "/portfolio" },
    { name: "Blog", icon: BookOpen, href: "/blog" },
    { name: "Contact Us", icon: Mail, href: "/contact" },
  ];

  // Optimized scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const shouldBeScrolled = window.scrollY > 50;
          if (shouldBeScrolled !== isScrolled) {
            setIsScrolled(shouldBeScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // Header animation with GSAP scoped to this component
  useEffect(() => {
    if (!headerRef.current || !logoRef.current || !menuContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.to(headerRef.current, {
        height: "60px",
        backgroundColor: "rgba(27, 27, 27, 0.95)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        duration: 0.6,
        ease: "power3.out"
      }, 0)
      .to(logoRef.current, {
        scale: 0.8,
        duration: 0.6,
        ease: "power3.out"
      }, 0)
      .to(menuContainerRef.current, {
        height: "50px",
        padding: "0 16px",
        duration: 0.6,
        ease: "power3.out"
      }, 0);

      if (isScrolled) tl.play();
      else tl.reverse();
    });

    return () => ctx.revert();
  }, [isScrolled]);

  // Hero image parallax
  useEffect(() => {
    if (!heroImageRef.current || !heroContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(heroImageRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.fromTo(heroImageRef.current, 
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Lock body scroll for mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const submenuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.2 } },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const sidebarVariants = {
    closed: { x: "-100%", transition: { type: "spring", stiffness: 400, damping: 40 } },
    open: { x: "0%", transition: { type: "spring", stiffness: 400, damping: 40 } }
  };

  const overlayVariants = {
    closed: { opacity: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, transition: { duration: 0.3 } }
  };

  const menuItemVariants = {
    closed: { x: -50, opacity: 0 },
    open: (i: number) => ({
      x: 0, opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  const handleSubmenuToggle = (itemName: string) => {
    setExpandedSubmenu(expandedSubmenu === itemName ? null : itemName);
  };

  return (
    <div ref={heroContainerRef} className="w-full h-[70vh] md:h-[80vh] lg:h-screen relative overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          ref={heroImageRef}
          className="w-full h-full object-cover will-change-transform"
          alt="Book an Appointment Hero"
          src="/image.png"
          style={{ transformOrigin: 'center center' }}
        />
      </div>

      {/* Header */}
      <header 
        ref={headerRef}
        className={`${isScrolled ? 'fixed top-0 left-0' : 'absolute top-[22px]'} w-full z-50 transition-all duration-700 ease-out`}
        style={{
          height: isScrolled ? "60px" : "90px",
          backgroundColor: isScrolled ? "rgba(27, 27, 27, 0.95)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.1)" : "none"
        }}
      >
        <div className="container mx-auto px-4 relative flex items-center justify-between h-full">
          <Link to="/">
            <img
              ref={logoRef}
              className="w-52 h-[41px] object-cover cursor-pointer"
              alt="Interior villa dark"
              src="/interior-villa-dark.png"
            />
          </Link>
          
          <div 
            ref={menuContainerRef}
            className={`flex items-center ${!isScrolled && 'bg-white-fade rounded-[50px] backdrop-blur-[5px] px-4'}`}
            style={{ height: isScrolled ? "50px" : "60px" }}
          >
            <div className="flex items-center justify-end h-full">
              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden text-white transition-all duration-300 hover:scale-110"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <motion.div
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  className="w-6 h-6 flex flex-col justify-center items-center"
                >
                  <motion.span
                    variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }}
                    className="w-6 h-0.5 bg-current"
                  />
                  <motion.span
                    variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                    className="w-6 h-0.5 bg-current mt-1.5"
                  />
                  <motion.span
                    variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }}
                    className="w-6 h-0.5 bg-current mt-1.5"
                  />
                </motion.div>
              </button>

              {/* Desktop Nav */}
              <div className="hidden lg:block">
                <nav className="flex space-x-2">
                  {navItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="relative group"
                      onMouseEnter={() => setHoveredMenu(item.name)}
                      onMouseLeave={() => setHoveredMenu(null)}
                    >
                      <Link to={item.href}>
                        <Button
                          variant="ghost"
                          className="min-w-[108px] px-6 rounded-[50px] whitespace-nowrap transition-all duration-300"
                        >
                          {item.name}
                          {item.subItems && (
                            <motion.span 
                              className="ml-1"
                              animate={{ rotate: hoveredMenu === item.name ? 45 : 0 }}
                            >
                              +
                            </motion.span>
                          )}
                        </Button>
                      </Link>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {item.subItems && hoveredMenu === item.name && (
                          <motion.div
                            variants={submenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute top-full left-0 mt-2 min-w-[200px] bg-[#1b1b1b] rounded-lg shadow-2xl overflow-hidden z-50"
                          >
                            <div className="py-2">
                              {item.subItems.map((subItem, subIndex) => (
                                <motion.button
                                  key={subIndex}
                                  variants={itemVariants}
                                  transition={{ delay: subIndex * 0.1 }}
                                  className="w-full px-4 py-3 text-left text-sm text-white hover:text-primary"
                                  onClick={() => navigate(subItem.href)}
                                >
                                  {subItem.name}
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-[#1a1a1a] to-[#1e1e1e] z-50"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img className="w-40 h-8 object-cover" src="/interior-villa-dark.png" />
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex flex-col p-6 space-y-2">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <div
                        className="flex items-center justify-between p-4 rounded-xl cursor-pointer"
                        onClick={() => item.subItems ? handleSubmenuToggle(item.name) : navigate(item.href)}
                      >
                        <Link to={item.href} onClick={(e) => item.subItems && e.preventDefault()} className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-700/50">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span>{item.name}</span>
                        </Link>
                        {item.subItems && (
                          <motion.div
                            animate={{ rotate: expandedSubmenu === item.name ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-6 h-6 flex items-center justify-center"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        )}
                      </div>

                      {/* Submenu */}
                      <AnimatePresence>
                        {item.subItems && expandedSubmenu === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden ml-4 mt-2"
                          >
                            {item.subItems.map((subItem, subIndex) => (
                              <motion.div
                                key={subIndex}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: subIndex * 0.1 }}
                                className="flex items-center p-3 rounded-lg text-gray-400 hover:text-primary"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  navigate(subItem.href);
                                }}
                              >
                                <div className="w-2 h-2 rounded-full bg-gray-600 mr-4"></div>
                                {subItem.name}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <div className="absolute inset-0 bg-black/40 flex items-center">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-white max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              Book an Appointment
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center space-x-2"
            >
              <Link to="/" className="text-white/80 hover:text-white">Home</Link>
              <ChevronRight className="w-4 h-4 text-white/60" />
              <span className="text-primary font-medium">Book an Appointment</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
