import React from 'react';
import HeroSection from './Components/Home/HeroSection';
import AboutSection from './Components/Home/AboutSection';
import FeaturedRooms from './Components/Home/FeaturedRooms';
import RelaxSection from './Components/Home/RelaxSection';
import BlogSection from './Components/Home/BlogSection';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FeaturedRooms />
      <RelaxSection/>
      <BlogSection />
    </div>
  );
};

export default Home;
