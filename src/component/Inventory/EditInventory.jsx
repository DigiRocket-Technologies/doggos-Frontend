import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  editInventoryItem,
  getInventoryItemDetails,
} from "../../store/slices/inventorySlice";
import { useDispatch, useSelector } from "react-redux";

const EditInventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { editInventoryLoading } = useSelector((state) => state.inventory);

  const { id } = location?.state || "";
  const [formData, setFormData] = useState({
    itemName: "",
    stock: 0,
    stockUnit: "ml",
    itemType: "disposable",
    unitCostPrice: 0,
    unitMinRetailPriceNGO: 0,
    unitMaxRetailPriceCustomer: 0,
  });

  const getItemDetails = async () => {
    dispatch(getInventoryItemDetails(id))
      .then((data) => {
        if (data?.payload?.success) setFormData(data?.payload?.item);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getItemDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(editInventoryItem(formData))
      .then((data) => {
        if (data?.payload?.success) {
          navigate("/inventorylist");
          alert("Inventory item edited successfully!");
        } else alert(data?.payload?.message);
      })
      .catch((err) => {
        alert("Failed to edit the inventory item");
        console.log(err);
      });
  };

  if (editInventoryLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#EFE3C2] to-[#85A947]/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#85A947]/30 border-t-[#3E7B27] mx-auto mb-4"></div>
          <p className="text-[#3E7B27] font-semibold text-lg">
            Updating inventory item...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE3C2] to-[#85A947]/10 py-8">
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#85A947]/20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-5 h-5 bg-gradient-to-r from-[#3E7B27] to-[#85A947] rounded-full"></div>
            <h2 className="text-3xl font-bold text-[#123524]">
              Edit Inventory Item
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#3E7B27] mb-2">
                  Item Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName || ""}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                    placeholder="Enter item name"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
                </div>
              </div>

              <div className="flex flex-row gap-4">
                {/* Stock Input */}
                <div className="flex-1 min-w-[150px]">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#3E7B27] mb-2">
                      Stock
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock || 0}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                        placeholder="Enter stock quantity"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Stock Unit Dropdown */}
                <div className="flex-1 min-w-[150px]">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-[#3E7B27] mb-2">
                      Stock Unit
                    </label>
                    <div className="relative">
                      <select
                        name="stockUnit"
                        value={formData.stockUnit || "ml"} 
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200 appearance-none"
                      >
                        <option value="ml">Ml</option>
                        <option value="item">Item</option>
                        <option value="tablet">Tablet</option>
                        <option value="mg">Mg</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-[#85A947]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-bold text-[#3E7B27] mb-2">
                  Item Type
                </label>
                <div className="relative">
                  <select
                    name="itemType"
                    value={formData.itemType || "disposable"}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="disposable">Disposable</option>
                    <option value="syringe">Syringe</option>
                    <option value="medicine">Medicine</option>
                    <option value="vaccine">Vaccine</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#3E7B27]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#85A947]/10 rounded-xl p-6 border border-[#85A947]/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-[#3E7B27] rounded-full"></div>
                <h3 className="text-lg font-bold text-[#123524]">
                  Pricing Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#3E7B27] mb-2">
                    Unit Cost Price
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="unitCostPrice"
                      value={formData.unitCostPrice || 0}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                      placeholder="Enter cost price"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#3E7B27] mb-2">
                    Unit Min Retail Price (NGO)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="unitMinRetailPriceNGO"
                      value={formData.unitMinRetailPriceNGO || 0}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                      placeholder="Enter NGO price"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-[#3E7B27] mb-2">
                    Unit Max Retail Price (Customer)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="unitMaxRetailPriceCustomer"
                      value={formData.unitMaxRetailPriceCustomer || 0}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-[#85A947]/30 rounded-xl shadow-sm focus:border-[#3E7B27] focus:ring-4 focus:ring-[#85A947]/20 bg-white/90 backdrop-blur-sm text-[#123524] font-medium placeholder-[#123524]/50 transition-all duration-200"
                      placeholder="Enter customer price"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#85A947] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6 border-t border-[#85A947]/20">
              <button
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-[#123524] to-[#3E7B27] text-white font-bold text-lg rounded-xl hover:from-[#3E7B27] hover:to-[#85A947] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#85A947]/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  Update Inventory Item
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditInventory;