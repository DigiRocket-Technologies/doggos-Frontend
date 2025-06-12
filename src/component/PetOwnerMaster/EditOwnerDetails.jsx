import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editOwnerDetails } from "../../store/slices/petSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const EditOwnerInfo = ({ owner }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      segment: "",
      address: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (owner) {
      reset({
        name: owner.name || "",
        phone: owner.phone || "",
        email: owner.email || "",
        segment: owner.segment || "",
        address: owner.address || "",
      });
    }
  }, [owner, reset]);

  const onSubmit = (data) => {
    data.id = owner?._id;

    setIsLoading(true);
    dispatch(editOwnerDetails(data))
      .then((data) => {
        if (data?.payload?.success) {
          alert("Changes saved successfully");
          navigate("/dashboard");
        } else alert(data?.payload?.message);
      })
      .catch(() => {
        alert("Error saving data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // return (
  //   <div className="w-[95%] mt-8 mx-auto">
  //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //         <div>
  //           <label
  //             htmlFor="ownerName"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Owner Name
  //           </label>
  //           <input
  //             type="text"
  //             id="name"
  //             {...register("name", { required: true })}
  //             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //           />
  //         </div>

  //         <div>
  //           <label
  //             htmlFor="phone"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Phone
  //           </label>
  //           <input
  //             type="tel"
  //             id="phone"
  //             {...register("phone", {
  //               required: true,
  //               pattern: /^[0-9]{10}$/,
  //             })}
  //             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //           />
  //         </div>

  //         <div>
  //           <label
  //             htmlFor="email"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Email
  //           </label>
  //           <input
  //             type="email"
  //             id="email"
  //             {...register("email")}
  //             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //           />
  //         </div>

  //         <div>
  //           <label
  //             htmlFor="segment"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Segment
  //           </label>
  //           <select
  //             id="segment"
  //             {...register("segment", { required: true })}
  //             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //           >
  //             <option value="Day Care">Day Care</option>
  //             <option value="Veterinary">Veterinary</option>
  //           </select>
  //         </div>
  //       </div>

  //       <div>
  //         <label
  //           htmlFor="address"
  //           className="block text-sm font-medium text-gray-700"
  //         >
  //           Address
  //         </label>
  //         <textarea
  //           id="address"
  //           {...register("address", { required: true })}
  //           rows={3}
  //           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //         />
  //       </div>

  //       <div className="mt-6">
  //         <button
  //           disabled={isLoading}
  //           type="submit"
  //           className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //         >
  //           Save Changes
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
  return (
    <div className="w-[95%] mt-8 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#85A947]/20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-4 h-4 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
            <h3 className="text-2xl font-bold text-[#123524]">
              Owner Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label
                htmlFor="ownerName"
                className="block text-sm font-bold text-[#3E7B27] mb-2"
              >
                Owner Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                  placeholder="Enter owner's full name"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-bold text-[#3E7B27] mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                  })}
                  className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                  placeholder="Enter 10-digit phone number"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-[#3E7B27] mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                  placeholder="Enter email address"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="segment"
                className="block text-sm font-bold text-[#3E7B27] mb-2"
              >
                Service Segment
              </label>
              <div className="relative">
                <select
                  id="segment"
                  {...register("segment", { required: true })}
                  className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="Day Care">Day Care</option>
                  <option value="Veterinary">Veterinary</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#3E7B27]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <label
              htmlFor="address"
              className="block text-sm font-bold text-[#3E7B27] mb-2"
            >
              Address
            </label>
            <div className="relative">
              <textarea
                id="address"
                {...register("address", { required: true })}
                rows={4}
                className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200 resize-none"
                placeholder="Enter complete address including city, state, and postal code"
              />
              <div className="absolute right-3 top-4 w-2 h-2 bg-[#85A947] rounded-full"></div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              disabled={isLoading}
              type="submit"
              className={`px-8 py-4 border-2 border-[#3E7B27] rounded-xl shadow-lg text-base font-bold text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#85A947]/30 ${
                isLoading
                  ? "bg-[#123524]/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#123524] to-[#3E7B27] hover:from-[#3E7B27] hover:to-[#85A947] hover:shadow-xl hover:-translate-y-0.5"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Saving Changes...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Save Changes</span>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditOwnerInfo;
