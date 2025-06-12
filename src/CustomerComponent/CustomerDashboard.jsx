import React, { useState, useEffect } from 'react';

import { 
  PlusCircle, 
  Calendar, 
  Wallet, 
  History, 
  Receipt, 
  GraduationCap,
  Home,
  Scissors,
  Heart,
  User,
  Bell,
  Search,
  Filter,
  ArrowRight,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
  Award,
  Activity
} from 'lucide-react';
import { Link} from "react-router-dom";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      image: '/api/placeholder/80/80',
      registrationDate: '2021-03-15',
      lastVisit: '2024-05-15',
      upcomingAppointment: '2024-05-25',
      status: 'Healthy'
    },
    {
      id: 2,
      name: 'Whiskers',
      species: 'Cat',
      breed: 'Persian',
      age: 2,
      image: '/api/placeholder/80/80',
      registrationDate: '2022-01-10',
      lastVisit: '2024-05-10',
      upcomingAppointment: null,
      status: 'Due for vaccination'
    }
  ]);

  // const [walletBalance, setWalletBalance] = useState(1250);
  const [notifications, setNotifications] = useState(3);

  // Mock data for various features
  const services = [
    { id: 1, name: 'Grooming', icon: <Scissors className="w-6 h-6" />, color: 'bg-[#3E7B27]' },
    { id: 2, name: 'Hostel', icon: <Home className="w-6 h-6" />, color: 'bg-[#85A947]' },
    { id: 3, name: 'Day School', icon: <GraduationCap className="w-6 h-6" />, color: 'bg-[#3E7B27]' },
    { id: 4, name: 'Subscription', icon: <Heart className="w-6 h-6" />, color: 'bg-[#85A947]' }
  ];

  const recentActivities = [
    { id: 1, type: 'grooming', petName: 'Buddy', service: 'Full Grooming', date: '2024-05-20', amount: 850 },
    { id: 2, type: 'checkup', petName: 'Whiskers', service: 'Health Checkup', date: '2024-05-18', amount: 500 },
    { id: 3, type: 'school', petName: 'Buddy', service: 'Day School', date: '2024-05-15', amount: 400 }
  ];

  const upcomingAppointments = [
    { id: 1, petName: 'Buddy', service: 'Vaccination', date: '2024-05-25', time: '10:00 AM' },
    { id: 2, petName: 'Whiskers', service: 'Grooming', date: '2024-05-28', time: '2:00 PM' }
  ];

  const QuickStatsCard = ({ title, value, subtitle, icon, trend }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-[#85A947] hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#3E7B27] uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-[#123524] mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className="w-12 h-12 bg-[#EFE3C2] rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-4 text-sm">
          <TrendingUp className="w-4 h-4 text-[#85A947] mr-1" />
          <span className="text-[#3E7B27] font-medium">{trend}</span>
        </div>
      )}
    </div>
  );

  const PetCard = ({ pet }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center space-x-4">
        <img 
          src={pet.image} 
          alt={pet.name}
          className="w-16 h-16 rounded-full object-cover border-3 border-[#EFE3C2]"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#123524]">{pet.name}</h3>
          <p className="text-sm text-[#3E7B27]">{pet.breed} • {pet.age} years old</p>
          <div className="flex items-center mt-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              pet.status === 'Healthy' 
                ? 'bg-[#85A947] text-white' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {pet.status}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Registered</p>
          <p className="text-sm font-medium text-[#123524]">
            {new Date(pet.registrationDate).toLocaleDateString()}
          </p>
          {pet.upcomingAppointment && (
            <p className="text-xs text-[#3E7B27] mt-1">
              Next: {new Date(pet.upcomingAppointment).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const ServiceCard = ({ service }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
            {service.icon}
          </div>
          <h3 className="text-lg font-semibold text-[#123524] group-hover:text-[#3E7B27] transition-colors">
            {service.name}
          </h3>
        </div>
        <ArrowRight className="w-5 h-5 text-[#85A947] group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-center space-x-4 p-4 bg-[#EFE3C2] bg-opacity-30 rounded-lg">
      <div className="w-10 h-10 bg-[#85A947] rounded-lg flex items-center justify-center">
        {activity.type === 'grooming' && <Scissors className="w-5 h-5 text-white" />}
        {activity.type === 'checkup' && <Heart className="w-5 h-5 text-white" />}
        {activity.type === 'school' && <GraduationCap className="w-5 h-5 text-white" />}
      </div>
      <div className="flex-1">
        <p className="font-medium text-[#123524]">{activity.service}</p>
        <p className="text-sm text-[#3E7B27]">{activity.petName} • {activity.date}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-[#123524]">₹{activity.amount}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE3C2] to-white">
      {/* Header */}
      <header className="bg-[#123524] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#85A947] rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Welcome back, John!</h1>
                <p className="text-[#EFE3C2] text-sm">Manage your pets and services</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-[#EFE3C2] cursor-pointer hover:text-white transition-colors" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
{/*               
              <div className="flex items-center space-x-2 bg-[#3E7B27] px-4 py-2 rounded-lg">
                <Wallet className="w-5 h-5 text-[#EFE3C2]" />
                <span className="font-semibold text-[#EFE3C2]">₹{walletBalance}</span>
              </div> */}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to='/customerbuysubscription'>
             <QuickStatsCard
            title="Buy subscription"
            subtitle="for many services"
            icon={<Heart className="w-6 h-6 text-[#3E7B27]" />}
            
          />
        </Link>
         
          <Link to="/customersubscription" className="block">
          <QuickStatsCard
            title="Wallet Balance"
            subtitle="Available balance"
            icon={<Wallet className="w-6 h-6 text-[#3E7B27]" />}
          />
          </Link>
          <QuickStatsCard
            title="This Month"
            subtitle="Services booked"
            icon={<Calendar className="w-6 h-6 text-[#3E7B27]" />}
          
          />
          <QuickStatsCard
            title="Total Spent"
            subtitle="Lifetime spending"
            icon={<Receipt className="w-6 h-6 text-[#3E7B27]" />}
            
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Pets Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#123524]">My Pets</h2>
                <button className="flex items-center space-x-2 bg-[#85A947] text-white px-4 py-2 rounded-lg hover:bg-[#3E7B27] transition-colors">
                  <PlusCircle className="w-5 h-5" />
                  <Link to="/customerpetform">
                      <span>Register New Pet</span>
                  </Link>
                </button>
              </div>
              
              <div className="space-y-4">
                {pets.map(pet => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#123524] mb-6">Book Services</h2>
                  <Link to='/customerservice' >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
                    {services.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
             
              
              </div>
               </Link>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#123524]">Recent Activities</h2>
                <button className="text-[#3E7B27] hover:text-[#123524] font-medium flex items-center space-x-1">
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-[#123524] mb-4">Upcoming Appointments</h3>
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <div key={appointment.id} className="p-4 bg-gradient-to-r from-[#EFE3C2] to-[#EFE3C2] bg-opacity-50 rounded-lg border-l-4 border-[#85A947]">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-[#123524]">{appointment.service}</h4>
                      <Clock className="w-4 h-4 text-[#3E7B27]" />
                    </div>
                    <p className="text-sm text-[#3E7B27]">{appointment.petName}</p>
                    <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                  </div>
                ))}
              </div>
              <Link to='/seeappointment'>

              </Link>
              <button className="w-full mt-4 bg-[#3E7B27] text-white py-2 rounded-lg hover:bg-[#123524] transition-colors">
                Appointments
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-[#123524] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-[#EFE3C2] bg-opacity-50 rounded-lg hover:bg-opacity-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Receipt className="w-5 h-5 text-[#3E7B27]" />
                    <span className="font-medium text-[#123524]">View Bills</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#85A947]" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-[#EFE3C2] bg-opacity-50 rounded-lg hover:bg-opacity-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <History className="w-5 h-5 text-[#3E7B27]" />
                    <span className="font-medium text-[#123524]">Visit History</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#85A947]" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-[#EFE3C2] bg-opacity-50 rounded-lg hover:bg-opacity-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-[#3E7B27]" />
                    <span className="font-medium text-[#123524]">Pet Attendance</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#85A947]" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-[#EFE3C2] bg-opacity-50 rounded-lg hover:bg-opacity-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Wallet className="w-5 h-5 text-[#3E7B27]" />
                    <span className="font-medium text-[#123524]">Add Money</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#85A947]" />
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-[#123524] to-[#3E7B27] rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Need Help?</h3>
              <p className="text-[#EFE3C2] text-sm mb-4">
                Our support team is here to help you 24/7
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@petcare.com</span>
                </div>
              </div>
              <Link to="/contactus">
                <button className="w-full mt-4 bg-[#85A947] text-white py-2 rounded-lg hover:bg-[#EFE3C2] hover:text-[#123524] transition-colors">
                Contact Support
              </button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;