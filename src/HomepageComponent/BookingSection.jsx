// import { useState } from 'react';
// import { Clock, DollarSign, ChevronRight, ChevronLeft, Check, Calendar } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const PetBookingApp = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedService, setSelectedService] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//   const [bookingComplete, setBookingComplete] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     petName: '',
//     notes: ''
//   });

//   const services = [
//     { id: 1, name: 'Boarding/Hostel', duration: 1440, price: 1000 },
//     { id: 2, name: 'Day Boarding/Hostel', duration: 1440, price: 1000 },
//     { id: 3, name: 'Day School', duration: 480, price: 650 },
//     { id: 4, name: 'Dog Park', duration: 180, price: 350 },
//     { id: 5, name: 'Grooming', duration: 60, price: 700 },
//     { id: 6, name: 'Play School', duration: 120, price: 450 },
//   ];

//   const timeSlots = [
//     { id: 1, time: '9:00 AM' },
//     { id: 2, time: '10:00 AM' },
//     { id: 3, time: '11:00 AM' },
//     { id: 4, time: '12:00 PM' },
//     { id: 5, time: '1:00 PM' },
//     { id: 6, time: '2:00 PM' },
//     { id: 7, time: '3:00 PM' },
//     { id: 8, time: '4:00 PM' },
//     { id: 9, time: '5:00 PM' },
//     { id: 10, time: '6:00 PM' },
//   ];

//   const formatDate = (date) => {
//     return new Intl.DateTimeFormat('en-US', { 
//       month: 'long', 
//       day: 'numeric', 
//       year: 'numeric' 
//     }).format(date);
//   };

//   const nextStep = () => {
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleServiceSelect = (service) => {
//     setSelectedService(service);
//     setSelectedTimeSlot(null); 
//   };

//   const handleTimeSlotSelect = (timeSlot) => {
//     setSelectedTimeSlot(timeSlot);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = () => {
    
//     setBookingComplete(true);
//   };

//   const generateDayNames = () => {
//     const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const days = [];
//     const today = new Date();
    
//     for (let i = 0; i < 6; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       days.push({
//         date: date,
//         day: dayNames[date.getDay()]
//       });
//     }
    
//     return days;
//   };
  
//   const days = generateDayNames();

//   const isFormValid = () => {
//     return formData.name && formData.phone && formData.email && formData.petName;
//   };

//   if (bookingComplete) {
//     return (
//       <div className="flex h-screen bg-[#EFE3C2]">
//         <div className="w-full max-w-md mx-auto my-auto p-6 bg-white rounded-lg shadow-lg">
//           <div className="text-center">
//             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#85A947] mx-auto mb-4">
//               <Check size={32} className="text-[#123524]" />
//             </div>
//             <h2 className="text-2xl font-bold text-[#123524] mb-2">Booking Confirmed!</h2>
//             <p className="text-[#123524] mb-6">
//               Your appointment for {selectedService.name} on {formatDate(selectedDate)} at {selectedTimeSlot.time} has been scheduled.
//             </p>
//             <div className="bg-[#EFE3C2] p-4 rounded-lg mb-6">
//               <p className="font-medium">Booking Details:</p>
//               <p>Service: {selectedService.name}</p>
//               <p>Date: {formatDate(selectedDate)}</p>
//               <p>Time: {selectedTimeSlot.time}</p>
//               <p>Pet: {formData.petName}</p>
//             </div>
//             <button 
//               onClick={() => {
//                 setCurrentStep(1);
//                 setSelectedService(null);
//                 setSelectedTimeSlot(null);
//                 setBookingComplete(false);
//                 setFormData({
//                   name: '',
//                   phone: '',
//                   email: '',
//                   petName: '',
//                   notes: ''
//                 });
//               }}
//               className="px-6 py-3 bg-[#123524] text-[#EFE3C2] rounded-lg"
//             >
//               Book Another Appointment
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-[#EFE3C2]">
//       {/* Left sidebar */}
//       <div className="w-80 bg-[#123524] text-[#EFE3C2] p-6">
//         <div className="space-y-6">
//           <div className="flex items-center">
//             {currentStep >= 1 ? (
//               <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#EFE3C2] text-[#123524]">
//                 {currentStep > 1 ? <Check size={20} /> : <span>1</span>}
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-8 w-8 rounded-full border border-[#EFE3C2] text-[#EFE3C2]">
//                 <span>1</span>
//               </div>
//             )}
//             <span className="ml-3 text-xl">Services</span>
//           </div>
          
//           {selectedService && currentStep > 1 && (
//             <div className="pl-11 text-sm">
//               <ul>
//                 <li>• {selectedService.name}</li>
//               </ul>
//             </div>
//           )}
          
//           <div className="flex items-center">
//             {currentStep >= 2 ? (
//               <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#EFE3C2] text-[#123524]">
//                 {currentStep > 2 ? <Check size={20} /> : <span>2</span>}
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-8 w-8 rounded-full border border-[#EFE3C2] text-[#EFE3C2] opacity-60">
//                 <span>2</span>
//               </div>
//             )}
//             <span className={`ml-3 text-xl ${currentStep < 2 ? 'opacity-60' : ''}`}>Date and time</span>
//           </div>
          
//           {selectedTimeSlot && currentStep > 2 && (
//             <div className="pl-11 text-sm">
//               <ul>
//                 <li>• {formatDate(selectedDate)}</li>
//                 <li>• {selectedTimeSlot.time}</li>
//               </ul>
//             </div>
//           )}
          
//           <div className="flex items-center">
//             {currentStep >= 3 ? (
//               <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#EFE3C2] text-[#123524]">
//                 <span>3</span>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-8 w-8 rounded-full border border-[#EFE3C2] text-[#EFE3C2] opacity-60">
//                 <span>3</span>
//               </div>
//             )}
//             <span className={`ml-3 text-xl ${currentStep < 3 ? 'opacity-60' : ''}`}>Details</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Main content */}
//       <div className="flex-1 p-6 overflow-auto">
//         {/* Step 1: Services */}
//         {currentStep === 1 && (
//           <>
//             <h2 className="text-xl font-medium mb-6 text-[#123524]">Select a service</h2>
//             <div className="space-y-4">
//               {services.map((service) => (
//                 <div
//                   key={service.id}
//                   className={`p-4 border rounded-lg flex items-center cursor-pointer ${
//                     selectedService?.id === service.id 
//                       ? 'bg-[#3E7B27] text-[#EFE3C2] border-[#3E7B27]' 
//                       : 'bg-white border-[#85A947] hover:border-[#3E7B27]'
//                   }`}
//                   onClick={() => handleServiceSelect(service)}
//                 >
//                 <Link to='/login'>
//                      <input
//                     type="checkbox"
//                     className="h-5 w-5"
//                     checked={selectedService?.id === service.id}
//                     onChange={() => handleServiceSelect(service)}
//                   />
//                 </Link>
                 
//                   <div className="ml-3 flex-1">
//                     <div className="font-medium">{service.name}</div>
//                     <div className="flex items-center mt-1">
//                       <Clock size={16} className="mr-1" />
//                       <span className="text-sm mr-4">{service.duration} min</span>
                     
//                       <span className="text-sm">₹{service.price.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
              
//               <div className="mt-4">
//                 <button 
//                   onClick={() => selectedService && nextStep()}
//                   className={`px-6 py-3 rounded-lg float-right ${
//                     selectedService 
//                       ? 'bg-[#123524] text-[#EFE3C2] hover:bg-[#3E7B27]' 
//                       : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
        
//         {/* Step 2: Date and Time */}
//         {currentStep === 2 && (
//           <>
//             <h2 className="text-xl font-medium mb-6 text-[#123524]">Book an appointment on</h2>
            
//             <div className="border border-[#85A947] rounded-lg p-4 mb-6 flex items-center bg-white">
//               <Calendar className="mr-2 text-[#3E7B27]" />
//               <div className="text-lg text-[#123524]">{formatDate(selectedDate)}</div>
//             </div>
            
//             <div className="flex space-x-2 mb-6 overflow-x-auto">
//               <button className="p-2 bg-white rounded-lg border border-[#85A947] text-[#123524]">
//                 <ChevronLeft />
//               </button>
              
//               {days.map((dayInfo, index) => (
//                 <div 
//                   key={index}
//                   onClick={() => setSelectedDate(dayInfo.date)}
//                   className={`flex-shrink-0 w-20 p-3 rounded-lg text-center cursor-pointer ${
//                     selectedDate.toDateString() === dayInfo.date.toDateString() 
//                       ? 'bg-[#3E7B27] text-[#EFE3C2]' 
//                       : 'bg-white text-[#123524] border border-[#85A947] hover:border-[#3E7B27]'
//                   }`}
//                 >
//                   <div className="text-sm">{dayInfo.day}</div>
//                   <div className="text-xl font-medium">{dayInfo.date.getDate()}</div>
//                   <div className="text-sm">{new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dayInfo.date)}</div>
//                 </div>
//               ))}
              
//               <button className="p-2 bg-white rounded-lg border border-[#85A947] text-[#123524]">
//                 <ChevronRight />
//               </button>
//             </div>
            
//             <h3 className="text-lg font-medium mb-4 text-[#123524]">Available time slots for {selectedService?.name}</h3>
            
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
//               {timeSlots.map((slot) => (
//                 <div
//                   key={slot.id}
//                   onClick={() => handleTimeSlotSelect(slot)}
//                   className={`p-3 text-center rounded-lg cursor-pointer ${
//                     selectedTimeSlot?.id === slot.id
//                       ? 'bg-[#3E7B27] text-[#EFE3C2]'
//                       : 'bg-white text-[#123524] border border-[#85A947] hover:border-[#3E7B27]'
//                   }`}
//                 >
//                   {slot.time}
//                 </div>
//               ))}
//             </div>
            
//             <div className="flex justify-between mt-10">
//               <button 
//                 onClick={prevStep}
//                 className="px-6 py-3 bg-[#85A947] text-[#123524] rounded-lg hover:bg-[#EFE3C2]"
//               >
//                 Back
//               </button>
              
//               <button 
//                 onClick={nextStep}
//                 className={`px-6 py-3 rounded-lg ${
//                   selectedTimeSlot
//                     ? 'bg-[#123524] text-[#EFE3C2] hover:bg-[#3E7B27]'
//                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                 }`}
//                 disabled={!selectedTimeSlot}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
        
//         {/* Step 3: Details */}
//         {currentStep === 3 && (
//           <div>
//             <h2 className="text-xl font-medium mb-6 text-[#123524]">Enter your details</h2>
            
//             <div className="bg-white p-4 rounded-lg border border-[#85A947] mb-6">
//               <h3 className="font-medium mb-2 text-[#123524]">Booking Summary</h3>
//               <p className="text-[#123524]">Service: {selectedService?.name}</p>
//               <p className="text-[#123524]">Date: {formatDate(selectedDate)}</p>
//               <p className="text-[#123524]">Time: {selectedTimeSlot?.time}</p>
//               <p className="font-medium mt-2 text-[#3E7B27]">Total: ₹{selectedService?.price.toFixed(2)}</p>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block mb-1 text-[#123524]">Your Name*</label>
//                 <input 
//                   type="text" 
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-[#85A947] rounded focus:border-[#3E7B27] focus:outline-none" 
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-1 text-[#123524]">Phone Number*</label>
//                 <input 
//                   type="text" 
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-[#85A947] rounded focus:border-[#3E7B27] focus:outline-none" 
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-1 text-[#123524]">Email*</label>
//                 <input 
//                   type="email" 
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-[#85A947] rounded focus:border-[#3E7B27] focus:outline-none" 
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-1 text-[#123524]">Pet Name*</label>
//                 <input 
//                   type="text" 
//                   name="petName"
//                   value={formData.petName}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-[#85A947] rounded focus:border-[#3E7B27] focus:outline-none" 
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-1 text-[#123524]">Additional Notes</label>
//                 <textarea 
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-[#85A947] rounded focus:border-[#3E7B27] focus:outline-none" 
//                   rows={4}
//                 ></textarea>
//               </div>
//             </div>
            
//             <div className="flex justify-between mt-6">
//               <button 
//                 onClick={prevStep}
//                 className="px-6 py-3 bg-[#85A947] text-[#123524] rounded-lg hover:bg-[#EFE3C2]"
//               >
//                 Back
//               </button>
              
//               <button 
//                 onClick={handleSubmit}
//                 className={`px-6 py-3 rounded-lg ${
//                   isFormValid()
//                     ? 'bg-[#123524] text-[#EFE3C2] hover:bg-[#3E7B27]'
//                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                 }`}
//                 disabled={!isFormValid()}
//               >
//                 Confirm Booking
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PetBookingApp;


import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ServicesPage = () => {

  const { user } = useSelector((state) => state.auth);
  const navigate=useNavigate();
 

  const loading = false;

  const serviceCategories = [
    { id: 1, name: 'Boarding/Hostel', duration: 1440, price: 1000 },
    { id: 2, name: 'Day Boarding/Hostel', duration: 1440, price: 1000 },
    { id: 3, name: 'Day School', duration: 480, price: 650 },
    { id: 4, name: 'Dog Park', duration: 180, price: 350 },
    { id: 5, name: 'Grooming', duration: 60, price: 700 },
    { id: 6, name: 'Play School', duration: 120, price: 450 }
  ];

 const handleBookService = (service) => {
  if (!user || user.role!=="customer") {
    navigate('/login');
  } else {
    navigate('/customerservice', { state: { service } });
  }
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

      </div>
    </div>
  );
};

export default ServicesPage;