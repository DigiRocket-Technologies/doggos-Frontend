
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const StaffAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

    const token = localStorage?.getItem("authtoken") || "";

    console.log(selectedDate);

  const fetchAppointments = async () => {
  try {
    setLoading(true);
    
    
    const formattedDate = new Date(selectedDate).toISOString();
    console.log('Selected date:', selectedDate);
    console.log('Formatted date for API:', formattedDate);
    
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/onlineappointments?date=${formattedDate}`, {
      headers: {
         'Content-Type': 'application/json',
        'Authorization': token,
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    if (data.success) {
      setAppointments(data.appointments);
    } else {
      console.error('API returned error:', data.message);
    }
  } catch (error) {
    console.error('Error fetching appointments:', error);
    alert('Error loading appointments. Please check console for details.');
  } finally {
    setLoading(false);
  }
};

  const updateStatus = async (appointmentId, newStatus, notes = '') => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/onlineappointments/${appointmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ 
          status: newStatus, 
          visitNotes: notes 
        })
      });

      const data = await response.json();
      if (data.success) {
        fetchAppointments(); 
        alert(`Appointment ${newStatus} successfully!`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating appointment');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Dashboard</h1>
          <p className="text-gray-600">Manage customer appointments</p>
        </div>

        {/* Date Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No Appointments</h3>
              <p className="text-gray-500">No appointments found for selected date.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="bg-white rounded-xl shadow-lg p-6">
                
                {/* Customer & Pet Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {appointment.customerId?.fullName}
                  </h3>
                  <p className="text-gray-600">{appointment.customerId?.email}</p>
                  <p className="text-lg font-semibold text-blue-600 mt-2">
                    {appointment.serviceName}
                  </p>
                </div>

                {/* Current Status */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                    Current: {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="mb-4">
                  <p className="text-gray-600">📅 {formatDate(appointment.appointmentDate)}</p>
                  <p className="text-gray-600">🕐 {formatTime(appointment.appointmentTime)}</p>
                </div>

                {/* Pet Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="font-semibold">🐾 {appointment.petName}</p>
                  {appointment.petBreed && <p className="text-sm">Breed: {appointment.petBreed}</p>}
                  {appointment.petAge && <p className="text-sm">Age: {appointment.petAge}</p>}
                </div>

                {/* Amount */}
                <div className="mb-4">
                  <span className="text-lg font-bold text-green-600">₹{appointment.totalAmount}</span>
                </div>

                {/* Notes */}
                {appointment.notes && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm"><strong>Notes:</strong> {appointment.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  {appointment.status === 'pending' && (
                    <button
                      onClick={() => updateStatus(appointment._id, 'confirmed')}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      Confirm Appointment
                    </button>
                  )}
                  
                  {appointment.status === 'confirmed' && (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          const notes = prompt('Add visit notes (optional):');
                          updateStatus(appointment._id, 'completed', notes || '');
                        }}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                      >
                        Mark as Visited/Completed
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt('Reason for not visiting:');
                          if (reason) {
                            updateStatus(appointment._id, 'cancelled', reason);
                          }
                        }}
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                      >
                        Mark as Not Visited
                      </button>
                    </div>
                  )}

                  {appointment.status === 'completed' && (
                    <div className="text-center text-green-600 py-2">
                      <span className="font-medium">✅ Completed</span>
                    </div>
                  )}

                  {appointment.status === 'cancelled' && (
                    <div className="text-center text-red-600 py-2">
                      <span className="font-medium">❌ Cancelled</span>
                    </div>
                  )}
                </div>

                {/* Appointment ID */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    ID: {appointment._id.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffAppointmentsPage;