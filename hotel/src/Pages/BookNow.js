import React from 'react';
import ReservationSection from './Components/BookNow/ReservationSection';
import ReservationForm from './Components/BookNow/ReservationForm';
import RelaxSection from './Components/Home/RelaxSection';


const BookNow = () => {
  return (
    <div>
       <ReservationSection/>
       <ReservationForm />
       <RelaxSection />
    </div>
  );
};

export default BookNow;
