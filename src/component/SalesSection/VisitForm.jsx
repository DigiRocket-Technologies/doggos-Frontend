import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { addVisit } from "../../store/slices/visitSlice";
import { getAllInventory } from "../../store/slices/inventorySlice";
import { logout } from "../../store/slices/authSlice";

const NewVisitPopup = ({ pet, onClose }) => {
  const dispatch = useDispatch();

  const { inventoryList } = useSelector((state) => state.inventory);

  const [visitForm, setVisitForm] = useState({
    purpose: "",
    nextFollowUp: "",
    followUpTime: "",
    followUpPurpose: "",
    customerType: "NGO",
    itemDetails: [],
  });

  const [otherPurpose, setOtherPurpose] = useState("");
  const [minDate, setMinDate] = useState("");

  const purposes = [
    "Select",
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

  useEffect(() => {
    dispatch(getAllInventory()).then((data) => {
    });

    // Set minimum date to today (IST)
    const today = new Date();
    const istOffset = 5.5 * 60;
    today.setMinutes(
      today.getMinutes() + today.getTimezoneOffset() + istOffset
    );
    setMinDate(today.toISOString().split("T")[0]);
  }, []);

  const addItemRow = () => {
    setVisitForm((prev) => ({
      ...prev,
      itemDetails: [
        ...prev.itemDetails,
        { item: "", dose: "", volumeML: "", maxVolume: 0 },
      ],
    }));
  };

  const updateItemDetails = (index, field, value) => {
    const updatedItems = [...visitForm.itemDetails];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    // If updating item, set maxVolume from inventory
    if (field === "item") {
      const selectedItem = inventoryList.find((inv) => inv._id === value);
      updatedItems[index].maxVolume = selectedItem?.totalVolume || 0;
    }

    setVisitForm((prev) => ({
      ...prev,
      itemDetails: updatedItems,
    }));
  };

  const deleteItemRow = (index) => {
    setVisitForm((prev) => ({
      ...prev,
      itemDetails: prev.itemDetails.filter((_, i) => i !== index),
    }));
  };

  const handlePurposeChange = (e) => {
    const selectedPurpose = e.target.value;
    setVisitForm((prev) => ({
      ...prev,
      purpose: selectedPurpose,
    }));
    if (selectedPurpose !== "Others") {
      setOtherPurpose(""); // Reset otherPurpose when another option is selected
    }
  };

  const handleOtherPurposeChange = (e) => {
    setOtherPurpose(e.target.value);
  };

  const calculateTotalPrice = () => {
    return visitForm.itemDetails.reduce((total, item) => {
      const inventoryItem = inventoryList.find((inv) => inv._id === item.item);
      if (!inventoryItem) return total;

      const unitPrice =
        visitForm.customerType === "NGO"
          ? inventoryItem.unitMinRetailPriceNGO
          : inventoryItem.unitMaxRetailPriceCustomer;

      const volPrice = item.volumeML / inventoryItem.volumeML;
      return total + unitPrice * (volPrice || 0);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!visitForm.followUpPurpose) {
      alert("Please provide a purpose for the next follow-up.");
      return;
    }

    if (visitForm?.itemDetails?.length > 0) {
      if (visitForm.itemDetails.some((item) => !item.item || !item.dose)) {
        alert("Please complete all item details.");
        return;
      }
    }

    try {
      const formData = {
        petId: pet._id,
        visitForm: {
          ...visitForm,
          purpose:
            visitForm.purpose === "Others" ? otherPurpose : visitForm.purpose,
          itemDetails: visitForm.itemDetails.map(
            ({ maxVolume, ...item }) => item
          ), // Remove maxVolume before submission
        },
        totalPrice: calculateTotalPrice(),
      };

      dispatch(addVisit(formData)).then((data) => {
        if (data?.payload?.success) alert("Visit saved successfully!");
      });

      onClose();
    } catch (error) {
      alert("Failed to save visit. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">New Visit</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Purpose Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purpose of Visit
            </label>
            <select
              value={visitForm.purpose}
              onChange={handlePurposeChange}
              className="border p-2 rounded w-full"
            >
              {purposes.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>

            {visitForm.purpose === "Others" && (
              <textarea
                value={otherPurpose}
                onChange={handleOtherPurposeChange}
                placeholder="Specify other purpose"
                required
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
              />
            )}
          </div>

          {/* Item Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Details
            </label>
            <div className="space-y-3">
              {visitForm?.itemDetails?.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <select
                    value={item.item}
                    onChange={(e) =>
                      updateItemDetails(index, "item", e.target.value)
                    }
                    required
                    className="flex-1 px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select Item</option>
                    {inventoryList.filter((item)=>item.totalVolume > 100).map((inv) => (
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
                    min="1"
                    placeholder="Dose"
                    className="w-24 px-4 py-2 border rounded-lg"
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
                    placeholder="mL"
                    className="w-24 px-4 py-2 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => deleteItemRow(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addItemRow}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Item
              </button>
            </div>
          </div>

          {/* Follow-up Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Next Follow-Up Date
              </label>
              <input
                type="date"
                value={visitForm.nextFollowUp}
                onChange={(e) =>
                  setVisitForm((prev) => ({
                    ...prev,
                    nextFollowUp: e.target.value,
                  }))
                }
                min={minDate}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Follow-up Purpose */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Specify follow-up purpose"
            />
          </div>

          {/* Customer Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="NGO">NGO</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          {/* Total Price Display */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-700">Total Price:</p>
            <p className="text-2xl font-bold text-gray-900">
              ${calculateTotalPrice().toFixed(2)}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={
              "w-full py-3 rounded-lg text-white bg-blue-600 font-medium"
            }
          >
            Save Visit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewVisitPopup;
