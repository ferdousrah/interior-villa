import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './screens/Home';
import { About } from './screens/About';
import { ResidentialInterior } from './screens/ResidentialInterior';
import { Portfolio } from './screens/Portfolio';
import { ProjectDetails } from './screens/ProjectDetails';
import { Blog } from './screens/Blog';
import { BlogDetails } from './screens/BlogDetails';
import { FAQ } from './screens/FAQ';
import { BookAppointment } from './screens/BookAppointment';
import { Contact } from './screens/Contact';
import { NotFound } from './screens/NotFound';
import { WebsiteLoader } from './components/ui/loader';

function App() {
  return (
    <Router>
      <div className="App">
        <WebsiteLoader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/residential-interior" element={<ResidentialInterior />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/project-details" element={<ProjectDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/contact" element={<Contact />} />
          {/* 404 Not Found - This should be the last route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;