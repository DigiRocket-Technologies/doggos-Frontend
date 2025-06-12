import React from 'react';

const PromiseSection = () => {
  return (
    <div className="bg-gradient-to-br from-[#EFE3C2] to-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Image section */}
          <div className="md:w-1/2 mb-10 md:mb-0 relative">
            {/* Decorative paw prints */}
            <div className="absolute -top-10 -left-10 text-[#85A947] text-6xl opacity-30">🐾</div>
            <div className="absolute bottom-0 right-0 text-[#85A947] text-5xl rotate-45 opacity-40">🐾</div>
            
            <div className="relative transform hover:scale-105 transition-transform duration-500">
              {/* Circle background */}
              <div className="w-64 h-64 md:w-96 md:h-96 bg-[#85A947] bg-opacity-70 rounded-full absolute -z-10 -top-6 -left-6"></div>
              
              {/* Border frame */}
              <div className="absolute -z-5 top-4 left-4 right-4 bottom-4 rounded-lg"></div>
              
              {/* Main image */}
              <img
                src="./images/pro2.png"
                alt="Happy dog with owner"
                className="relative z-0 max-w-full h-auto rounded-lg shadow-xl"
                loading="lazy"
              />
              
              {/* Small accent circle */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#3E7B27] rounded-full opacity-80 z-20"></div>
            </div>
          </div>
          
          {/* Text section */}
          <div className="md:w-1/2 md:pl-16 relative">
            {/* Subtle decorative element */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#85A947] opacity-10 rounded-full -z-10"></div>
            
            <div className="transform -rotate-2 mb-6 bg-[#123524] inline-block px-4 py-2 rounded-lg shadow-md">
              <p className="text-xl md:text-2xl font-medium text-[#EFE3C2]">Our promise to you...</p>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-[#123524] relative">
              <span className="relative inline-block">
                Happy pets,
                <span className="absolute -bottom-2 left-0 h-2 w-full bg-[#85A947] opacity-50 rounded-full"></span>
              </span>
              <br />
              <span className="relative inline-block mt-2">
                happy
                <span className="absolute -bottom-2 left-0 h-2 w-full bg-[#85A947] opacity-50 rounded-full"></span>
              </span>
              <br />
              <span className="relative inline-block mt-2">
                humans
                <span className="absolute -bottom-2 left-0 h-2 w-full bg-[#85A947] opacity-50 rounded-full"></span>
              </span>
            </h2>
            
            <div className=" p-6 rounded-lg  ">
              <p className="text-lg text-[#3E7B27] leading-relaxed">
                We treat your pets like family, ensuring they receive the best care possible. Our dedicated team of professionals is committed to providing a safe, loving environment where your furry friends can thrive.
              </p>
            </div>
            
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromiseSection;