import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CustomerSignupPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "customer" // Fixed role for customer signup
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Account created successfully! Please login to continue.");
        navigate("/login");
      } else {
        alert(data.message || "Failed to create account");
        if (data.errors) {
          setErrors(data.errors);
        }
      }

    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE3C2] to-white">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left panel - Welcome section */}
        <div className="hidden md:flex lg:w-2/5 xl:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#123524] opacity-90 z-10"></div>
          <img
            src="/images/g1.jpeg"
            alt="Happy pets"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          
          <div className="relative z-20 flex flex-col items-center justify-center text-white p-4 md:p-6 lg:p-8 xl:p-12">
            <div className="text-center max-w-lg">
              <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-4 text-[#EFE3C2]">
                Join Our Pet Family!
              </div>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#EFE3C2] mb-4 md:mb-6 lg:mb-8">
                Create your account to access premium pet care services
              </p>
              
              <div className="space-y-2 md:space-y-3 lg:space-y-4 text-left">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#85A947] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm md:text-lg">🐾</span>
                  </div>
                  <span className="text-[#EFE3C2] text-sm md:text-base">Register multiple pets</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#85A947] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm md:text-lg">✂️</span>
                  </div>
                  <span className="text-[#EFE3C2] text-sm md:text-base">Book grooming services</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#85A947] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm md:text-lg">🏠</span>
                  </div>
                  <span className="text-[#EFE3C2] text-sm md:text-base">Pet hostel & day school</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#85A947] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm md:text-lg">💳</span>
                  </div>
                  <span className="text-[#EFE3C2] text-sm md:text-base">Digital wallet & subscriptions</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 right-4 md:right-6 lg:right-8 text-[#85A947] text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              🐕
            </div>
          </div>
        </div>

        {/* Right panel - Signup form */}
        <div className="flex-1 lg:w-3/5 xl:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-sm sm:max-w-md">
            {/* Mobile/Tablet header - visible on smaller screens */}
            <div className="md:hidden text-center mb-4 sm:mb-6">
              <div className="text-xl sm:text-2xl font-bold text-[#123524] mb-2">
                Join Our Pet Family!
              </div>
              <p className="text-sm sm:text-base text-[#3E7B27]">
                Create your customer account
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-[#85A947] border-opacity-30">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#123524]">
                  Customer Signup
                </h2>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#EFE3C2] rounded-full flex items-center justify-center">
                  <span className="text-lg sm:text-xl">🐾</span>
                </div>
              </div>

              {/* Role indicator */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-[#85A947] to-[#3E7B27] rounded-lg text-center">
                <p className="text-white font-medium text-sm sm:text-base">
                  Signing up as Pet Owner
                </p>
                <p className="text-[#EFE3C2] text-xs sm:text-sm mt-1">
                  Access all customer features
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Full Name Field */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#3E7B27] mb-1 sm:mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#85A947]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 sm:pl-12 pr-3 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85A947] bg-[#EFE3C2] bg-opacity-30 text-sm sm:text-base transition-all ${
                        errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fullName}</p>
                  )}
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
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 sm:pl-12 pr-3 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85A947] bg-[#EFE3C2] bg-opacity-30 text-sm sm:text-base transition-all ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                  )}
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
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85A947] bg-[#EFE3C2] bg-opacity-30 text-sm sm:text-base transition-all ${
                        errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#85A947]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-lg transition-all duration-300 shadow-md flex items-center justify-center space-x-2 ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#123524] hover:bg-[#3E7B27] hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Login link */}
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-[#3E7B27]">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="font-medium text-[#123524] hover:text-[#85A947] transition-colors underline-offset-2 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}