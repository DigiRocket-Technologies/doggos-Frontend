import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoardingDetails,
  updateHostelVisit,
  hostelDeboarding,
} from "../../store/slices/deboardSlice";
import { useNavigate } from "react-router-dom";

const HostelDeboard = ({ _id, setboardingid }) => {
  const dispatch = useDispatch();
  const { boardingDetails } = useSelector((state) => state.deboard);
  const [loading, setLoading] = useState(false);
  const [discount, setdiscount] = useState(0);
  const [actualnumberofdays, setactualnumberofdays] = useState(null);
  const navigate = useNavigate();

  const handleVisitUpdate = () => {
    const data = {};
    data.visitId = boardingDetails?.visitId;
    data.discount = discount;
    data.days = Math.abs(actualnumberofdays - boardingDetails?.numberOfDays);

    setLoading(true);

    dispatch(updateHostelVisit(data))
      .then((data) => {
        if (data?.payload?.success) {
          alert("Visit Updated now you can deboard");
        } else alert(data?.payload?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeboard = () => {
    setLoading(true);
    dispatch(hostelDeboarding(boardingDetails?._id))
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
    dispatch(getBoardingDetails(_id)).then((data) => {
      if (data?.payload?.success) {
        setactualnumberofdays(data?.payload?.actualnumberOfDays);
      }
    });
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
  //         <span className="text-gray-600 font-medium">
  //           Initial Number of Days:
  //         </span>
  //         <span className="text-gray-800">{boardingDetails?.numberOfDays}</span>
  //       </div>
  //       <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
  //         <span className="text-gray-600 font-medium">
  //           Actual Number of Days:
  //         </span>
  //         <span className="text-gray-800">{actualnumberofdays}</span>
  //       </div>
  //       <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
  //         <span className="text-gray-600 font-medium">Entry Date:</span>
  //         <span className="text-gray-800">
  //           {boardingDetails?.entryTime.substring(0, 10)}
  //         </span>
  //       </div>
  //       {actualnumberofdays <= boardingDetails?.numberOfDays ? (
  //         <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
  //           <button
  //             disabled={loading}
  //             onClick={handleDeboard}
  //             className={`ml-4 px-4 py-1.5 text-sm ${
  //               loading
  //                 ? "bg-gray-400 cursor-not-allowed"
  //                 : "bg-red-500 hover:bg-red-600"
  //             } text-white rounded-md transition`}
  //           >
  //             {loading ? "Processing..." : "Deboard"}
  //           </button>
  //         </div>
  //       ) : boardingDetails?.visitId?.details?.extradaysprice ? (
  //         <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
  //           <button
  //             onClick={handleDeboard}
  //             disabled={loading}
  //             className={`ml-4 px-4 py-1.5 text-sm ${
  //               loading
  //                 ? "bg-gray-400 cursor-not-allowed"
  //                 : "bg-red-500 hover:bg-red-600"
  //             } text-white rounded-md transition`}
  //           >
  //             {loading ? "Processing..." : "Deboard"}
  //           </button>
  //         </div>
  //       ) : (
  //         <div>
  //           {" "}
  //           <div className="flex w-full items-center justify-between px-5">
  //             <div>
  //               <label className="block text-gray-600 mb-1">Price</label>
  //               <div>{boardingDetails?.boardingType.price}</div>
  //             </div>
  //             <div>
  //               <label className="block text-gray-600 mb-1">Discount</label>
  //               <input
  //                 type="number"
  //                 value={discount}
  //                 onChange={(e) => setdiscount(e.target.value)}
  //                 className="w-full p-2 border rounded-lg"
  //                 placeholder="Enter discount"
  //               />
  //             </div>
  //           </div>
  //           <div className="flex mt-3 items-center space-x-4">
  //             <label className="text-gray-600">Total Price:</label>
  //             <div className="text-lg font-semibold">
  //               {boardingDetails?.boardingType?.price - discount
  //                 ? (boardingDetails?.boardingType?.price - discount) *
  //                   Math.abs(actualnumberofdays - boardingDetails?.numberOfDays)
  //                 : 0}
  //             </div>
  //           </div>
  //           <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
  //             <button
  //               disabled={loading}
  //               onClick={handleVisitUpdate}
  //               className={`ml-4 px-4 py-1.5 text-sm ${
  //                 loading
  //                   ? "bg-gray-400 cursor-not-allowed"
  //                   : "bg-red-500 hover:bg-red-600"
  //               } text-white rounded-md transition`}
  //             >
  //               {loading ? "Processing..." : "Pay Overdue Amount"}
  //             </button>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
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
        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#EFE3C2]/40 to-[#85A947]/10 rounded-xl border border-[#85A947]/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#3E7B27] rounded-full"></div>
            <span className="text-[#3E7B27] font-bold text-sm">
              Initial Number of Days:
            </span>
          </div>
          <span className="text-[#123524] font-semibold text-lg">
            {boardingDetails?.numberOfDays}
          </span>
        </div>

        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#85A947]/10 to-[#EFE3C2]/40 rounded-xl border border-[#85A947]/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#85A947] rounded-full"></div>
            <span className="text-[#3E7B27] font-bold text-sm">
              Actual Number of Days:
            </span>
          </div>
          <span className="text-[#123524] font-semibold text-lg">
            {actualnumberofdays}
          </span>
        </div>

        <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#EFE3C2]/40 to-[#85A947]/10 rounded-xl border border-[#85A947]/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#3E7B27] rounded-full"></div>
            <span className="text-[#3E7B27] font-bold text-sm">
              Entry Date:
            </span>
          </div>
          <span className="text-[#123524] font-semibold text-lg">
            {boardingDetails?.entryTime.substring(0, 10)}
          </span>
        </div>

        {actualnumberofdays <= boardingDetails?.numberOfDays ? (
          <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#85A947]/10 to-[#EFE3C2]/40 rounded-xl border border-[#85A947]/20">
            <button
              disabled={loading}
              onClick={handleDeboard}
              className={`ml-4 px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 shadow-lg ${
                loading
                  ? "bg-[#123524]/50 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:shadow-xl hover:-translate-y-0.5 focus:ring-red-300"
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Deboard"
              )}
            </button>
          </div>
        ) : boardingDetails?.visitId?.details?.extradaysprice ? (
          <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#85A947]/10 to-[#EFE3C2]/40 rounded-xl border border-[#85A947]/20">
            <button
              onClick={handleDeboard}
              disabled={loading}
              className={`ml-4 px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 shadow-lg ${
                loading
                  ? "bg-[#123524]/50 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:shadow-xl hover:-translate-y-0.5 focus:ring-red-300"
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Deboard"
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-[#EFE3C2]/30 to-[#85A947]/10 rounded-xl border border-[#85A947]/20">
              <div className="flex w-full items-center justify-between">
                <div className="flex-1 mr-6">
                  <label className="block text-[#3E7B27] font-bold mb-2">
                    Base Price
                  </label>
                  <div className="text-[#123524] font-semibold text-lg">
                    ${boardingDetails?.boardingType.price}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[#3E7B27] font-bold mb-2">
                    Discount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setdiscount(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                      placeholder="Enter discount"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center p-5 bg-gradient-to-r from-[#3E7B27]/10 to-[#85A947]/20 rounded-xl border border-[#3E7B27]/30">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#3E7B27] rounded-full"></div>
                  <label className="text-[#3E7B27] font-bold text-lg">
                    Total Price:
                  </label>
                </div>
                <div className="text-[#123524] text-2xl font-bold">
                  $
                  {boardingDetails?.boardingType?.price - discount
                    ? (boardingDetails?.boardingType?.price - discount) *
                      Math.abs(
                        actualnumberofdays - boardingDetails?.numberOfDays
                      )
                    : 0}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#85A947]/10 to-[#EFE3C2]/40 rounded-xl border border-[#85A947]/20">
              <button
                disabled={loading}
                onClick={handleVisitUpdate}
                className={`ml-4 px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 shadow-lg ${
                  loading
                    ? "bg-[#123524]/50 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:shadow-xl hover:-translate-y-0.5 focus:ring-red-300"
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Pay Overdue Amount"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelDeboard;
