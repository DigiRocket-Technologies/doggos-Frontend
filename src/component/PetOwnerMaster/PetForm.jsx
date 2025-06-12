import { useState } from "react";
import { useForm } from "react-hook-form";
import { addPet } from "../../store/slices/petSlice";
import { useDispatch, useSelector } from "react-redux";

const PetForm = () => {
  const { addPetLoading } = useSelector((state) => state.pets);
  const { register, handleSubmit, reset } = useForm();
  const [pets, setPets] = useState([{ vaccinations: [] }]);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(addPet(data))
      .then((data) => {
        if (data?.payload?.success) {
          alert("Data saved successfully");
          reset();
          setPets([{}]);
        } else alert("Error saving data");
      })
      .catch((err) => {
        alert("Error saving data");
      });
  };

  const speciesBreeds = {
    dog: [
      "Labrador Retriever",
      "German Shepherd",
      "Golden Retriever",
      "Shih Tzu",
      "Siberian Husky",
      "Poodle (Toy, Miniature, Standard)",
      "Maltipoo",
      "Pug",
      "Beagle",
      "Rottweiler",
      "Doberman Pinscher",
      "Boxer",
      "Great Dane",
      "Saint Bernard",
      "Cocker Spaniel",
      "Lhasa Apso",
      "Dachshund",
      "Chihuahua (Teacup & Standard)",
      "Pitbull Terrier",
      "Akita Inu",
      "Dalmatian",
      "French Bulldog",
      "English Bulldog",
      "Border Collie",
      "Bullmastiff",
      "Alaskan Malamute",
      "Cane Corso",
      "Belgian Malinois",
      "Pomeranian (including Toy Pomeranian)",
      "Yorkshire Terrier",
      "American Eskimo Dog",
      "Boston Terrier",
      "Afghan Hound",
      "Cavalier King Charles Spaniel",
      "Maltese",
      "Samoyed",
      "Newfoundland",
      "West Highland White Terrier (Westie)",
      "Miniature Schnauzer",
      "Bernese Mountain Dog",
      "Irish Setter",
      "Basset Hound",
      "Scottish Terrier",
      "Havanese",
      "Weimaraner",
      "Jack Russell Terrier",
      "Bloodhound",
      "Whippet",
      "Shetland Sheepdog",
      "Shiba Inu",
      "Indian Spitz",
      "Rajapalayan",
      "Gaddi Kutta",
      "Indie",
    ],
  };

  const handleAddPet = () => {
    setPets([...pets, { vaccinations: [] }]);
  };

  const handleAddVaccination = (petIndex) => {
    const newPets = [...pets];
    newPets[petIndex].vaccinations = [
      ...(newPets[petIndex].vaccinations || []),
      { name: "", numberOfDose: "" },
    ];
    setPets(newPets);
  };

  const handleRemoveVaccination = (petIndex, vaccinationIndex) => {
    const newPets = [...pets];
    newPets[petIndex].vaccinations.splice(vaccinationIndex, 1);
    setPets(newPets);
  };

  // if (addPetLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // } else
  //   return (
  //     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
  //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  //         <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
  //           Owner Information
  //         </h3>

  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //           <div>
  //             <label
  //               htmlFor="ownerName"
  //               className="block text-sm font-medium text-gray-700"
  //             >
  //               Owner Name
  //             </label>
  //             <input
  //               type="text"
  //               id="ownerName"
  //               {...register("ownerName", { required: true })}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //             />
  //           </div>

  //           <div>
  //             <label
  //               htmlFor="phone"
  //               className="block text-sm font-medium text-gray-700"
  //             >
  //               Phone
  //             </label>
  //             <input
  //               type="tel"
  //               id="phone"
  //               {...register("phone", {
  //                 required: true,
  //                 pattern: /^[0-9]{10}$/,
  //               })}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //             />
  //           </div>

  //           <div>
  //             <label
  //               htmlFor="email"
  //               className="block text-sm font-medium text-gray-700"
  //             >
  //               Email
  //             </label>
  //             <input
  //               type="email"
  //               id="email"
  //               {...register("email")}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //             />
  //           </div>

  //           <div>
  //             <label
  //               htmlFor="segment"
  //               className="block text-sm font-medium text-gray-700"
  //             >
  //               Segment
  //             </label>
  //             <select
  //               id="segment"
  //               {...register("segment", { required: true })}
  //               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //             >
  //               <option value="Day Care">Day Care</option>
  //               <option value="Veterinary">Veterinary</option>
  //             </select>
  //           </div>
  //         </div>

  //         <div>
  //           <label
  //             htmlFor="address"
  //             className="block text-sm font-medium text-gray-700"
  //           >
  //             Address
  //           </label>
  //           <textarea
  //             id="address"
  //             {...register("address", { required: true })}
  //             rows={3}
  //             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //           />
  //         </div>
  //         <h2 className="text-2xl font-bold text-gray-800 mb-6">
  //           Pet Information
  //         </h2>

  //         {pets?.map((pet, petIndex) => (
  //           <div key={petIndex}>
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //               <div>
  //                 <label
  //                   htmlFor={`name_${petIndex}`}
  //                   className="block text-sm font-medium text-gray-700"
  //                 >
  //                   Name
  //                 </label>
  //                 <input
  //                   type="text"
  //                   id={`name_${petIndex}`}
  //                   {...register(`pets[${petIndex}].name`, { required: true })}
  //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //                 />
  //               </div>

  //               <div>
  //                 <label
  //                   htmlFor={`species_${petIndex}`}
  //                   className="block text-sm font-medium text-gray-700"
  //                 >
  //                   Species
  //                 </label>
  //                 <select
  //                   id={`species_${petIndex}`}
  //                   {...register(`pets[${petIndex}].species`, {
  //                     required: true,
  //                   })}
  //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //                 >
  //                   <option value="">Select a species</option>
  //                   <option value="dog">Dog</option>
  //                   <option value="cat">Cat</option>
  //                   <option value="bird">Bird</option>
  //                   <option value="fish">Fish</option>
  //                   <option value="rabbit">Rabbit</option>
  //                   <option value="reptile">Reptile</option>
  //                   <option value="hamster">Hamster</option>
  //                   <option value="other">Other</option>
  //                 </select>
  //               </div>

  //               <div>
  //                 <label
  //                   htmlFor={`breed_${petIndex}`}
  //                   className="block text-sm font-medium text-gray-700"
  //                 >
  //                   Breed
  //                 </label>
  //                 <select
  //                   id={`breed_${petIndex}`}
  //                   {...register(`pets[${petIndex}].breed`, { required: true })}
  //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //                 >
  //                   <option value="">Select a breed</option>
  //                   {/* Grouping species and their breeds */}
  //                   {Object.keys(speciesBreeds)?.map((species) => (
  //                     <optgroup
  //                       label={
  //                         species.charAt(0).toUpperCase() + species.slice(1)
  //                       }
  //                       key={species}
  //                     >
  //                       {speciesBreeds[species].map((breed) => (
  //                         <option key={breed} value={breed}>
  //                           {breed}
  //                         </option>
  //                       ))}
  //                     </optgroup>
  //                   ))}
  //                   <option value="Other">Other</option>
  //                 </select>
  //               </div>

  //               <div>
  //                 <label
  //                   htmlFor={`sex_${petIndex}`}
  //                   className="block text-sm font-medium text-gray-700"
  //                 >
  //                   Sex
  //                 </label>
  //                 <select
  //                   id={`sex_${petIndex}`}
  //                   {...register(`pets[${petIndex}].sex`, { required: true })}
  //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //                 >
  //                   <option value="Male">Male</option>
  //                   <option value="Female">Female</option>
  //                 </select>
  //               </div>

  //               <div>
  //                 <label
  //                   htmlFor={`color_${petIndex}`}
  //                   className="block text-sm font-medium text-gray-700"
  //                 >
  //                   Color
  //                 </label>
  //                 <input
  //                   type="text"
  //                   id={`color_${petIndex}`}
  //                   {...register(`pets[${petIndex}].color`, { required: true })}
  //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //                 />
  //               </div>

  //               <div>
  //                 <label
  //                   htmlFor={`dob_${petIndex}`}
  //                   className="block text-sm font-medium text-gray-700"
  //                 >
  //                   Date of Birth
  //                 </label>
  //                 <input
  //                   type="date"
  //                   id={`dob_${petIndex}`}
  //                   {...register(`pets[${petIndex}].dob`, { required: true })}
  //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //                 />
  //               </div>
  //               <div className="flex">
  //                 <label
  //                   htmlFor={`neutered_${petIndex}`}
  //                   className="block text-sm font-medium text-gray-700"
  //                 >
  //                   Neutered
  //                 </label>
  //                 <input
  //                   type="checkbox"
  //                   id={`neutered_${petIndex}`}
  //                   {...register(`pets[${petIndex}].neutered`)}
  //                   className="mt-1 ml-4 block w-4 h-4 rounded-full border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //                 />
  //               </div>
  //               <div>
  //                 <label
  //                   htmlFor={`registrationDate_${petIndex}`}
  //                   className="block text-sm font-medium text-gray-700"
  //                 >
  //                   Registration date
  //                 </label>
  //                 <input
  //                   type="date"
  //                   id={`dob_${petIndex}`}
  //                   {...register(`pets[${petIndex}].registrationDate`, {
  //                     required: true,
  //                   })}
  //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //                 />
  //               </div>
  //               {pet.vaccinations &&
  //                 pet.vaccinations.map((vaccination, vaccinationIndex) => (
  //                   <div
  //                     key={vaccinationIndex}
  //                     className="flex items-center gap-4 mb-2"
  //                   >
  //                     <input
  //                       type="text"
  //                       {...register(
  //                         `pets[${petIndex}].vaccinations[${vaccinationIndex}].name`
  //                       )}
  //                       className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //                       placeholder="Vaccination Name"
  //                     />
  //                     <input
  //                       type="number"
  //                       {...register(
  //                         `pets[${petIndex}].vaccinations[${vaccinationIndex}].numberOfDose`
  //                       )}
  //                       className="w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  //                       placeholder="Doses"
  //                     />
  //                     <button
  //                       type="button"
  //                       onClick={() =>
  //                         handleRemoveVaccination(petIndex, vaccinationIndex)
  //                       }
  //                       className="text-red-600 hover:text-red-800 text-sm"
  //                     >
  //                       Remove
  //                     </button>
  //                   </div>
  //                 ))}
  //               <div className="mt-2">
  //                 <button
  //                   type="button"
  //                   onClick={() => handleAddVaccination(petIndex)}
  //                   className="py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //                 >
  //                   Add Vaccination
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         ))}

  //         <button
  //           type="button"
  //           onClick={handleAddPet}
  //           className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //         >
  //           Add Another Pet
  //         </button>

  //         <div>
  //           <button
  //             type="submit"
  //             className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //           >
  //             Submit
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   );
  if (addPetLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#EFE3C2] to-[#85A947]/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#85A947]/30 border-t-[#3E7B27] mx-auto mb-4"></div>
          <p className="text-[#3E7B27] font-semibold text-lg">
            Adding pet information...
          </p>
        </div>
      </div>
    );
  } else
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EFE3C2] to-[#85A947]/10 py-8">
        <div className="max-w-4xl mx-auto p-8 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#85A947]/20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-5 h-5 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
            <h1 className="text-3xl font-bold text-[#123524]">
              Add New Pet & Owner
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Owner Information Section */}
            <div className="bg-gradient-to-br from-[#85A947]/10 to-[#EFE3C2]/50 rounded-2xl p-8 border border-[#85A947]/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-4 h-4 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
                <h3 className="text-2xl font-bold text-[#123524]">
                  Owner Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      id="ownerName"
                      {...register("ownerName", { required: true })}
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

              <div className="mt-6 space-y-2">
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
            </div>

            {/* Pet Information Section */}
            <div className="bg-white/90 rounded-2xl p-8 border border-[#85A947]/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-4 h-4 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
                <h2 className="text-2xl font-bold text-[#123524]">
                  Pet Information
                </h2>
              </div>

              {pets?.map((pet, petIndex) => (
                <div
                  key={petIndex}
                  className="mb-10 p-6 bg-[#EFE3C2]/20 rounded-xl border border-[#85A947]/20"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-[#85A947] rounded-full"></div>
                    <h4 className="text-lg font-bold text-[#123524]">
                      Pet #{petIndex + 1}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor={`name_${petIndex}`}
                        className="block text-sm font-bold text-[#3E7B27] mb-2"
                      >
                        Pet Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id={`name_${petIndex}`}
                          {...register(`pets[${petIndex}].name`, {
                            required: true,
                          })}
                          className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                          placeholder="Enter pet's name"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`species_${petIndex}`}
                        className="block text-sm font-bold text-[#3E7B27] mb-2"
                      >
                        Species
                      </label>
                      <div className="relative">
                        <select
                          id={`species_${petIndex}`}
                          {...register(`pets[${petIndex}].species`, {
                            required: true,
                          })}
                          className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="">Select a species</option>
                          <option value="dog">Dog</option>
                          <option value="cat">Cat</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#3E7B27]"></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`breed_${petIndex}`}
                        className="block text-sm font-bold text-[#3E7B27] mb-2"
                      >
                        Breed
                      </label>
                      <div className="relative">
                        <select
                          id={`breed_${petIndex}`}
                          {...register(`pets[${petIndex}].breed`, {
                            required: true,
                          })}
                          className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="">Select a breed</option>
                          {Object.keys(speciesBreeds)?.map((species) => (
                            <optgroup
                              label={
                                species.charAt(0).toUpperCase() +
                                species.slice(1)
                              }
                              key={species}
                            >
                              {speciesBreeds[species].map((breed) => (
                                <option key={breed} value={breed}>
                                  {breed}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#3E7B27]"></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`sex_${petIndex}`}
                        className="block text-sm font-bold text-[#3E7B27] mb-2"
                      >
                        Sex
                      </label>
                      <div className="relative">
                        <select
                          id={`sex_${petIndex}`}
                          {...register(`pets[${petIndex}].sex`, {
                            required: true,
                          })}
                          className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#3E7B27]"></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`color_${petIndex}`}
                        className="block text-sm font-bold text-[#3E7B27] mb-2"
                      >
                        Color
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id={`color_${petIndex}`}
                          {...register(`pets[${petIndex}].color`, {
                            required: true,
                          })}
                          className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                          placeholder="Enter pet's color"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`dob_${petIndex}`}
                        className="block text-sm font-bold text-[#3E7B27] mb-2"
                      >
                        Date of Birth
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id={`dob_${petIndex}`}
                          {...register(`pets[${petIndex}].dob`, {
                            required: true,
                          })}
                          className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium transition-all duration-200"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-[#3E7B27] mb-2">
                        Neutered
                      </label>
                      <div className="flex items-center gap-3 p-4 border-2 border-[#85A947]/30 rounded-xl bg-white/90 backdrop-blur-sm">
                        <input
                          type="checkbox"
                          id={`neutered_${petIndex}`}
                          {...register(`pets[${petIndex}].neutered`)}
                          className="w-5 h-5 text-[#3E7B27] border-2 border-[#85A947]/50 rounded focus:ring-[#85A947]/20 focus:ring-4 transition-all duration-200"
                        />
                        <label
                          htmlFor={`neutered_${petIndex}`}
                          className="text-[#123524] font-medium cursor-pointer"
                        >
                          Pet has been neutered/spayed
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor={`registrationDate_${petIndex}`}
                        className="block text-sm font-bold text-[#3E7B27] mb-2"
                      >
                        Registration Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id={`registrationDate_${petIndex}`}
                          {...register(`pets[${petIndex}].registrationDate`, {
                            required: true,
                          })}
                          className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium transition-all duration-200"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Vaccinations Section */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#85A947] rounded-full"></div>
                      <label className="block text-lg font-bold text-[#123524]">
                        Vaccinations
                      </label>
                    </div>

                    <div className="space-y-4">
                      {pet.vaccinations &&
                        pet.vaccinations.map(
                          (vaccination, vaccinationIndex) => (
                            <div
                              key={vaccinationIndex}
                              className="flex items-center gap-4 p-4 bg-white/80 rounded-xl border border-[#85A947]/20"
                            >
                              <div className="relative flex-1">
                                <input
                                  type="text"
                                  {...register(
                                    `pets[${petIndex}].vaccinations[${vaccinationIndex}].name`
                                  )}
                                  className="w-full px-4 py-3 border-2 border-[#85A947]/30 rounded-lg shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                                  placeholder="Vaccination Name"
                                />
                              </div>
                              <div className="relative w-32">
                                <input
                                  type="number"
                                  {...register(
                                    `pets[${petIndex}].vaccinations[${vaccinationIndex}].numberOfDose`
                                  )}
                                  className="w-full px-4 py-3 border-2 border-[#85A947]/30 rounded-lg shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                                  placeholder="Doses"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveVaccination(
                                    petIndex,
                                    vaccinationIndex
                                  )
                                }
                                className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300"
                              >
                                Remove
                              </button>
                            </div>
                          )
                        )}
                    </div>

                    <div className="flex justify-center mt-4">
                      <button
                        type="button"
                        onClick={() => handleAddVaccination(petIndex)}
                        className="px-6 py-3 border-2 border-[#85A947] rounded-xl shadow-sm text-sm font-bold text-[#3E7B27] bg-[#EFE3C2]/50 hover:bg-[#85A947] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#85A947]/30 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-current rounded-full"></div>
                          </div>
                          Add Vaccination
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={handleAddPet}
                  className="px-8 py-4 border-2 border-[#3E7B27] rounded-xl shadow-lg text-base font-bold text-[#3E7B27] bg-[#EFE3C2]/50 hover:bg-[#3E7B27] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#85A947]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-current rounded-full"></div>
                    </div>
                    Add Another Pet
                  </div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8 border-t border-[#85A947]/20">
              <button
                type="submit"
                className="px-12 py-4 border-2 border-[#3E7B27] rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-[#123524] to-[#3E7B27] hover:from-[#3E7B27] hover:to-[#85A947] focus:outline-none focus:ring-4 focus:ring-[#85A947]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  Submit Pet Registration
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default PetForm;
