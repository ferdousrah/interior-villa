import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from '../components/screens/Home/Home'
import { About } from '../components/screens/About/About'
import { Contact } from '../components/screens/Contact/Contact'
import { Blog } from '../components/screens/Blog/Blog'
import { Portfolio } from '../app/Portfolio'
import { ProjectDetails } from '../app/ProjectDetails'
import { ResidentialInterior } from '../app/ResidentialInterior'
import { CommercialInterior } from '../app/CommercialInterior'
import { ArchitecturalConsultancy } from '../app/ArchitecturalConsultancy'
import { BlogDetails } from '../components/screens/BlogDetails/BlogDetails'
import '../app/globals.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route path="/residential-interior" element={<ResidentialInterior />} />
        <Route path="/commercial-interior" element={<CommercialInterior />} />
        <Route path="/architectural-consultancy" element={<ArchitecturalConsultancy />} />
        <Route path="/services" element={<div className="min-h-screen flex items-center justify-center">Services Page Coming Soon</div>} />
      </Routes>
    </Router>
  )
}

export default App