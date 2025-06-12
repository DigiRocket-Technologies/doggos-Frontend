import React from "react";

const VaccinationPopup = ({ isOpen, onClose, vaccinations }) => {
  if (!isOpen) return null;

  // return (
  //   <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
  //     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
  //       <h2 className="text-lg font-semibold text-gray-800">Vaccination Details</h2>

  //       <ul className="mt-4 list-disc pl-5 text-gray-600">
  //         {vaccinations?.map((vaccine, index) => (
  //           <li key={index}>
  //             <span className="font-medium">{vaccine.name}</span> -
  //             {vaccine.numberOfDose} dose
  //           </li>
  //         ))}
  //       </ul>

  //       <button
  //         className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
  //         onClick={onClose}
  //       >
  //         Close
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#123524]/60 backdrop-blur-sm z-50">
      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-4 relative border border-[#85A947]/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#123524]">
              Vaccination Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EFE3C2]/50 hover:bg-[#85A947]/20 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#85A947]/30"
          >
            <div className="w-4 h-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-0.5 bg-[#123524] rotate-45 absolute"></div>
                <div className="w-4 h-0.5 bg-[#123524] -rotate-45 absolute"></div>
              </div>
            </div>
          </button>
        </div>

        {/* Vaccination List */}
        <div className="space-y-4 mb-6">
          {vaccinations?.map((vaccine, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-[#EFE3C2]/30 to-[#85A947]/10 rounded-xl border border-[#85A947]/20 hover:border-[#3E7B27]/40 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#3E7B27] rounded-full flex-shrink-0"></div>
                <div>
                  <span className="font-bold text-[#123524] text-lg">
                    {vaccine.name}
                  </span>
                  <p className="text-[#3E7B27] text-sm font-medium">
                    {vaccine.numberOfDose}{" "}
                    {vaccine.numberOfDose === 1 ? "dose" : "doses"} administered
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#85A947]/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#85A947] rounded-full"></div>
                </div>
              </div>
            </div>
          ))}

          {(!vaccinations || vaccinations.length === 0) && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#EFE3C2] rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-[#85A947]/60 rounded-full"></div>
              </div>
              <p className="text-[#3E7B27] font-medium text-lg">
                No vaccinations recorded
              </p>
              <p className="text-[#123524]/60 text-sm mt-1">
                This pet hasn't received any vaccinations yet
              </p>
            </div>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-center">
          <button
            className="px-8 py-3 bg-gradient-to-r from-[#123524] to-[#3E7B27] text-white font-bold rounded-xl hover:from-[#3E7B27] hover:to-[#85A947] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#85A947]/30"
            onClick={onClose}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              Close Details
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VaccinationPopup;
