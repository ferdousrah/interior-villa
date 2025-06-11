import React from "react";
import { CustomCursor } from "../../components/ui/cursor";
import { FooterSection } from "../Home/sections/FooterSection/FooterSection";
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  ProcessSection,
  ProjectsSection,
  TestimonialsSection,
  CTASection
} from "./sections";

const ResidentialInterior = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full items-start relative bg-white overflow-x-hidden min-h-screen">
      {/* Custom Cursor */}
      <CustomCursor className="custom-cursor" />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content Container */}
      <div className="w-full">
        {/* About Residential Interior Section */}
        <AboutSection />
        
        {/* Our Services Section */}
        <ServicesSection />
        
        {/* Our Process Section */}
        <ProcessSection />
        
        {/* Featured Projects Section */}
        <ProjectsSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CTASection />
      </div>
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default ResidentialInterior;