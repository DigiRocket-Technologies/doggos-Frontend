import React, { useState } from "react";

const LocationAndFAQComponent = () => {
  const [openFaq, setOpenFaq] = useState(null);
  
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  const faqs = [
    {
      question: "What time can I drop off and pick up my dog?",
      answer: "Drop-off time is between 7:30 AM and 9:30 AM, and pick-up time is between 5:30 PM and 7:30 PM. We also offer flexible timing for special circumstances."
    },
    {
      question: "What should my dog bring for daycare?",
      answer: "Please bring your dog's food, collar with ID tag, any necessary medications, and their favorite toy or comfort item. We provide water bowls, beds, and lots of attention!"
    },
    {
      question: "What does my dog do all day?",
      answer: "Dogs at our daycare enjoy supervised playtime, socialization, rest periods, training sessions, and enrichment activities. Each dog follows a schedule tailored to their needs and energy levels."
    },
    {
      question: "How old does my dog have to be?",
      answer: "Dogs must be at least 4 months old and have their core vaccinations completed. We accept dogs of all ages as long as they're healthy and can socialize well with others."
    }
  ];
  
  return (
    <div className="bg-[#EFE3C2] py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          {/* Location Section */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="flex items-center mb-6">
              <div className="text-[#3E7B27]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold ml-2 text-[#123524]">Locations</h2>
            </div>
            
            <div className=" p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-[#123524]">Grooming and veterinary:</h3>
              <address className="text-[#3E7B27] text-center">
                Plot-11, Block J, Sector 83, Nearby Vatika V'lante,<br />
                Gurugram, HR, 122004
              </address>
            </div>
          </div>

          <div className="w-full md:w-1/2 mb-8 relative">
            <img 
              loading="lazy" 
              decoding="async" 
              width="690" 
              height="810" 
              src="https://doggosheaven.com/wp-content/uploads/2022/06/iStock-1391392455.png" 
              className="h-auto max-w-full rounded-lg" 
              alt="Happy dog" 
            />
          </div>
          
          {/* FAQ Section */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-[#3E7B27] flex items-center justify-center text-2xl font-bold text-[#EFE3C2]">?</div>
              <h2 className="text-3xl font-bold ml-2 text-[#123524]">FAQ's</h2>
            </div>
            
            <div className="rounded-lg shadow-sm ">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#EFE3C2] last:border-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 flex items-center justify-between font-medium text-[#123524] hover:bg-[#EFE3C2] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform text-[#3E7B27] ${openFaq === index ? 'transform rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {openFaq === index && (
                    <div className="p-4 pt-0 text-[#3E7B27] bg-[#EFE3C2] bg-opacity-30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationAndFAQComponent;