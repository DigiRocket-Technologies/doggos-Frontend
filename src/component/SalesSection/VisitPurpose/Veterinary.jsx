// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addVeterinaryVisit } from "../../../store/slices/visitSlice";
// import { getAllInventory } from "../../../store/slices/inventorySlice";
// import { useNavigate } from "react-router-dom";

// const Veterinary = ({ _id, visitPurposeDetails }) => {
//   const dispatch = useDispatch();
//   const [customerType, setCustomerType] = useState("");
//   const [medicines, setMedicines] = useState([]);
//   const [vaccines, setVaccines] = useState([]);
//   const [nextFollowUp, setNextFollowUp] = useState("");
//   const [followUpTime, setFollowUpTime] = useState("");
//   const [followUpPurpose, setFollowUpPurpose] = useState("");
//   const [medicineOptions, setMedicineOptions] = useState([]);
//   const [vaccineOptions, setVaccineOptions] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   useEffect(() => {
//     const fetchAndFilterInventory = async () => {
//       try {
//         const data = await dispatch(getAllInventory());

//         if (data?.payload?.success) {
//           const items = data?.payload?.items;
//           setMedicineOptions(
//             items
//               .filter((item) => item.itemType === "medicine")
//               .map((item) => ({
//                 id: item._id,
//                 name: item.itemName,
//                 unitMinRetailPriceNGO: item.unitMinRetailPriceNGO,
//                 unitMaxRetailPriceCustomer: item.unitMaxRetailPriceCustomer,
//               }))
//           );

//           setVaccineOptions(
//             items
//               .filter((item) => item.itemType !== "medicine")
//               .map((item) => ({
//                 id: item._id,
//                 name: item.itemName,
//                 unitMinRetailPriceNGO: item.unitMinRetailPriceNGO,
//                 unitMaxRetailPriceCustomer: item.unitMaxRetailPriceCustomer,
//               }))
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching inventory:", error);
//       }
//     };

//     fetchAndFilterInventory();
//   }, [dispatch]);

//   const calculateTotalPrice = () => {
//     let medicineTotal = medicines.reduce((acc, med) => {
//       const medicine = medicineOptions.find((m) => m.id === med.id);
//       if (!medicine) return acc;
//       return (
//         acc +
//         (customerType === "NGO"
//           ? medicine.unitMinRetailPriceNGO * med.quantity
//           : medicine.unitMaxRetailPriceCustomer * med.quantity)
//       );
//     }, 0);

//     let vaccineTotal = vaccines.reduce((acc, vac) => {
//       const vaccine = vaccineOptions.find((v) => v.id === vac.id);
//       if (!vaccine) return acc;
//       return (
//         acc +
//         (customerType === "NGO"
//           ? vaccine.unitMinRetailPriceNGO * vac.volume
//           : vaccine.unitMaxRetailPriceCustomer * vac.volume)
//       );
//     }, 0);

//     setTotalPrice(medicineTotal + vaccineTotal);
//   };

//   const navigate=useNavigate();

//   useEffect(() => {
//     calculateTotalPrice();
//   }, [medicines, vaccines, customerType, medicineOptions, vaccineOptions]);

//   const handleCustomerTypeChange = (value) => {
//     setCustomerType(value);
//     calculateTotalPrice(); // Recalculate immediately after customerType changes
//   };

//   const handleMedicineChange = (index, field, value) => {
//     const updatedMedicines = [...medicines];
//     updatedMedicines[index][field] = value;
//     setMedicines(updatedMedicines);
//   };

//   const handleVaccineChange = (index, field, value) => {
//     const updatedVaccines = [...vaccines];
//     updatedVaccines[index][field] = value;
//     setVaccines(updatedVaccines);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = {
//       customerType,
//       medicines,
//       vaccines,
//       nextFollowUp,
//       followUpTime,
//       followUpPurpose,
//       petId: _id,
//       visitType: visitPurposeDetails._id,
//     };

//     try {
//       const data = await dispatch(addVeterinaryVisit(formData));
//       if (data?.payload?.success) {
//         alert("Visit saved successfully");
//         setCustomerType("");
//         setMedicines([]);
//         setVaccines([]);
//         setNextFollowUp("");
//         setFollowUpTime("");
//         setFollowUpPurpose("");
//         setTotalPrice(0);

//         navigate("/dashboard")
//       } else {
//         alert(data?.payload?.message);
//       }
//     } catch {
//       alert("Error saving data");
//     }
//   };

//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
//         Veterinary Inquiry Form
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Customer Type */}
//         <div>
//           <label className="block font-medium mb-1">Customer Type</label>
//           <select
//             value={customerType}
//             onChange={(e) => handleCustomerTypeChange(e.target.value)}
//             required
//             className="w-full mt-1 p-2 border rounded-md"
//           >
//             <option value="" disabled>
//               Select Customer Type
//             </option>
//             <option value="pvtltd">Pvt Ltd</option>
//             <option value="NGO">NGO</option>
//           </select>
//         </div>

//         {/* Medicine Inquiry */}
//         <div className="p-4 bg-gray-100 rounded-md">
//           <h2 className="text-lg font-semibold mb-3">Medicine Inquiry</h2>
//           {medicines.map((medicine, index) => (
//             <div key={index} className="flex items-center space-x-3 mb-3">
//               <div className="flex-1">
//                 <label className="block font-medium mb-1">Medicine</label>
//                 <select
//                   value={medicine.id}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "id", e.target.value)
//                   }
//                   required
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="" disabled>
//                     Select Medicine
//                   </option>
//                   {medicineOptions.map((med) => (
//                     <option key={med.id} value={med.id}>
//                       {med.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Quantity</label>
//                 <input
//                   type="number"
//                   value={medicine.quantity}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "quantity", e.target.value)
//                   }
//                   placeholder="Quantity"
//                   className="p-2 border rounded-md w-20"
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setMedicines(medicines.filter((_, i) => i !== index))
//                 }
//                 className="text-red-500 font-medium self-end"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={() =>
//               setMedicines([...medicines, { id: "", quantity: 1 }])
//             }
//             className="mt-2 text-blue-600 font-medium"
//           >
//             + Add Medicine
//           </button>
//         </div>

//         {/* Vaccine Inquiry */}
//         <div className="p-4 bg-gray-100 rounded-md">
//           <h2 className="text-lg font-semibold mb-3">Vaccine Inquiry</h2>
//           {vaccines.map((vaccine, index) => (
//             <div key={index} className="flex items-center space-x-3 mb-3">
//               <div className="flex-1">
//                 <label className="block font-medium mb-1">Vaccine</label>
//                 <select
//                   value={vaccine.id}
//                   onChange={(e) =>
//                     handleVaccineChange(index, "id", e.target.value)
//                   }
//                   required
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="" disabled>
//                     Select Vaccine
//                   </option>
//                   {vaccineOptions.map((vac) => (
//                     <option key={vac.id} value={vac.id}>
//                       {vac.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Volume (ml)</label>
//                 <input
//                   type="number"
//                   value={vaccine.volume}
//                   onChange={(e) =>
//                     handleVaccineChange(index, "volume", e.target.value)
//                   }
//                   placeholder="Volume (ml)"
//                   className="p-2 border rounded-md w-24"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Dose Number</label>
//                 <input
//                   type="number"
//                   value={vaccine.doseNumber}
//                   onChange={(e) =>
//                     handleVaccineChange(index, "doseNumber", e.target.value)
//                   }
//                   placeholder="Dose Number"
//                   className="p-2 border rounded-md w-24"
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setVaccines(vaccines.filter((_, i) => i !== index))
//                 }
//                 className="text-red-500 font-medium self-end"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={() =>
//               setVaccines([...vaccines, { id: "", volume: 1, doseNumber: 1 }])
//             }
//             className="mt-2 text-blue-600 font-medium"
//           >
//             + Add Vaccine
//           </button>
//         </div>

//         {/* Follow-Up Details */}
//         <div className="p-4 rounded-md">
//           <h2 className="text-lg font-semibold mb-3">Follow-Up Details</h2>
//           <div>
//             <label>Follow-up date:</label>
//             <input
//               onChange={(e) => setNextFollowUp(e.target.value)}
//               value={nextFollowUp}
//               type="date"
//               min={today}
//               className="w-full p-2 border rounded-md mb-2"
//             />
//           </div>
//           <div>
//             <label>Follow-up time:</label>
//             <input
//               onChange={(e) => setFollowUpTime(e.target.value)}
//               value={followUpTime}
//               type="time"
//               className="w-full p-2 border rounded-md mb-2"
//             />
//           </div>
//           <div>
//             <label>Follow-up purpose:</label>
//             <input
//               onChange={(e) => setFollowUpPurpose(e.target.value)}
//               value={followUpPurpose}
//               placeholder="Follow-Up Purpose"
//               className="w-full p-2 border rounded-md"
//             />
//           </div>
//         </div>

//         <div className="text-xl font-bold">
//           Total Price: ₹{totalPrice.toFixed(2)}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md"
//         >
//           Submit Inquiry
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Veterinary;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addVeterinaryVisit } from "../../../store/slices/visitSlice";
// import { getAllInventory } from "../../../store/slices/inventorySlice";
// import { useNavigate } from "react-router-dom";

// import {PaymentService} from './PaymentComponents/PaymentService'
// import {usePaymentFlow} from './PaymentComponents/PaymentHooks'

// const Veterinary = ({ _id, visitPurposeDetails }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [customerType, setCustomerType] = useState("");
//   const [medicines, setMedicines] = useState([]);
//   const [vaccines, setVaccines] = useState([]);
//   const [nextFollowUp, setNextFollowUp] = useState("");
//   const [followUpTime, setFollowUpTime] = useState("");
//   const [followUpPurpose, setFollowUpPurpose] = useState("");
//   const [medicineOptions, setMedicineOptions] = useState([]);
//   const [vaccineOptions, setVaccineOptions] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [formData, setFormData] = useState(null);

//   const backendURL = import.meta.env.VITE_BACKEND_URL;
//   const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY;

//   const paymentService = new PaymentService(backendURL, razorpayKeyId);

//   const getTotalPrice = () => {
//     return totalPrice;
//   };

//   const {
//     isLoading,
//     setIsLoading,
//     processPaymentFlow
//   } = usePaymentFlow(paymentService, getTotalPrice);

//   useEffect(() => {
//     const fetchAndFilterInventory = async () => {
//       try {
//         const data = await dispatch(getAllInventory());

//         if (data?.payload?.success) {
//           const items = data?.payload?.items;
//           setMedicineOptions(
//             items
//               .filter((item) => item.itemType === "medicine")
//               .map((item) => ({
//                 id: item._id,
//                 name: item.itemName,
//                 unitMinRetailPriceNGO: item.unitMinRetailPriceNGO,
//                 unitMaxRetailPriceCustomer: item.unitMaxRetailPriceCustomer,
//               }))
//           );

//           setVaccineOptions(
//             items
//               .filter((item) => item.itemType !== "medicine")
//               .map((item) => ({
//                 id: item._id,
//                 name: item.itemName,
//                 unitMinRetailPriceNGO: item.unitMinRetailPriceNGO,
//                 unitMaxRetailPriceCustomer: item.unitMaxRetailPriceCustomer,
//               }))
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching inventory:", error);
//       }
//     };

//     fetchAndFilterInventory();
//   }, [dispatch]);

//   const calculateTotalPrice = () => {
//     let medicineTotal = medicines.reduce((acc, med) => {
//       const medicine = medicineOptions.find((m) => m.id === med.id);
//       if (!medicine) return acc;
//       return (
//         acc +
//         (customerType === "NGO"
//           ? medicine.unitMinRetailPriceNGO * med.quantity
//           : medicine.unitMaxRetailPriceCustomer * med.quantity)
//       );
//     }, 0);

//     let vaccineTotal = vaccines.reduce((acc, vac) => {
//       const vaccine = vaccineOptions.find((v) => v.id === vac.id);
//       if (!vaccine) return acc;
//       return (
//         acc +
//         (customerType === "NGO"
//           ? vaccine.unitMinRetailPriceNGO * vac.volume
//           : vaccine.unitMaxRetailPriceCustomer * vac.volume)
//       );
//     }, 0);

//     setTotalPrice(medicineTotal + vaccineTotal);
//   };

//   useEffect(() => {
//     calculateTotalPrice();
//   }, [medicines, vaccines, customerType, medicineOptions, vaccineOptions]);

//   const handleCustomerTypeChange = (value) => {
//     setCustomerType(value);
//     calculateTotalPrice(); // Recalculate immediately after customerType changes
//   };

//   const handleMedicineChange = (index, field, value) => {
//     const updatedMedicines = [...medicines];
//     updatedMedicines[index][field] = value;
//     setMedicines(updatedMedicines);
//   };

//   const handleVaccineChange = (index, field, value) => {
//     const updatedVaccines = [...vaccines];
//     updatedVaccines[index][field] = value;
//     setVaccines(updatedVaccines);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitting veterinary visit with pet ID:", _id);
//     console.log("Visit purpose details ID:", visitPurposeDetails._id);

//     if (!_id || _id.trim() === '') {
//       console.error("Missing pet ID");
//       alert("A pet must be selected. Please select a pet before proceeding.");
//       return;
//     }

//     if (!visitPurposeDetails || !visitPurposeDetails._id || visitPurposeDetails._id.trim() === '') {
//       console.error("Missing visit type ID");
//       alert("Visit type is missing. Please try again.");
//       return;
//     }

//     if (!customerType) {
//       alert("Please select a customer type.");
//       return;
//     }

//     const formattedData = {
//       customerType,
//       medicines,
//       vaccines,
//       nextFollowUp,
//       followUpTime,
//       followUpPurpose,
//       petId: _id,
//       visitType: visitPurposeDetails._id,
//       details: {
//         totalCalculatedPrice: totalPrice
//       }
//     };

//     console.log("Form data prepared:", formattedData);
//     setFormData(formattedData);

//     if (totalPrice === 0) {
//       processVeterinaryVisitSave(formattedData);
//     } else {
//       initializeRazorpay(formattedData);
//     }
//   };

//   const initializeRazorpay = (data) => {
//     const amount = totalPrice;

//     const orderData = {
//       receipt: `vet_${_id.slice(-15)}`,
//       notes: {
//         petId: _id,
//         visitType: visitPurposeDetails._id,
//         customerType: data.customerType,
//         paymentType: "advance"
//       }
//     };

//     const customData = {
//       businessName: "Pet Veterinary Service",
//       description: "Full Payment for Veterinary Service",
//       themeColor: "#3399cc",
//       prefill: {
//         name: "",
//         email: "",
//         contact: ""
//       }
//     };

//     const onPaymentSuccess = (response) => {
//       const updatedData = {
//         ...data,
//         details: {
//           ...data.details,
//           payment: {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//             paymentType: "advance",
//             amount: amount,
//             paidAt: new Date().toISOString(),
//             isPaid: true,
//             remainingAmount: 0,
//             isRemainingPaid: true
//           }
//         }
//       };

//       handlePaymentSuccess(updatedData, response);
//     };

//     const onPaymentError = (error) => {
//       alert(error);
//     };

//     processPaymentFlow("advance", amount, orderData, customData, onPaymentSuccess, onPaymentError);
//   };

//   const handlePaymentSuccess = (updatedData, response) => {
//     const paymentData = {
//       razorpay_payment_id: response.razorpay_payment_id,
//       razorpay_order_id: response.razorpay_order_id,
//       razorpay_signature: response.razorpay_signature,
//       visitData: updatedData
//     };

//     const onVerifySuccess = (data) => {
//       console.log(data);
//       // Format data for veterinary visit dispatch
//       const veterinaryData = {
//         customerType: updatedData.customerType,
//         medicines: updatedData.medicines,
//         vaccines: updatedData.vaccines,
//         nextFollowUp: updatedData.nextFollowUp,
//         followUpTime: updatedData.followUpTime,
//         followUpPurpose: updatedData.followUpPurpose,
//         petId: updatedData.petId,
//         visitType: updatedData.visitType,
//         details: updatedData.details
//       };

//       dispatch(addVeterinaryVisit(veterinaryData))
//         .then((result) => {
//           if (result?.payload?.success) {
//             alert("Payment successful and visit saved!");
//             resetForm();
//             navigate("/dashboard");
//           } else {
//             alert(result?.payload?.message || "Failed to save veterinary visit");
//           }
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error saving veterinary visit:", error);
//           alert("An error occurred: " + error.message);
//           setIsLoading(false);
//         });
//     };

//     const onVerifyError = (error) => {
//       alert(error);
//       setIsLoading(false);
//     };

//     paymentService.verifyPayment(paymentData, onVerifySuccess, onVerifyError);
//   };

//   const processVeterinaryVisitSave = (data) => {
//     setIsLoading(true);

//     console.log("Processing veterinary visit save with data:", data);

//     const veterinaryData = {
//       customerType: data.customerType,
//       medicines: data.medicines,
//       vaccines: data.vaccines,
//       nextFollowUp: data.nextFollowUp,
//       followUpTime: data.followUpTime,
//       followUpPurpose: data.followUpPurpose,
//       petId: data.petId,
//       visitType: data.visitType,
//       details: {
//         ...data.details,
//         payment: {
//           paymentType: "after",
//           isPaid: false,
//           amount: 0,
//           paidAt: null,
//           remainingAmount: totalPrice,
//           isRemainingPaid: false
//         }
//       }
//     };

//     dispatch(addVeterinaryVisit(veterinaryData))
//       .then((result) => {
//         if (result?.payload?.success) {
//           alert("Visit saved successfully!");
//           resetForm();
//           navigate("/dashboard");
//         } else {
//           alert(result?.payload?.message || "Failed to save veterinary visit");
//         }
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error saving veterinary visit:", error);
//         alert("An error occurred: " + error.message);
//         setIsLoading(false);
//       });
//   };

//   const resetForm = () => {
//     setCustomerType("");
//     setMedicines([]);
//     setVaccines([]);
//     setNextFollowUp("");
//     setFollowUpTime("");
//     setFollowUpPurpose("");
//     setTotalPrice(0);
//   };

//   const today = new Date().toISOString().split("T")[0];

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
//         Veterinary Inquiry Form
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Customer Type */}
//         <div>
//           <label className="block font-medium mb-1">Customer Type</label>
//           <select
//             value={customerType}
//             onChange={(e) => handleCustomerTypeChange(e.target.value)}
//             required
//             className="w-full mt-1 p-2 border rounded-md"
//           >
//             <option value="" disabled>
//               Select Customer Type
//             </option>
//             <option value="pvtltd">Pvt Ltd</option>
//             <option value="NGO">NGO</option>
//           </select>
//         </div>

//         {/* Medicine Inquiry */}
//         <div className="p-4 bg-gray-100 rounded-md">
//           <h2 className="text-lg font-semibold mb-3">Medicine Inquiry</h2>
//           {medicines.map((medicine, index) => (
//             <div key={index} className="flex items-center space-x-3 mb-3">
//               <div className="flex-1">
//                 <label className="block font-medium mb-1">Medicine</label>
//                 <select
//                   value={medicine.id}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "id", e.target.value)
//                   }
//                   required
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="" disabled>
//                     Select Medicine
//                   </option>
//                   {medicineOptions.map((med) => (
//                     <option key={med.id} value={med.id}>
//                       {med.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Quantity</label>
//                 <input
//                   type="number"
//                   value={medicine.quantity}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "quantity", e.target.value)
//                   }
//                   placeholder="Quantity"
//                   className="p-2 border rounded-md w-20"
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setMedicines(medicines.filter((_, i) => i !== index))
//                 }
//                 className="text-red-500 font-medium self-end"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={() =>
//               setMedicines([...medicines, { id: "", quantity: 1 }])
//             }
//             className="mt-2 text-blue-600 font-medium"
//           >
//             + Add Medicine
//           </button>
//         </div>

//         {/* Vaccine Inquiry */}
//         <div className="p-4 bg-gray-100 rounded-md">
//           <h2 className="text-lg font-semibold mb-3">Vaccine Inquiry</h2>
//           {vaccines.map((vaccine, index) => (
//             <div key={index} className="flex items-center space-x-3 mb-3">
//               <div className="flex-1">
//                 <label className="block font-medium mb-1">Vaccine</label>
//                 <select
//                   value={vaccine.id}
//                   onChange={(e) =>
//                     handleVaccineChange(index, "id", e.target.value)
//                   }
//                   required
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="" disabled>
//                     Select Vaccine
//                   </option>
//                   {vaccineOptions.map((vac) => (
//                     <option key={vac.id} value={vac.id}>
//                       {vac.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Volume (ml)</label>
//                 <input
//                   type="number"
//                   value={vaccine.volume}
//                   onChange={(e) =>
//                     handleVaccineChange(index, "volume", e.target.value)
//                   }
//                   placeholder="Volume (ml)"
//                   className="p-2 border rounded-md w-24"
//                 />
//               </div>

//               <div>
//                 <label className="block font-medium mb-1">Dose Number</label>
//                 <input
//                   type="number"
//                   value={vaccine.doseNumber}
//                   onChange={(e) =>
//                     handleVaccineChange(index, "doseNumber", e.target.value)
//                   }
//                   placeholder="Dose Number"
//                   className="p-2 border rounded-md w-24"
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setVaccines(vaccines.filter((_, i) => i !== index))
//                 }
//                 className="text-red-500 font-medium self-end"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={() =>
//               setVaccines([...vaccines, { id: "", volume: 1, doseNumber: 1 }])
//             }
//             className="mt-2 text-blue-600 font-medium"
//           >
//             + Add Vaccine
//           </button>
//         </div>

//         {/* Follow-Up Details */}
//         <div className="p-4 rounded-md">
//           <h2 className="text-lg font-semibold mb-3">Follow-Up Details</h2>
//           <div>
//             <label>Follow-up date:</label>
//             <input
//               onChange={(e) => setNextFollowUp(e.target.value)}
//               value={nextFollowUp}
//               type="date"
//               min={today}
//               className="w-full p-2 border rounded-md mb-2"
//             />
//           </div>
//           <div>
//             <label>Follow-up time:</label>
//             <input
//               onChange={(e) => setFollowUpTime(e.target.value)}
//               value={followUpTime}
//               type="time"
//               className="w-full p-2 border rounded-md mb-2"
//             />
//           </div>
//           <div>
//             <label>Follow-up purpose:</label>
//             <input
//               onChange={(e) => setFollowUpPurpose(e.target.value)}
//               value={followUpPurpose}
//               placeholder="Follow-Up Purpose"
//               className="w-full p-2 border rounded-md"
//             />
//           </div>
//         </div>

//         <div className="text-xl font-bold">
//           Total Price: ₹{totalPrice.toFixed(2)}
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           {totalPrice === 0 ? "Submit Inquiry" : "Proceed to Payment"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Veterinary;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVeterinaryVisit } from "../../../store/slices/visitSlice";
import { getAllInventory } from "../../../store/slices/inventorySlice";
import { useNavigate } from "react-router-dom";

import { PaymentService } from "./PaymentComponents/PaymentService";
import { usePaymentFlow } from "./PaymentComponents/PaymentHooks";

const Veterinary = ({ _id, visitPurposeDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerType, setCustomerType] = useState("pvtltd");
  // const [medicines, setMedicines] = useState([]);
  // const [vaccines, setVaccines] = useState([]);

  const [items, setItems] = useState([]);
  const [mg, setMg] = useState([]);
  const [ml, setMl] = useState([]);
  const [tablets, setTablets] = useState([]);

  const [itemOptions, setItemOptions] = useState([]);
  const [mlOptions, setMlOptions] = useState([]);
  const [mgOptions, setMgOptions] = useState([]);
  const [tabletOptions, setTabletOptions] = useState([]);

  const [nextFollowUp, setNextFollowUp] = useState("");
  const [followUpTime, setFollowUpTime] = useState("");
  const [followUpPurpose, setFollowUpPurpose] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY;

  const paymentService = new PaymentService(backendURL, razorpayKeyId);

  const getTotalPrice = () => {
    return totalPrice;
  };

  const { isLoading, setIsLoading, processPaymentFlow } = usePaymentFlow(
    paymentService,
    getTotalPrice
  );

  useEffect(() => {
    const fetchAndFilterInventory = async () => {
      try {
        const data = await dispatch(getAllInventory());

        if (data?.payload?.success) {
          const temp = data?.payload?.items;
          console.log(temp, "temp");

          setMlOptions(
            temp
              .filter((item) => {
                return item.stockUnit === "ml";
              })
              .map((item) => ({
                id: item._id,
                name: item.itemName,
                unitMinRetailPriceNGO: item.unitMinRetailPriceNGO,
                unitMaxRetailPriceCustomer: item.unitMaxRetailPriceCustomer,
                stock: item.stock,
              }))
          );

          setMgOptions(
            temp
              .filter((item) => {
                return item.stockUnit === "mg";
              })
              .map((item) => {
                return {
                  id: item._id,
                  name: item.itemName,
                  unitMinRetailPriceNGO: item.unitMinRetailPriceNGO,
                  unitMaxRetailPriceCustomer: item.unitMaxRetailPriceCustomer,
                  stock: item.stock,
                };
              })
          );
          setItemOptions(
            temp
              .filter((item) => item.stockUnit === "item")
              .map((item) => ({
                id: item._id,
                name: item.itemName,
                unitMinRetailPriceNGO: item.unitMinRetailPriceNGO,
                unitMaxRetailPriceCustomer: item.unitMaxRetailPriceCustomer,
                stock: item.stock,
              }))
          );
          setTabletOptions(
            temp
              .filter((item) => item.stockUnit === "tablet")
              .map((item) => ({
                id: item._id,
                name: item.itemName,
                unitMinRetailPriceNGO: item.unitMinRetailPriceNGO,
                unitMaxRetailPriceCustomer: item.unitMaxRetailPriceCustomer,
                stock: item.stock,
              }))
          );
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchAndFilterInventory();
  }, [dispatch]);

  const calculateTotalPrice = () => {
    let itemTotal = items.reduce((acc, med) => {
      const item = itemOptions.find((m) => m.id === med.id);
      if (!item) return acc;
      const price =
        customerType === "NGO"
          ? item.unitMinRetailPriceNGO
          : item.unitMaxRetailPriceCustomer;
      return acc + price * med.quantity;
    }, 0);

    let mgTotal = mg.reduce((acc, med) => {
      const mgItem = mgOptions.find((m) => m.id === med.id);
      if (!mgItem) return acc;
      const price =
        customerType === "NGO"
          ? mgItem.unitMinRetailPriceNGO
          : mgItem.unitMaxRetailPriceCustomer;
      return acc + price * med.quantity;
    }, 0);

    let mlTotal = ml.reduce((acc, med) => {
      const mlItem = mlOptions.find((m) => m.id === med.id);
      if (!mlItem) return acc;
      const price =
        customerType === "NGO"
          ? mlItem.unitMinRetailPriceNGO
          : mlItem.unitMaxRetailPriceCustomer;
      return acc + price * med.quantity;
    }, 0);

    let tabletTotal = tablets.reduce((acc, med) => {
      const tablet = tabletOptions.find((m) => m.id === med.id);
      if (!tablet) return acc;
      const price =
        customerType === "NGO"
          ? tablet.unitMinRetailPriceNGO
          : tablet.unitMaxRetailPriceCustomer;
      return acc + price * med.quantity;
    }, 0);

    const newTotal = itemTotal + mgTotal + mlTotal + tabletTotal;
    setTotalPrice(newTotal);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [
    items,
    mg,
    ml,
    tablets,
    customerType,
    itemOptions,
    mgOptions,
    mlOptions,
    tabletOptions,
  ]);

  const handleCustomerTypeChange = (value) => {
    setCustomerType(value);
    calculateTotalPrice(); // Recalculate immediately after customerType changes
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleTabletChange = (index, field, value) => {
    const updatedTablets = [...tablets];
    updatedTablets[index][field] = value;
    setTablets(updatedTablets);
  };

  const handleMgChange = (index, field, value) => {
    const updatedMg = [...mg];
    updatedMg[index][field] = value;
    setMg(updatedMg);
  };

  const handleMlChange = (index, field, value) => {
    const updatedMl = [...ml];
    updatedMl[index][field] = value;
    setMl(updatedMl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting veterinary visit with pet ID:", _id);
    console.log("Visit purpose details ID:", visitPurposeDetails._id);

    if (!_id || _id.trim() === "") {
      console.error("Missing pet ID");
      alert("A pet must be selected. Please select a pet before proceeding.");
      return;
    }

    if (
      !visitPurposeDetails ||
      !visitPurposeDetails._id ||
      visitPurposeDetails._id.trim() === ""
    ) {
      console.error("Missing visit type ID");
      alert("Visit type is missing. Please try again.");
      return;
    }

    if (!customerType) {
      alert("Please select a customer type.");
      return;
    }

    const formattedData = {
      customerType,
      items,
      tablets,
      ml,
      mg,
      nextFollowUp,
      followUpTime,
      followUpPurpose,
      petId: _id,
      visitType: visitPurposeDetails._id,
      details: {
        totalCalculatedPrice: totalPrice,
      },
    };

    console.log("Form data prepared:", formattedData);
    setFormData(formattedData);

    if (totalPrice === 0) {
      processVeterinaryVisitSave(formattedData);
    } else {
      initializeRazorpay(formattedData);
    }
  };

  const initializeRazorpay = (data) => {
    const amount = totalPrice;

    const orderData = {
      receipt: `vet_${_id.slice(-15)}`,
      notes: {
        petId: _id,
        visitType: visitPurposeDetails._id,
        customerType: data.customerType,
        paymentType: "advance",
      },
    };

    const customData = {
      businessName: "Pet Veterinary Service",
      description: "Full Payment for Veterinary Service",
      themeColor: "#3399cc",
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
    };

    const onPaymentSuccess = (response) => {
      const updatedData = {
        ...data,
        details: {
          ...data.details,
          payment: {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            paymentType: "advance",
            amount: amount,
            paidAt: new Date().toISOString(),
            isPaid: true,
            remainingAmount: 0,
            isRemainingPaid: true,
          },
        },
      };

      handlePaymentSuccess(updatedData, response);
    };

    const onPaymentError = (error) => {
      alert(error);
    };

    processPaymentFlow(
      "advance",
      amount,
      orderData,
      customData,
      onPaymentSuccess,
      onPaymentError
    );
  };

  const handlePaymentSuccess = (updatedData, response) => {
    const paymentData = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
      visitData: updatedData,
    };

    const onVerifySuccess = (data) => {
      console.log(data);
      // Format data for veterinary visit dispatch
      const veterinaryData = {
        customerType: updatedData.customerType,
        medicines: updatedData.medicines,
        vaccines: updatedData.vaccines,
        nextFollowUp: updatedData.nextFollowUp,
        followUpTime: updatedData.followUpTime,
        followUpPurpose: updatedData.followUpPurpose,
        petId: updatedData.petId,
        visitType: updatedData.visitType,
        details: updatedData.details,
      };

      dispatch(addVeterinaryVisit(veterinaryData))
        .then((result) => {
          if (result?.payload?.success) {
            alert("Payment successful and visit saved!");
            resetForm();
            navigate("/dashboard");
          } else {
            alert(
              result?.payload?.message || "Failed to save veterinary visit"
            );
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error saving veterinary visit:", error);
          alert("An error occurred: " + error.message);
          setIsLoading(false);
        });
    };

    const onVerifyError = (error) => {
      alert(error);
      setIsLoading(false);
    };

    paymentService.verifyPayment(paymentData, onVerifySuccess, onVerifyError);
  };

  const processVeterinaryVisitSave = (data) => {
    setIsLoading(true);

    console.log("Processing veterinary visit save with data:", data);

    const veterinaryData = {
      customerType: data.customerType,
      medicines: data.medicines,
      vaccines: data.vaccines,
      nextFollowUp: data.nextFollowUp,
      followUpTime: data.followUpTime,
      followUpPurpose: data.followUpPurpose,
      petId: data.petId,
      visitType: data.visitType,
      details: {
        ...data.details,
        payment: {
          paymentType: "after",
          isPaid: false,
          amount: 0,
          paidAt: null,
          remainingAmount: totalPrice,
          isRemainingPaid: false,
        },
      },
    };

    dispatch(addVeterinaryVisit(veterinaryData))
      .then((result) => {
        if (result?.payload?.success) {
          alert("Visit saved successfully!");
          resetForm();
          navigate("/dashboard");
        } else {
          alert(result?.payload?.message || "Failed to save veterinary visit");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error saving veterinary visit:", error);
        alert("An error occurred: " + error.message);
        setIsLoading(false);
      });
  };

  const resetForm = () => {
    setCustomerType("");
    // setMedicines([]);
    // setVaccines([]);
    setNextFollowUp("");
    setFollowUpTime("");
    setFollowUpPurpose("");
    setTotalPrice(0);
  };

  const today = new Date().toISOString().split("T")[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Veterinary Inquiry Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Type */}
        <div>
          <label className="block font-medium mb-1">Customer Type</label>
          <select
            value={customerType}
            onChange={(e) => handleCustomerTypeChange(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option value="pvtltd">Pvt Ltd</option>
            <option value="NGO">NGO</option>
          </select>
        </div>

        {/* item Inquiry */}
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-3">Item Inquiry</h2>
          {items.map((medicine, index) => (
            <div key={index} className="flex items-center space-x-3 mb-3">
              <div className="flex-1">
                <label className="block font-medium mb-1">Item</label>
                <select
                  value={medicine.id}
                  onChange={(e) =>
                    handleItemChange(index, "id", e.target.value)
                  }
                  required
                  className="w-full p-2 border rounded-md"
                >
                  <option value="" disabled>
                    Select Item
                  </option>
                  {itemOptions.map((med) => (
                    <option key={med.id} value={med.id}>
                      {med.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  value={medicine.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  min="1"
                  //max={medicine.stock}
                  placeholder="Quantity"
                  className="p-2 border rounded-md w-20"
                />
              </div>

              <button
                type="button"
                onClick={() => setItems(items.filter((_, i) => i !== index))}
                className="text-red-500 font-medium self-end"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setItems([...items, { id: "", quantity: 1 }])}
            className="mt-2 text-blue-600 font-medium"
          >
            + Add Item
          </button>
        </div>
        {/* Tablet */}
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-3">Tablet Inquiry</h2>
          {tablets.map((medicine, index) => (
            <div key={index} className="flex items-center space-x-3 mb-3">
              <div className="flex-1">
                <label className="block font-medium mb-1">Tablet</label>
                <select
                  value={medicine.id}
                  onChange={(e) =>
                    handleTabletChange(index, "id", e.target.value)
                  }
                  required
                  className="w-full p-2 border rounded-md"
                >
                  <option value="" disabled>
                    Select Tablet
                  </option>
                  {tabletOptions.map((med) => (
                    <option key={med.id} value={med.id}>
                      {med.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  value={medicine.quantity}
                  onChange={(e) =>
                    handleTabletChange(index, "quantity", e.target.value)
                  }
                  min="1"
                  //max={medicine.stock}
                  placeholder="Quantity"
                  className="p-2 border rounded-md w-20"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setTablets(tablets.filter((_, i) => i !== index))
                }
                className="text-red-500 font-medium self-end"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setTablets([...tablets, { id: "", quantity: 1 }])}
            className="mt-2 text-blue-600 font-medium"
          >
            + Add Tablet
          </button>
        </div>

        {/* Mg Inquiry */}
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-3">Mg Inquiry</h2>
          {mg.map((vaccine, index) => (
            <div key={index} className="flex items-center space-x-3 mb-3">
              <div className="flex-1">
                <label className="block font-medium mb-1">Mg</label>
                <select
                  value={vaccine.id}
                  onChange={(e) => handleMgChange(index, "id", e.target.value)}
                  required
                  className="w-full p-2 border rounded-md"
                >
                  <option value="" disabled>
                    Select Mg
                  </option>
                  {mgOptions.map((vac) => (
                    <option key={vac.id} value={vac.id}>
                      {vac.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  value={vaccine.quantity}
                  onChange={(e) =>
                    handleMgChange(index, "quantity", e.target.value)
                  }
                  min="1"
                  //max={vaccine.stock}
                  placeholder="Quantity"
                  className="p-2 border rounded-md w-20"
                />
              </div>

              <button
                type="button"
                onClick={() => setMg(mg.filter((_, i) => i !== index))}
                className="text-red-500 font-medium self-end"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setMg([...mg, { id: "", quantity: 1 }])}
            className="mt-2 text-blue-600 font-medium"
          >
            + Add Mg
          </button>
        </div>
        {/* Ml Inquiry */}
        <div className="p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-3">Ml Inquiry</h2>
          {ml.map((vaccine, index) => (
            <div key={index} className="flex items-center space-x-3 mb-3">
              <div className="flex-1">
                <label className="block font-medium mb-1">Ml</label>
                <select
                  value={vaccine.id}
                  onChange={(e) => handleMlChange(index, "id", e.target.value)}
                  required
                  className="w-full p-2 border rounded-md"
                >
                  <option value="" disabled>
                    Select Ml
                  </option>
                  {mlOptions.map((vac) => (
                    <option key={vac.id} value={vac.id}>
                      {vac.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  value={vaccine.quantity}
                  onChange={(e) =>
                    handleMlChange(index, "quantity", e.target.value)
                  }
                  min="1"
                  //max={vaccine.stock}
                  placeholder="Quantity"
                  className="p-2 border rounded-md w-20"
                />
              </div>

              <button
                type="button"
                onClick={() => setMl(ml.filter((_, i) => i !== index))}
                className="text-red-500 font-medium self-end"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setMl([...ml, { id: "", quantity: 1 }])}
            className="mt-2 text-blue-600 font-medium"
          >
            + Add Ml
          </button>
        </div>

        {/* Follow-Up Details */}
        <div className="p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-3">Follow-Up Details</h2>
          <div>
            <label>Follow-up date:</label>
            <input
              onChange={(e) => setNextFollowUp(e.target.value)}
              value={nextFollowUp}
              type="date"
              min={today}
              className="w-full p-2 border rounded-md mb-2"
            />
          </div>
          <div>
            <label>Follow-up time:</label>
            <input
              onChange={(e) => setFollowUpTime(e.target.value)}
              value={followUpTime}
              type="time"
              className="w-full p-2 border rounded-md mb-2"
            />
          </div>
          <div>
            <label>Follow-up purpose:</label>
            <input
              onChange={(e) => setFollowUpPurpose(e.target.value)}
              value={followUpPurpose}
              placeholder="Follow-Up Purpose"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="text-xl font-bold">
          Total Price: ₹{totalPrice.toFixed(2)}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {totalPrice === 0 ? "Submit Inquiry" : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
};

export default Veterinary;
