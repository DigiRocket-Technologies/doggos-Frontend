import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { getPetsByRegistrationDate } from "../../store/slices/petSlice";
import {logout} from "../../store/slices/authSlice"
import PetDetails from "./petDetails";

const PetManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [uniqueSpecies, setUniqueSpecies] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const dispatch = useDispatch();

  const fetchPets = async () => {
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await dispatch(getPetsByRegistrationDate(formattedDate))
      const petList = response?.payload?.pets || [];
      setPets(petList);
      setFilteredPets(petList);
      const species = [...new Set(petList.map(pet => pet.species))];
      setUniqueSpecies(species);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [selectedDate,dispatch]);

  const handleSpeciesFilter = (species) => {
    setSelectedSpecies(species);
    if (!species) {
      setFilteredPets(pets);
    } else {
      const filtered = pets.filter(
        pet => pet.species.toLowerCase() === species.toLowerCase()
      );
      setFilteredPets(filtered);
    }
  };

  if (selectedPetId) {
    return (
      <PetDetails 
        petId={selectedPetId} 
        onBack={() => setSelectedPetId(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Pet Registration List
          </h1>

          <div className="space-y-6">
            {/* Date Selection */}
            <div className="flex gap-4">
              <input
                type="date"
                value={format(selectedDate, "yyyy-MM-dd")}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={() => setSelectedDate(new Date())}
                className="px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Today
              </button>
            </div>

            {/* Species Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Species
              </label>
              <select
                value={selectedSpecies}
                onChange={(e) => handleSpeciesFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">All Species</option>
                {uniqueSpecies.map((species) => (
                  <option key={species} value={species}>
                    {species}
                  </option>
                ))}
              </select>
            </div>

            {/* Pet List */}
            <div className="space-y-3">
              {filteredPets.length > 0 ? (
                filteredPets.map((pet) => (
                  <button
                    key={pet._id}
                    onClick={() => setSelectedPetId(pet._id)}
                    className="w-full text-left p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{pet.name}</div>
                    <div className="text-sm text-gray-500">
                      {pet.species} - {pet.breed}
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No pets registered on this date
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetManagement;