import React, { useEffect, useState } from "react";
import "../../App.css";
import {
  getRemindersList,
  sendReminders,
} from "../../store/slices/remindersSlice";
import { useDispatch, useSelector } from "react-redux";

const NewReminders = () => {
  const { List } = useSelector((state) => state.reminders);
  const [date, setdate] = useState(new Date().toISOString().split("T")[0]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const remindAll = () => {
    setIsLoading(true);
    dispatch(sendReminders(date))
      .then((data) => {
        if (data?.payload?.success) {
          alert("Reminders will be sent");
        } else alert("Error in sending reminders");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true);
      dispatch(getRemindersList(date))
        .then((data) => {})
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [date, dispatch]);
  // return (
  //   <>
  //     <h1 className="text-center font-bold mt-10 text-5xl">REMINDERS</h1>
  //     <div className="mt-10 flex gap-5 justify-evenly">
  //       <div className="tracking-widest">Choose Date</div>
  //       <input
  //         type="date"
  //         value={date}
  //         onChange={(e) => setdate(e.target.value)}
  //       />
  //     </div>
  //     {isLoading ? (
  //       <div className="flex justify-center items-center h-screen">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //       </div>
  //     ) : (
  //       <div className="w-[90%] mx-auto">
  //         {!List || List?.length === 0 ? (
  //           <div className="w-full p-6 mt-5 mx-auto text-gray-800 rounded-lg shadow-md">
  //             <p className="text-center tracking-widest text-lg font-semibold">
  //               No Reminders for Choosen Date
  //             </p>
  //           </div>
  //         ) : (
  //           <div className="w-full overflow-x-scroll hidescroller  mx-auto mt-5 text-[12px] lg:text-[15px] flex flex-col gap-y-4 items-center justify-center">
  //             <table className="min-w-full table-auto rounded-lg shadow-md">
  //               <thead>
  //                 <tr className="bg-[#172554] text-white text-left">
  //                   <th className="px-6 py-3 text-center">No.</th>
  //                   <th className="px-6 py-3 text-center">Pet Name</th>
  //                   <th className="px-6 py-3 text-center">Owner Name</th>
  //                   <th className="px-6 py-3 text-center">Contact</th>
  //                   <th className="px-6 py-3 text-center">Purpose</th>
  //                   <th className="px-6 py-3 text-center">Scheduled Date</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {List?.map((item, idx) => {
  //                   return (
  //                     <tr className="bg-white" key={idx}>
  //                       <td className="px-6 py-4 text-center">{idx + 1}</td>
  //                       <td className="px-6 py-4 text-center">
  //                         {item?.petName}
  //                       </td>
  //                       <td className="px-6 py-4 text-center">
  //                         {item?.ownerName}
  //                       </td>
  //                       <td className="px-6 py-4 text-center">
  //                         {item?.contact}
  //                       </td>
  //                       <td className="px-6 py-4 text-center">
  //                         {item?.purpose}
  //                       </td>
  //                       <td className="px-6 py-4 text-center">
  //                         {item?.scheduledDate?.substring(0, 10) || "NA"}
  //                       </td>
  //                     </tr>
  //                   );
  //                 })}
  //               </tbody>
  //             </table>
  //             <div className="w-full flex justify-center items-center">
  //               <button
  //                 onClick={remindAll}
  //                 disabled={isLoading}
  //                 className="bg-[#172554] px-5  py-2 rounded-md text-white mt-4"
  //               >
  //                 Remind All
  //               </button>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </>
  // );
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE3C2] to-[#85A947]/10 py-10 px-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-5 h-5 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
          <h1 className="text-center font-bold text-4xl md:text-5xl text-[#123524] tracking-widest">
            REMINDERS
          </h1>
          <div className="w-5 h-5 bg-gradient-to-r from-[#85A947] to-[#3E7B27] rounded-full"></div>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-8 border border-[#85A947]/20">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#85A947] rounded-full"></div>
              <label className="text-[#3E7B27] font-bold text-lg tracking-widest">
                Choose Date
              </label>
            </div>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setdate(e.target.value)}
                className="px-6 py-3 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium transition-all duration-200"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#85A947]/30 border-t-[#3E7B27] mx-auto mb-4"></div>
              <p className="text-[#3E7B27] font-semibold text-lg">
                Loading reminders...
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {!List || List?.length === 0 ? (
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-12 border border-[#85A947]/20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#EFE3C2] rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-10 h-10 bg-[#85A947]/60 rounded-full"></div>
                  </div>
                  <p className="text-xl font-bold text-[#3E7B27] mb-2 tracking-widest">
                    No Reminders for Chosen Date
                  </p>
                  <p className="text-[#123524]/60">
                    Select a different date to view scheduled reminders
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#85A947]/20 overflow-hidden">
                <div className="flex items-center gap-3 p-6 bg-gradient-to-r from-[#EFE3C2]/30 to-white border-b border-[#85A947]/20">
                  <div className="w-4 h-4 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
                  <h3 className="text-2xl font-bold text-[#123524]">
                    📅 Scheduled Reminders
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#123524] to-[#3E7B27] text-white">
                        <th className="px-8 py-5 text-center font-bold text-lg">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            No.
                          </div>
                        </th>
                        <th className="px-8 py-5 text-center font-bold text-lg">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Pet Name
                          </div>
                        </th>
                        <th className="px-8 py-5 text-center font-bold text-lg">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Owner Name
                          </div>
                        </th>
                        <th className="px-8 py-5 text-center font-bold text-lg">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Contact
                          </div>
                        </th>
                        <th className="px-8 py-5 text-center font-bold text-lg">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Purpose
                          </div>
                        </th>
                        <th className="px-8 py-5 text-center font-bold text-lg">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Scheduled Date
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {List?.map((item, idx) => {
                        return (
                          <tr
                            className="bg-gradient-to-r from-white to-[#EFE3C2]/20 border-b-2 border-[#85A947]/20 hover:from-[#EFE3C2]/30 hover:to-[#85A947]/10 transition-all duration-300 hover:shadow-md"
                            key={idx}
                          >
                            <td className="px-8 py-6 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-3 h-3 bg-[#85A947] rounded-full"></div>
                                <span className="font-bold text-[#123524] text-lg">
                                  {idx + 1}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-3 h-3 bg-[#3E7B27] rounded-full"></div>
                                <span className="font-bold text-[#123524] text-lg">
                                  {item?.petName}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="font-semibold text-[#123524]">
                                {item?.ownerName}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-[#3E7B27] rounded-full"></div>
                                <span className="font-medium text-[#123524]">
                                  {item?.contact}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                <span className="font-semibold text-[#3E7B27]">
                                  {item?.purpose}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="font-semibold text-[#123524]">
                                  {item?.scheduledDate?.substring(0, 10) ||
                                    "NA"}
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="p-8 bg-gradient-to-r from-[#EFE3C2]/20 to-white border-t-2 border-[#85A947]/20">
                  <div className="flex justify-center">
                    <button
                      onClick={remindAll}
                      disabled={isLoading}
                      className={`px-10 py-4 font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 ${
                        isLoading
                          ? "bg-[#123524]/50 text-white cursor-not-allowed"
                          : "bg-gradient-to-r from-[#123524] to-[#3E7B27] text-white hover:from-[#3E7B27] hover:to-[#85A947] focus:ring-[#85A947]/30"
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="text-xl">📢</span>
                          <span>Remind All</span>
                          <span className="text-xl">📱</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewReminders;
