import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  dayCareDeboarding,
  getBoardingDetails,
} from "../../store/slices/deboardSlice";
import { loadRazorpayScript } from "../../utils/loadRazorpayScript";

const DayCareDebaord = ({ _id, setboardingid }) => {
  const dispatch = useDispatch();
  const { boardingDetails } = useSelector((state) => state.deboard);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeboard = () => {
    setLoading(true);
    dispatch(dayCareDeboarding(boardingDetails?._id))
      .then((data) => {
        if (data?.payload?.success) {
          alert("Pet deboarded successfully");
          navigate("/dashboard");
        } else {
          alert("There was an error in deboarding pet");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(getBoardingDetails(_id));
  }, []);

  // return (
  //   <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 max-w-lg   flex flex-col p-6">
  //     {/* Header */}
  //     <div className="flex justify-between items-center mb-4">
  //       <h2 className="text-xl font-semibold text-gray-800">
  //         Boarding Details
  //       </h2>
  //       <button
  //         onClick={() => setboardingid("")}
  //         className="text-gray-500 hover:text-gray-700 focus:outline-none"
  //       >
  //         <svg
  //           className="w-6 h-6"
  //           fill="none"
  //           stroke="currentColor"
  //           viewBox="0 0 24 24"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M6 18L18 6M6 6l12 12"
  //           />
  //         </svg>
  //       </button>
  //     </div>

  //     {/* Content */}
  //     <div className="flex-1 flex flex-col justify-center space-y-4">
  //       <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
  //         <span className="text-gray-600 font-medium">Entry Date:</span>
  //         <span className="text-gray-800">
  //           {boardingDetails?.entryTime.substring(0, 10)}
  //         </span>
  //       </div>
  //       <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
  //         <button
  //           disabled={loading}
  //           onClick={handleDeboard}
  //           className={`ml-4 px-4 py-1.5 text-sm ${
  //             loading
  //               ? "bg-gray-400 cursor-not-allowed"
  //               : "bg-red-500 hover:bg-red-600"
  //           } text-white rounded-md transition`}
  //         >
  //           {loading ? "Processing..." : "Deboard"}
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  const startPayment = async (amount) => {
    
    const razorpayLoaded = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!razorpayLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // 1. Create order on backend
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/payments/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authtoken"),
        },
        body: JSON.stringify({
          amount: amount,
          receipt: `left_amt_board:${_id}`,
          notes: {
            boardingId: _id,
          },
        }),
      }
    );

    const { order } = await res.json();

    // 2. Setup Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // Replace with your Razorpay key_id
      amount: order.amount,
      currency: "INR",
      name: "Doggos Heaven",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        // 3. Verify payment on backend
        const verifyRes = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/payments/verify-pending-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("authtoken")||"",
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              visitId: boardingDetails?.visitId?._id,
            }),
          }
        );

        const result = await verifyRes.json();

        if (result.success) {
          alert("✅ Payment Done Successfully!");
        } else {
          alert("❌ Payment Failed!");
        }
      },
      theme: { color: "#528FF0" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl w-11/12 sm:w-1/2 max-w-lg flex flex-col p-8 border border-[#85A947]/20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
          <h2 className="text-2xl font-bold text-[#123524]">
            Boarding Details
          </h2>
        </div>
        <button
          onClick={() => setboardingid("")}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EFE3C2]/50 hover:bg-[#85A947]/20 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#85A947]/30"
        >
          <svg
            className="w-5 h-5 text-[#123524]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        <div className="p-5 bg-gradient-to-r from-[#EFE3C2]/40 to-[#85A947]/10 rounded-xl border border-[#85A947]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#3E7B27] rounded-full"></div>
              <span className="text-[#3E7B27] font-bold text-lg">
                Entry Date:
              </span>
            </div>
            <span className="text-[#123524] font-semibold text-lg">
              {boardingDetails?.entryTime.substring(0, 10)}
            </span>
          </div>
        </div>

        <div className="p-5 bg-gradient-to-r from-[#85A947]/10 to-[#EFE3C2]/40 rounded-xl border border-[#85A947]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#85A947] rounded-full"></div>
              <span className="text-[#3E7B27] font-bold text-lg">Status:</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[#123524] font-semibold">
                Active Boarding
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 bg-gradient-to-r from-[#85A947]/10 to-[#EFE3C2]/40 rounded-xl border border-[#85A947]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#85A947] rounded-full"></div>
              <span className="text-[#3E7B27] font-bold text-lg">
                Remaining Amount:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[#123524] font-semibold">
                {boardingDetails?.visitId?.details?.payment?.remainingAmount ||
                  0}
              </span>
            </div>
          </div>
        </div>
        {!boardingDetails?.visitId?.details?.payment?.isRemainingPaid || boardingDetails?.visitId?.details?.payment?.remainingAmount!==0 ? (
          <div className="flex justify-center pt-4">
            <button
              disabled={loading}
              onClick={() =>
                startPayment(
                  boardingDetails?.visitId?.details?.payment?.remainingAmount
                )
              }
              className={`px-8 py-4 text-base font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 shadow-lg ${
                loading
                  ? "bg-[#123524]/50 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:shadow-xl hover:-translate-y-0.5 focus:ring-red-300"
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Pay Remaining Amount</span>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          </div>
        ) : (
          <div className="flex justify-center pt-4">
            <button
              disabled={loading}
              onClick={handleDeboard}
              className={`px-8 py-4 text-base font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 shadow-lg ${
                loading
                  ? "bg-[#123524]/50 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:shadow-xl hover:-translate-y-0.5 focus:ring-red-300"
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Deboard Pet</span>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayCareDebaord;
