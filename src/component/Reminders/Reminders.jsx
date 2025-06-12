import React, { useEffect, useState } from "react";
import RemindersTable from "./RemindersTable";
import BirthdayTable from "./BirthdayTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Reminders = () => {
  const [list, setList] = useState([]);
  const [section, setsection] = useState("today");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getVisits = async (section) => {
    const params = new URLSearchParams();
    if (section) params.append("type", section);
    const queryString = params.toString();

    const token = localStorage.getItem("authtoken");
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/visit/getvisits?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response?.status === 401) return dispatch(logout());

    const data = await response.json();
    setList(data?.List);
  };

  const remindAll = async () => {
    const res = confirm("Reminders will be send to following people ");

    if (!res) return;

    const List = list.map((item, idx) => {
      return {
        name: item?.pet?.name,
        breed: item?.pet?.breed,
        species: item?.pet?.species,
        ownerName: item?.pet?.owner?.name,
        ownerEmail: item?.pet?.owner?.email,
        date: item?.nextFollowUp,
      };
    });

    const token = localStorage.getItem("authtoken") || "";
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/reminders/sendreminders`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ List }),
      }
    );

    if (response?.status === 401) dispatch(logout());

    const data = await response.json();
  };

  useEffect(() => {
    if (section !== "birthday") getVisits(section);
  }, [section, dispatch]);

  // return (
  //   <div className="w-screen">
  //     <div className="flex w-[95%]  justify-between items-center">
  //       <div className="w-[50%] mt-5 md:w-[40%] text-[12px] md:text-xl mx-auto">
  //         <label
  //           htmlFor="countries"
  //           className="block  text-center mb-2 text-2xl font-medium text-gray-900 dark:text-white"
  //         >
  //           Select an option
  //         </label>
  //         <select
  //           id="countries"
  //           value={section}
  //           onChange={(e) => setsection(e.target.value)}
  //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //         >
  //           <option value="today">Reminders Today</option>
  //           <option value="next week">Reminders Next Week</option>
  //           <option value="birthday">Birthday Reminders</option>
  //         </select>
  //       </div>
  //       <button
  //         className="bg-[#172554] w-[150px] h-[50px]   sm:w-[200px]  sm:h-[50px] rounded-md text-white mt-16"
  //         onClick={()=>navigate("/attendance")}
  //       >
  //         Attendance
  //       </button>
  //     </div>

  //     {section !== "birthday" ? (
  //       <RemindersTable list={list} remindAll={remindAll} />
  //       ) :(  <BirthdayTable /> )}

  //   </div>
  // );
  return (
    <div className="w-screen bg-gradient-to-br from-[#EFE3C2] to-[#f5f0e8] min-h-screen">
      <div className="flex w-[95%] justify-between items-center pt-8 px-4">
        <div className="w-[50%] mt-5 md:w-[40%] text-[12px] md:text-xl mx-auto">
          <label
            htmlFor="countries"
            className="block text-center mb-4 text-2xl font-semibold text-[#123524] drop-shadow-sm"
          >
            Select an option
          </label>
          <div className="relative">
            <select
              id="countries"
              value={section}
              onChange={(e) => setsection(e.target.value)}
              className="bg-white border-2 border-[#85A947] text-[#123524] text-sm rounded-xl focus:ring-2 focus:ring-[#3E7B27] focus:border-[#3E7B27] focus:outline-none block w-full p-3.5 shadow-lg transition-all duration-200 hover:shadow-xl hover:border-[#3E7B27] appearance-none cursor-pointer font-medium"
            >
              <option value="today" className="bg-white text-[#123524] py-2">
                📅 Reminders Today
              </option>
              <option
                value="next week"
                className="bg-white text-[#123524] py-2"
              >
                📊 Reminders Next Week
              </option>
              <option value="birthday" className="bg-white text-[#123524] py-2">
                🎂 Birthday Reminders
              </option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-[#3E7B27]"
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
        </div>

        <button
          className="bg-gradient-to-r from-[#123524] to-[#3E7B27] hover:from-[#3E7B27] hover:to-[#123524] w-[150px] h-[50px] sm:w-[200px] sm:h-[50px] rounded-xl text-white mt-16 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 border border-[#85A947]/20"
          onClick={() => navigate("/attendance")}
        >
          👥 Attendance
        </button>
      </div>

      <div className="mt-8 px-4">
        {section !== "birthday" ? (
          <RemindersTable list={list} remindAll={remindAll} />
        ) : (
          <BirthdayTable />
        )}
      </div>
    </div>
  );
};

export default Reminders;
