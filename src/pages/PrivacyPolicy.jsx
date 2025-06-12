import React from 'react';
import Footer from '../HomepageComponent/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow relative p-6 md:p-8 max-w-6xl mx-auto bg-[#EFE3C2] bg-opacity-30 overflow-auto">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 text-[#85A947] text-4xl opacity-30">🐾</div>
        <div className="absolute bottom-8 right-10 text-[#85A947] text-4xl opacity-30">🐾</div>
        <div className="absolute top-1/2 right-5 text-[#85A947] text-4xl opacity-30">🐾</div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-8 text-[#123524] relative inline-block">
            Privacy Policy
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#3E7B27]"></div>
          </h1>

          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-[#85A947]">
            <p className="mb-6 text-[#3E7B27] text-sm md:text-base">
              This Privacy Policy sets out our commitment to protecting the privacy of personal information provided to us,
              or otherwise collected by us, offline or online, including through our website ("Site") in accordance with all
              applicable privacy laws and regulations. In this Privacy Policy "we", "us" or "our" means Doggos Heaven.
            </p>

            <ol className="list-decimal ml-6 space-y-6 md:space-y-8 text-sm md:text-base">
              <li>
                <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#123524]">Personal information</h2>
                <p className="mb-2 text-[#3E7B27]">
                  The types of personal information we may collect about you either directly from you or from third parties
                  includes:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-1 text-[#123524]">
                  <li>Your name</li>
                  <li>
                    Your contact details, including email address, mailing address, street address and/or telephone number
                  </li>
                  <li>Your age and/or date of birth</li>
                  <li>Your credit card details</li>
                  <li>Your car registration details</li>
                  <li>Your driver's licence number or 18+ card</li>
                  <li>Your demographic information, such as postcode</li>
                  <li>Your preferences and/or opinions</li>
                  <li>
                    Details of products and services we have provided to you and/or that you have enquired about, and our
                    response to you
                  </li>
                  <li>
                    Additional personal information that you provide to us, directly or indirectly, and/or accounts from
                    which you permit us to collect information; and any other personal information requested by us and/or
                    provided by you or a third party
                  </li>
                </ul>
              </li>

              <li>
                <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#123524]">Collection and use of personal information</h2>
                <ul className="list-disc ml-6 mt-2 space-y-1 text-[#3E7B27]">
                  <li>To contact and communicate with you</li>
                  <li>
                    To enable us to perform the contracted services, associated applications and associated technical
                    platforms
                  </li>
                  <li>To provide to regulators or government authorities</li>
                  <li>For internal record keeping and administrative purposes</li>
                  <li>
                    For analytics, market research and business development, including to operate and improve our business,
                    associated applications and associated platforms
                  </li>
                  <li>To comply with our legal obligations and resolve any disputes that we may have</li>
                </ul>
              </li>

              <li>
                <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#123524]">
                  Disclosure of personal information to third parties
                </h2>
                <ul className="list-disc ml-6 mt-2 space-y-1 text-[#123524]">
                  <li>
                    Third party service providers (e.g., IT service providers, data storage, web-hosting, server providers,
                    marketing or advertising providers, professional advisors, payment systems operators)
                  </li>
                  <li>Our employees, contractors and/or related entities</li>
                  <li>Our existing or potential agents or business partners</li>
                  <li>Any party to whom our business or assets may be transferred</li>
                  <li>Courts, tribunals and regulatory authorities in the event of non-payment</li>
                  <li>Law enforcement and regulatory authorities as required by law</li>
                  <li>
                    Third parties assisting in providing information, products, or services (may include international data
                    storage)
                  </li>
                  <li>Third parties that collect and process data (may include international data processors)</li>
                </ul>
              </li>

              <li>
                <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#123524]">
                  Your rights and controlling your personal information
                </h2>
                <ul className="list-disc ml-6 mt-2 space-y-1 text-[#3E7B27]">
                  <li>
                    <span className="font-medium">Choice and consent:</span> You provide us with personal information
                    knowingly and voluntarily
                  </li>
                  <li>
                    <span className="font-medium">Information from third parties:</span> If we receive personal information
                    about you from a third party, we will protect it as set out in this Privacy Policy
                  </li>
                  <li>
                    <span className="font-medium">Restrict:</span> You may choose to restrict the collection or use of your
                    personal information
                  </li>
                  <li>
                    <span className="font-medium">Access:</span> You may request details of personal information held about
                    you
                  </li>
                  <li>
                    <span className="font-medium">Correction:</span> You may request to correct any inaccurate or outdated
                    information
                  </li>
                  <li>
                    <span className="font-medium">Complaints:</span> You may submit a complaint regarding breaches of the
                    Australian Privacy Principles
                  </li>
                </ul>
              </li>

              <li>
                <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#123524]">Contact details</h2>
                <ul className="list-disc ml-6 mt-2 space-y-1 text-[#3E7B27]">
                  <li>Doggos Heaven</li>
                  <li>Call: +91 8448461071</li>
                  <li>Email: care@doggosheaven.com</li>
                  <li>Last update: May 2025</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;