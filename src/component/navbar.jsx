import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
import { Menu, LogOut, LayoutDashboard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout} from "../store/slices/authSlice";

const Navbar = () => {
  const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
 
  const dispatch=useDispatch();
 
  const {isAuthenticated}=useSelector((state)=>state.auth)
 
  const handleLogout=()=>{
    dispatch(logout())
  }
 
  return (
    <nav className="border w-screen text-[#EFE3C2] bg-[#3E7B27]">
      <div className="w-screen bg-[#123524] mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 ">
            <Link to="/" className="text-2xl font-bold">
            <img src="/images/doggoswhite.png" alt="Logo" className="w-14 h-14" />
            </Link>
          </div>
 
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-3">
            <Link
              to="/"
              className="text-[#EFE3C2] px-3 py-2 rounded-lg shadow-lg focus:border-b-[2px] focus:border-[#85A947] font-bold transition duration-300 ease-in-out"
            >
              Home
            </Link>
            
 
            {isAuthenticated ? (
              <>
              <Link
                  to="/deboard"
                  className="text-[#EFE3C2] px-3 py-2 rounded-lg shadow-lg focus:border-b-[2px] focus:border-[#85A947] font-bold transition duration-300 ease-in-out"
                >
                  Deboard
                </Link>
                <Link
                  to="/history"
                  className="text-[#EFE3C2] px-3 py-2 rounded-lg shadow-lg focus:border-b-[2px] focus:border-[#85A947] font-bold transition duration-300 ease-in-out"
                >
                  Pet Master
                </Link>
                <Link
                  to="/inventoryList"
                  className="text-[#EFE3C2] px-3 py-2 rounded-lg shadow-lg focus:border-b-[2px] focus:border-[#85A947] font-bold transition duration-300 ease-in-out"
                >
                  Inventory
                </Link>
                <Link
                  to="/saleshistory"
                  className="text-[#EFE3C2] px-3 py-2 rounded-lg shadow-lg focus:border-b-[2px] focus:border-[#85A947] font-bold transition duration-300 ease-in-out"
                >
                  Sales
                </Link>
                <Link
                  to="/reminders"
                  className="text-[#EFE3C2] px-3 py-2 rounded-lg shadow-lg focus:border-b-[2px] focus:border-[#85A947] font-bold transition duration-300 ease-in-out"
                >
                  Reminders
                </Link>
               
                <div className="relative inline-block text-left">
                  <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded-full bg-[#85A947] hover:bg-[#EFE3C2]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-[#123524]"
                      viewBox="0 0 448 512"
                    >
                      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                    </svg>
                  </button>
                  {open && (
                    <div className="absolute z-40 right-0 mt-2 w-48 bg-[#EFE3C2] border border-[#3E7B27] rounded-lg shadow-lg" onClick={() => setOpen(!open)}>
                        <button onClick={()=>navigate("/dashboard")} className="flex items-center w-full px-4 py-2 text-[#123524] hover:bg-[#85A947]">
                          <LayoutDashboard className="w-5 h-5 mr-2" /> Dashboard
                        </button>
                      <button className="flex items-center w-full px-4 py-2 text-[#123524] hover:bg-[#85A947]" onClick={handleLogout}>
                        <LogOut className="w-5 h-5 mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
            
            
             <Link
                  to="/login"
                  className="text-[#EFE3C2] px-3 py-2 rounded-lg shadow-lg focus:border-b-[2px] focus:border-[#85A947] font-bold transition duration-300 ease-in-out"
                >
                  Login
                </Link>
              </>
            )}
          </div>
 
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#EFE3C2] focus:outline-none focus:ring-2 focus:ring-[#EFE3C2]"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
 
      {/* Mobile Menu */}
 
      {isOpen && (
        <div className="md:hidden" onClick={toggleMenu}>
        {isAuthenticated ? (<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#85A947]"
            >
              Home
            </Link>
            <Link
              to="/history"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#85A947]"
            >
              Pet Master
            </Link>
            <Link
              to="/inventoryList"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#85A947]"
            >
              Inventory
            </Link>
            <Link
              to="/petByDate"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#85A947]"
            >
              Sales
            </Link>
            <Link
              to="/reminders"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#85A947]"
            >
              Reminders
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#85A947]"
            >
              Dashboard
            </Link>
            <button className="flex items-center w-full px-4 py-2 text-[#EFE3C2] hover:bg-[#85A947]" onClick={handleLogout}>
                    <LogOut className="w-5 h-5 mr-2" /> Logout
             </button>
          </div>)
          :
          (<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#85A947]"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#85A947]"
            >
              Login
            </Link>
          </div>
          )}
         
        </div>
      )}
    </nav>
  );
};
 
export default Navbar;