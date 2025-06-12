import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addInquiryDetails } from "../../../store/slices/visitSlice";
import { useNavigate } from "react-router-dom";

const Inquiry = ({ _id, visitPurposeDetails }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      note: "",
      nextFollowUp: "",
      followUpTime: "",
      followUpPurpose: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    data.petId = _id;
    data.visitType = visitPurposeDetails._id;

    dispatch(addInquiryDetails(data))
      .then((data) => {
        if (data?.payload?.success) {
          alert("Visit saved successfully");
          reset();
          navigate("/dashboard");
        } else alert(data?.payload?.message);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Error saving data");
        setIsLoading(false);
      });
  };

  const today = new Date().toISOString().split("T")[0];

  // if (isLoading)
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
  //     </div>
  //   );

  // return (
  //   <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
  //     <textarea
  //       {...register("note", { required: "Inquiry description is required" })}
  //       placeholder="Describe the inquiry"
  //       className="w-full px-4 py-2 border rounded-lg"
  //       rows="4"
  //     />
  //     {errors.note && (
  //       <p className="text-red-500 text-sm">{errors.note.message}</p>
  //     )}

  //     {/* Follow-Up Details */}
  //     <div className="p-4 rounded-md">
  //       <h2 className="text-lg font-semibold mb-3">Follow-Up Details</h2>
  //       <div>
  //         <label>Follow-up date:</label>
  //         <input
  //           {...register("nextFollowUp", {})}
  //           type="date"
  //           min={today}
  //           className="w-full p-2 border rounded-md mb-2"
  //         />
  //         {errors.nextFollowUp && (
  //           <p className="text-red-500 text-sm">
  //             {errors.nextFollowUp.message}
  //           </p>
  //         )}
  //       </div>
  //       <div>
  //         <label>Follow-up time:</label>
  //         <input
  //           {...register("followUpTime", {})}
  //           type="time"
  //           className="w-full p-2 border rounded-md mb-2"
  //         />
  //         {errors.followUpTime && (
  //           <p className="text-red-500 text-sm">
  //             {errors.followUpTime.message}
  //           </p>
  //         )}
  //       </div>
  //       <div>
  //         <label>Follow-up purpose:</label>
  //         <input
  //           {...register("followUpPurpose", {})}
  //           placeholder="Follow-Up Purpose"
  //           className="w-full p-2 border rounded-md"
  //         />
  //         {errors.followUpPurpose && (
  //           <p className="text-red-500 text-sm">
  //             {errors.followUpPurpose.message}
  //           </p>
  //         )}
  //       </div>
  //     </div>

  //     {/* Total Price Display */}
  //     <div className="bg-gray-50 p-4 flex h-20 gap-x-5 items-center rounded-lg">
  //       <p className="text-sm font-medium text-gray-700">Total Price :</p>
  //       <p className="text-2xl font-bold text-gray-900">&#x20b9;0</p>
  //     </div>

  //     {/* Submit Button */}
  //     <button
  //       type="submit"
  //       className="w-full py-3 rounded-lg text-white bg-blue-600 font-medium"
  //     >
  //       Save Visit
  //     </button>
  //   </form>
  // );
  if (isLoading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #EFE3C2 0%, #85A947 100%)",
        }}
      >
        <div className="text-center space-y-4">
          <div
            className="animate-spin h-12 w-12 rounded-full mx-auto"
            style={{
              border: "4px solid rgba(133, 169, 71, 0.3)",
              borderTop: "4px solid #3E7B27",
            }}
          />
          <div className="space-y-2">
            <p className="text-lg font-medium" style={{ color: "#123524" }}>
              Loading Visit Details
            </p>
            <p className="text-sm" style={{ color: "#85A947" }}>
              Please wait while we prepare your form...
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div
      className="p-4"
      style={{
        background: "linear-gradient(135deg, #EFE3C2 0%, #85A947 100%)",
        minHeight: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 space-y-6 max-w-2xl mx-auto p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(145deg, #EFE3C2 0%, rgba(239, 227, 194, 0.95) 100%)",
          border: "1px solid rgba(133, 169, 71, 0.3)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#123524" }}>
            Visit Inquiry
          </h1>
          <div
            className="w-16 h-1 mx-auto rounded-full"
            style={{ backgroundColor: "#85A947" }}
          ></div>
        </div>

        {/* Inquiry Description */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium"
            style={{ color: "#3E7B27" }}
          >
            Inquiry Description *
          </label>
          <textarea
            {...register("note", {
              required: "Inquiry description is required",
            })}
            placeholder="Please describe your inquiry in detail..."
            className="w-full px-4 py-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 resize-none"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "2px solid #85A947",
              color: "#123524",
              minHeight: "120px",
            }}
            rows="4"
            onFocus={(e) => {
              e.target.style.borderColor = "#3E7B27";
              e.target.style.boxShadow = "0 0 0 3px rgba(62, 123, 39, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#85A947";
              e.target.style.boxShadow = "none";
            }}
          />
          {errors.note && (
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
                {errors.note.message}
              </p>
            </div>
          )}
        </div>

        {/* Follow-Up Details */}
        <div
          className="p-6 rounded-xl"
          style={{
            background: "rgba(133, 169, 71, 0.05)",
            border: "1px solid rgba(133, 169, 71, 0.2)",
          }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ color: "#3E7B27" }}
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-lg font-semibold" style={{ color: "#123524" }}>
              Follow-Up Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Follow-up Date */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{ color: "#3E7B27" }}
              >
                Follow-up Date
              </label>
              <div className="relative">
                <input
                  {...register("nextFollowUp", {})}
                  type="date"
                  min={today}
                  className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "2px solid #85A947",
                    color: "#123524",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3E7B27";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(62, 123, 39, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#85A947";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              {errors.nextFollowUp && (
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
                    {errors.nextFollowUp.message}
                  </p>
                </div>
              )}
            </div>

            {/* Follow-up Time */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium"
                style={{ color: "#3E7B27" }}
              >
                Follow-up Time
              </label>
              <div className="relative">
                <input
                  {...register("followUpTime", {})}
                  type="time"
                  className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "2px solid #85A947",
                    color: "#123524",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3E7B27";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(62, 123, 39, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#85A947";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              {errors.followUpTime && (
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
                    {errors.followUpTime.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Follow-up Purpose */}
          <div className="space-y-2 mt-6">
            <label
              className="block text-sm font-medium"
              style={{ color: "#3E7B27" }}
            >
              Follow-up Purpose
            </label>
            <input
              {...register("followUpPurpose", {})}
              placeholder="Enter the purpose for follow-up..."
              className="w-full px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "2px solid #85A947",
                color: "#123524",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3E7B27";
                e.target.style.boxShadow = "0 0 0 3px rgba(62, 123, 39, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#85A947";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.followUpPurpose && (
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
                  {errors.followUpPurpose.message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Total Price Display */}
        <div
          className="p-6 rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(18, 53, 36, 0.05) 0%, rgba(133, 169, 71, 0.05) 100%)",
            border: "2px solid rgba(133, 169, 71, 0.3)",
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{ color: "#3E7B27" }}
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className="text-sm font-medium"
                style={{ color: "#3E7B27" }}
              >
                Total Cost:
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-3xl font-bold" style={{ color: "#123524" }}>
                ₹0
              </span>
            </div>
          </div>
          <div
            className="mt-2 text-xs text-center"
            style={{ color: "#85A947" }}
          >
            💬 No charge for consultations and inquiries
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #3E7B27 0%, #123524 100%)",
            boxShadow: "0 4px 15px rgba(18, 53, 36, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background =
              "linear-gradient(135deg, #123524 0%, #3E7B27 100%)";
            e.target.style.boxShadow = "0 6px 20px rgba(18, 53, 36, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background =
              "linear-gradient(135deg, #3E7B27 0%, #123524 100%)";
            e.target.style.boxShadow = "0 4px 15px rgba(18, 53, 36, 0.3)";
          }}
        >
          <div className="flex items-center justify-center space-x-2">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Save Visit Details</span>
          </div>
        </button>

        {/* Info Footer */}
        <div className="text-center pt-4">
          <p className="text-xs" style={{ color: "#85A947" }}>
            📝 All visit details will be securely saved for future reference
          </p>
        </div>
      </form>
    </div>
  );
};

export default Inquiry;
