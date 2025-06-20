import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorProps {
  className?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring animations for cursor movement
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Refs for different cursor elements
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const trailCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Enhanced hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for various interactive elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
        setCursorVariant('hover');
        
        // Set custom text based on element type
        if (target.tagName === 'BUTTON' || target.closest('button')) {
          setCursorText('CLICK');
        } else if (target.tagName === 'A' || target.closest('a')) {
          setCursorText('VISIT');
        } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          setCursorText('TYPE');
        } else {
          setCursorText('INTERACT');
        }
      } else if (target.closest('[data-cursor="view"]') || target.closest('.group')) {
        setIsHovering(true);
        setCursorVariant('view');
        setCursorText('VIEW');
      } else if (target.closest('[data-cursor="drag"]')) {
        setIsHovering(true);
        setCursorVariant('drag');
        setCursorText('DRAG');
      } else if (target.closest('[data-cursor="zoom"]')) {
        setIsHovering(true);
        setCursorVariant('zoom');
        setCursorText('ZOOM');
      } else {
        setIsHovering(false);
        setCursorVariant('default');
        setCursorText('');
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        ref={mainCursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference ${className}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            rotate: isHovering ? 180 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
            mass: 0.5,
          }}
        >
          {/* Main Cursor Circle */}
          <motion.div
            className="w-6 h-6 rounded-full border-2 border-white bg-transparent"
            animate={{
              scale: isClicking ? 0.6 : 1,
              borderColor: isHovering ? '#75BF44' : '#ffffff',
              backgroundColor: isHovering ? 'rgba(117, 191, 68, 0.2)' : 'transparent',
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          />

          {/* Inner Dot */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-white"
            animate={{
              scale: isClicking ? 2 : isHovering ? 0 : 1,
              backgroundColor: isHovering ? '#75BF44' : '#ffffff',
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          />

          {/* Hover Ring Effect */}
          {isHovering && (
            <motion.div
              className="absolute w-12 h-12 rounded-full border border-primary/30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Cursor Text */}
          {cursorText && isHovering && (
            <motion.div
              className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
            >
              {cursorText}
              
              {/* Arrow pointing to cursor */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
            </motion.div>
          )}

          {/* Ripple Effect on Click */}
          {isClicking && (
            <motion.div
              className="absolute w-8 h-8 rounded-full border-2 border-primary"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Trail Cursor */}
      <motion.div
        ref={trailCursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full bg-primary/20 blur-sm"
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0.6 : 0.3,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30,
            mass: 0.8,
          }}
        />
      </motion.div>

      {/* Particle Trail Effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {/* Floating Particles */}
        {isHovering && Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{ 
              scale: 0, 
              x: 0, 
              y: 0,
              opacity: 0 
            }}
            animate={{
              scale: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 40],
              y: [0, (Math.random() - 0.5) * 40],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Magnetic Effect Lines */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9996]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-8 bg-gradient-to-b from-primary to-transparent origin-bottom"
              style={{
                rotate: i * 45,
                transformOrigin: 'bottom center',
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ 
                scaleY: [0, 1, 0], 
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}

      <style jsx global>{`
        /* Hide default cursor on all elements */
        *, *::before, *::after {
          cursor: none !important;
        }

        /* Ensure cursor is visible above all elements */
        .custom-cursor {
          z-index: 9999;
        }

        /* Smooth transitions for cursor interactions */
        button, a, input, textarea, select, [role="button"], .cursor-pointer {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced hover states */
        button:hover, a:hover, [role="button"]:hover, .cursor-pointer:hover {
          transform: translateY(-2px);
        }

        /* Prevent text selection interference */
        .custom-cursor * {
          user-select: none;
          pointer-events: none;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom selection colors */
        ::selection {
          background-color: rgba(117, 191, 68, 0.3);
          color: #01190c;
        }

        ::-moz-selection {
          background-color: rgba(117, 191, 68, 0.3);
          color: #01190c;
        }
      `}</style>
    </>
  );
};