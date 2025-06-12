import React, { useEffect, useState } from "react";
import { getAllVisitType } from "../../store/slices/visitSlice";
import { useDispatch } from "react-redux";
import Inquiry from "./VisitPurpose/Inquiry";
import DogPark from "./VisitPurpose/DogPark";
import Hostel from "./VisitPurpose/Hostel";
import Grooming from "./VisitPurpose/Grooming";
import DayCare from "./VisitPurpose/DayCare";
import DaySchool from "./VisitPurpose/DaySchool";
import PlaySchool from "./VisitPurpose/PlaySchool";
import Shop from "./VisitPurpose/Shop";
import Veterinary from "./VisitPurpose/Veterinary";
import { useLocation } from "react-router-dom";
import BuySubscription from "./VisitPurpose/BuySubscription";

const NewVisitForm2 = () => {
  const dispatch = useDispatch();
  const [visitTypes, setvisitTypes] = useState([]);
  const [purpose, setPurpose] = useState("Inquiry");

  const location = useLocation();

  useEffect(() => {
    dispatch(getAllVisitType()).then((data) => {
      if (data?.payload?.success) {
        setvisitTypes(data.payload.visitTypes);
      }
    });
  }, []);

  const { _id } = location?.state || "";
  const showForm = () => {
    const VisitPurposeDetails = visitTypes?.length
      ? visitTypes.find((p) => p.purpose === purpose)
      : null;

    switch (purpose) {
      case "Select":
        return <div>Select a pupose</div>;
      case "Inquiry":
        return <Inquiry _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Dog Park":
        return <DogPark _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Veterinary":
        return (
          <Veterinary _id={_id} visitPurposeDetails={VisitPurposeDetails} />
        );
      case "Hostel":
        return <Hostel _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Day Care":
        return <DayCare _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Day School":
        return (
          <DaySchool _id={_id} visitPurposeDetails={VisitPurposeDetails} />
        );
      case "Play School":
        return (
          <PlaySchool _id={_id} visitPurposeDetails={VisitPurposeDetails} />
        );
      case "Grooming":
        return <Grooming _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Shop":
        return <Shop _id={_id} visitPurposeDetails={VisitPurposeDetails} />;
      case "Buy Subscription":
        return (
          <BuySubscription
            _id={_id}
            visitPurposeDetails={VisitPurposeDetails}
          />
        );
      default:
        return <div>Invalid Selection</div>;
    }
  };
  // return (
  //   <div className="w-full flex justify-center">
  //     <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
  //       {/* Header */}
  //       <div className="flex justify-between items-center mb-6">
  //         <h2 className="text-2xl font-bold text-gray-900">New Visit</h2>
  //       </div>

  //       {/* Form */}

  //       {/* Purpose Selection */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-2">
  //           Purpose of Visit
  //         </label>
  //         <select
  //           value={purpose}
  //           className="border p-2 rounded w-full"
  //           onChange={(e) => setPurpose(e.target.value)}
  //         >
  //           {visitTypes?.map((item, idx) => (
  //             <option key={idx} value={item?.purpose}>
  //               {item?.purpose}
  //             </option>
  //           ))}
  //         </select>
  //       </div>
  //       <div>{showForm()}</div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#EFE3C2] to-[#f5f0e8] flex justify-center items-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#85A947]/30 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-[#85A947]/20">
          <div>
            <h2 className="text-3xl font-bold text-[#123524] mb-2">
              🏥 New Visit
            </h2>
            <p className="text-[#3E7B27] font-medium">
              Create a new visit record for your patient
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="w-16 h-16 bg-gradient-to-br from-[#85A947] to-[#3E7B27] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">📋</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Purpose Selection */}
          <div className="bg-gradient-to-r from-[#EFE3C2]/30 to-white p-6 rounded-xl border border-[#85A947]/30">
            <label className="block text-lg font-semibold text-[#123524] mb-4">
              🎯 Purpose of Visit
            </label>
            <div className="relative">
              <select
                value={purpose}
                className="w-full p-4 border-2 border-[#85A947] rounded-xl bg-white text-[#123524] font-medium focus:ring-2 focus:ring-[#3E7B27] focus:border-[#3E7B27] focus:outline-none transition-all duration-200 appearance-none cursor-pointer shadow-sm hover:shadow-md"
                onChange={(e) => setPurpose(e.target.value)}
              >
                {visitTypes?.map((item, idx) => (
                  <option key={idx} value={item?.purpose} className="py-2">
                    {item?.purpose}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                <svg
                  className="w-6 h-6 text-[#3E7B27]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
            <p className="text-sm text-[#85A947] mt-2 font-medium">
              Select the primary reason for this visit
            </p>
          </div>

          {/* Dynamic Form Section */}
          <div className="bg-gradient-to-br from-white to-[#EFE3C2]/20 rounded-xl border border-[#85A947]/20 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[#123524] to-[#3E7B27] px-6 py-4">
              <h3 className="text-lg font-semibold text-white">
                📝 Visit Details
              </h3>
            </div>
            <div className="p-6">{showForm()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVisitForm2;
