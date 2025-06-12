import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Inquiry from "./VisitPurpose/Inquiry";
import DogPark from "./VisitPurpose/DogPark";
import Hostel from "./VisitPurpose/Hostel";
import Grooming from "./VisitPurpose/Grooming";
import DayCare from "./VisitPurpose/DayCare";
import DaySchool from "./VisitPurpose/DaySchool";
import PlaySchool from "./VisitPurpose/PlaySchool";
import Shop from "./VisitPurpose/Shop";
import Veterinary from "./VisitPurpose/Veterinary";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubscription } from "../../store/slices/subscriptionSlice";
import {getAllPrices} from "../../store/slices/visitSlice"

const NewVisitForm = () => {
  const purposes = [
    "Select",
    "Inquiry",
    "Dog Park",
    "Veterinary",
    "Hostel",
    "Day Care",
    "Day School",
    "Play School",
    "Grooming",
    "Shop",
    "Others",
  ];
  const location = useLocation();
  const dispatch = useDispatch();
  const { subscriptions } = useSelector((state) => state.subscription);
  const { prices } = useSelector((state) => state.visits);
 

  const [purpose, setPurpose] = useState("Select");
  const { _id } = location?.state || "";

  const showForm = () => {
    const selectedSubscription = subscriptions.find(
      (sub) => sub.subscriptionType === purpose
    );

    const VisitPurposePrice = prices?.length
    ? prices.find((p) => p.purpose === purpose)
    : null;

    const planId = selectedSubscription ? selectedSubscription._id : null;

    switch (purpose) {
      case "Select":
        return <div>Select a pupose</div>;
      case "Inquiry":
        return <Inquiry _id={_id} priceDetail={VisitPurposePrice} />;
      case "Dog Park":
        return <DogPark _id={_id}  priceDetail={VisitPurposePrice}/>;
      case "Veterinary":
        return <Veterinary _id={_id} priceDetail={VisitPurposePrice} />;
      case "Hostel":
        return <Hostel _id={_id} planId={planId} priceDetail={VisitPurposePrice} />;
      case "Day Care":
        return <DayCare _id={_id} priceDetail={VisitPurposePrice} />;
      case "Day School":
        return <DaySchool _id={_id} planId={planId} priceDetail={VisitPurposePrice} />;
      case "Play School":
        return <PlaySchool _id={_id} planId={planId} priceDetail={VisitPurposePrice}/>;
      case "Grooming":
        return <Grooming _id={_id} priceDetail={VisitPurposePrice} />;
      case "Shop":
        return <Shop _id={_id} priceDetail={VisitPurposePrice} />;
      default:
        return <div>Invalid Selection</div>;
    }
  };

  useEffect(() => {
    dispatch(getAllSubscription());
    dispatch(getAllPrices());
  }, []);

  useEffect(() => {}, []);
  return (
    <div className="w-full flex justify-center">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">New Visit</h2>
        </div>

        {/* Form */}

        {/* Purpose Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purpose of Visit
          </label>
          <select
            value={purpose}
            className="border p-2 rounded w-full"
            onChange={(e) => setPurpose(e.target.value)}
          >
            {purposes.map((purpose) => (
              <option key={purpose} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
        </div>
        <div>{showForm()}</div>
      </div>
    </div>
  );
};

export default NewVisitForm;
