import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

export default function UserLoginPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // Add role to form data
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate role selection
    if (!formData.role) {
      alert("Please select your role");
      return;
    }
    
    dispatch(login(formData)).then((data) => {
      if (data?.payload?.success) {
        localStorage.setItem("authtoken", data?.payload?.token || "");
        localStorage.setItem("userRole", data?.payload?.user?.role || "");
        localStorage.setItem("userId", data?.payload?.user?.id || "");
        
        // Store customer_id if user is customer
        if (data?.payload?.user?.customer_id) {
          localStorage.setItem("customerId", data?.payload?.user?.customer_id);
        }
        
        setFormData({
          email: "",
          password: "",
          role: "",
        });
        
        // You might want to redirect based on role here
        // if (data?.payload?.user?.role === 'staff') {
        //   window.location.href = '/staff-dashboard';
        // } else if (data?.payload?.user?.role === 'customer') {
        //   window.location.href = '/customer-dashboard';
        // }
      } else {
        alert(data?.payload?.message);
      }
    });
  };

  const roleOptions = [
    { value: 'staff', label: 'Staff Member', icon: '👨‍⚕️' },
    { value: 'customer', label: 'Pet Owner', icon: '🐾' }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE3C2] to-white">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left panel - Welcome section */}
        <div className="hidden md:flex lg:w-2/5 xl:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#123524] opacity-90 z-10"></div>
          <img
            src="/images/g1.jpeg"
            alt="Happy dogs"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          
          <div className="relative z-20 flex flex-col items-center justify-center text-white p-4 md:p-6 lg:p-8 xl:p-12">
            <div className="text-center max-w-lg">
              <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-4 text-[#EFE3C2]">
                Welcome Back!
              </div>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#EFE3C2] mb-4 md:mb-6 lg:mb-8">
                Login to manage your pet appointments and services
              </p>
              
              <div className="space-y-2 md:space-y-3 lg:space-y-4 text-left">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#85A947] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm md:text-lg">📅</span>
                  </div>
                  <span className="text-[#EFE3C2] text-sm md:text-base">Manage appointments</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#85A947] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm md:text-lg">🐾</span>
                  </div>
                  <span className="text-[#EFE3C2] text-sm md:text-base">Track pet services</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#85A947] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm md:text-lg">💳</span>
                  </div>
                  <span className="text-[#EFE3C2] text-sm md:text-base">Manage payments</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#85A947] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm md:text-lg">📱</span>
                  </div>
                  <span className="text-[#EFE3C2] text-sm md:text-base">Access digital services</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 right-4 md:right-6 lg:right-8 text-[#85A947] text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              🐾
            </div>
          </div>
        </div>
        
        {/* Right panel - Login form */}
        <div className="flex-1 lg:w-3/5 xl:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-sm sm:max-w-md">
            {/* Mobile/Tablet header - visible on smaller screens */}
            <div className="md:hidden text-center mb-4 sm:mb-6">
              <div className="text-xl sm:text-2xl font-bold text-[#123524] mb-2">
                Welcome Back!
              </div>
              <p className="text-sm sm:text-base text-[#3E7B27]">
                Login to your account
              </p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-[#85A947] border-opacity-30">
              {/* Header */}
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#123524]">
                  Login
                </h2>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#EFE3C2] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#3E7B27]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
              
              <div className="space-y-4 sm:space-y-5">
                {/* Role Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#3E7B27] mb-2 sm:mb-3">
                    Login As
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {roleOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex flex-col items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                          formData.role === option.value
                            ? 'border-[#85A947] bg-[#EFE3C2] bg-opacity-50 text-[#123524] scale-[1.02]'
                            : 'border-gray-200 hover:border-[#85A947] hover:bg-[#EFE3C2] hover:bg-opacity-30'
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={option.value}
                          checked={formData.role === option.value}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                          className="sr-only"
                        />
                        <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{option.icon}</div>
                        <div className="text-xs sm:text-sm font-medium text-center">{option.label}</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#3E7B27] mb-1 sm:mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#85A947]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 sm:pl-12 pr-3 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85A947] bg-[#EFE3C2] bg-opacity-30 text-sm sm:text-base border-gray-300 transition-all"
                      placeholder="Enter your email"
                      value={formData?.email || ""}
                      name="email"
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#3E7B27] mb-1 sm:mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#85A947]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      className="w-full pl-10 sm:pl-12 pr-3 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85A947] bg-[#EFE3C2] bg-opacity-30 text-sm sm:text-base border-gray-300 transition-all"
                      placeholder="Enter your password"
                      name="password"
                      required
                      value={formData?.password || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  disabled={!formData.role || !formData.email || !formData.password}
                  className={`w-full px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-lg transition-all duration-300 shadow-md flex items-center justify-center space-x-2 ${
                    !formData.role || !formData.email || !formData.password
                      ? 'bg-gray-400 cursor-not-allowed opacity-60'
                      : 'bg-[#123524] hover:bg-[#3E7B27] hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  <span>
                    Login as {formData.role ? roleOptions.find(r => r.value === formData.role)?.label : 'User'}
                  </span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              {/* Sign up link */}
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-[#3E7B27]">
                  Don't have an account?{' '}
                  <a 
                    href="/signup" 
                    className="font-medium text-[#123524] hover:text-[#85A947] transition-colors underline-offset-2 hover:underline"
                  >
                    Sign up as Customer
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}