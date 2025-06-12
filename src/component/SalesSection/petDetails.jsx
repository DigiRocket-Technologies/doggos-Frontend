import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { getPetDetails, getPetHistory } from "../../store/slices/petSlice";
import NewVisitPopup from "./VisitForm";
import VisitHistoryPopup from "./visitHistoryPopUp";
import VaccinationPopup from "../PetOwnerMaster/VaccinationPopup";
import { logout } from "../../store/slices/authSlice";
const PetDetails = ({ petId, onBack }) => {
  const [pet, setPet] = useState(null);
  const [visitHistory, setVisitHistory] = useState([]);
  const [showNewVisit, setShowNewVisit] = useState(false);
  const [showVisitHistory, setShowVisitHistory] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const petResponse = await dispatch(getPetDetails(petId));
        setPet(petResponse?.payload?.pet);

        const historyResponse = await dispatch(getPetHistory(petId));
        setVisitHistory(historyResponse?.payload?.visits || []);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPetData();
  }, [petId]);

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← Back to Pet List
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Pet Details</h1>

          {/* Pet Information */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-medium text-gray-700">Name</p>
              <p className="text-gray-900">{pet.name}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Species</p>
              <p className="text-gray-900">{pet.species}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Breed</p>
              <p className="text-gray-900">{pet.breed}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Date of Birth</p>
              <p className="text-gray-900">
                {format(new Date(pet.dob), "PP")}
              </p>
            </div>

          
            
                       {/* Visit History Button */}
                      { visitHistory?.length > 0 && (
                                <button
                            onClick={() => setShowVisitHistory(true)}
                            className="flex-1 text-left p-4 border rounded-lg hover:bg-gray-50"
                            >
                            <p className="font-medium text-gray-900">Visit History</p>
                            <p className="text-sm text-gray-500">Click to view details</p>
                            </button>
                      )}
                   

                    {/* Vaccinations Button */}
                    {pet.vaccinations?.length > 0 && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex-1 text-left p-4 border rounded-lg hover:bg-gray-50"
                    >
                        <p className="font-medium text-gray-900">Vaccinations</p>
                        <p className="text-sm text-gray-500">Click to view details</p>
                    </button>
                    )}
           
           

            <VaccinationPopup
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  vaccinations={pet.vaccinations || []}
                />
             
          </div>

          {/* Owner Information */}
          {pet.owner && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Owner Details
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="font-medium text-gray-700">Name</p>
                  <p className="text-gray-900">{pet.owner.name}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Phone</p>
                  <p className="text-gray-900">{pet.owner.phone}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Email</p>
                  <p className="text-gray-900">{pet.owner.email}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Address</p>
                  <p className="text-gray-900">{pet.owner.address}</p>
                </div>
              </div>
            </div>
          )}

          {/* New Visit Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowNewVisit(true)}
              className="w-[40%] py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add New Visit
            </button>
          </div>
        </div>
      </div>

      {/* Popups */}
      {showNewVisit && (
        <NewVisitPopup 
          pet={pet} 
          onClose={() => setShowNewVisit(false)} 
        />
      )}

      {showVisitHistory && (
        <VisitHistoryPopup
          visits={visitHistory}
          onClose={() => setShowVisitHistory(false)}
        />
      )}

     
    </div>
  );
};

export default PetDetails;