import React from 'react';
import Footer from '../HomepageComponent/Footer';

const RefundPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow relative p-6 md:p-8 max-w-6xl mx-auto bg-[#EFE3C2] bg-opacity-30">
        {/* Paw Print Decorations */}
        <div className="absolute top-2 left-10 text-[#85A947] text-4xl opacity-40">🐾</div>
        <div className="absolute bottom-6 right-10 text-[#85A947] text-4xl opacity-40">🐾</div>
        <div className="absolute top-40 right-10 text-[#85A947] text-4xl opacity-40">🐾</div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-8 text-[#123524] relative inline-block">
            Refund Policy
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#3E7B27]"></div>
          </h1>

          <div className="p-4 md:p-6 text-base leading-relaxed space-y-4 bg-white rounded-lg shadow-md border border-[#85A947]">
            <p className="text-[#3E7B27]">
              This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that
              you have purchased through the Platform. Under this policy:
            </p>

            <p className="text-[#123524]">
              Cancellations will only be considered if the request is made 4 days after placing the order OR if the service
              you paid for is not availed. However, cancellation requests for products may not be entertained if the orders
              have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the
              process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the
              product at the doorstep.
            </p>

            <p className="text-[#123524]">
              DOGGOS HEAVEN PRIVATE LIMITED does not accept cancellation requests for perishable items like flowers,
              eatables, etc. However, the refund / replacement can be made if the user establishes that the quality of the
              product delivered is not good or if the bought service is not availed.
            </p>

            <p className="text-[#123524]">
              DOGGOS HEAVEN PRIVATE LIMITED does not accept cancellation requests for perishable items like toys, unsealed
              shampoos, etc.
            </p>

            <p className="text-[#123524]">
              In case of products, on receiving of damaged or defective items, please report to our customer service team.
              The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined
              the same at its own end. This should be reported within 4 days of receipt of products. In case you feel that
              the product received is not as shown on the site or as per your expectations, you must bring it to the notice
              of our customer service within 4 days of receiving the product. The customer service team after looking into
              your complaint will take an appropriate decision. The product must be returned in good condition and with all
              original documentation.
            </p>

            <p className="font-medium text-[#3E7B27]">
              To cover the costs associated with any product/ service the following refund policy applies:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-[#123524]">
              <li>
                <span className="font-medium text-[#3E7B27]">Refund below ₹20,000:</span> If a product or untilised service below ₹20,000
                is returned within 4 days of purchase, an amount of ₹5,000 will be deducted from the refund.
              </li>
              <li>
                <span className="font-medium text-[#3E7B27]">Refunds at ₹20,000 and Above:</span> If a product or untilised service at
                ₹20,000 or above is returned within 4 days of purchase, an amount of ₹7,500 will be deducted from the
                refund.
              </li>
            </ul>

            <p className="text-[#123524]">
              In case of complaints regarding the products that come with a warranty from the manufacturers, please refer
              the issue to them.
            </p>

            <p className="text-[#123524]">
              In case of any refunds approved by DOGGOS HEAVEN PRIVATE LIMITED, it will take 15 days for the refund to be
              processed to you.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;