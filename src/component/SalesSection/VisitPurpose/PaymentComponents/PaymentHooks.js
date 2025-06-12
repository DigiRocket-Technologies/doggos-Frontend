import { useState } from 'react';

export const usePaymentFlow = (paymentService, getTotalPrice) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPartialPaymentModal, setShowPartialPaymentModal] = useState(false);
  const [paymentOption, setPaymentOption] = useState(null);
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  const handlePartialPaymentConfirm = (advance, remaining, onConfirm) => {
    console.log("rem", remaining);
    setAdvanceAmount(advance);
    setRemainingAmount(remaining);
    setShowPartialPaymentModal(false);
    onConfirm(advance, remaining);
  };

  const handlePaymentOptionSelect = (option, formData, onAfterPayment, onPartialPayment, onAdvancePayment) => {
    setPaymentOption(option);
    setShowPaymentModal(false);

    console.log("formd",formData)
    
    if (!formData || !formData.petId || !formData.visitType) {
      console.error("Missing critical data in formData:", formData);
      alert("Missing required information. Please try again.");
      return;
    }
    
    if (option === "after") {
      console.log("Selected payment after service for pet:", formData.petId);
      
      const updatedData = {
        ...formData,
        details: {
          payment: {
            paymentType: "after",
            amount: 0, 
            isPaid: false,
            paidAt: null,
            remainingAmount: getTotalPrice(), 
            isRemainingPaid: false
          }
        }
      };
      
      onAfterPayment(updatedData, option);
    } else if (option === "partial") {
      setShowPartialPaymentModal(true);
      onPartialPayment && onPartialPayment();
    } else {
      onAdvancePayment && onAdvancePayment(option);
    }
  };

  const processPaymentFlow = (paymentType, amount, orderData, customData, onPaymentSuccess, onPaymentError) => {
    setIsLoading(true);
    
    const handleSuccess = (response) => {
      onPaymentSuccess(response);
      setIsLoading(false);
    };
    
    const handleError = (error) => {
      onPaymentError(error);
      setIsLoading(false);
    };
    
    paymentService.initializeRazorpay(paymentType, amount, handleSuccess, handleError, orderData);
  };

  return {
    isLoading,
    setIsLoading,
    showPaymentModal,
    setShowPaymentModal,
    showPartialPaymentModal,
    setShowPartialPaymentModal,
    paymentOption,
    advanceAmount,
    remainingAmount,
    handlePartialPaymentConfirm,
    handlePaymentOptionSelect,
    processPaymentFlow
  };
};