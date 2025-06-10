import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './screens/Home';
import { About } from './screens/About';
import { WebsiteLoader } from './components/ui/loader';

function App() {
  return (
    <Router>
      <div className="App">
        <WebsiteLoader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;