import React, { useState } from "react";
import { addShoppingVisit } from "../../../store/slices/visitSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PaymentService } from "./PaymentComponents/PaymentService";
import { usePaymentFlow } from "./PaymentComponents/PaymentHooks";

const Shop = ({ _id, visitPurposeDetails }) => {
  const [items, setItems] = useState([{ name: "", price: 0 }]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY;

  // Initialize payment service
  const paymentService = new PaymentService(backendURL, razorpayKeyId);

  const getTotalPrice = () => {
    return totalPrice;
  };

  // Use payment hook
  const { isLoading, setIsLoading, processPaymentFlow } = usePaymentFlow(
    paymentService,
    getTotalPrice
  );

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === "price" ? Number(value) : value;
    setItems(newItems);
    calculateTotal(newItems);
  };

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + (Number(item.price) || 0),
      0
    );
    setTotalPrice(total);
  };

  const addItem = () => {
    setItems([...items, { name: "", price: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    calculateTotal(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting shop visit with pet ID:", _id);
    console.log("Visit purpose details ID:", visitPurposeDetails._id);

    if (!_id || _id.trim() === "") {
      console.error("Missing pet ID");
      alert("A pet must be selected. Please select a pet before proceeding.");
      return;
    }

    if (
      !visitPurposeDetails ||
      !visitPurposeDetails._id ||
      visitPurposeDetails._id.trim() === ""
    ) {
      console.error("Missing visit type ID");
      alert("Visit type is missing. Please try again.");
      return;
    }

    const formattedData = {
      items: items,
      petId: _id,
      visitType: visitPurposeDetails._id,
      details: {
        totalCalculatedPrice: totalPrice,
      },
    };

    console.log("Form data prepared:", formattedData);
    setFormData(formattedData);

    if (totalPrice === 0) {
      processShopVisitSave(formattedData);
    } else {
      initializeRazorpay(formattedData);
    }
  };

  const initializeRazorpay = (data) => {
    const amount = totalPrice;

    const orderData = {
      receipt: `shop_${_id.slice(-15)}`,
      notes: {
        petId: _id,
        visitType: visitPurposeDetails._id,
        paymentType: "advance",
      },
    };

    const customData = {
      businessName: "Pet Shop Service",
      description: "Full Payment for Shop Items",
      themeColor: "#3399cc",
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
    };

    const onPaymentSuccess = (response) => {
      const updatedData = {
        ...data,
        details: {
          ...data.details,
          payment: {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            paymentType: "advance",
            amount: amount,
            paidAt: new Date().toISOString(),
            isPaid: true,
            remainingAmount: 0,
            isRemainingPaid: true,
          },
        },
      };

      handlePaymentSuccess(updatedData, response);
    };

    const onPaymentError = (error) => {
      alert(error);
    };

    processPaymentFlow(
      "advance",
      amount,
      orderData,
      customData,
      onPaymentSuccess,
      onPaymentError
    );
  };

  const handlePaymentSuccess = (updatedData, response) => {
    const paymentData = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
      visitData: updatedData,
    };

    const onVerifySuccess = (data) => {
      console.log(data);
      // Format data for shop visit dispatch
      const shopData = {
        items: updatedData.items,
        petId: updatedData.petId,
        visitType: updatedData.visitType,
        details: updatedData.details,
      };

      dispatch(addShoppingVisit(shopData))
        .then((result) => {
          if (result?.payload?.success) {
            alert("Payment successful and visit saved!");
            navigate("/dashboard");
          } else {
            alert(result?.payload?.message || "Failed to save shop visit");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error saving shop visit:", error);
          alert("An error occurred: " + error.message);
          setIsLoading(false);
        });
    };

    const onVerifyError = (error) => {
      alert(error);
      setIsLoading(false);
    };

    paymentService.verifyPayment(paymentData, onVerifySuccess, onVerifyError);
  };

  const processShopVisitSave = (data) => {
    setIsLoading(true);

    console.log("Processing shop visit save with data:", data);

    const shopData = {
      items: data.items,
      petId: data.petId,
      visitType: data.visitType,
      details: {
        ...data.details,
        payment: {
          paymentType: "after",
          isPaid: false,
          amount: 0,
          paidAt: null,
          remainingAmount: totalPrice,
          isRemainingPaid: false,
        },
      },
    };

    dispatch(addShoppingVisit(shopData))
      .then((result) => {
        if (result?.payload?.success) {
          alert("Visit saved successfully!");
          navigate("/dashboard");
        } else {
          alert(result?.payload?.message || "Failed to save shop visit");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error saving shop visit:", error);
        alert("An error occurred: " + error.message);
        setIsLoading(false);
      });
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
  //     </div>
  //   );
  // }

  // return (
  //   <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-md">
  //     <form onSubmit={handleSubmit}>
  //       {items.map((item, index) => (
  //         <div
  //           key={index}
  //           className="flex items-center space-x-3 mb-3 border p-3 rounded-md bg-gray-50"
  //         >
  //           <input
  //             type="text"
  //             value={item.name}
  //             onChange={(e) => handleChange(index, "name", e.target.value)}
  //             placeholder="Item Name"
  //             className="p-2 border rounded-md flex-1 focus:ring-2 focus:ring-blue-400"
  //           />
  //           <input
  //             type="number"
  //             value={item.price}
  //             onChange={(e) => handleChange(index, "price", e.target.value)}
  //             placeholder="Price"
  //             className="p-2 border rounded-md w-24 focus:ring-2 focus:ring-blue-400"
  //           />
  //           <button
  //             type="button"
  //             onClick={() => removeItem(index)}
  //             className="text-red-600 hover:text-red-800"
  //           >
  //             ✖
  //           </button>
  //         </div>
  //       ))}
  //       <button
  //         type="button"
  //         onClick={addItem}
  //         className="w-full text-center py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
  //       >
  //         + Add Item
  //       </button>

  //       <h1 className="text-lg font-bold text-gray-700 mt-4">
  //         Total Price: ₹{totalPrice}
  //       </h1>
  //       <button
  //         type="submit"
  //         disabled={isLoading}
  //         className="w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
  //       >
  //         {totalPrice === 0 ? "Submit" : "Proceed to Payment"}
  //       </button>
  //     </form>
  //   </div>
  // );
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EFE3C2] to-[#f5f0e8] flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#85A947]/30 border-t-[#3E7B27]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-[#123524] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE3C2] to-[#f5f0e8] p-6">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl border border-[#85A947]/30 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#123524] to-[#3E7B27] p-6">
          <h2 className="text-2xl font-bold text-white text-center tracking-wide">
            🛒 Item Management
          </h2>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Items List */}
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="group relative flex items-center space-x-4 p-4 bg-gradient-to-r from-[#EFE3C2]/50 to-white border-2 border-[#85A947]/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:border-[#3E7B27]/50"
                >
                  {/* Item Number Badge */}
                  <div className="flex-shrink-0">
                    <span className="w-8 h-8 bg-[#85A947] text-white rounded-full inline-flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>

                  {/* Item Name Input */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                      placeholder="🏷️ Item Name"
                      className="w-full p-3 border-2 border-[#85A947]/40 rounded-xl bg-white focus:ring-2 focus:ring-[#3E7B27] focus:border-[#3E7B27] focus:outline-none transition-all duration-200 text-[#123524] placeholder-[#85A947] font-medium"
                    />
                  </div>

                  {/* Price Input */}
                  <div className="w-32">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3E7B27] font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleChange(index, "price", e.target.value)
                        }
                        placeholder="0"
                        className="w-full pl-8 pr-3 py-3 border-2 border-[#85A947]/40 rounded-xl bg-white focus:ring-2 focus:ring-[#3E7B27] focus:border-[#3E7B27] focus:outline-none transition-all duration-200 text-[#123524] font-medium"
                      />
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="flex-shrink-0 w-10 h-10 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white rounded-xl transition-all duration-200 flex items-center justify-center group-hover:scale-110 font-bold"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>

            {/* Add Item Button */}
            <button
              type="button"
              onClick={addItem}
              className="w-full py-4 bg-gradient-to-r from-[#85A947] to-[#3E7B27] hover:from-[#3E7B27] hover:to-[#123524] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 active:scale-95"
            >
              ➕ Add New Item
            </button>

            {/* Total Price Display */}
            <div className="bg-gradient-to-r from-[#123524]/10 to-[#3E7B27]/10 p-6 rounded-xl border-2 border-[#85A947]/30">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#123524]">
                  Total Amount:
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-[#3E7B27]">
                    ₹{totalPrice}
                  </span>
                  {totalPrice > 0 && (
                    <span className="text-sm bg-[#85A947] text-white px-3 py-1 rounded-full">
                      {items.filter((item) => item.price > 0).length} items
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 ${
                totalPrice === 0
                  ? "bg-gradient-to-r from-[#123524] to-[#3E7B27] hover:from-[#3E7B27] hover:to-[#85A947] text-white hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
                  : "bg-gradient-to-r from-[#3E7B27] to-[#85A947] hover:from-[#85A947] hover:to-[#3E7B27] text-white hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>{totalPrice === 0 ? "📋 Submit" : "💳 Proceed to Payment"}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shop;
