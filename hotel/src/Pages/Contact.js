import React from 'react';
import ContactUsSection from './Components/Contact/ContactUsSection';
import ContactSection from './Components/Contact/ContactSection';
import RelaxSection from './Components/Home/RelaxSection';


const Contact = () => {
  return (
    <div>
       <ContactUsSection/>
       <ContactSection />
       <RelaxSection />
    </div>
  );
};

export default Contact;