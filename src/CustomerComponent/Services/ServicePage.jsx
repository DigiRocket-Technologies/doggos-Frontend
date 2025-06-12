import React, { useEffect } from 'react';

const ServicesPage = () => {
  // Mock loading state for demo
  const loading = false;

  const serviceCategories = [
    { id: 'grooming', name: 'Pet Grooming', price: 500 },
    { id: 'hostel', name: 'Pet Hostel', price: 800 },
    { id: 'veterinary', name: 'Veterinary Care', price: 1000 },
    { id: 'dayschool', name: 'Day School', price: 600 },
    { id: 'playschool', name: 'Play School', price: 400 },
    { id: 'daycare', name: 'Day Care', price: 700 }
  ];

  const handleBookService = (service) => {
    // Navigate to booking page with service data
    console.log('Booking service:', service);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EFE3C2' }}>
        <div className="text-center">
          <div 
            className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4"
            style={{ 
              borderColor: '#85A947', 
              borderTopColor: '#123524' 
            }}
          ></div>
          <p style={{ color: '#123524' }}>Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: '#EFE3C2' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl font-bold mb-3"
            style={{ color: '#123524' }}
          >
            Our Pet Services
          </h1>
          <p 
            className="text-lg"
            style={{ color: '#3E7B27' }}
          >
            Professional care for your beloved pets
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {serviceCategories.map((service) => (
            <div 
              key={service.id} 
              className="rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
              style={{ backgroundColor: 'white' }}
            >
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#123524' }}
              >
                {service.name}
              </h3>
              
              <div 
                className="text-2xl font-bold mb-4"
                style={{ color: '#3E7B27' }}
              >
                ₹{service.price}
              </div>
              
              <button
                onClick={() => handleBookService(service)}
                className="w-full py-2 px-4 rounded font-medium transition-colors duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: '#123524',
                  color: 'white'
                }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* View Appointments Button */}
        <div className="text-center">
          <button
            onClick={() => console.log('Navigate to appointments')}
            className="py-2 px-6 rounded font-medium transition-colors duration-200 hover:opacity-90"
            style={{ 
              backgroundColor: '#85A947',
              color: 'white'
            }}
          >
            View My Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;