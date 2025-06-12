import React from 'react';
import { MapPin, Clock, Phone, Mail, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EFE3C2' }}>
      {/* Header Section */}
      <div className="text-white py-16 px-6" style={{ backgroundColor: '#123524' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Important information about product collection at our resort
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Policy Notice */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-8" style={{ borderColor: '#3E7B27' }}>
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-full" style={{ backgroundColor: '#85A947' }}>
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#123524' }}>
                Self-Collection Policy
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Please note that our resort <strong>does not provide shipping or delivery services</strong>. 
                All purchased items must be collected directly from our resort premises by the customer.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Collection Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#3E7B27' }}>
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold" style={{ color: '#123524' }}>
                Collection Details
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 mt-1 text-green-600" />
                <div>
                  <h4 className="font-semibold text-gray-800">Location</h4>
                  <p className="text-gray-600">Resort Reception Desk</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 mt-1 text-green-600" />
                <div>
                  <h4 className="font-semibold text-gray-800">Required</h4>
                  <p className="text-gray-600">Valid ID and order confirmation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 mt-1 text-green-600" />
                <div>
                  <h4 className="font-semibold text-gray-800">Processing Time</h4>
                  <p className="text-gray-600">Items ready within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Collection Hours */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#85A947' }}>
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold" style={{ color: '#123524' }}>
                Collection Hours
              </h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Monday - Friday</span>
                <span className="text-gray-600">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Saturday</span>
                <span className="text-gray-600">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Sunday</span>
                <span className="text-gray-600">10:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-700">Public Holidays</span>
                <span className="text-gray-600">Limited Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Guidelines */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-full mr-4" style={{ backgroundColor: '#3E7B27' }}>
              <Info className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-semibold" style={{ color: '#123524' }}>
              Important Guidelines
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Before Collection:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#85A947' }}></span>
                  <span>Wait for order confirmation email/SMS</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#85A947' }}></span>
                  <span>Bring valid photo identification</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#85A947' }}></span>
                  <span>Have order number/receipt ready</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Storage Policy:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#85A947' }}></span>
                  <span>Items held for maximum 30 days</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#85A947' }}></span>
                  <span>Perishable items: 7 days maximum</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#85A947' }}></span>
                  <span>Uncollected items may be disposed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-semibold mb-6 text-center" style={{ color: '#123524' }}>
            Need Assistance?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 rounded-full" style={{ backgroundColor: '#85A947' }}>
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Call Us</h4>
                <p className="text-gray-600">+91 8448461071</p>
                <p className="text-sm text-gray-500">Available during collection hours</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 rounded-full" style={{ backgroundColor: '#85A947' }}>
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Email Us</h4>
                <p className="text-gray-600">care@doggosheaven.com</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="text-center mt-8 p-6 rounded-lg" style={{ backgroundColor: '#3E7B27' }}>
          <p className="text-white text-lg">
            Thank you for choosing our resort. We appreciate your understanding of our collection policy.
          </p>
        </div>
      </div>
    </div>
  );
}