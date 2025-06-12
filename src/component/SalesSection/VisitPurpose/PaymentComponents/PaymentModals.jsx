// PaymentModals.jsx - Reusable payment modal components
import React, { useState } from "react";

export const PaymentOptionModal = ({ isOpen, onClose, onSelectOption, totalPrice }) => {
  if (!isOpen) return null;

  const paymentOptions = [
    { id: "advance", label: "Advance Payment", description: "Pay the full amount now" },
    { id: "partial", label: "Partial Payment", description: "Pay a portion now and rest later" },
    { id: "after", label: "Payment After Service", description: "Pay after the service is completed" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Select Payment Option</h2>
        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <div 
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className="border rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition"
            >
              <h3 className="font-medium text-lg">{option.label}</h3>
              <p className="text-gray-600 text-sm">{option.description}</p>
              {option.id === "advance" && (
                <p className="text-sm font-medium mt-1">
                  Amount: ₹{totalPrice}
                </p>
              )}
            </div>
          ))}
        </div>
        <button 
          onClick={onClose}
          className="mt-4 w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export const PartialPaymentModal = ({ isOpen, onClose, onConfirm, totalPrice }) => {
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true);

  React.useEffect(() => {
    if (isOpen) {
      const defaultAdvance = Math.round(totalPrice * 0.5);
      setAdvanceAmount(defaultAdvance);
      setRemainingAmount(totalPrice - defaultAdvance);
      setError("");
      setIsValid(true);
    }
  }, [isOpen, totalPrice]);

  const handleAdvanceChange = (e) => {
    let value = parseInt(e.target.value) || 0;
    console.log("val",value);
    
    const minPayment = Math.round(totalPrice * 0.1);
    const maxPayment = Math.round(totalPrice * 0.9);
    
    if (value < minPayment) {
      setError(`Advance payment must be at least ₹${minPayment} (10% of total)`);
      setIsValid(false);
    } else if (value > maxPayment) {
      setError(`Advance payment cannot exceed ₹${maxPayment} (90% of total)`);
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
    
    const clampedValue = Math.max(Math.min(value, totalPrice), 0);
    
    setAdvanceAmount(value); 
    setRemainingAmount(totalPrice - clampedValue); 
  };

  const handleSubmit = () => {
    if (isValid) {
      const minPayment = Math.round(totalPrice * 0.1);
      const maxPayment = Math.round(totalPrice * 0.9);
      
      const finalAdvance = Math.max(Math.min(advanceAmount, maxPayment), minPayment);
      const finalRemaining = totalPrice - finalAdvance;
      
      console.log("Partial payment confirmed:", {
        advance: finalAdvance,
        remaining: finalRemaining,
        total: totalPrice
      });
      
      onConfirm(finalAdvance, finalRemaining);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Customize Partial Payment</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Total Price: ₹{totalPrice}</label>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pay Now:</label>
            <input
              type="number"
              value={advanceAmount}
              onChange={handleAdvanceChange}
              className={`w-full p-2 border rounded-lg ${!isValid ? 'border-red-500' : ''}`}
              min={Math.round(totalPrice * 0.1)}
              max={Math.round(totalPrice * 0.9)}
            />
            <p className="text-xs text-gray-500 mt-1">
              (Should be between 10% to 90% of total price)
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pay After Service:</label>
            <div className="p-2 bg-gray-100 rounded-lg font-medium">₹{remainingAmount}</div>
          </div>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!isValid}
            className={`flex-1 py-2 ${!isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg transition`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};