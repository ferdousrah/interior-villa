import React, { useEffect, useRef, useState } from "react";
import { CustomCursor } from "../../components/ui/cursor";
import { FooterSection } from "../Home/sections/FooterSection/FooterSection";
import {
  HeroSection,
  ProjectInfoSection,
  BeforeAfterSection,
  ProjectGallerySection,
  CTASection
} from "./sections";

const ProjectDetails = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full items-start relative bg-white overflow-x-hidden min-h-screen">
      {/* Custom Cursor */}
      <CustomCursor className="custom-cursor" />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content Container */}
      <div className="w-full">
        {/* Project Information Section */}
        <ProjectInfoSection />
        
        {/* Before & After Section */}
        <BeforeAfterSection />
        
        {/* Project Gallery Section */}
        <ProjectGallerySection />
        
        {/* CTA Section */}
        <CTASection />
      </div>
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default ProjectDetails;