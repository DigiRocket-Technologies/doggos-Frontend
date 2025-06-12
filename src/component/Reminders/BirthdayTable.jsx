import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const BirthdayTable = () => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  const getBirthdayList = async (section) => {
    const token = localStorage.getItem("authtoken");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/pet/getpetsbybirthday`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response?.status === 401) dispatch(logout());

    const data = await response.json();

    setList(data?.List || []);
  };

  const remindAll = async () => {
    const res = confirm("Reminders will be send to following people ");

    if (!res) return;

    const token = localStorage.getItem("authtoken") || "";
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/reminders/sendbirthdayreminders`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ list }),
      }
    );

    if (response?.status === 401) dispatch(logout());

    const data = await response.json();
  };

  useEffect(() => {
    getBirthdayList();
  }, []);

  //   if( !list || list?.length === 0){
  //      return ( <div className="w-[90%] p-6 mt-5  text-gray-800 rounded-lg shadow-md">
  //       <p className="text-center tracking-widest text-lg font-semibold">
  //           No pet has birthday today.
  //       </p>
  //     </div>)
  //   }
  // else
  //  return (
  //     <div className="mt-5 text-[12px] w-[90%] mx-auto lg:text-[15px] flex flex-col gap-y-4 items-center justify-center">
  //       <table className="min-w-full table-auto rounded-lg shadow-md">
  //         <thead>
  //           <tr className="bg-[#172554] text-white text-left">
  //             <th className="px-6 py-3 text-center">No.</th>
  //             <th className="px-6 py-3 text-center">Pet Name</th>
  //             <th className="px-6 py-3 text-center">Owner Name</th>
  //             <th className="px-6 py-3 text-center">Contact</th>
  //             <th className="px-6 py-3 text-center">Purpose</th>
  //             <th className="px-6 py-3 text-center">Date Of Birth</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {list?.map((item, idx) => {
  //             return (
  //               <tr className="bg-white" key={idx}>
  //                 <td className="px-6 py-4 text-center">{idx + 1}</td>
  //                 <td className="px-6 py-4 text-center">{item?.name}</td>
  //                 <td className="px-6 py-4 text-center">{item?.owner?.name}</td>
  //                 <td className="px-6 py-4 text-center">{item?.owner?.phone}</td>
  //                 <td className="px-6 py-4 text-center">Birthday</td>
  //                 <td className="px-6 py-4 text-center">
  //                   {item?.dob?.substring(0, 10)}
  //                 </td>
  //               </tr>
  //             );
  //           })}
  //         </tbody>
  //       </table>

  //       <button
  //         className="bg-[#172554] px-5 py-2 rounded-md text-white mt-4"
  //         onClick={remindAll}
  //       >
  //         Remind All
  //       </button>
  //     </div>
  //   );
  if (!list || list?.length === 0) {
    return (
      <div className="w-[90%] mx-auto mt-8">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-12 border border-[#85A947]/20">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#EFE3C2] rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-10 h-10 bg-[#85A947]/60 rounded-full"></div>
            </div>
            <p className="text-xl font-bold text-[#3E7B27] mb-2 tracking-widest">
              No pet has birthday today.
            </p>
            <p className="text-[#123524]/60">
              Check back tomorrow for birthday celebrations! 🎉
            </p>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="mt-8 text-[12px] w-[90%] mx-auto lg:text-[15px] flex flex-col gap-y-6 items-center justify-center">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#85A947]/20 overflow-hidden w-full">
          <div className="flex items-center gap-3 p-6 bg-gradient-to-r from-[#EFE3C2]/30 to-white border-b border-[#85A947]/20">
            <div className="w-4 h-4 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
            <h3 className="text-2xl font-bold text-[#123524]">
              🎂 Birthday Celebrations Today
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
                      Date Of Birth
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {list?.map((item, idx) => {
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
                          <span className="text-2xl">🎂</span>
                          <span className="font-bold text-[#123524] text-lg">
                            {item?.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="font-semibold text-[#123524]">
                          {item?.owner?.name}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-[#3E7B27] rounded-full"></div>
                          <span className="font-medium text-[#123524]">
                            {item?.owner?.phone}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-xl">🎉</span>
                          <span className="font-bold text-[#3E7B27]">
                            Birthday
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                          <span className="font-semibold text-[#123524]">
                            {item?.dob?.substring(0, 10)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-pink-300"
            onClick={remindAll}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎁</span>
              <span>Send Birthday Wishes</span>
              <span className="text-xl">🎈</span>
            </div>
          </button>
        </div>
      </div>
    );
};

export default BirthdayTable;
