import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import {
  MessageCircle,
  Lightbulb,
  CheckCircle,
  Rocket,
  Heart,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface StepData {
  id: number;
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  bgColor: string;
}

export const OurProcessSection: React.FC = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingWrapperRef = useRef<HTMLDivElement>(null);

  // Step definitions
  const steps: StepData[] = [
    {
      id: 1,
      title: 'Chat and Talk',
      description:
        'We start with understanding your vision, needs, and preferences through detailed consultation and discovery sessions.',
      icon: <MessageCircle className="w-8 h-8" />,
      color: '#6366F1',
      bgColor: '#EEF2FF',
    },
    {
      id: 2,
      title: 'Design Development',
      description:
        'Our expert team creates detailed designs, stunning 3D visualizations, and carefully curated material selections.',
      icon: <Lightbulb className="w-8 h-8" />,
      color: '#06B6D4',
      bgColor: '#CFFAFE',
    },
    {
      id: 3,
      title: 'Confirm Your Order',
      description:
        'Review and approve the final design concepts, premium materials, detailed timeline, and comprehensive project specifications.',
      icon: <CheckCircle className="w-8 h-8" />,
      color: '#EF4444',
      bgColor: '#FEE2E2',
    },
    {
      id: 4,
      title: 'Deployment Process',
      description:
        'Professional installation and meticulous project management ensuring quality execution and timely delivery.',
      icon: <Rocket className="w-8 h-8" />,
      color: '#F59E0B',
      bgColor: '#FEF3C7',
    },
    {
      id: 5,
      title: "You'll be Happy",
      description:
        'Enjoy your beautifully transformed space that exceeds expectations and brings lasting joy and inspiration.',
      icon: <Heart className="w-8 h-8" />,
      color: '#8B5CF6',
      bgColor: '#F3E8FF',
    },
  ];

  // Heading hover animation
  useEffect(() => {
    if (!headingRef.current) return;

    const split = new SplitText(headingRef.current, {
      type: 'chars,words',
      charsClass: 'char',
      wordsClass: 'word',
    });

    const onMove = (e: MouseEvent) => {
      if (!headingWrapperRef.current) return;
      const rect = headingWrapperRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      gsap.to(split.chars, {
        duration: 0.5,
        y: (i: number) => (y - 0.5) * 15 * Math.sin((i + 1) * 0.5),
        x: (i: number) => (x - 0.5) * 15 * Math.cos((i + 1) * 0.5),
        rotationY: (x - 0.5) * 20,
        rotationX: (y - 0.5) * -20,
        ease: 'power2.out',
        stagger: { amount: 0.3, from: 'center' },
      });
    };

    const onLeave = () => {
      gsap.to(split.chars, {
        duration: 1,
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        ease: 'elastic.out(1, 0.3)',
        stagger: { amount: 0.3, from: 'center' },
      });
    };

    if (headingWrapperRef.current) {
      headingWrapperRef.current.addEventListener('mousemove', onMove);
      headingWrapperRef.current.addEventListener('mouseleave', onLeave);
    }

    return () => {
      split.revert();
      if (headingWrapperRef.current) {
        headingWrapperRef.current.removeEventListener('mousemove', onMove);
        headingWrapperRef.current.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  // Entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;

    // Header animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }

    // Steps animation
    if (stepsContainerRef.current) {
      const stepElements = stepsContainerRef.current.children;
      gsap.fromTo(
        stepElements,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          stagger: 0.2,
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex items-center relative overflow-hidden pt-6 pb-10 md:pt-10 md:pb-16 bg-[#f7f9fb]"
    >
      

      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div
            ref={headingWrapperRef}
            className="cursor-default perspective-[1000px]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <h2
              ref={headingRef}
              className="[font-family:'Fahkwang',Helvetica] font-medium text-[40px] leading-tight mb-6 mt-5"
              style={{ transform: 'translateZ(0)', transformStyle: 'preserve-3d' }}
            >
              <span className="text-[#0d1529]">Our </span>
              <span
                className="text-secondary"                
              >
                Process
              </span>
            </h2>
          </div>
          <p className="text-lg text-[#626161] max-w-3xl mx-auto leading-relaxed [font-family:'Fahkwang',Helvetica]">
            Follow our proven 5-step journey that transforms your vision into extraordinary reality
          </p>
        </div>

        {/* Desktop Diamond Infographic Layout */}
        <div className="hidden lg:block relative">
          {/* Steps Container */}
          <div ref={stepsContainerRef} className="relative grid grid-cols-5 gap-8 py-20">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative flex flex-col items-center ${
                  index % 2 === 0 ? 'mt-0' : 'mt-32'
                }`}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <motion.div
                  className="relative cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Diamond Background */}
                  <div
                    className="w-48 h-48 transform rotate-45 border-4 transition-all duration-300 shadow-lg rounded-3xl"
                    style={{
                      backgroundColor: hoveredStep === step.id ? step.color : 'white',
                      borderColor: step.color,
                      boxShadow:
                        hoveredStep === step.id
                          ? `0 20px 40px ${step.color}40`
                          : '0 10px 30px rgba(0,0,0,0.1)',
                    }}
                  />

                  {/* Content Container - Counter-rotated to keep content upright */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    {/* Icon wrapper and Tooltip */}
                    <div className="relative flex-none flex flex-col items-center mb-4">
                      

                      {/* Icon */}
                      <div
                        className="transition-all duration-300"
                        style={{
                          color: hoveredStep === step.id ? 'white' : step.color,
                        }}
                      >
                        {step.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg font-bold [font-family:'Fahkwang',Helvetica] text-center transition-all duration-300 leading-tight tracking-wider"
                      style={{
                        color: hoveredStep === step.id ? 'white' : '#01190c',
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          <div ref={stepsContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative bg-white rounded-3xl p-8 shadow-lg border-2 cursor-pointer overflow-hidden"
                style={{ borderColor: step.color }}
                whileHover={{ y: -8, scale: 1.02 }}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Background Gradient */}
                <div
                  className="absolute inset-0 rounded-3xl transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${step.bgColor} 0%, ${step.color}20 100%)`,
                    opacity: hoveredStep === step.id ? 1 : 0,
                  }}
                />

                <div className="relative z-10">
                  {/* Content */}
                  <div className="flex flex-col items-center mb-6">
                    {/* Icon */}
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
                      style={{
                        backgroundColor: hoveredStep === step.id ? step.color : step.bgColor,
                        color: hoveredStep === step.id ? 'white' : step.color,
                      }}
                    >
                      {step.icon}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold [font-family:'Fahkwang',Helvetica] transition-colors duration-300 tracking-wider"
                      style={{ color: hoveredStep === step.id ? step.color : '#01190c' }}
                    >
                      {step.title}
                    </h3>
                  </div>

                  {/* Description - Always visible on mobile */}
                  <p className="text-base text-[#626161] [font-family:'Fahkwang',Helvetica] leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div
          className="absolute top-10 left-10 w-8 h-8 bg-gray-200 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute top-20 right-20 w-6 h-6 bg-cyan-200 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-20 left-20 w-10 h-10 bg-red-200 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-10 right-10 w-4 h-4 bg-orange-200 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: '3s' }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-5 h-5 bg-purple-200 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: '4s' }}
        />
      </div>
    </section>
  );
};
