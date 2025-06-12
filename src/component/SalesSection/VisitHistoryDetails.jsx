import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const VisitHistoryDetails = ({ visitdetails, onClose }) => {
  const [visitDetail, setVisitDetail] = useState(null);
  const [subscriptionTypeValue, setSubscriptionTypeValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,setError]=useState("");
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (!visitdetails) {
      setLoading(false);
    }
  }, [visitdetails]);

  
  useEffect(() => {
    const fetchVeterinaryVisitDetail = async () => {
      
      if (
        !visitdetails ||
        !visitdetails._id ||
        visitdetails?.visitType?.purpose !== "Veterinary" ||
        typeof visitdetails._id !== "string" ||
        visitdetails._id.length !== 24
      ) {
        if (visitdetails?.visitType?.purpose === "Veterinary") {
          setError("Invalid veterinary visit data");
        }
        return;
      }

      const token = localStorage?.getItem("authtoken") || "";
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/getvisitdetails/${visitdetails._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": token,
            },
          }
        );

        if (response.status === 401) {
          dispatch(logout());
          setError("Authentication failed");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setVisitDetail(data.data || data);
      } catch (error) {
        console.error("Error fetching veterinary visit detail:", error);
        setError("Failed to load veterinary visit details");
      } finally {
        setLoading(false);
      }
    };

    if (visitdetails?.visitType?.purpose === "Veterinary") {
      fetchVeterinaryVisitDetail();
    } else if (loading && visitdetails && visitdetails.visitType && visitdetails.visitType.purpose !== "Buy Subscription") {
    
      setLoading(false);
    }
  }, [visitdetails, dispatch]);

  
  useEffect(() => {
    const fetchBuySubscriptionDetail = async () => {
    
      if (
        !visitdetails ||
        !visitdetails._id ||
        (visitdetails?.visitType?.purpose !== "Buy Subscription" &&
          visitdetails?.visitType?.purpose !== "Renew Subscription") ||
        typeof visitdetails._id !== "string" ||
        visitdetails._id.length !== 24
      ) {
        if (visitdetails?.visitType?.purpose === "Buy Subscription" || 
            visitdetails?.visitType?.purpose === "Renew Subscription") {
          setError("Invalid subscription data");
        }
        return;
      }

      const token = localStorage?.getItem("authtoken") || "";
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/buyy/${visitdetails._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': token,
            },
          }
        );

        if (response.status === 401) {
          dispatch(logout());
          setError("Authentication failed");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(
            `Failed to fetch subscription details. Status: ${response.status}`
          );
        }

        const data = await response.json();

        if (data.success && data.data) {
          setSubscriptionTypeValue(data.data);
        } else {
          setSubscriptionTypeValue(data);
        }
      } catch (error) {
        console.error("Error fetching subscription visit detail:", error.message);
        setError("Failed to load subscription details");
        setSubscriptionTypeValue(null);
      } finally {
        setLoading(false);
      }
    };

    if (visitdetails?.visitType?.purpose === "Buy Subscription" || 
        visitdetails?.visitType?.purpose === "Renew Subscription") {
      fetchBuySubscriptionDetail();
    }
  }, [visitdetails, dispatch]);
  
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "d MMM yyyy");
    } catch (error) {
      return "Unknown Date";
    }
  };

  const details = visitDetail || visitdetails;
  const visitDate = details?.createdAt
    ? formatDate(details.createdAt)
    : "Unknown Date";

  const visitPurpose = details?.visitType?.purpose || "";

  const renderContent = () => {
    if (error) {
      return (
        <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-red-700">
          <p className="font-medium">Error loading details</p>
          <p className="text-sm">{error}</p>
          <p className="text-sm mt-2">Please try closing and reopening this dialog.</p>
        </div>
      );
    }

    switch (visitPurpose.toLowerCase()) {
      case "veterinary":
        return renderVeterinaryVisit();
      case "hostel":
        return renderHostelVisit();
      case "buy subscription":
      case "renew subscription":
        return renderSubscriptionVisit();
      case "shop":
        return renderShoppingVisit();
      default:
        return renderDefaultVisit();
    }
  };

  const renderVeterinaryVisit = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
          <div>
            <span className="font-semibold">Name:</span>{" "}
            {details?.pet?.name || ""}
          </div>
          <div>
            <span className="font-semibold">Species:</span>{" "}
            {details?.pet?.species || ""}
          </div>
          <div>
            <span className="font-semibold">Breed:</span>{" "}
            {details?.pet?.breed || ""}
          </div>
          <div>
            <span className="font-semibold">Color:</span>{" "}
            {details?.pet?.color || ""}
          </div>
          <div>
            <span className="font-semibold">Age:</span>{" "}
            {details?.pet?.dob
              ? `${Math.floor(
                  (new Date() - new Date(details.pet.dob)) /
                    (365.25 * 24 * 60 * 60 * 1000)
                )} years`
              : "Unknown"}
          </div>
          <div>
            <span className="font-semibold">Owner:</span>{" "}
            {details?.pet?.owner?.name || ""}
          </div>
          <div>
            <span className="font-semibold">Phone:</span>{" "}
            {details?.pet?.owner?.phone || ""}
          </div>
          <div>
            <span className="font-semibold">Price:</span> ₹
            {details?.details?.price || "0"}
          </div>
          {details?.details?.customerType && (
            <div>
              <span className="font-semibold">Customer Type:</span>{" "}
              {details.details.customerType}
            </div>
          )}
        </div>

        {details?.details?.vaccines && details.details.vaccines.length > 0 && (
          <div className="mt-4">
            <h3 className="text-base font-bold text-gray-800 mb-2">
              🧬 Vaccines
            </h3>
            <div className="space-y-2">
              {details.details.vaccines.map((vaccine, index) => {
                const vaccineId = vaccine.id || vaccine.vaccineId;
                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-gray-50"
                  >
                    <div>
                      <span className="font-medium">Vaccine Name:</span>{" "}
                      {vaccine.name || "Unknown Vaccine"}
                    </div>
                    <div>
                      <span className="font-medium">Dose Number:</span>{" "}
                      {vaccine.doseNumber}
                    </div>
                    <div>
                      <span className="font-medium">Volume Used:</span>{" "}
                      {vaccine.volume || "0"} ml
                    </div>
                    {vaccine.type && (
                      <div>
                        <span className="font-medium">Type:</span>{" "}
                        {vaccine.type}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {details?.details?.medicines &&
          details.details.medicines.length > 0 && (
            <div className="mt-4">
              <h3 className="text-base font-bold text-gray-800 mb-2">
                💊 Medicines
              </h3>
              <div className="space-y-2">
                {details.details.medicines.map((med, index) => {
                  const medicineId = med.id || med.medicineId;
                  return (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-gray-50"
                    >
                      <div>
                        <span className="font-medium">Medicine Name:</span>{" "}
                        {med.name || "Unknown Medicine"}
                      </div>
                      <div>
                        <span className="font-medium">Quantity:</span>{" "}
                        {med.quantity || "0"} {med.unit || "units"}
                      </div>
                      {med.category && (
                        <div>
                          <span className="font-medium">Category:</span>{" "}
                          {med.category}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {details?.details?.nextFollowUp && (
          <div className="mt-4">
            <h3 className="text-base font-bold text-gray-800 mb-2">
              📅 Follow-up
            </h3>
            <div className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-gray-50">
              <div>
                <span className="font-medium">Next Follow-up Date:</span>{" "}
                {formatDate(details.details.nextFollowUp)}
              </div>
              {details?.details?.followUpPurpose && (
                <div>
                  <span className="font-medium">Purpose:</span>{" "}
                  {details.details.followUpPurpose}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  
  const renderHostelVisit = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
          <div>
            <span className="font-semibold">Name:</span>{" "}
            {details?.pet?.name || ""}
          </div>
          <div>
            <span className="font-semibold">Species:</span>{" "}
            {details?.pet?.species || ""}
          </div>
          <div>
            <span className="font-semibold">Breed:</span>{" "}
            {details?.pet?.breed || ""}
          </div>
          <div>
            <span className="font-semibold">Owner:</span>{" "}
            {details?.pet?.owner?.name || ""}
          </div>
          <div>
            <span className="font-semibold">Phone:</span>{" "}
            {details?.pet?.owner?.phone || ""}
          </div>
          <div>
            <span className="font-semibold">Purpose:</span>{" "}
            {details?.visitType?.purpose || ""}
          </div>
        </div>

        <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="text-base font-bold text-blue-800 mb-2">
            🏠 Hostel Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
            <div>
              <span className="font-medium">Stay Duration:</span>{" "}
              {details?.details?.numberOfDays || "0"} days
            </div>
            <div>
              <span className="font-medium">Price:</span> ₹
              {details?.details?.price || "0"}
            </div>
            <div>
              <span className="font-medium">Daily Rate:</span> ₹
              {details?.visitType?.price || "0"}
            </div>
            {details?.visitType?.halfdayPrice && (
              <div>
                <span className="font-medium">Half-day Rate:</span> ₹
                {details?.visitType?.halfdayPrice}
              </div>
            )}
            <div>
              <span className="font-medium">Discount Applied:</span> ₹
              {details?.details?.discount || "0"}
            </div>
            <div>
              <span className="font-medium">Subscription Used:</span>{" "}
              {details?.details?.isSubscriptionAvailed ? "Yes" : "No"}
            </div>
          </div>
        </div>

        {details?.details?.medicines &&
          details.details.medicines.length > 0 && (
            <div className="mt-4">
              <h3 className="text-base font-bold text-gray-800 mb-2">
                💊 Medicines Given During Stay
              </h3>
              <div className="space-y-2">
                {details.details.medicines.map((med, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-gray-50"
                  >
                    <div>
                      <span className="font-medium">Medicine Name:</span>{" "}
                      {med.name || "Unknown Medicine"}
                    </div>
                    <div>
                      <span className="font-medium">Quantity:</span>{" "}
                      {med.quantity || "0"} {med.unit || "units"}
                    </div>
                    {med.category && (
                      <div>
                        <span className="font-medium">Category:</span>{" "}
                        {med.category}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  };

  const renderSubscriptionVisit = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
          <div>
            <span className="font-semibold">Name:</span>{" "}
            {details?.pet?.name || ""}
          </div>
          <div>
            <span className="font-semibold">Species:</span>{" "}
            {details?.pet?.species || ""}
          </div>
          <div>
            <span className="font-semibold">Breed:</span>{" "}
            {details?.pet?.breed || ""}
          </div>
          <div>
            <span className="font-semibold">Owner:</span>{" "}
            {details?.pet?.owner?.name || ""}
          </div>
          <div>
            <span className="font-semibold">Phone:</span>{" "}
            {details?.pet?.owner?.phone || ""}
          </div>
        </div>

        <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="text-base font-bold text-green-800 mb-2">
            🔄 Subscription Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
            <div>
              <span className="font-medium">Transaction Type:</span>{" "}
              {details?.details?.purpose ||
                details?.visitType?.purpose ||
                "Buy Subscription"}
            </div>

            {/* Check if subscription data exists */}
            {subscriptionTypeValue ? (
              <>
                <div>
                  <span className="font-medium">Subscription Type:</span>{" "}
                  <span className="font-medium text-green-700">
                    {subscriptionTypeValue?.subscriptionType?.purpose ||
                      "Standard Plan"}
                  </span>
                </div>

                <div>
                  <span className="font-medium">Duration:</span>{" "}
                  {subscriptionTypeValue.validityInDays ||
                    subscriptionTypeValue.duration ||
                    subscriptionTypeValue.subscriptionType?.validityInDays ||
                    "N/A"}{" "}
                  days
                </div>

                {subscriptionTypeValue.numberOfGroomings !== undefined &&
                  subscriptionTypeValue.numberOfGroomings !== null && (
                    <div>
                      <span className="font-medium">Grooming Sessions:</span>{" "}
                      {subscriptionTypeValue.numberOfGroomings}
                    </div>
                  )}

                <div>
                  <span className="font-medium">Plan Price:</span> ₹
                  {subscriptionTypeValue.price ||
                    subscriptionTypeValue.subscriptionType?.price ||
                    details?.details?.price ||
                    "0"}
                </div>
              </>
            ) : (
              // Fallback for when subscription data can't be loaded
              <div className="col-span-2">
                <div className="text-amber-600 mb-2">
                  Detailed subscription information not available.
                </div>
                <div>
                  <span className="font-medium">Amount Paid:</span> ₹
                  {details?.details?.price || "0"}
                </div>
              </div>
            )}

            <div>
              <span className="font-medium">Purchase Date:</span> {visitDate}
            </div>

            {/* If this is a plan renewal */}
            {(details?.details?.purpose?.toLowerCase()?.includes("renew") ||
              details?.visitType?.purpose
                ?.toLowerCase()
                ?.includes("renew")) && (
              <div className="col-span-2 mt-2 pt-2 border-t border-green-200">
                <div className="text-sm font-medium text-green-700 mb-1">
                  This is a subscription renewal.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderShoppingVisit = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
          <div>
            <span className="font-semibold">Name:</span>{" "}
            {details?.pet?.name || ""}
          </div>
          <div>
            <span className="font-semibold">Species:</span>{" "}
            {details?.pet?.species || ""}
          </div>
          <div>
            <span className="font-semibold">Breed:</span>{" "}
            {details?.pet?.breed || ""}
          </div>
          <div>
            <span className="font-semibold">Owner:</span>{" "}
            {details?.pet?.owner?.name || ""}
          </div>
          <div>
            <span className="font-semibold">Phone:</span>{" "}
            {details?.pet?.owner?.phone || ""}
          </div>
          <div>
            <span className="font-semibold">Total Amount:</span> ₹
            {details?.details?.price || "0"}
          </div>
        </div>

        <div className="mt-4 bg-purple-50 rounded-lg p-4 border border-purple-200">
          <h3 className="text-base font-bold text-purple-800 mb-2">
            🛍️ Shopping Details
          </h3>

          {details?.details?.items && details.details.items.length > 0 ? (
            <div className="mt-2">
              <h4 className="text-sm font-bold text-gray-700 mb-2">
                Products Purchased
              </h4>
              <div className="space-y-2">
                {details.details.items.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white"
                  >
                    <div>
                      <span className="font-medium">Product Name:</span>{" "}
                      {item.name || "Unknown Product"}
                    </div>
                    {item.quantity && (
                      <div>
                        <span className="font-medium">Quantity:</span>{" "}
                        {item.quantity || "1"} {item.unit || "units"}
                      </div>
                    )}
                    {item.price && (
                      <div>
                        <span className="font-medium">Price:</span> ₹
                        {item.price}
                      </div>
                    )}
                    {item.category && (
                      <div>
                        <span className="font-medium">Category:</span>{" "}
                        {item.category}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 italic">
              No product details available
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDefaultVisit = () => {
    return (
      <div className="space-y-4">
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {details?.pet?.name || ""}
          </p>
          <p>
            <span className="font-semibold">Species:</span>{" "}
            {details?.pet?.species || ""}
          </p>
          <p>
            <span className="font-semibold">Breed:</span>{" "}
            {details?.pet?.breed || ""}
          </p>
          <p>
            <span className="font-semibold">Owner:</span>{" "}
            {details?.pet?.owner?.name || ""}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {details?.pet?.owner?.phone || ""}
          </p>
          <p>
            <span className="font-semibold">Purpose:</span>{" "}
            {details?.visitType?.purpose || ""}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ₹
            {details?.details?.price || "0"}
          </p>
          {details?.details?.customerType && (
            <p>
              <span className="font-semibold">Customer Type:</span>{" "}
              {details.details.customerType}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 overflow-y-scroll max-w-2xl w-full max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{visitDate}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-pulse text-gray-600">
              Loading details...
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default VisitHistoryDetails;