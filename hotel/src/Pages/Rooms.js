import React from 'react';
import HeroSection from './Components/Rooms/HeroSection';
import RoomSection from './Components/Rooms/RoomSection';
import RelaxSection from './Components/Home/RelaxSection';

const Room= () => {
  return (
    <div>
        <HeroSection/>
        <RoomSection />
        <RelaxSection />
    </div>
  );
};

export default Room;
