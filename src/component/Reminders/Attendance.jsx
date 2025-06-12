import React, { useEffect, useState } from "react";
import {
  getAttendance,
  updateAttendance,
} from "../../store/slices/attendanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Attendance = () => {
  const [date, setdate] = useState(new Date().toISOString().split("T")[0]);
  const { attendanceListLoading } = useSelector((state) => state.attendance);
  const [presentIds, setPresentIds] = useState([]);
  const [absentIds, setAbsentIds] = useState([]);
  const [list, setList] = useState();
  const dispatch = useDispatch();

  const handleupdateAttendance = async (date) => {
    dispatch(updateAttendance({ date, presentIds, absentIds }))
      .then((data) => {
        if (data?.payload?.success) {
          setList(data?.payload?.List);
        } else alert(data?.payload?.message);
      })
      .catch((data) => {
        alert(data?.payload?.message);
      });
  };

  const remindAll = async () => {
    const res = confirm("Reminders will be send to absentees ");

    if (!res) return;

    const token = localStorage.getItem("authtoken");
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/reminders/sendoverduereminders`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
          "Accept-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      }
    );

    if (response.data === 401) return dispatch(logout());

    const data = await response.json();

    if (data?.success) {
      alert("Reminders will be sent to absentees");
    } else alert("Error sending reminders");
  };

  const handleCheckboxChange = (id) => {
    const updatedList = list.map((item) => {
      if (item._id === id) {
        const updatedPresent = !item.present;
        // Update present and absent lists
        if (updatedPresent) {
          setPresentIds((prev) => [...prev, id]);
          setAbsentIds((prev) => prev.filter((id) => id !== id));
        } else {
          setAbsentIds((prev) => [...prev, id]);
          setPresentIds((prev) => prev.filter((id) => id !== id));
        }

        return { ...item, present: updatedPresent };
      }
      return item;
    });
    setList(updatedList);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(getAttendance(date)).then((data) => {
        if (data?.payload?.success) {
          setList(data?.payload?.List);
        } else setList([]);
      }, 1000);

      return () => clearTimeout(timeout);
    });
  }, [date, dispatch]);

  // if (attendanceListLoading)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );

  // return (
  //   <div className="w-screen flex flex-col mt-10 justify-center items-center">
  //     <h2 className="text-4xl sm:text-3xl tracking-widest md:text-4xl font-semibold text-black text-center py-4">
  //       SCHEDULED VISIT
  //     </h2>

  //     <div className="mt-5 flex gap-5 justify-evenly">
  //       <div className="tracking-widest">Choose Date</div>
  //       <input
  //         type="date"
  //         value={date}
  //         onChange={(e) => setdate(e.target.value)}
  //       />
  //     </div>
  //     {!list || list?.length === 0 ? (
  //       <div className="w-[90%] p-6 mt-5  text-gray-800 rounded-lg shadow-md">
  //         <p className="text-center tracking-widest text-lg font-semibold">
  //           No followup was scheduled for the chosen date.
  //         </p>
  //       </div>
  //     ) : (
  //       <div className="w-[90%] mt-5 text-sm lg:text-base flex flex-col gap-y-4 items-center justify-center">
  //         <div className="overflow-x-auto w-full">
  //           <table className="min-w-full table-auto rounded-lg shadow-md">
  //             <thead>
  //               <tr className="bg-[#172554] text-white text-left">
  //                 <th className="px-6 py-3 text-center">Pet Name</th>
  //                 <th className="px-6 py-3 text-center">Species</th>
  //                 <th className="px-6 py-3 text-center">Owner Name</th>
  //                 <th className="px-6 py-3 text-center">Contact</th>
  //                 <th className="px-6 py-3 text-center">Purpose</th>
  //                 <th className="px-6 py-3 text-center">Present</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {list?.map((item, idx) => {
  //                 return (
  //                   <tr key={idx} className="bg-white border-b border-[#E0E0E0">
  //                     <td className="px-6 py-4 text-center">
  //                       {item?.petId?.name}
  //                     </td>
  //                     <td className="px-6 py-4 text-center">
  //                       {item?.petId?.species}
  //                     </td>
  //                     <td className="px-6 py-4 text-center">
  //                       {item?.petId?.owner?.name}
  //                     </td>
  //                     <td className="px-6 py-4 text-center">
  //                       {item?.petId?.owner?.phone}
  //                     </td>
  //                     <td className="px-6 py-4 text-center">{item?.purpose}</td>
  //                     <td className="px-6 py-4 text-center">
  //                       <input
  //                         type="checkbox"
  //                         checked={item?.present}
  //                         onChange={() =>
  //                           handleCheckboxChange(item?._id)
  //                         }
  //                         className="h-5 w-5 text-[#172554] focus:bg-[#172544] peer-checked:bg-[#172554] border-gray-300 rounded"
  //                       />
  //                     </td>
  //                   </tr>
  //                 );
  //               })}
  //             </tbody>
  //           </table>
  //         </div>

  //         <div className="mt-5 flex flex-col gap-y-5 items-center">
  //           <button
  //             className="bg-[#172554] px-5 py-2 rounded-md text-white hover:bg-[#172554] transition-colors duration-300"
  //             onClick={() => handleupdateAttendance(date, list)}
  //           >
  //             Save Changes
  //           </button>
  //           <button
  //             className="bg-[#172554] px-5 py-2 rounded-md text-white hover:bg-[#172554] transition-colors duration-300"
  //             onClick={remindAll}
  //           >
  //             Remind Absentees
  //           </button>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  if (attendanceListLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#EFE3C2] to-[#85A947]/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#85A947]/30 border-t-[#3E7B27] mx-auto mb-4"></div>
          <p className="text-[#3E7B27] font-semibold text-lg">
            Loading scheduled visits...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE3C2] to-[#85A947]/10 flex flex-col py-10 px-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-5 h-5 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
          <h2 className="text-4xl sm:text-3xl tracking-widest md:text-5xl font-bold text-[#123524] text-center">
            SCHEDULED VISITS
          </h2>
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

        {!list || list?.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-12 border border-[#85A947]/20">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#EFE3C2] rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-10 h-10 bg-[#85A947]/60 rounded-full"></div>
              </div>
              <p className="text-xl font-bold text-[#3E7B27] mb-2 tracking-widest">
                No followup was scheduled for the chosen date.
              </p>
              <p className="text-[#123524]/60">
                Select a different date to view scheduled visits
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#85A947]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-[#123524] to-[#3E7B27] text-white">
                    <th className="px-8 py-5 text-center font-bold text-lg">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        Pet Name
                      </div>
                    </th>
                    <th className="px-8 py-5 text-center font-bold text-lg">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        Species
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
                        Present
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list?.map((item, idx) => {
                    return (
                      <tr
                        key={idx}
                        className="bg-gradient-to-r from-white to-[#EFE3C2]/20 border-b-2 border-[#85A947]/20 hover:from-[#EFE3C2]/30 hover:to-[#85A947]/10 transition-all duration-300 hover:shadow-md"
                      >
                        <td className="px-8 py-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 bg-[#85A947] rounded-full"></div>
                            <span className="font-bold text-[#123524] text-lg">
                              {item?.petId?.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className="font-semibold text-[#123524]">
                            {item?.petId?.species}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className="font-semibold text-[#123524]">
                            {item?.petId?.owner?.name}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-2 h-2 bg-[#3E7B27] rounded-full"></div>
                            <span className="font-medium text-[#123524]">
                              {item?.petId?.owner?.phone}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className="font-semibold text-[#3E7B27]">
                            {item?.purpose}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <div className="flex items-center justify-center">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={item?.present}
                                onChange={() => handleCheckboxChange(item?._id)}
                                className="w-6 h-6 text-[#3E7B27] bg-white border-2 border-[#85A947]/50 rounded-md focus:ring-4 focus:ring-[#85A947]/20 checked:bg-[#3E7B27] checked:border-[#3E7B27] transition-all duration-200"
                              />
                              {item?.present && (
                                <div className="absolute top-1 left-1 w-4 h-4 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-8 bg-gradient-to-r from-[#EFE3C2]/20 to-white border-t-2 border-[#85A947]/20">
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <button
                  className="px-8 py-4 bg-gradient-to-r from-[#123524] to-[#3E7B27] text-white font-bold text-lg rounded-xl hover:from-[#3E7B27] hover:to-[#85A947] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#85A947]/30"
                  onClick={() => handleupdateAttendance(date, list)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    Save Changes
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </button>

                <button
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-orange-300"
                  onClick={remindAll}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    Remind Absentees
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
