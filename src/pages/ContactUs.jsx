import React from 'react';
import ContactForm from "./ContactForm";
import Footer from '../HomepageComponent/Footer';

function ContactUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow overflow-auto">
        <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto bg-white">
          <div className="relative mb-8 md:mb-10">
          
            <div className="absolute -top-8 -left-8 w-24 h-24 md:w-32 md:h-32 bg-[#EFE3C2] rounded-full opacity-50"></div>
            <div className="absolute top-0 right-0 w-20 h-20 md:w-28 md:h-28 bg-[#EFE3C2] rounded-full opacity-50"></div>
            
            <div className="relative">
              <div className="absolute top-2 right-6 md:right-10">
                <div className="text-[#85A947] text-3xl md:text-4xl transform rotate-12">🐾</div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-4 text-[#123524]">
                <span className="relative inline-block">
                  Contact
                </span>
                &nbsp;us
              </h1>

              <p className="text-base md:text-lg text-center max-w-3xl mx-auto text-[#3E7B27]">
                We'd love to hear from you - please use the form to send us your message or ideas.
              </p>
            </div>
          </div>

  
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto mb-8 md:mb-10">
            <div className="bg-[#EFE3C2] p-4 rounded-lg shadow-md relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-16 h-16">
                <svg viewBox="0 0 100 100">
                  <path d="M0,0 L100,100" stroke="#85A947" strokeWidth="2" />
                </svg>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold mb-3 text-[#123524]">Our Location</h3>
              <div className="flex items-start">
                <div className="mr-3 text-[#3E7B27]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm md:text-base mb-1 text-[#123524]">Plot-11, Block J, Sector 83,</p>
                  <p className="text-sm md:text-base mb-1 text-[#123524]">Nearby Vatika V'lante,</p>
                  <p className="text-sm md:text-base text-[#123524]">Gurugram, HR, 122004</p>
                </div>
              </div>
            </div>

            <div className="bg-[#EFE3C2] p-4 rounded-lg shadow-md relative overflow-hidden">
      
              <div className="absolute bottom-1 right-1 text-[#85A947] opacity-20 text-3xl md:text-4xl">🐾</div>
              
              <h3 className="text-lg md:text-xl font-bold mb-3 text-[#123524]">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="mr-3 text-[#3E7B27]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-[#123524]">Call us: +91 8448461071</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 text-[#3E7B27]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-[#123524]">Email: care@doggosheaven.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
          <div className="mb-8 md:mb-10 relative">
            {/* <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#123524] text-white px-4 py-1 md:py-2 rounded-full text-sm md:text-base font-semibold z-10">
              Find Us Here
            </div> */}
            <div className=" rounded-lg overflow-hidden shadow-md h-48 md:h-72 max-w-[70%] mx-auto relative">
       
              <div className="h-full w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.9365510154903!2d76.9700345088445!3d28.39098429491173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3d003aac66ab%3A0x32a6dd785b4cbc4f!2sDoggos%20Heaven!5e0!3m2!1sen!2sin!4v1745414318175!5m2!1sen!2sin"
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen
                  title="Doggos Heaven"
                ></iframe>
              </div>
              
         
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#85A947]"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#85A947]"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#85A947]"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#85A947]"></div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <span className="h-1 w-10 md:w-16 bg-[#85A947] rounded-full"></span>
              <span className="h-1 w-6 md:w-8 bg-[#85A947] rounded-full"></span>
              <span className="h-1 w-3 md:w-4 bg-[#85A947] rounded-full"></span>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
