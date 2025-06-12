import React from 'react';
import Footer from '../HomepageComponent/Footer';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow overflow-auto">
        <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto bg-gradient-to-b from-white to-[#EFE3C2]">
          {/* Header with decorative elements - reduced size */}
          <div className="w-full flex justify-center mb-6 md:mb-8 relative">
            <div className="absolute -top-6 -left-2 text-[#85A947] text-4xl sm:text-5xl opacity-30">🐾</div>
            <div className="absolute -top-8 right-6 text-[#85A947] text-4xl sm:text-5xl opacity-30">🐾</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#123524] relative">
              About Us
              <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-[#85A947] rounded-full"></div>
            </h1>
          </div>

          {/* Who We Are section - condensed */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center mb-10 md:mb-14">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 md:mb-4 text-[#123524]">Who We Are</h2>

              <p className="text-base md:text-lg mb-3 text-[#3E7B27]">
                At Doggos Heaven, we believe that every dog deserves a life full of joy, care, and unconditional love. We're
                more than just a destination for pets — we're a second home where every wagging tail is celebrated and every
                furry face is treated like family.
              </p>

              <p className="text-base md:text-lg text-[#3E7B27]">
                Built by passionate animal lovers, Doggos Heaven is designed to create the perfect balance of comfort,
                safety, and happiness.
              </p>
            </div>

            <div className="relative">
              {/* Green circle background effect - smaller */}
              <div className="absolute -top-2 -left-2 w-full h-full bg-[#85A947] rounded-full opacity-30"></div>
              
              <div className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden shadow-lg border-2 md:border-4 border-[#3E7B27]">
                <img src="./images/g1.jpeg" alt="Dogs being cared for" className="w-full h-full object-cover" />
              </div>
              
              {/* Decorative paw prints - smaller */}
              <div className="absolute -bottom-3 -right-3 text-[#123524] text-2xl md:text-3xl">🐾</div>
            </div>
          </div>

          {/* Mission & Promise section - condensed */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center mb-10 md:mb-14">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 md:mb-4 text-[#123524] transform -rotate-2">
                Mission & Promise
              </h2>

              <div className="bg-[#123524] text-[#EFE3C2] p-4 md:p-6 rounded-lg shadow-lg transform rotate-1">
                <p className="text-base md:text-lg">
                  At Doggos Heaven, our mission is to provide a nurturing, joyful, and safe environment where dogs can thrive
                  emotionally, socially, and physically. We are committed to treating every dog with personalized attention,
                  expert care, and genuine love.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[#3E7B27] rounded-lg transform translate-x-3 translate-y-3"></div>
              <div className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden shadow-lg">
                <img src="./images/g2.jpeg" alt="Person with dog" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Our Impact section - condensed */}
          <div className="relative mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 text-center text-[#123524]">
              Our Impact
              <span className="block w-32 h-1 bg-[#85A947] mx-auto mt-3"></span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="relative">
                {/* Decorative frame - smaller */}
                <div className="absolute -top-2 -bottom-2 -left-2 -right-2 border-2 border-dashed border-[#85A947] rounded-lg"></div>
                
                <div className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden shadow-lg">
                  <img src="./images/g4.jpeg" alt="Cat with food bowl" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 bg-[#EFE3C2] bg-opacity-60 p-4 rounded-lg">
                <p className="text-base md:text-lg text-[#123524]">
                  At Doggos Heaven, every wag, every cuddle, and every happy bark tells a story of trust, love, and
                  transformation. We're proud to have built a space where dogs of all breeds, ages, and personalities can
                  find joy, comfort, and a sense of belonging.
                </p>

                <p className="text-base md:text-lg text-[#123524]">
                  Over time, we've helped countless dogs grow more confident, healthier, and socially connected.
                </p>
                
                {/* Small decorative paw prints */}
                <div className="flex justify-end">
                  <span className="text-[#85A947] text-xl">🐾 🐾 🐾</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;