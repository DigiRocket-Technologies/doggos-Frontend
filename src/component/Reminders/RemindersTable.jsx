import React from "react";
import "../../App.css";

// const RemindersTable = ({ list, remindAll }) => {
//   return !list || list?.length === 0 ? (
//     <div className="w-[90%] p-6 mt-5  text-gray-800 rounded-lg shadow-md">
//         <p className="text-center tracking-widest text-lg font-semibold">
//           No Reminders for today.
//         </p>
//       </div>
//   ):(
//     <div className="w-[90%] overflow-x-scroll hidescroller  mx-auto mt-5 text-[12px] lg:text-[15px] flex flex-col gap-y-4 items-center justify-center">
//     <table className="min-w-full table-auto rounded-lg shadow-md">
//       <thead>
//         <tr className="bg-[#172554] text-white text-left">
//           <th className="px-6 py-3 text-center">No.</th>
//           <th className="px-6 py-3 text-center">Pet Name</th>
//           <th className="px-6 py-3 text-center">Owner Name</th>
//           <th className="px-6 py-3 text-center">Contact</th>
//           <th className="px-6 py-3 text-center">Purpose</th>
//           <th className="px-6 py-3 text-center">Scheduled Date</th>
//         </tr>
//       </thead>
//       <tbody>
//         {list?.map((item, idx) => {
//           return (
//             <tr
//               className="bg-white"
//               key={idx}
//             >
//               <td className="px-6 py-4 text-center">{idx + 1}</td>
//               <td className="px-6 py-4 text-center">{item?.pet?.name}</td>
//               <td className="px-6 py-4 text-center">
//                 {item?.pet?.owner?.name}
//               </td>
//               <td className="px-6 py-4 text-center">
//                 {item?.pet?.owner?.phone}
//               </td>
//               <td className="px-6 py-4 text-center">
//                 {item?.followUpPurpose || ""}
//               </td>
//               <td className="px-6 py-4 text-center">
//                 {item?.nextFollowUp?.substring(0, 10)}
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>

//     <button
//       className="bg-[#172554] px-5 py-2 rounded-md text-white mt-4"
//       onClick={remindAll}
//     >
//       Remind All
//     </button>
//   </div>
//   );

// };

const RemindersTable = ({ list, remindAll }) => {
  // return !list || list?.length === 0 ? (
  //   <div className="w-[90%] p-6 mt-5  text-gray-800 rounded-lg shadow-md">
  //       <p className="text-center tracking-widest text-lg font-semibold">
  //          No Reminders for Choosen Date
  //       </p>
  //     </div>
  // ):(
  //   <div className="w-[90%] overflow-x-scroll hidescroller  mx-auto mt-5 text-[12px] lg:text-[15px] flex flex-col gap-y-4 items-center justify-center">
  //   <table className="min-w-full table-auto rounded-lg shadow-md">
  //     <thead>
  //       <tr className="bg-[#172554] text-white text-left">
  //         <th className="px-6 py-3 text-center">No.</th>
  //         <th className="px-6 py-3 text-center">Pet Name</th>
  //         <th className="px-6 py-3 text-center">Owner Name</th>
  //         <th className="px-6 py-3 text-center">Contact</th>
  //         <th className="px-6 py-3 text-center">Purpose</th>
  //         <th className="px-6 py-3 text-center">Scheduled Date</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list?.map((item, idx) => {
  //         return (
  //           <tr
  //             className="bg-white"
  //             key={idx}
  //           >
  //             <td className="px-6 py-4 text-center">{idx + 1}</td>
  //             <td className="px-6 py-4 text-center">{item?.petName}</td>
  //             <td className="px-6 py-4 text-center">
  //               {item?.ownerName}
  //             </td>
  //             <td className="px-6 py-4 text-center">
  //               {item?.phone}
  //             </td>
  //             <td className="px-6 py-4 text-center">
  //               {item?.purpose}
  //             </td>
  //             <td className="px-6 py-4 text-center">
  //               {item?.scheduledDate?.substring(0, 10)||"NA"}
  //             </td>
  //           </tr>
  //         );
  //       })}
  //     </tbody>
  //   </table>

  //   <button
  //     className="bg-[#172554] px-5 py-2 rounded-md text-white mt-4"
  //     onClick={remindAll}
  //   >
  //     Remind All
  //   </button>
  // </div>
  // );
  return !list || list?.length === 0 ? (
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <p className="tracking-wider text-lg font-semibold text-[#3E7B27]">
          No Reminders for Chosen Date
        </p>
        <p className="text-sm text-[#123524]/70 mt-2">
          All caught up for this period!
        </p>
      </div>
    </div>
  ) : (
    <div className="w-[90%] overflow-x-auto mx-auto mt-5 text-[12px] lg:text-[15px] flex flex-col gap-y-6 items-center justify-center">
      <div className="w-full bg-white rounded-2xl shadow-xl border border-[#85A947]/20 overflow-hidden">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-[#123524] to-[#3E7B27] text-white text-left">
              <th className="px-6 py-4 text-center font-semibold tracking-wide">
                No.
              </th>
              <th className="px-6 py-4 text-center font-semibold tracking-wide">
                🐾 Pet Name
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
                📅 Scheduled Date
              </th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item, idx) => {
              return (
                <tr
                  className={`${
                    idx % 2 === 0 ? "bg-[#EFE3C2]/30" : "bg-white"
                  } hover:bg-[#85A947]/10 transition-colors duration-200 border-b border-[#85A947]/20`}
                  key={idx}
                >
                  <td className="px-6 py-4 text-center font-medium text-[#123524]">
                    <span className="w-8 h-8 bg-[#85A947] text-white rounded-full inline-flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-[#123524]">
                    {item?.petName}
                  </td>
                  <td className="px-6 py-4 text-center text-[#3E7B27] font-medium">
                    {item?.ownerName}
                  </td>
                  <td className="px-6 py-4 text-center text-[#123524]">
                    <span className="bg-[#85A947]/20 px-3 py-1 rounded-full text-sm font-medium">
                      {item?.phone}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-[#3E7B27]/20 text-[#123524] px-3 py-1 rounded-full text-sm font-medium">
                      {item?.purpose}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-[#123524] font-medium">
                    {item?.scheduledDate?.substring(0, 10) || "NA"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        className="bg-gradient-to-r from-[#123524] to-[#3E7B27] hover:from-[#3E7B27] hover:to-[#85A947] px-8 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 border border-[#85A947]/30 mt-4"
        onClick={remindAll}
      >
        🔔 Remind All
      </button>
    </div>
  );
};
export default RemindersTable;
