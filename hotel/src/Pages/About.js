import React from 'react';
import AboutHeroSection from './Components/About/AboutHeroSection ';
import OurStorySection from './Components/About/OurStorySection';
import OurStaffSection from './Components/About/OurStaffSection';

const About = () => {
  return (
    <div>
        <AboutHeroSection/>
        <OurStorySection />
        <OurStaffSection/>
    </div>
  );
};

export default About;
