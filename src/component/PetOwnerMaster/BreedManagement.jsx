import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getfilterPetsByBreed } from "../../store/slices/petSlice";
import { logout } from "../../store/slices/authSlice";
const BreedManagement = () => {
  const [pets, setPets] = useState([]);
  const { filterPetsByBreedLoading } = useSelector((state) => state.pets);

  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeciesOpen, setIsSpeciesOpen] = useState(false);
  const [isBreedOpen, setIsBreedOpen] = useState(false);

  const dispatch = useDispatch();

  const speciesBreeds = {
    dog: [
      "Labrador Retriever",
      "German Shepherd",
      "Golden Retriever",
      "Bulldog",
      "Beagle",
      "Poodle",
    ],
    cat: [
      "Persian",
      "Maine Coon",
      "Siamese",
      "Ragdoll",
      "Sphynx",
      "British Shorthair",
    ],
    bird: ["Parrot", "Canary", "Cockatiel", "Finch", "Budgerigar"],
    fish: ["Betta Fish", "Goldfish", "Guppy", "Angelfish", "Cichlid"],
    rabbit: ["Himalayan", "Holland Lop", "Mini Rex", "Netherland Dwarf"],
    reptile: [
      "Bearded Dragon",
      "Leopard Gecko",
      "Corn Snake",
      "Chameleon",
      "Turtle",
    ],
    hamster: ["Syrian Hamster", "Dwarf Hamster", "Roborovski Hamster"],
    other: ["Other"],
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async (breed = "") => {
    setLoading(true);
    setError(null);

    // Build query parameters
    const params = new URLSearchParams();
    if (breed) params.append("breed", breed);
    if (selectedSpecies) params.append("species", selectedSpecies);
    const queryString = params.toString();

    dispatch(getfilterPetsByBreed(queryString)).then((data) => {
      if (data?.payload?.success) setPets(data?.payload?.pets || []);
    });
  };

  const handleSpeciesChange = (value) => {
    setSelectedSpecies(value);
    setSelectedBreed("");
    setIsSpeciesOpen(false);
    fetchPets("");
  };

  const handleBreedChange = (value) => {
    setSelectedBreed(value);
    setIsBreedOpen(false);
    fetchPets(value);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return `${age} years`;
  };

  // Click handler for closing dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsSpeciesOpen(false);
        setIsBreedOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // return (
  //   <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
  //     <div className="mb-6">
  //       <h2 className="text-2xl font-bold">Pet Breed Management</h2>
  //     </div>

  //     {error && (
  //       <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
  //         {error}
  //       </div>
  //     )}

  //     <div className="space-y-6">
  //       <div className="flex gap-4">
  //         {/* Species Dropdown */}
  //         <div className="relative dropdown-container">
  //           <button
  //             onClick={(e) => {
  //               e.stopPropagation();
  //               setIsSpeciesOpen(!isSpeciesOpen);
  //               setIsBreedOpen(false);
  //             }}
  //             className="w-48 px-4 py-2 text-left bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           >
  //             {selectedSpecies
  //               ? selectedSpecies.charAt(0).toUpperCase() +
  //                 selectedSpecies.slice(1)
  //               : "Select Species"}
  //           </button>

  //           {isSpeciesOpen && (
  //             <div className="absolute z-10 w-48 mt-1 bg-white border rounded-md shadow-lg">
  //               {Object.keys(speciesBreeds).map((species) => (
  //                 <button
  //                   key={species}
  //                   className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
  //                   onClick={(e) => {
  //                     e.stopPropagation();
  //                     handleSpeciesChange(species);
  //                   }}
  //                 >
  //                   {species.charAt(0).toUpperCase() + species.slice(1)}
  //                 </button>
  //               ))}
  //             </div>
  //           )}
  //         </div>

  //         {/* Breed Dropdown */}
  //         <div className="relative dropdown-container">
  //           <button
  //             onClick={(e) => {
  //               e.stopPropagation();
  //               setIsBreedOpen(!isBreedOpen);
  //               setIsSpeciesOpen(false);
  //             }}
  //             disabled={!selectedSpecies}
  //             className={`w-48 px-4 py-2 text-left bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
  //               !selectedSpecies ? "opacity-50 cursor-not-allowed" : ""
  //             }`}
  //           >
  //             {selectedBreed || "Select Breed"}
  //           </button>

  //           {isBreedOpen && selectedSpecies && (
  //             <div className="absolute z-10 w-48 mt-1 bg-white border rounded-md shadow-lg">
  //               {speciesBreeds[selectedSpecies].map((breed) => (
  //                 <button
  //                   key={breed}
  //                   className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
  //                   onClick={(e) => {
  //                     e.stopPropagation();
  //                     handleBreedChange(breed);
  //                   }}
  //                 >
  //                   {breed}
  //                 </button>
  //               ))}
  //             </div>
  //           )}
  //         </div>
  //       </div>

  //       {filterPetsByBreedLoading ? (
  //         <div className="text-center">Loading...</div>
  //       ) : (
  //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  //           {pets.map((pet) => (
  //             <div
  //               key={pet._id}
  //               className="p-4 bg-white border rounded-lg shadow"
  //             >
  //               <h3 className="font-bold text-lg">{pet.name}</h3>
  //               <p className="text-sm text-gray-600">Species: {pet.species}</p>
  //               <p className="text-sm text-gray-600">Breed: {pet.breed}</p>
  //               <p className="text-sm text-gray-600">Sex: {pet.sex}</p>
  //               <p className="text-sm text-gray-600">
  //                 Age: {pet.dob ? calculateAge(pet.dob) : "Unknown"}
  //               </p>
  //               {pet.owner && (
  //                 <p className="text-sm text-gray-600">
  //                   Owner: {pet.owner.name}
  //                 </p>
  //               )}
  //             </div>
  //           ))}
  //           {pets.length === 0 && (
  //             <p className="text-gray-500 col-span-full text-center">
  //               No pets found with the selected criteria
  //             </p>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-[#EFE3C2] to-white rounded-2xl shadow-2xl border border-[#85A947]/20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#123524] mb-2 flex items-center gap-3">
          <div className="w-3 h-8 bg-gradient-to-b from-[#3E7B27] to-[#85A947] rounded-full"></div>
          Pet Breed Management
        </h2>
        <p className="text-[#3E7B27] text-sm font-medium">
          Filter and manage pets by species and breed
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
              !
            </div>
            {error}
          </div>
        </div>
      )}

      <div className="space-y-8">
        <div className="flex gap-6 flex-wrap">
          {/* Species Dropdown */}
          <div className="relative dropdown-container">
            <label className="block text-sm font-semibold text-[#123524] mb-2">
              Species
            </label>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSpeciesOpen(!isSpeciesOpen);
                setIsBreedOpen(false);
              }}
              className="w-52 px-4 py-3 text-left bg-white border-2 border-[#85A947]/30 rounded-xl hover:border-[#3E7B27] focus:outline-none focus:ring-4 focus:ring-[#85A947]/20 focus:border-[#3E7B27] transition-all duration-200 shadow-sm"
            >
              <span
                className={`${
                  selectedSpecies
                    ? "text-[#123524] font-medium"
                    : "text-gray-500"
                }`}
              >
                {selectedSpecies
                  ? selectedSpecies.charAt(0).toUpperCase() +
                    selectedSpecies.slice(1)
                  : "Select Species"}
              </span>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div
                  className={`w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#3E7B27] transition-transform duration-200 ${
                    isSpeciesOpen ? "rotate-180" : ""
                  }`}
                ></div>
              </div>
            </button>

            {isSpeciesOpen && (
              <div className="absolute z-20 w-52 mt-2 bg-white border-2 border-[#85A947]/30 rounded-xl shadow-xl overflow-hidden">
                {Object.keys(speciesBreeds).map((species) => (
                  <button
                    key={species}
                    className="w-full px-4 py-3 text-left hover:bg-[#EFE3C2] focus:outline-none focus:bg-[#85A947]/10 text-[#123524] font-medium transition-colors duration-150 border-b border-[#85A947]/10 last:border-b-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeciesChange(species);
                    }}
                  >
                    {species.charAt(0).toUpperCase() + species.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Breed Dropdown */}
          <div className="relative dropdown-container">
            <label className="block text-sm font-semibold text-[#123524] mb-2">
              Breed
            </label>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsBreedOpen(!isBreedOpen);
                setIsSpeciesOpen(false);
              }}
              disabled={!selectedSpecies}
              className={`w-52 px-4 py-3 text-left bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 shadow-sm ${
                !selectedSpecies
                  ? "opacity-50 cursor-not-allowed border-gray-200"
                  : "border-[#85A947]/30 hover:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 focus:border-[#3E7B27]"
              }`}
            >
              <span
                className={`${
                  selectedBreed ? "text-[#123524] font-medium" : "text-gray-500"
                }`}
              >
                {selectedBreed || "Select Breed"}
              </span>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div
                  className={`w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent transition-transform duration-200 ${
                    !selectedSpecies
                      ? "border-t-gray-400"
                      : "border-t-[#3E7B27]"
                  } ${isBreedOpen ? "rotate-180" : ""}`}
                ></div>
              </div>
            </button>

            {isBreedOpen && selectedSpecies && (
              <div className="absolute z-20 w-52 mt-2 bg-white border-2 border-[#85A947]/30 rounded-xl shadow-xl overflow-hidden">
                {speciesBreeds[selectedSpecies].map((breed) => (
                  <button
                    key={breed}
                    className="w-full px-4 py-3 text-left hover:bg-[#EFE3C2] focus:outline-none focus:bg-[#85A947]/10 text-[#123524] font-medium transition-colors duration-150 border-b border-[#85A947]/10 last:border-b-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBreedChange(breed);
                    }}
                  >
                    {breed}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {filterPetsByBreedLoading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-8 border-4 border-[#85A947]/30 border-t-[#3E7B27] rounded-full animate-spin"></div>
              <span className="text-[#3E7B27] font-medium">
                Loading pets...
              </span>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="p-6 bg-white border-2 border-[#85A947]/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#3E7B27]/40 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-xl text-[#123524]">
                    {pet.name}
                  </h3>
                  <div className="w-3 h-3 bg-[#85A947] rounded-full"></div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#3E7B27] rounded-full"></div>
                    <p className="text-sm font-medium text-[#123524]">
                      <span className="text-[#3E7B27]">Species:</span>{" "}
                      {pet.species}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#3E7B27] rounded-full"></div>
                    <p className="text-sm font-medium text-[#123524]">
                      <span className="text-[#3E7B27]">Breed:</span> {pet.breed}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#3E7B27] rounded-full"></div>
                    <p className="text-sm font-medium text-[#123524]">
                      <span className="text-[#3E7B27]">Sex:</span> {pet.sex}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#3E7B27] rounded-full"></div>
                    <p className="text-sm font-medium text-[#123524]">
                      <span className="text-[#3E7B27]">Age:</span>{" "}
                      {pet.dob ? calculateAge(pet.dob) : "Unknown"}
                    </p>
                  </div>

                  {pet.owner && (
                    <div className="flex items-center gap-2 pt-1 border-t border-[#85A947]/20">
                      <div className="w-2 h-2 bg-[#85A947] rounded-full"></div>
                      <p className="text-sm font-medium text-[#123524]">
                        <span className="text-[#3E7B27]">Owner:</span>{" "}
                        {pet.owner.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {pets.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-[#EFE3C2] rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#85A947] rounded-full opacity-60"></div>
                  </div>
                  <p className="text-[#3E7B27] font-medium text-lg">
                    No pets found with the selected criteria
                  </p>
                  <p className="text-[#123524]/60 text-sm">
                    Try adjusting your filter selections
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedManagement;
