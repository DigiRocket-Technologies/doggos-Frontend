import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAppointment } from '../../store/slices/CustomerAppointmentslice';

const BookServicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.appointments);

  const service = location.state?.service;

  const [formData, setFormData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    selectedPetId: '',
    notes: ''
  });

  const [pets, setPets] = useState([]);
  const [petsLoading, setPetsLoading] = useState(false);
  const [petsError, setPetsError] = useState('');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Fetch customer's registered pets
  useEffect(() => {
    const fetchCustomerPets = async () => {
      if (!user?.id) return;

      setPetsLoading(true);
      setPetsError('');

      try {
         const encodedEmail = encodeURIComponent(user.email);
         const token = localStorage?.getItem("authtoken") || "";
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/customerappointment/getcustomerpets?email=${encodedEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token, 
          }
        });
         
        // if (!response.ok) {
        //   throw new Error('Failed to fetch pets');
        // }

        const data = await response.json();
        console.log(data);
        setPets(data.pets || []);
      } catch (err) {
        console.error('Error fetching pets:', err);
        setPetsError('Failed to load your registered pets');
      } finally {
        setPetsLoading(false);
      }
    };

    fetchCustomerPets();
  }, [user?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.appointmentDate || !formData.appointmentTime || !formData.selectedPetId) {
      alert('Please fill in all required fields');
      return;
    }

    // Find selected pet details
    const selectedPet = pets.find(pet => pet._id === formData.selectedPetId);
    if (!selectedPet) {
      alert('Please select a valid pet');
      return;
    }

    const appointmentData = {
      customerId: user.id,
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      petId: selectedPet._id,
      petName: selectedPet.name,
      petBreed: selectedPet.breed,
      petAge: calculateAge(selectedPet.dob),
      petSpecies: selectedPet.species,
      notes: formData.notes.trim(),
      totalAmount: service.price
    };

    try {
      await dispatch(createAppointment(appointmentData)).unwrap();
      alert('Appointment booked successfully!');
      navigate('/customerservice');
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  // Helper function to calculate pet age
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    
    if (years > 0) {
      return months < 0 ? `${years - 1} years` : `${years} years`;
    } else {
      return months <= 0 ? '< 1 month' : `${months} months`;
    }
  };

  // Helper function to format pet display name
  const formatPetDisplay = (pet) => {
    const age = calculateAge(pet.dob);
    return `${pet.name} (${pet.species || 'Pet'} - ${pet.breed || 'Mixed'} - ${age})`;
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Service not found</p>
          <button
            onClick={() => navigate('/customerservice')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/customerservice')}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          ← Back to Services
        </button>

        {/* Service Header */}
        <div className="bg-blue-600 text-white p-6 rounded-t-xl">
          <h1 className="text-3xl font-bold mb-2">Book Appointment</h1>
          <div className="flex justify-between items-center">
            <h2 className="text-xl">{service.name}</h2>
            <div className="text-2xl font-bold">₹{service.price}</div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white p-6 rounded-b-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={user?.fullName || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Pet Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Pet</h3>
              {petsLoading ? (
                <div className="text-center py-4">
                  <p className="text-gray-600">Loading your registered pets...</p>
                </div>
              ) : petsError ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-600">{petsError}</p>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="mt-2 text-sm text-red-700 underline"
                  >
                    Try again
                  </button>
                </div>
              ) : pets.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 mb-2">No registered pets found.</p>
                  <button
                    type="button"
                    onClick={() => navigate('/pet')} // Adjust route as needed
                    className="text-sm bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                  >
                    Register a Pet First
                  </button>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Pet <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="selectedPetId"
                    value={formData.selectedPetId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your pet</option>
                    {pets.map((pet) => (
                      <option key={pet._id} value={pet._id}>
                        {formatPetDisplay(pet)}
                      </option>
                    ))}
                  </select>
                  
                  {/* Display selected pet details */}
                  {formData.selectedPetId && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      {(() => {
                        const selectedPet = pets.find(pet => pet._id === formData.selectedPetId);
                        return selectedPet ? (
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><strong>Name:</strong> {selectedPet.name}</div>
                            <div><strong>Species:</strong> {selectedPet.species || 'Not specified'}</div>
                            <div><strong>Breed:</strong> {selectedPet.breed || 'Mixed'}</div>
                            <div><strong>Age:</strong> {calculateAge(selectedPet.dob)}</div>
                            <div><strong>Sex:</strong> {selectedPet.sex}</div>
                            <div><strong>Color:</strong> {selectedPet.color || 'Not specified'}</div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Date & Time */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Appointment Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    min={minDate}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special requirements..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/customerservice')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || pets.length === 0}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                {loading ? 'Booking...' : `Book Appointment - ₹${service.price}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookServicePage;