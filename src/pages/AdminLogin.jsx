import React from 'react';

export default function AdminLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EFE3C2]">
      {/* Decorative paw prints */}
      <div className="absolute top-10 left-10 text-[#85A947] text-6xl opacity-30">🐾</div>
      <div className="absolute bottom-10 right-10 text-[#85A947] text-6xl opacity-30">🐾</div>
      
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-3xl shadow-2xl relative border-2 border-[#3E7B27]">
        {/* Top decorative element */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#123524] rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-[#123524] mt-4">Admin Portal</h2>
        
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#3E7B27]">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-[#85A947]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 bg-[#EFE3C2] bg-opacity-30 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85A947]"
                placeholder="admin@doggosheaven.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#3E7B27]">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-[#85A947]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 bg-[#EFE3C2] bg-opacity-30 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85A947]"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-[#3E7B27]">
              <input type="checkbox" className="mr-2 h-4 w-4 text-[#85A947] focus:ring-[#85A947]" /> 
              Remember me
            </label>
            <a href="#" className="text-sm text-[#123524] hover:text-[#3E7B27] font-semibold">Forgot password?</a>
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-[#123524] rounded-lg hover:bg-[#3E7B27] transition-colors duration-300 shadow-lg"
          >
            Secure Login
          </button>
        </form>
        
        {/* Bottom decorative element */}
        <div className="pt-4 border-t border-[#85A947]">
          <p className="text-sm text-center text-[#3E7B27] font-medium">
            Admin Access Only
          </p>
        </div>
      </div>
    </div>
  );
}