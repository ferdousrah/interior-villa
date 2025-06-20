import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const WebsiteLoader = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return <></>;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)"
        }}
      >
        {/* Main Container */}
        <div className="relative flex items-center justify-center">
          
          {/* Central Square - Represents Room/Space */}
          <motion.div
            className="relative w-20 h-20 border-2 border-primary/60 rounded-lg"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          >
            {/* Inner accent */}
            <motion.div
              className="absolute inset-2 bg-primary/20 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Corner Elements - Representing Design Elements */}
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="absolute w-3 h-3 bg-secondary rounded-full"
              style={{
                top: index < 2 ? "-24px" : "auto",
                bottom: index >= 2 ? "-24px" : "auto",
                left: index % 2 === 0 ? "-24px" : "auto",
                right: index % 2 === 1 ? "-24px" : "auto",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Orbiting Elements - Representing Movement and Flow */}
          {[0, 1].map((index) => (
            <motion.div
              key={`orbit-${index}`}
              className="absolute w-2 h-2 bg-primary rounded-full"
              initial={{ rotate: index * 180 }}
              animate={{ rotate: index * 180 + 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                transformOrigin: "50px 0px",
              }}
            />
          ))}

          {/* Subtle Pulse Ring */}
          <motion.div
            className="absolute w-32 h-32 border border-primary/20 rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

        </div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};