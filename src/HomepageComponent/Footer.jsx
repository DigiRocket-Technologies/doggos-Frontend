import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, ChevronRight } from 'lucide-react';

const Footer = ({onServiceClick,onBookingClick}) => {

    const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  
  const importantLinks = [
    { 
      name: "Privacy Policy", 
      url: "/privacypolicy" 
    },
    { 
      name: "Terms and Conditions", 
      url: "/termsandcondition" 
    },
    { 
      name: "Refund Policy", 
      url: "/refundpolicy" 
    },
    { 
      name: "Shipping and delivery Policy", 
      url: "/shippingpolicy" 
    }
    
  ];

  const quickLinks = [
    { name: "About Us", url: "/aboutus" },
    { name: "Services", url: "/customerservice" },
    { name: "Booking", url: "/customerservice" },
    { name: "Contact Us", url: "/contactus" }
  ];


  const ourServices = [
    { name: "Boarding", url: "/customerservice" },
    { name: "Day School", url: "/customerservice" },
    { name: "Play School", url: "/customerservice" },
    { name: "Veterinary", url: "/customerservice" },
    { name: "Grooming", url: "/customerservice" },
  ];

  return (
    <footer className="bg-[#123524] text-[#EFE3C2] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Us Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#EFE3C2] border-b border-[#3E7B27] pb-2">About Us</h3>
            <div className="space-y-4">
              <p>
                Doggos Heaven is a premium pet resort providing the highest quality care for your furry family members.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com/doggosheaven" className="bg-[#3E7B27] text-[#EFE3C2] rounded-full p-2 hover:bg-[#85A947] transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://instagram.com/doggosheaven_petresort" className="bg-[#3E7B27] text-[#EFE3C2] rounded-full p-2 hover:bg-[#85A947] transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://twitter.com/doggosheaven" className="bg-[#3E7B27] text-[#EFE3C2] rounded-full p-2 hover:bg-[#85A947] transition-colors">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#EFE3C2] border-b border-[#3E7B27] pb-2">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                
{link.name === "Services" ? (
 <a
   onClick={onServiceClick}
   className="text-[#EFE3C2] hover:text-[#85A947] transition-colors flex items-center cursor-pointer"
 >
   {link.name}
 </a>
) : link.name === "Booking" ? (
 <a
   onClick={onBookingClick}
   className="text-[#EFE3C2] hover:text-[#85A947] transition-colors flex items-center cursor-pointer"
 >
   {link.name}
 </a>
) : (
 <a
   href={link.url}
   className="text-[#EFE3C2] hover:text-[#85A947] transition-colors flex items-center"
 >
   {link.name}
 </a>
)}


                </li>
              ))}
            </ul>
          </div>

          {/* Our Services Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#EFE3C2]  border-b border-[#3E7B27] pb-2">Our Services</h3>
            <ul className="space-y-3 cursor-pointer">
              {ourServices.map((service, index) => (
                <li key={index}>
                  <a  onClick={onBookingClick} className="text-[#EFE3C2] hover:text-[#85A947] transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#EFE3C2] border-b border-[#3E7B27] pb-2">Important Links</h3>
            <ul className="space-y-3">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-[#EFE3C2] hover:text-[#85A947] transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="mt-12 border-t border-[#3E7B27] pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 mt-1 text-[#85A947]" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-sm">Plot-11, Block J, Sector 83, Gurugram, HR, 122004</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="w-5 h-5 mr-2 mt-1 text-[#85A947]" />
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-sm">+91 8448-461071</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="w-5 h-5 mr-2 mt-1 text-[#85A947]" />
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-sm">care@doggosheaven.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="w-5 h-5 mr-2 mt-1 text-[#85A947]" />
              <div>
                <p className="font-semibold">Opening Hours</p>
                <p className="text-sm">Mon-Sun: 7:30 AM - 7:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Doggos Heaven. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;