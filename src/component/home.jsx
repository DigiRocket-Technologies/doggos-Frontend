import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides in the public/images folder
  const slides = [
    { id: 1, placeholder: "1.jpeg", alt: "Pet care 1" },
    { id: 2, placeholder: "2.jpeg", alt: "Pet care 2" },
    { id: 3, placeholder: "3.png", alt: "Pet care 3" },
    { id: 4, placeholder: "4.png", alt: "Pet care 4" },
    { id: 5, placeholder: "5.jpeg", alt: "Pet care 5" },
    { id: 6, placeholder: "6.jpg", alt: "Pet care 6" }
  ];

  const navigate= useNavigate();

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Next Slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Previous Slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Navigate to Add New Pet Page
  const addNewPet = () => {
    navigate('/pet');
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Carousel Container */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={false}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.05
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0 z-10"
              style={{
                background: `linear-gradient(45deg, rgba(18, 53, 36, 0.7), rgba(62, 123, 39, 0.5), rgba(133, 169, 71, 0.3))`
              }}
            />
            <img
              src={`/images/${slide.placeholder}`}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110"
        style={{ 
          backgroundColor: 'rgba(239, 227, 194, 0.9)',
          color: '#123524'
        }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110"
        style={{ 
          backgroundColor: 'rgba(239, 227, 194, 0.9)',
          color: '#123524'
        }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
            style={{
              backgroundColor: currentSlide === index ? '#EFE3C2' : 'rgba(239, 227, 194, 0.5)'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6">
        {/* Main Heading */}
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight"
          style={{ color: '#EFE3C2' }}
        >
          Register Your Pet Here!
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-center max-w-3xl mb-8 leading-relaxed"
          style={{ color: '#EFE3C2' }}
        >
          Compassionate Care for Your Furry Friends: Expert Veterinary Services You Can Count On!
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{
            backgroundColor: '#85A947',
            color: '#123524'
          }}
          onClick={addNewPet}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#3E7B27';
            e.target.style.color = '#EFE3C2';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#85A947';
            e.target.style.color = '#123524';
          }}
        >
          Add New Pet
        </motion.button>

        {/* Additional Features */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
        >
          {[
            { title: "Professional Care", desc: "Expert veterinary services" },
            { title: "Safe Environment", desc: "Secure and comfortable facilities" },
            { title: "24/7 Support", desc: "Always here when you need us" }
          ].map((feature, index) => (
            <div 
              key={index}
              className="text-center p-4 rounded-lg backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(239, 227, 194, 0.1)' }}
            >
              <h3 
                className="font-semibold text-lg mb-2"
                style={{ color: '#EFE3C2' }}
              >
                {feature.title}
              </h3>
              <p 
                className="text-sm opacity-90"
                style={{ color: '#EFE3C2' }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;