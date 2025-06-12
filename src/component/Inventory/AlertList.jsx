import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlertListOfInventory } from "../../store/slices/inventorySlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";

const AlertList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inventoryList } = useSelector((state) => state.inventory);
  useEffect(() => {
    dispatch(getAlertListOfInventory());
  }, []);

  const handleRefill = (id) => {
    navigate("/editInventory", { state: { id } });
  };

  return (
    //old code
    // <div className="mt-5 text-[12px] lg:text-[15px] flex flex-col gap-y-4 items-center justify-center">
    //   <h2 className="text-2xl">Alert List</h2>
    //   <table className="mt-5 w-[90%] sm:w-[85%] rounded-lg">
    //     <thead>
    //       <tr className="bg-[#D0DFF2] min-h-[40px] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-x-4">
    //         <th className="hidden col-span-1 lg:flex justify-center items-center">
    //           No.
    //         </th>
    //         <th className="flex col-span-2 justify-center items-center">
    //           Name{" "}
    //         </th>
    //         <th className="flex col-span-2 justify-center items-center">
    //           Stock Unit
    //         </th>
    //         <th className="flex col-span-2 justify-center items-center">
    //           Total Volume
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {inventoryList?.map((item, idx) => {
    //         return (
    //           <tr
    //             className={`${
    //               idx % 2 == 1 ? "bg-[white]" : "bg-[#F3F8FE]"
    //             }min-h-[40px] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-x-4`}
    //             key={idx}
    //           >
    //             <td className="hidden col-span-1 lg:flex justify-center items-center">
    //               {idx + 1}
    //             </td>
    //             <td className="flex col-span-2 justify-center items-center">
    //               {item?.itemName}
    //             </td>
    //             <td className="flex col-span-2 justify-center items-center">
    //               {item?.stockUnit}
    //             </td>
    //             <td className="flex col-span-2 justify-center items-center">
    //               {item?.totalVolume}
    //             </td>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>
    // </div>

    //// previous ui
    //     <div className="w-[90%] mx-auto mt-5 text-sm lg:text-base flex flex-col gap-y-4 items-center justify-center">
    //   <h2 className="text-2xl tracking-widest font-semibold">ALERT LIST</h2>
    //   <div className="overflow-x-auto w-full mt-5">
    //     <table className="min-w-full table-auto rounded-lg shadow-md">
    //       <thead>
    //         <tr className="bg-[#172554] text-white text-left">
    //           <th className="px-6 py-3 text-center">No.</th>
    //           <th className="px-6 py-3 text-center">Name</th>
    //           <th className="px-6 py-3 text-center">Stock Unit</th>
    //           <th className="px-6 py-3 text-center">Total Volume</th>
    //           <th className="px-6 py-3 text-center">Refill</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {inventoryList?.map((item, idx) => {
    //           return (
    //             <tr
    //               key={idx}
    //               className= "bg-white border-b border-[#E0E0E0]"
    //             >
    //               <td className="px-6 py-4 text-center">{idx + 1}</td>
    //               <td className="px-6 py-4 text-center">{item?.itemName}</td>
    //               <td className="px-6 py-4 text-center">{item?.stockUnit}</td>
    //               <td className="px-6 py-4 text-center">{item?.totalVolume}</td>
    //               <td className="px-6 py-4 text-center">
    //                 <button
    //                   onClick={()=>handleRefill(item?._id)}
    //                   className="bg-[#172554] text-white px-4 py-2 rounded-md hover:bg-[#0b1d3d] transition-colors duration-300"
    //                 >
    //                   Refill
    //                 </button>
    //               </td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <div className="w-[90%] mx-auto mt-8 text-sm lg:text-base flex flex-col gap-y-6 items-center justify-center">
      <div className="flex items-center gap-4">
        <div className="w-5 h-5 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
        <h2 className="text-3xl tracking-widest font-bold text-[#123524]">
          ALERT LIST
        </h2>
        <div className="w-5 h-5 bg-gradient-to-r from-[#85A947] to-[#3E7B27] rounded-full"></div>
      </div>

      <div className="overflow-x-auto w-full mt-8">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#85A947]/20 overflow-hidden">
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
                    Name
                  </div>
                </th>
                <th className="px-8 py-5 text-center font-bold text-lg">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    Stock Unit
                  </div>
                </th>
                <th className="px-8 py-5 text-center font-bold text-lg">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    Stock
                  </div>
                </th>
                <th className="px-8 py-5 text-center font-bold text-lg">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    Action
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryList?.map((item, idx) => {
                return (
                  <tr
                    key={idx}
                    className="bg-gradient-to-r from-white to-[#EFE3C2]/20 border-b-2 border-[#85A947]/20 hover:from-[#EFE3C2]/30 hover:to-[#85A947]/10 transition-all duration-300 hover:shadow-md"
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
                      <span className="font-semibold text-[#123524] text-lg">
                        {item?.itemName}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-[#3E7B27] rounded-full"></div>
                        <span className="font-medium text-[#123524]">
                          {item?.stockUnit}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-orange-600 text-lg">
                          {item?.stock}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button
                        onClick={() => handleRefill(item?._id)}
                        className="bg-gradient-to-r from-[#123524] to-[#3E7B27] text-white px-6 py-3 rounded-xl font-bold hover:from-[#3E7B27] hover:to-[#85A947] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#85A947]/30"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          Refill
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AlertList;
