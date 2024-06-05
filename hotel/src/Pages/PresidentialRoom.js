import React from 'react';
import HeroSection from './Components/Rooms/HeroSection';
import RoomSection from './Components/Rooms/RoomSection';
import RelaxSection from './Components/Home/RelaxSection';

const PersidentialRoom = () => {
  return (
    <div>
      <HeroSection/>
        <RoomSection />
        <RelaxSection />
    </div>
  );
};

export default PersidentialRoom;
