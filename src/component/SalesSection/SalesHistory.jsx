import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import VisitHistoryDetails from "./VisitHistoryDetails";

import { getVisitList } from "../../store/slices/visitSlice";

const SalesHistory = () => {
  const [date, setdate] = useState(new Date().toISOString().split("T")[0]);
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visitdetails, setvisitdetails] = useState(null);
  const [list, setList] = useState([]);

  const onClose = () => {
    setvisitdetails(null);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let timeout = setTimeout(() => {
      const params = new URLSearchParams();
      params.append("name", name.trim());
      params.append("purpose", purpose.trim());
      params.append("date", date.trim());
      const queryString = params.toString();

      setIsLoading(true);
      dispatch(getVisitList(queryString))
        .then((data) => {
          if (data?.payload?.success) {
            setList(data?.payload?.List);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [name, purpose, date, dispatch]);

  // if (visitdetails) {

  //   return (
  //     <VisitHistoryDetails visitdetails={visitdetails} onClose={onClose} />
  //   );
  // }
  // return (
  //   <div className="w-screen flex flex-col mt-10 justify-center items-center">
  //     <h2 className="text-4xl sm:text-3xl tracking-widest md:text-4xl font-semibold text-black text-center py-4">
  //       Visit History
  //     </h2>
  //     <div className="w-[90vw] mx-auto">
  //       <div className="w-full flex justify-between">
  //         <input
  //           type="text"
  //           value={name}
  //           placeholder="Pet name"
  //           onChange={(e) => setName(e.target.value)}
  //           className="w-[50%] p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
  //         />
  //         <input
  //           type="text"
  //           placeholder="Purpose"
  //           value={purpose}
  //           onChange={(e) => setPurpose(e.target.value)}
  //           className="w-[49%] p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
  //         />
  //       </div>
  //       <div className="mt-5 w-[50%] mx-auto flex gap-5 justify-evenly">
  //         <div className="tracking-widest">Choose Date</div>
  //         <input
  //           type="date"
  //           value={date}
  //           onChange={(e) => setdate(e.target.value)}
  //         />
  //       </div>
  //     </div>
  //     {isLoading ? (
  //       <div className="flex justify-center items-center h-screen">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //       </div>
  //     ) : (
  //       <div className="w-full">
  //         {!list || list?.length === 0 ? (
  //           <div className="w-[90%] p-6 mt-5 mx-auto  text-gray-800 rounded-lg shadow-md">
  //             <p className="text-center tracking-widest text-lg font-semibold">
  //               No visit was recorded on this date
  //             </p>
  //           </div>
  //         ) : (
  //           <div className="w-[95%] mx-auto mt-6 text-sm lg:text-base flex flex-col gap-y-4 items-center justify-center">
  //             <div className="overflow-x-auto w-full">
  //               <table className="min-w-full table-auto rounded-lg shadow-md">
  //                 <thead>
  //                   <tr className="bg-[#172554] text-white text-left">
  //                     <th className="px-6 py-3 text-center">Pet Name</th>
  //                     <th className="px-6 py-3 text-center">Species</th>
  //                     <th className="px-6 py-3 text-center">Owner Name</th>
  //                     <th className="px-6 py-3 text-center">Contact</th>
  //                     <th className="px-6 py-3 text-center">Purpose</th>
  //                     <th className="px-6 py-3 text-center">Price</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   {list?.map((item, idx) => {
  //                     return (
  //                       <tr
  //                         onClick={() => setvisitdetails(item)}
  //                         key={idx}
  //                         className="bg-white border-b border-[#E0E0E0 cursor-pointer"
  //                       >
  //                         <td className="px-6 py-4 text-center">
  //                           {item?.pet?.name}
  //                         </td>
  //                         <td className="px-6 py-4 text-center">
  //                           {item?.pet?.species}
  //                         </td>
  //                         <td className="px-6 py-4 text-center">
  //                           {item?.pet?.owner?.name || ""}
  //                         </td>
  //                         <td className="px-6 py-4 text-center">
  //                           {item?.pet?.owner?.phone || ""}
  //                         </td>
  //                         <td className="px-6 py-4 text-center">
  //                           {item?.visitType?.purpose}
  //                         </td>
  //                         <td className="px-6 py-4 text-center">
  //                           {item?.details?.price || 0}
  //                         </td>
  //                       </tr>
  //                     );
  //                   })}
  //                 </tbody>
  //               </table>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
  if (visitdetails) {
    return (
      <VisitHistoryDetails visitdetails={visitdetails} onClose={onClose} />
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#EFE3C2] to-[#f5f0e8] flex flex-col mt-10 justify-center items-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[#85A947]/30 p-8 mb-8">
        <h2 className="text-4xl sm:text-3xl tracking-wider md:text-4xl font-bold text-[#123524] text-center drop-shadow-sm">
          🏥 Visit History
        </h2>
      </div>

      <div className="w-[90vw] mx-auto mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#85A947]/20 p-6">
          <div className="w-full flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                value={name}
                placeholder="🐾 Pet name"
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border-2 border-[#85A947] rounded-xl shadow-sm focus:ring-2 focus:ring-[#3E7B27] focus:border-[#3E7B27] focus:outline-none transition-all duration-200 bg-white text-[#123524] placeholder-[#85A947] font-medium"
              />
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="🎯 Purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full p-4 border-2 border-[#85A947] rounded-xl shadow-sm focus:ring-2 focus:ring-[#3E7B27] focus:border-[#3E7B27] focus:outline-none transition-all duration-200 bg-white text-[#123524] placeholder-[#85A947] font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-[#EFE3C2]/50 rounded-xl p-4">
            <div className="text-[#123524] font-semibold tracking-wider">
              📅 Choose Date
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setdate(e.target.value)}
              className="p-3 border-2 border-[#85A947] rounded-xl shadow-sm focus:ring-2 focus:ring-[#3E7B27] focus:border-[#3E7B27] focus:outline-none transition-all duration-200 bg-white text-[#123524] font-medium"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#85A947]/30 border-t-[#3E7B27]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-[#123524] rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          {!list || list?.length === 0 ? (
            <div className="w-[90%] mx-auto p-8 mt-5 bg-gradient-to-r from-[#EFE3C2] to-[#f5f0e8] text-[#123524] rounded-2xl shadow-lg border border-[#85A947]/30">
              <div className="text-center">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto text-[#85A947] opacity-60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <p className="tracking-wider text-lg font-semibold text-[#3E7B27]">
                  No visit was recorded on this date
                </p>
                <p className="text-sm text-[#123524]/70 mt-2">
                  Try selecting a different date or adjusting your filters
                </p>
              </div>
            </div>
          ) : (
            <div className="w-[95%] mx-auto mt-6 text-sm lg:text-base flex flex-col gap-y-6 items-center justify-center">
              <div className="overflow-x-auto w-full bg-white rounded-2xl shadow-xl border border-[#85A947]/20">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#123524] to-[#3E7B27] text-white text-left">
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">
                        🐾 Pet Name
                      </th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">
                        🦄 Species
                      </th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">
                        👤 Owner Name
                      </th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">
                        📞 Contact
                      </th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">
                        🎯 Purpose
                      </th>
                      <th className="px-6 py-4 text-center font-semibold tracking-wide">
                        💰 Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.map((item, idx) => {
                      return (
                        <tr
                          onClick={() => setvisitdetails(item)}
                          key={idx}
                          className={`${
                            idx % 2 === 0 ? "bg-[#EFE3C2]/30" : "bg-white"
                          } hover:bg-[#85A947]/20 transition-all duration-200 cursor-pointer border-b border-[#85A947]/20 hover:shadow-md transform hover:scale-[1.01]`}
                        >
                          <td className="px-6 py-4 text-center font-semibold text-[#123524]">
                            {item?.pet?.name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="bg-[#85A947]/20 text-[#123524] px-3 py-1 rounded-full text-sm font-medium">
                              {item?.pet?.species}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center font-medium text-[#3E7B27]">
                            {item?.pet?.owner?.name || "N/A"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="bg-[#3E7B27]/10 text-[#123524] px-3 py-1 rounded-full text-sm font-medium">
                              {item?.pet?.owner?.phone || "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="bg-[#123524]/10 text-[#123524] px-3 py-1 rounded-full text-sm font-medium">
                              {item?.visitType?.purpose}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-[#3E7B27]">
                            ₹{item?.details?.price || 0}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SalesHistory;
