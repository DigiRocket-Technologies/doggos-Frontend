import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import VaccinationPopup from "./PetOwnerMaster/VaccinationPopup";

import {
  getPetHistory,
  getPetsByRegistrationDate,
} from "../store/slices/petSlice";
import { getAllInventory } from "../store/slices/inventorySlice";
import { getPetDetails } from "../store/slices/petSlice";
import { addVisit } from "../store/slices/visitSlice";

export default function PetManagement() {
  const { inventoryList } = useSelector((state) => state.inventory);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [uniqueSpecies, setUniqueSpecies] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visitHistory, setVisitHistory] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [others, setOthers]=useState("");

  const dispatch = useDispatch();
  const [min, setMin] = useState();

  const [visitForm, setVisitForm] = useState({
    purpose: "",
    nextFollowUp: "",
    followUpTime: "",
    followUpPurpose: "",
    customerType: "NGO",
    itemDetails: [], // Item details are now part of visitForm
  });

  const purposes = [
    "Inquiry",
    "Dog park",
    "Veterinary",
    "Boarding",
    "Day care",
    "Day school",
    "Play school",
    "Grooming",
    "Shop",
    "Others",
  ];

  // Fetch inventory data
  const fetchInventory = async () => {
    dispatch(getAllInventory());
  };

  const fetchPets = async () => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    dispatch(getPetsByRegistrationDate(formattedDate)).then((data) => {
      
      setPets(data?.payload?.pets || []);
      const species = [
        ...new Set(data?.payload?.pets.map((pet) => pet.species)),
      ];
      setUniqueSpecies(species);
      setFilteredPets(data?.payload?.pets);
    });
  };

  const fetchVisitHistory = async (petId) => {
    dispatch(getPetHistory(petId))
      .then((data) => {
       
        setVisitHistory(data?.payload?.visits)
      })
      .catch((err) => {
      
      });
  };

  const handleSpeciesFilter = (species) => {
    setSelectedSpecies(species);
    const filtered = species
      ? pets.filter(
          (pet) => pet.species.toLowerCase() === species.toLowerCase()
        )
      : pets;
    setFilteredPets(filtered);
  };

  const handlePetSelect = async (petId) => {
    dispatch(getPetDetails(petId)).then((data) => {
      setSelectedPet(data?.payload?.pet);
      fetchVisitHistory(petId);
    });
  };

  const deleteItemRow = (indexToDelete) => {
    const updatedItems = visitForm.itemDetails.filter(
      (_, index) => index !== indexToDelete
    );
    setVisitForm({ ...visitForm, itemDetails: updatedItems });
  };

  const addItemRow = () => {
    setVisitForm((prev) => ({
      ...prev,
      itemDetails: [...prev.itemDetails, { item: "", dose: "", volumeML: "" }],
    }));
  };

  const updateItemDetails = (index, field, value) => {
    const updatedItemDetails = [...visitForm.itemDetails];

    updatedItemDetails[index][field] = value;

   
    setVisitForm((prev) => ({ ...prev, itemDetails: updatedItemDetails }));
  };

  const calculateTotalPrice = () => {
    return visitForm.itemDetails.reduce((total, item) => {
      const selectedInventoryItem = inventoryList.find(
        (inv) => inv._id === item.item
      );
      if (!selectedInventoryItem) return total;

      const unitPrice =
        visitForm.customerType === "NGO"
          ? selectedInventoryItem.unitMinRetailPriceNGO
          : selectedInventoryItem.unitMaxRetailPriceCustomer;

      const volPrice = item.volumeML / selectedInventoryItem.volumeML;

      return total + unitPrice * (volPrice || 0);
    }, 0);
  };

  const handleVisitFormSubmit = async (e) => {
    e.preventDefault();

    if (!visitForm.followUpPurpose) {
      alert("Please provide a purpose for the next follow-up.");
      return;
    }

    if (visitForm.itemDetails.some((item) => !item.item || !item.dose)) {
      alert("Please complete all item details.");
      return;
    }

    try {
      const totalPrice = calculateTotalPrice();

      const formData = {};

      const tempItemDetails = visitForm?.itemDetails;

      const updatedItemDetails = tempItemDetails.map((item) => {
        const newItem = { ...item };
        delete newItem.maxVolume; 
        return newItem;
      });

      setVisitForm((visitForm)=>({...visitForm,itemDetails:[...updatedItemDetails]}));
      
      
      formData["petId"] = selectedPet._id;
      formData["visitForm"] = visitForm;

      formData["totalPrice"] = totalPrice;

      dispatch(addVisit(formData)).then((data) => {
       
      });
      alert("Visit saved successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save visit");
    }
  };

  useEffect(() => {
    fetchPets();
    fetchInventory();
    setVisitHistory([])
    const today = new Date();
    const istOffset = 5.5 * 60; // IST is UTC+5:30, in minutes
    today.setMinutes(
      today.getMinutes() + today.getTimezoneOffset() + istOffset
    );

    const formattedDate = today.toISOString().split("T")[0]; // Format to YYYY-MM-DD

    setMin(formattedDate);
  }, [selectedDate]);

  return (
    <div className="container mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Date and Species Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Pet Registrations</h2>
            <div className="flex gap-4 mb-4">
              <input
                type="date"
                value={format(selectedDate, "yyyy-MM-dd")}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setSelectedDate(new Date())}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Today
              </button>
            </div>

            {/* Species Filter Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Filter by Species
              </label>
              <select
                value={selectedSpecies}
                onChange={(e) => handleSpeciesFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
              </div>
            ) : filteredPets?.length > 0 ? (
              <div className="space-y-2">
                {filteredPets.map((pet) => (
                  <button
                    key={pet._id}
                    onClick={() => handlePetSelect(pet._id)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedPet?._id === pet._id
                        ? "border-blue-500 bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-medium">{pet.name}</div>
                    <div className="text-sm text-gray-500">
                      {pet.species} - {pet.breed}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No pets registered{" "}
                {selectedSpecies ? `for ${selectedSpecies}` : ""} on this date
              </div>
            )}
          </div>

          {/* Visit History */}
          {selectedPet && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Visit History</h2>
              {visitHistory.length > 0 ? (
                <div className="space-y-4">
                  {visitHistory.map((visit) => (
                    <div key={visit._id} className="border-b pb-4">
                      <div className="text-sm text-gray-500">
                        {format(new Date(visit.createdAt), "PPp")}
                      </div>
                      <div className="font-medium">{visit.purpose}</div>
                      <div className="text-sm">
                        Item: {visit.item?.itemName} (x{visit.quantity})
                        {visit.volumeML && ` - ${visit.volumeML}mL`}
                      </div>
                      <div className="text-sm">Price: ${visit.price}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No visit history available
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pet Details */}
          {selectedPet && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Pet Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Name:</p>
                  <p className="text-gray-600">{selectedPet.name}</p>
                </div>
                <div>
                  <p className="font-medium">Species:</p>
                  <p className="text-gray-600">{selectedPet.species}</p>
                </div>
                <div>
                  <p className="font-medium">Breed:</p>
                  <p className="text-gray-600">{selectedPet.breed}</p>
                </div>
                <div>
                  <p className="font-medium">Sex:</p>
                  <p className="text-gray-600">{selectedPet.sex}</p>
                </div>
                <div>
                  <p className="font-medium">Color:</p>
                  <p className="text-gray-600">{selectedPet.color}</p>
                </div>
                <div>
                  <p className="font-medium">Date of Birth:</p>
                  <p className="text-gray-600">
                    {format(new Date(selectedPet.dob), "PP")}
                  </p>
                </div>

                {selectedPet?.vaccinations &&
                  selectedPet?.vaccinations.length > 0 && (
                    <div
                      className=""
                      
                      onClick={() => setIsOpen(true)}
                    >
                      <p className="font-medium">
                        Vaccinations
                      </p>
                      <p className="text-gray-500">
                        Click to view details
                      </p>
                    </div>
                  )}

                {/* Popup Component */}
                <VaccinationPopup
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  vaccinations={selectedPet.vaccinations || []}
                />

              </div>

              {selectedPet.owner && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-bold text-lg mb-4">Owner Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Name:</p>
                      <p className="text-gray-600">{selectedPet.owner.name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Phone:</p>
                      <p className="text-gray-600">{selectedPet.owner.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium">Email:</p>
                      <p className="text-gray-600">{selectedPet.owner.email}</p>
                    </div>
                    <div>
                      <p className="font-medium">Address:</p>
                      <p className="text-gray-600">
                        {selectedPet.owner.address}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Visit Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">New Visit</h2>
            <form onSubmit={handleVisitFormSubmit} className="space-y-4">
              {/* Purpose of Visit */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Purpose of Visit
                </label>
                <select
                  value={visitForm.purpose}
                  onChange={(e) =>
                    setVisitForm((prev) => ({
                      ...prev,
                      purpose: e.target.value,
                    }))
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a purpose</option>
                  {purposes.map((purpose) => (
                    <option key={purpose} value={purpose}>
                      {purpose}
                    </option>
                  ))}
                </select>
                {visitForm?.purpose === "Others" ? (
                  <div>
                    <textarea
                      placeholder="Write the purpose"
                      
                      className="pl-5 pt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full mt-5"
                      type="text"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>

              {/* Item Details */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Item Details
                </label>
                {visitForm.itemDetails.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <select
                      value={item.item}
                      onChange={(e) => {
                        const selectedItem = inventoryList.find(
                          (inv) => inv._id === e.target.value
                        );
                        updateItemDetails(index, "item", e.target.value);
                        updateItemDetails(
                          index,
                          "maxVolume",
                          selectedItem?.totalVolume || 0
                        );
                      }}
                      required
                      className="border px-4 py-2 rounded-lg"
                    >
                      <option value="">Select Item</option>
                      {inventoryList.map((inv) => (
                        <option key={inv._id} value={inv._id}>
                          {inv.itemName}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={item.dose}
                      onChange={(e) =>
                        updateItemDetails(index, "dose", e.target.value)
                      }
                      required
                      className="border px-4 py-2 rounded-lg w-20"
                      placeholder="dose"
                    />
                    <input
                      type="number"
                      value={item.volumeML}
                      onChange={(e) =>
                        updateItemDetails(index, "volumeML", e.target.value)
                      }
                      required
                      min="0"
                      max={item.maxVolume}
                      className="border px-4 py-2 rounded-lg w-20"
                      placeholder="volume (ml)"
                    />
                    <button
                      type="button"
                      onClick={() => deleteItemRow(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addItemRow}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Add Item
                </button>
              </div>

              {/* Next Follow-Up Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Next Follow-Up Date
                  </label>
                  <input
                    type="date"
                    min={min}
                    value={visitForm.nextFollowUp}
                    onChange={(e) =>
                      setVisitForm((prev) => ({
                        ...prev,
                        nextFollowUp: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Follow-Up Time
                  </label>
                  <input
                    type="time"
                    value={visitForm.followUpTime}
                    onChange={(e) =>
                      setVisitForm((prev) => ({
                        ...prev,
                        followUpTime: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Follow-Up Purpose
                </label>
                <input
                  type="text"
                  value={visitForm.followUpPurpose}
                  onChange={(e) =>
                    setVisitForm((prev) => ({
                      ...prev,
                      followUpPurpose: e.target.value,
                    }))
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Specify follow-up purpose"
                />
              </div>

              {/* Customer Type */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Customer Type
                </label>
                <select
                  value={visitForm.customerType}
                  onChange={(e) =>
                    setVisitForm((prev) => ({
                      ...prev,
                      customerType: e.target.value,
                    }))
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="NGO">NGO</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium">Total Price:</p>
                <p className="text-lg font-bold">${calculateTotalPrice()}</p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg text-white font-medium ${
                    visitForm.itemDetails.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 transition-colors"
                  }`}
                  disabled={visitForm.itemDetails.length === 0}
                >
                  Save Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}