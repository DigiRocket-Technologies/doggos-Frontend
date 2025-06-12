import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate=useNavigate();


  return (
    <div className="relative bg-gradient-to-br from-[#EFE3C2] to-[#EFE3C2] overflow-hidden min-h-[90vh] flex items-center">
      {/* Reduced size and opacity of background decorative elements */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#85A947] rounded-full opacity-30 blur-sm"></div>
      <div className="absolute top-10 right-10 w-24 h-24 bg-[#3E7B27] rounded-full opacity-40 blur-sm"></div>
      <div className="absolute top-32 left-1/4 w-12 h-12 bg-[#85A947] rounded-full opacity-30"></div>
      <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-[#85A947] rounded-full opacity-40"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-12">
        {/* Content container */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Text content with adjusted font sizes */}
          <div className="md:w-1/2 z-10 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-4 text-[#123524]">
              Your pet, <br />
              <span className="text-3xl md:text-4xl lg:text-6xl bg-gradient-to-r from-[#3E7B27] to-[#85A947] bg-clip-text text-transparent">
                our priority
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#123524] mb-6 max-w-xl leading-relaxed">
              Premium pet care services tailored to your furry friend's needs. Because they deserve nothing but the best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link to='/aboutus'>
                  <button className="bg-[#123524] text-[#EFE3C2] px-6 py-3 rounded-full font-bold text-base hover:bg-[#3E7B27] transform hover:scale-105 transition-all shadow-md">
                Learn more
              </button>
            </Link>
            <button 
                onClick={() => {
                  if (!user) {
                    navigate('/login');
                  } else if (user.role === 'customer') {
                    navigate('/customerpetform');
                  } else {
                    navigate('/login'); 
                  }
                }}
                className="bg-[#85A947] text-[#123524] px-6 py-3 rounded-full font-bold text-base hover:bg-[#3E7B27] hover:text-[#EFE3C2] transform hover:scale-105 transition-all shadow-md"
                >
                Make a reservation
                </button>
             
            </div>
          </div>
          
          {/* Image container with reduced size */}
          <div className="md:w-1/2 relative">
            <div className="relative z-10 transform hover:rotate-1 transition-transform duration-300">
              {/* Main image with adjusted height */}
              <div className="rounded-xl overflow-hidden">
                <img
                  src="./images/h1.png"
                  alt="Dog and cat with groomers"
                  className="relative z-10 h-auto max-h-[400px] md:max-h-[450px] w-auto object-contain"
                />
              </div>
              
              {/* Reduced size decorative elements */}
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#85A947] rounded-full flex items-center justify-center shadow-lg">
                <div className="w-16 h-16 rounded-full bg-[#EFE3C2] flex items-center justify-center">
                  <span className="text-2xl font-black">❤️</span>
                </div>
              </div>
              
              {/* Floating badges with reduced size */}
              <div className="absolute -left-24 top-1/4 bg-[#EFE3C2] p-3 rounded-lg shadow-lg transform -rotate-6 border-2 border-[#3E7B27]">
                <div className="text-sm md:text-base font-bold text-[#123524]">Certified Trainers</div>
              </div>
              <div className="absolute -right-8 top-1/2 bg-[#EFE3C2] p-3 rounded-lg shadow-lg transform rotate-6 border-2 border-[#3E7B27]">
                <div className="text-sm md:text-base font-bold text-[#123524]">100% Cage-Free</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;