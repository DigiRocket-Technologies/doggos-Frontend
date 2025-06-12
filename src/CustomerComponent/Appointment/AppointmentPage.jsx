
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCustomerAppointments, cancelAppointment } from '../../store/slices/CustomerAppointmentslice';

const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appointments, loading, error } = useSelector((state) => state.appointments);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCustomerAppointments(user.id));
    }
  }, [dispatch, user?.id]);

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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
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

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(cancelAppointment(appointmentId));
    }
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
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
            <p className="text-gray-600">Manage your pet service appointments</p>
          </div>
          <button
            onClick={() => navigate('/customerservice')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Book New Appointment
          </button>
        </div>

      
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}


        {appointments.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No Appointments Yet</h3>
              <p className="text-gray-500 mb-6">
                You haven't booked any appointments yet. Let's get your pet the care they deserve!
              </p>
              <button
                onClick={() => navigate('/customerservice')}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
              >
                Book Your First Appointment
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {appointment.serviceId?.name || appointment.serviceName}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                </div>

                
                <div className="mb-4">
                  <p className="text-gray-600 mb-1">
                    📅 {formatDate(appointment.appointmentDate)}
                  </p>
                  <p className="text-gray-600">
                    🕐 {formatTime(appointment.appointmentTime)}
                  </p>
                </div>

          
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center text-gray-700 mb-2">
                    <span className="font-semibold">🐾 {appointment.petName}</span>
                  </div>
                  {appointment.petBreed && (
                    <p className="text-sm text-gray-600">Breed: {appointment.petBreed}</p>
                  )}
                  {appointment.petAge && (
                    <p className="text-sm text-gray-600">Age: {appointment.petAge}</p>
                  )}
                </div>

      
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Total Amount:</span>
                  <span className="text-lg font-bold text-green-600">₹{appointment.totalAmount}</span>
                </div>

                
                {appointment.notes && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Notes:</span> {appointment.notes}
                    </p>
                  </div>
                )}

            
                {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                  <button
                    onClick={() => handleCancelAppointment(appointment._id)}
                    className="w-full bg-red-50 text-red-600 py-2 px-4 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    Cancel Appointment
                  </button>
                )}

                {appointment.status === 'completed' && (
                  <div className="text-center text-green-600 py-2">
                    <span className="text-sm font-medium">✅ Service Completed</span>
                  </div>
                )}

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

export default AppointmentsPage;