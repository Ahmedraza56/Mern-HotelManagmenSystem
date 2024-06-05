import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar';  // Ensure correct path to Navbar component
import Home from './Pages/Home';
import Rooms from './Pages/Rooms';
import RoomVideos from './Pages/RoomVideos';
import PresidentialRoom from './Pages/PresidentialRoom';
import LuxuryRoom from './Pages/LuxuryRoom';
import DeluxeRoom from './Pages/DeluxeRoom';
import Blog from './Pages/Blog';
import About from './Pages/About';
import Contact from './Pages/Contact';
import BookNow from './Pages/BookNow';
import Footer from './Pages/Footer';
import BlogSingle from './Pages/BlogSingle'
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/videos" element={<RoomVideos />} />
          <Route path="/rooms/presidential" element={<PresidentialRoom />} />
          <Route path="/rooms/luxury" element={<LuxuryRoom />} />
          <Route path="/rooms/deluxe" element={<DeluxeRoom />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booknow" element={<BookNow />} />
          <Route path='/BlogSingle' element={<BlogSingle />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
