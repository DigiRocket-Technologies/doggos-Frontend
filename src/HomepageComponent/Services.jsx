import React from 'react';

const ServicesSection = () => {
  const services = [
    { name: "Boarding", icon: "hands-paw" },
    { name: "Day School", icon: "hand-pet" },
    { name: "Play School", icon: "play-dog" },
    { name: "Veterinary", icon: "paw-plus" },
    { name: "Grooming", icon: "scissors" },
    { name: "Picnic", icon: "dog-house" },
  ]

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "hands-paw":
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="2">
            <path d="M12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14Z" />
            <path d="M20 4C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4H20Z" />
          </svg>
        )
      case "hand-pet":
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="2">
            <path d="M7 11C8.10457 11 9 10.1046 9 9C9 7.89543 8.10457 7 7 7C5.89543 7 5 7.89543 5 9C5 10.1046 5.89543 11 7 11Z" />
            <path d="M11.15 12C10.3 12 9.55 12.65 9.55 13.5C9.55 14.35 10.3 15 11.15 15C12 15 12.85 14.35 12.85 13.5C12.85 12.65 12 12 11.15 12Z" />
            <path d="M14.5 11C15.33 11 16 10.33 16 9.5C16 8.67 15.33 8 14.5 8C13.67 8 13 8.67 13 9.5C13 10.33 13.67 11 14.5 11Z" />
            <path d="M17.5 13C18.33 13 19 12.33 19 11.5C19 10.67 18.33 10 17.5 10C16.67 10 16 10.67 16 11.5C16 12.33 16.67 13 17.5 13Z" />
            <path d="M20 18H4C2.89543 18 2 17.1046 2 16V8C2 6.89543 2.89543 6 4 6H20C21.1046 6 22 6.89543 22 8V16C22 17.1046 21.1046 18 20 18Z" />
          </svg>
        )
      case "play-dog":
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="2">
            <path d="M10 17C10 17 11 18 12 18C13 18 14 17 14 17" strokeLinecap="round" />
            <path d="M7 13C7 13 7 14 8 14C9 14 9 13 9 13" strokeLinecap="round" />
            <path d="M15 13C15 13 15 14 16 14C17 14 17 13 17 13" strokeLinecap="round" />
            <path d="M12 3L19 7V11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11V7L12 3Z" />
          </svg>
        )
      case "paw-plus":
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="2">
            <path d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z" />
            <path d="M19 12C20.1046 12 21 11.1046 21 10C21 8.89543 20.1046 8 19 8C17.8954 8 17 8.89543 17 10C17 11.1046 17.8954 12 19 12Z" />
            <path d="M5 12C6.10457 12 7 11.1046 7 10C7 8.89543 6.10457 8 5 8C3.89543 8 3 8.89543 3 10C3 11.1046 3.89543 12 5 12Z" />
            <path d="M12 19C13.1046 19 14 18.1046 14 17C14 15.8954 13.1046 15 12 15C10.8954 15 10 15.8954 10 17C10 18.1046 10.8954 19 12 19Z" />
            <path d="M12 12V15M12 12H15M12 12H9" strokeLinecap="round" />
          </svg>
        )
      case "scissors":
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="2">
            <path d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z" />
            <path d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z" />
            <path d="M20 4L8.12 15.88" strokeLinecap="round" />
            <path d="M14.47 14.48L20 20" strokeLinecap="round" />
            <path d="M8.12 8.12L12 12" strokeLinecap="round" />
          </svg>
        )
      case "dog-house":
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="2">
            <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21V16C9 15.4477 9.44772 15 10 15H14C14.5523 15 15 15.4477 15 16V21M9 21H15" />
          </svg>
        )
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="2">
            <path d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z" />
            <path d="M19 12C20.1046 12 21 11.1046 21 10C21 8.89543 20.1046 8 19 8C17.8954 8 17 8.89543 17 10C17 11.1046 17.8954 12 19 12Z" />
            <path d="M5 12C6.10457 12 7 11.1046 7 10C7 8.89543 6.10457 8 5 8C3.89543 8 3 8.89543 3 10C3 11.1046 3.89543 12 5 12Z" />
            <path d="M12 19C13.1046 19 14 18.1046 14 17C14 15.8954 13.1046 15 12 15C10.8954 15 10 15.8954 10 17C10 18.1046 10.8954 19 12 19Z" />
          </svg>
        )
    }
  }

  return (
    <div className="bg-[#EFE3C2] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-center text-[#123524]">We are best in:</h2>
          
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#3E7B27] bg-opacity-20 rounded-full flex items-center justify-center mb-4 text-[#123524] hover:bg-[#3E7B27] hover:text-[#EFE3C2] transition-colors duration-300">
                {renderIcon(service.icon)}
              </div>
              <h3 className="text-xl font-bold text-center text-[#123524]">{service.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesSection