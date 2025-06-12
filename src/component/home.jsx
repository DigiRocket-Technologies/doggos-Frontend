import React from 'react';
import HeroSection from "../HomepageComponent/HeroSection"
import PromiseSection from "../HomepageComponent/PromiseSection"
import WhyRelySection from "../HomepageComponent/Whyrely"
import ServicesSection from "../HomepageComponent/Services"
import BookingSection from "../HomepageComponent/BookingSection"
import FAQSection from "../HomepageComponent/FaqSection"
import Footer from "../HomepageComponent/Footer"
import InstagramReelsGrid from "../HomepageComponent/instareel";
import { useRef } from 'react';




const home = () => {

  const serviceRef = useRef(null);
  const bookingRef= useRef(null);

  const scrollToSection = (section) => {
    if(section.current){
      section?.current?.scrollIntoView({behavior:'smooth'});
    }
  
  };

  return (
    <div>
       <HeroSection />
        <PromiseSection />
        <WhyRelySection />
        <div ref={serviceRef}> <ServicesSection /></div>
        <InstagramReelsGrid/>
        <div ref={bookingRef}>  <BookingSection /> </div>
        <FAQSection/>
        <Footer onServiceClick={()=> scrollToSection(serviceRef)} 
               onBookingClick={()=> scrollToSection(bookingRef)} />
    </div>
  )
}

export default home


