import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import {
  buySubscription,
  getAllSubscription,
} from "../../../store/slices/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadRazorpayScript } from "../../../utils/loadRazorpayScript";

import { PaymentService } from "./PaymentComponents/PaymentService";
import { usePaymentFlow } from "./PaymentComponents/PaymentHooks";

const BuySubscription = ({ _id, visitPurposeDetails }) => {
  const { subscriptions } = useSelector((state) => state.subscription);
  const { petDetails } = useSelector((state) => state.pets);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      planId: "",
    },
  });

  const planId = watch("planId");

  // Initialize payment service
  const paymentService = new PaymentService(backendURL, razorpayKeyId);

  const getTotalPrice = () => {
    return totalPrice(planId);
  };

  // Use payment hook
  const { isLoading, setIsLoading, processPaymentFlow } = usePaymentFlow(
    paymentService,
    getTotalPrice
  );

  const onSubmit = (data) => {
    console.log("Submitting subscription with pet ID:", _id);
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

    if (!data.planId || data.planId.trim() === "") {
      alert("Please select a subscription plan.");
      return;
    }

    const formattedData = {
      petId: _id,
      visitType: visitPurposeDetails._id,
      planId: data.planId,
      details: {},
      totalPrice: totalPrice(data.planId),
    };

    console.log("Form data prepared:", formattedData);
    setFormData(formattedData);

    if (totalPrice(data.planId) === 0) {
      processSubscriptionSave(formattedData);
    } else {
      initializeRazorpay(formattedData);
    }
  };

  const initializeRazorpay = (data) => {
    const amount = data.totalPrice;

    const orderData = {
      receipt: `sub_${_id.slice(-15)}`,
      notes: {
        petId: _id,
        visitType: visitPurposeDetails._id,
        planId: data.planId,
        paymentType: "advance",
      },
    };

    const customData = {
      businessName: "Pet Subscription Service",
      description: "Full Payment for Subscription",
      themeColor: "#3399cc",
      prefill: {
        name: petDetails?.owner?.name || "",
        email: petDetails?.owner?.email || "",
        contact: petDetails?.owner?.phone || "",
      },
    };

    const onPaymentSuccess = (response) => {
      const updatedData = {
        ...data,
        details: {
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
      // Format data for subscription dispatch
      const subscriptionData = {
        petId: updatedData.petId,
        visitType: updatedData.visitType,
        planId: updatedData.planId,
        details: updatedData.details,
      };

      dispatch(buySubscription(subscriptionData))
        .then((result) => {
          if (result?.payload?.success) {
            alert("Payment successful and subscription purchased!");
            navigate("/dashboard");
          } else {
            alert(
              result?.payload?.message || "Failed to purchase subscription"
            );
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error purchasing subscription:", error);
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

  const processSubscriptionSave = (data) => {
    setIsLoading(true);

    console.log("Processing subscription save with data:", data);

    const subscriptionData = {
      petId: data.petId,
      visitType: data.visitType,
      planId: data.planId,
      details: data.details,
    };

    dispatch(buySubscription(subscriptionData))
      .then((result) => {
        if (result?.payload?.success) {
          alert("Subscription purchased successfully!");
          navigate("/dashboard");
        } else {
          alert(result?.payload?.message || "Failed to purchase subscription");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error purchasing subscription:", error);
        alert("An error occurred: " + error.message);
        setIsLoading(false);
      });
  };

  const totalPrice = (id) => {
    if (id) {
      const plan = subscriptions.find((item) => item._id === id);
      return plan?.price;
    }
    return 0;
  };

  useEffect(() => {
    dispatch(getAllSubscription()).then((data) => {
      if (data?.payload?.success) setValue("planId", subscriptions[0]?._id);
    });
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );

  // return (

  //   <div className="flex items-center justify-center p-4">
  //     <form
  //       onSubmit={handleSubmit(onSubmit)}
  //       className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
  //     >
  //       <h2 className="text-xl font-semibold text-gray-700">Select Plan</h2>

  //       <div>
  //         <select
  //           {...register("planId", {
  //             required: "Please select a plan",
  //           })}
  //           className="w-full p-2 border rounded-lg"
  //         >
  //           <option value="" disabled >
  //             Select Plan
  //           </option>
  //           {subscriptions?.map((item, idx) => {
  //             return item?.duration ? (
  //               <option
  //                 key={idx}
  //                 value={item?._id}
  //               >{`${item.subscriptionType?.purpose} - ${item.duration} days`}</option>
  //             ) : (
  //               <option
  //                 key={idx}
  //                 value={item?._id}
  //               >{`${item.subscriptionType?.purpose} - ${item.numberOfGroomings} groomings`}</option>
  //             );
  //           })}
  //         </select>
  //         {errors.planId && (
  //           <p className="text-red-500 text-sm mt-1">{errors.planId.message}</p>
  //         )}
  //       </div>

  //       {/* Price Details */}
  //       <div className="flex mt-3 items-center space-x-4">
  //         <label className="text-gray-600">Total Price:</label>
  //         <div className="text-lg font-semibold">₹{totalPrice(planId)}</div>
  //       </div>

  //       <button
  //         type="submit"
  //         disabled={isLoading}
  //         className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
  //       >
  //         {totalPrice(planId) === 0 ? "Purchase Subscription" : "Proceed to Payment"}
  //       </button>
  //     </form>
  //   </div>
  // );
  return (
    <div
      className="flex items-center justify-center p-4 min-h-screen"
      style={{
        background: "linear-gradient(135deg, #EFE3C2 0%, #85A947 100%)",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(145deg, #EFE3C2 0%, rgba(239, 227, 194, 0.95) 100%)",
          border: "1px solid rgba(133, 169, 71, 0.3)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#123524" }}>
            Choose Your Plan
          </h2>
          <div
            className="w-16 h-1 mx-auto rounded-full"
            style={{ backgroundColor: "#85A947" }}
          ></div>
        </div>

        {/* Plan Selection */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#3E7B27" }}
          >
            Select Subscription Plan
          </label>
          <div className="relative">
            <select
              {...register("planId", {
                required: "Please select a plan",
              })}
              className="w-full p-4 rounded-xl transition-all duration-300 appearance-none cursor-pointer focus:outline-none focus:ring-0"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "2px solid #85A947",
                color: "#123524",
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23123524' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 1rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em 1.5em",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3E7B27";
                e.target.style.boxShadow = "0 0 0 3px rgba(62, 123, 39, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#85A947";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="" disabled style={{ color: "#85A947" }}>
                Select your preferred plan
              </option>
              {subscriptions?.map((item, idx) => {
                return item?.duration ? (
                  <option
                    key={idx}
                    value={item?._id}
                    style={{ color: "#123524" }}
                  >{`${item.subscriptionType?.purpose} - ${item.duration} days`}</option>
                ) : (
                  <option
                    key={idx}
                    value={item?._id}
                    style={{ color: "#123524" }}
                  >{`${item.subscriptionType?.purpose} - ${item.numberOfGroomings} groomings`}</option>
                );
              })}
            </select>
          </div>
          {errors.planId && (
            <div className="flex items-center space-x-2 mt-2">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{ color: "#dc2626" }}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-600 text-sm font-medium">
                {errors.planId.message}
              </p>
            </div>
          )}
        </div>

        {/* Price Details */}
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: "rgba(18, 53, 36, 0.05)",
            border: "1px solid rgba(133, 169, 71, 0.3)",
          }}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium" style={{ color: "#3E7B27" }}>
              Total Amount:
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold" style={{ color: "#123524" }}>
                ₹{totalPrice(planId)}
              </span>
            </div>
          </div>
          {totalPrice(planId) > 0 && (
            <div className="mt-2 text-xs" style={{ color: "#85A947" }}>
              * Secure payment processing
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          style={{
            background: isLoading
              ? "linear-gradient(135deg, #85A947 0%, #3E7B27 100%)"
              : "linear-gradient(135deg, #3E7B27 0%, #123524 100%)",
            boxShadow: "0 4px 15px rgba(18, 53, 36, 0.3)",
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.target.style.background =
                "linear-gradient(135deg, #123524 0%, #3E7B27 100%)";
              e.target.style.boxShadow = "0 6px 20px rgba(18, 53, 36, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.target.style.background =
                "linear-gradient(135deg, #3E7B27 0%, #123524 100%)";
              e.target.style.boxShadow = "0 4px 15px rgba(18, 53, 36, 0.3)";
            }
          }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              {totalPrice(planId) === 0 ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Get Subscription</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>Proceed to Payment</span>
                </>
              )}
            </div>
          )}
        </button>

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            style={{ color: "#85A947" }}
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs" style={{ color: "#85A947" }}>
            Secure & Encrypted
          </span>
        </div>
      </form>
    </div>
  );
};

export default BuySubscription;
