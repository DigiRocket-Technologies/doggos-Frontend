import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoardedPetList,
  getBoardingDetails,
} from "../store/slices/deboardSlice";
import { getBoardingCategoryList } from "../store/slices/visitSlice";

import {
  dogParkDeboarding,
  daySchoolDeboarding,
  playSchoolDeboarding,
  hostelDeboarding,
  dayCareDeboarding,
} from "../store/slices/deboardSlice";
import HostelDeboard from "./Deboard/HostelDeboard";
import DogParkDeboard from "./Deboard/DogParkDeboard";
import DaySchoolDeboard from "./Deboard/DaySchoolDeboard";
import DayCareDebaord from "./Deboard/DayCareDebaord";
import PlaySchoolDeboard from "./Deboard/PlaySchoolDeboard";

const Deboard = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const [options, setOptions] = useState([]);
  const [boardingid, setboardingid] = useState(null);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [show, setshow] = useState(false);

  const boardingDetailsRef = useRef(null);

  const { petsList, petsListLoading } = useSelector((state) => state.deboard);

  useEffect(() => {
    const params = new URLSearchParams();
    if (!selectedOption) return;
    params.append("type", selectedOption?._id);
    const queryString = params.toString();

    dispatch(getBoardedPetList(queryString));
  }, [dispatch, selectedOption]);

  useEffect(() => {
    dispatch(getBoardingCategoryList()).then((data) => {
      if (data?.payload?.success) setOptions(data?.payload?.visitTypes);
    });
  }, []);

  const showDeboardingPopup = (_id) => {
    switch (selectedOption?.purpose) {
      case "Dog Park":
        return <DogParkDeboard _id={_id} setboardingid={setboardingid} />;
      case "Day School":
        return <DaySchoolDeboard _id={_id} setboardingid={setboardingid} />;
      case "Play School":
        return <PlaySchoolDeboard _id={_id} setboardingid={setboardingid} />;
      case "Hostel":
        return <HostelDeboard _id={_id} setboardingid={setboardingid} />;
      case "Day Care":
        return <DayCareDebaord _id={_id} setboardingid={setboardingid} />;
      default:
        return <div></div>;
    }
  };

  if (petsListLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  // return (
  //   <>
  //     {" "}
  //     {boardingid&&<div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
  //       {boardingid ? showDeboardingPopup(boardingid) : ""}
  //     </div>}
  //     <div>
  //       <h1 className="font-bold text-2xl text-black items-center justify-center max-w-[95%] mx-auto p-2">
  //         Deboard Pets
  //       </h1>
  //       <div className="flex min-h-screen bg-gray-100">
  //         <div className="w-1/6 p-4 flex flex-col space-y-4">
  //           {options.map((option) => (
  //             <button
  //               key={option._id}
  //               onClick={() => setSelectedOption(option)}
  //               className={`py-2 px-4 rounded-lg shadow-md transition-all duration-300 ${
  //                 selectedOption?.id === option?._id
  //                   ? "bg-blue-950 text-white"
  //                   : "bg-white text-blue-950 hover:bg-blue-100"
  //               }`}
  //             >
  //               {option?.purpose}
  //             </button>
  //           ))}
  //         </div>

  //         <div className="w-5/6 p-4 bg-white rounded-lg shadow-md">
  //           {selectedOption ? (
  //             petsList && petsList.length > 0 ? (
  //               <div className="space-y-4">
  //                 {petsList.map((pet) => (
  //                   <div
  //                     key={pet._id}
  //                     className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition duration-300"
  //                   >
  //                     <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
  //                       <span>
  //                         <span className="font-medium text-gray-800">
  //                           Pet name:
  //                         </span>{" "}
  //                         {pet?.petId?.name?.toString()}
  //                       </span>
  //                       <span>
  //                         <span className="font-medium text-gray-800">
  //                           Owner name:
  //                         </span>{" "}
  //                         {pet?.petId?.owner?.name}
  //                       </span>
  //                       <span>
  //                         <span className="font-medium text-gray-800">
  //                           Phone number:
  //                         </span>{" "}
  //                         {pet?.petId?.owner?.phone}
  //                       </span>
  //                       <span>
  //                         <span className="font-medium text-gray-800">
  //                           Status:
  //                         </span>{" "}
  //                         {pet.isBoarded ? "Boarded" : "Not Boarded"}
  //                       </span>
  //                     </div>
  //                     <button
  //                       onClick={() => setboardingid(pet._id)}
  //                       disabled={loading}
  //                       className={`ml-4 px-4 py-1.5 text-sm ${
  //                         loading
  //                           ? "bg-gray-400 cursor-not-allowed"
  //                           : "bg-red-500 hover:bg-red-600"
  //                       } text-white rounded-md transition`}
  //                     >
  //                       {loading ? "Processing..." : "Show Boarding Details"}
  //                     </button>
  //                   </div>
  //                 ))}
  //               </div>
  //             ) : (
  //               <p className="text-lg text-gray-500">
  //                 No pets found for this category
  //               </p>
  //             )
  //           ) : (
  //             <p className="text-lg text-gray-500">
  //               Select an option to see content
  //             </p>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
  return (
    <>
      {boardingid && (
        <div
          className={`fixed inset-0 bg-[#123524]/60 backdrop-blur-sm flex items-center justify-center z-50`}
        >
          {boardingid ? showDeboardingPopup(boardingid) : ""}
        </div>
      )}
      <div className="min-h-screen bg-gradient-to-br from-[#EFE3C2] to-[#85A947]/10">
        <div className="pt-8 pb-4">
          <div className="flex items-center justify-center gap-4 max-w-[95%] mx-auto">
            <div className="w-6 h-6 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
            <h1 className="font-bold text-4xl text-[#123524]">Deboard Pets</h1>
            <div className="w-6 h-6 bg-gradient-to-r from-[#85A947] to-[#3E7B27] rounded-full"></div>
          </div>
        </div>

        <div className="flex min-h-[calc(100vh-120px)] max-w-[95%] mx-auto gap-6 pb-8">
          {/* Sidebar */}
          <div className="w-1/6 flex flex-col space-y-4">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-[#85A947]/20 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-[#85A947] rounded-full"></div>
                <h3 className="text-lg font-bold text-[#123524]">Categories</h3>
              </div>
              <div className="space-y-3">
                {options.map((option) => (
                  <button
                    key={option._id}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full py-3 px-4 rounded-xl shadow-md transition-all duration-300 font-semibold text-sm ${
                      selectedOption?.id === option?._id
                        ? "bg-gradient-to-r from-[#123524] to-[#3E7B27] text-white shadow-lg transform -translate-y-0.5"
                        : "bg-white text-[#123524] hover:bg-[#EFE3C2]/50 border border-[#85A947]/20 hover:border-[#3E7B27]/40"
                    }`}
                  >
                    {option?.purpose}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-5/6 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#85A947]/20">
            {selectedOption ? (
              petsList && petsList.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-4 h-4 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
                    <h2 className="text-2xl font-bold text-[#123524]">
                      {selectedOption?.purpose} - Boarding List
                    </h2>
                  </div>

                  {petsList.map((pet) => (
                    <div
                      key={pet._id}
                      className="w-full flex items-center justify-between bg-gradient-to-r from-[#EFE3C2]/30 to-white rounded-2xl px-8 py-6 border border-[#85A947]/20 hover:border-[#3E7B27]/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#3E7B27] rounded-full"></div>
                          <span className="text-[#3E7B27] font-bold">
                            Pet name:
                          </span>
                          <span className="text-[#123524] font-medium">
                            {pet?.petId?.name?.toString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#85A947] rounded-full"></div>
                          <span className="text-[#3E7B27] font-bold">
                            Owner name:
                          </span>
                          <span className="text-[#123524] font-medium">
                            {pet?.petId?.owner?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#3E7B27] rounded-full"></div>
                          <span className="text-[#3E7B27] font-bold">
                            Phone number:
                          </span>
                          <span className="text-[#123524] font-medium">
                            {pet?.petId?.owner?.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              pet.isBoarded
                                ? "bg-green-500 animate-pulse"
                                : "bg-orange-500"
                            }`}
                          ></div>
                          <span className="text-[#3E7B27] font-bold">
                            Status:
                          </span>
                          <span
                            className={`font-semibold ${
                              pet.isBoarded
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          >
                            {pet.isBoarded ? "Boarded" : "Not Boarded"}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setboardingid(pet._id)}
                        disabled={loading}
                        className={`px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 shadow-lg ${
                          loading
                            ? "bg-[#123524]/50 text-white cursor-not-allowed"
                            : "bg-gradient-to-r from-[#3E7B27] to-[#85A947] hover:from-[#85A947] hover:to-[#3E7B27] text-white hover:shadow-xl hover:-translate-y-0.5 focus:ring-[#85A947]/30"
                        }`}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span>Show Details</span>
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-20 h-20 bg-[#EFE3C2] rounded-full flex items-center justify-center mb-6">
                    <div className="w-10 h-10 bg-[#85A947]/60 rounded-full"></div>
                  </div>
                  <p className="text-xl font-semibold text-[#3E7B27] mb-2">
                    No pets found for this category
                  </p>
                  <p className="text-[#123524]/60">
                    There are currently no pets in the {selectedOption?.purpose}{" "}
                    category
                  </p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-24 h-24 bg-gradient-to-br from-[#EFE3C2] to-[#85A947]/30 rounded-full flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-[#85A947] rounded-full opacity-60"></div>
                </div>
                <p className="text-xl font-semibold text-[#3E7B27] mb-2">
                  Select a category to view pets
                </p>
                <p className="text-[#123524]/60">
                  Choose a boarding category from the sidebar to see the pets
                  list
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Deboard;
