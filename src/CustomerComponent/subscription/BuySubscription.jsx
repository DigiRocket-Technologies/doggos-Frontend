import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  buySubscription,
  getAllSubscription,
} from "../../store/slices/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllVisitType } from "../../store/slices/visitSlice";

const BuySubscription = () => {
  const { subscriptions } = useSelector((state) => state.subscription);
  const [userPets, setUserPets] = useState([]); 
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [visitTypes, setvisitTypes] = useState([]);

  useEffect(() => {
    dispatch(getAllVisitType()).then((data) => {
      if (data?.payload?.success) {
        setvisitTypes(data.payload.visitTypes);
        // Set default visitType to the first one or find "Buy Subscription"
        const defaultVisitType = data.payload.visitTypes.find(type => 
          type.purpose === "Buy Subscription" || type.purpose === "Subscription"
        ) || data.payload.visitTypes[0];
        
        if (defaultVisitType) {
          setValue("visitType", defaultVisitType._id);
        }
      }
    });
  }, []);
  
  const token = localStorage?.getItem("authtoken") || "";
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      planId: "",
      petId: "",
      visitType: "", // Will be set when visitTypes are loaded
    },
  });

  const planId = watch("planId");
  const petId = watch("petId");
  const visitType = watch("visitType");

  const fetchUserPets = async () => {
    try {
      // Check if user email exists
      if (!user?.email) {
        console.error('User email not found');
        return;
      }

      const encodedEmail = encodeURIComponent(user.email);
      const token = localStorage?.getItem("authtoken") || "";
      
      console.log('Fetching pets for email:', user.email); // Debug log
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/customerappointment/getcustomerpets?email=${encodedEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, 
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('User Pets API Response:', data);

      if (data.success) {
        setUserPets(data.pets || []);
        console.log('Pets set:', data.pets); // Debug log
      } else {
        console.error('API returned error:', data.message);
        setUserPets([]); // Set empty array on error
      }
    } catch (error) {
      console.error('Error fetching user pets:', error);
      setUserPets([]); // Set empty array on error
      alert('Error loading pets. Please check console for details.');
    }
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    
    // Prepare data for backend
    const subscriptionData = {
      petId: data.petId,
      planId: data.planId,
      visitType: data.visitType // This will now be the ObjectId
    };
    
    console.log('Submitting subscription data:', subscriptionData); // Debug log
    
    dispatch(buySubscription(subscriptionData))
      .then((response) => {
        if (response?.payload?.success) {
          alert("Subscription purchased successfully");
          navigate("/dashboard");
        } else {
          alert(response?.payload?.message || "Failed to purchase subscription");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error in subscription purchase:', error);
        alert("Error purchasing subscription");
        setIsLoading(false);
      });
  };

  const totalPrice = (id) => {
    if (id) {
      const plan = subscriptions.find((item) => item._id === id);
      return plan?.price || 0;
    }
    return 0;
  };

  useEffect(() => {
    // Check if user is logged in
    if (!user?.id) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    // Fetch user's pets using fetch API
    fetchUserPets();
    
    // Fetch all subscriptions using Redux
    dispatch(getAllSubscription()).then((data) => {
      if (data?.payload?.success && data?.payload?.data?.length > 0) {
        setValue("planId", data.payload.data[0]._id);
      }
    });
  }, [dispatch, user, navigate]);

  // Debug log to check states
  console.log('Current userPets state:', userPets);
  console.log('Current visitTypes state:', visitTypes);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-700">
          Buy Subscription
        </h2>

        {/* Visit Type Selection - Now using fetched visit types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Visit Type
          </label>
          <select
            {...register("visitType", {
              required: "Please select a visit type",
            })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="" disabled>
              Select Visit Type
            </option>
            {visitTypes && visitTypes.length > 0 ? (
              visitTypes.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.purpose || type.name}
                </option>
              ))
            ) : (
              // Fallback options if visitTypes not loaded
              <>
                <option value="subscription">Subscription</option>
                <option value="grooming">Grooming</option>
                <option value="daycare">Day Care</option>
                <option value="veterinary">Veterinary</option>
              </>
            )}
          </select>
          {errors.visitType && (
            <p className="text-red-500 text-sm mt-1">{errors.visitType.message}</p>
          )}
        </div>

        {/* Pet Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Pet
          </label>
          <select
            {...register("petId", {
              required: "Please select a pet",
            })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="" disabled>
              Select Pet
            </option>
            {userPets && userPets.length > 0 ? (
              userPets.map((pet) => (
                <option key={pet._id} value={pet._id}>
                  {pet.name} - {pet.breed}
                </option>
              ))
            ) : (
              <option disabled>No pets found</option>
            )}
          </select>
          {errors.petId && (
            <p className="text-red-500 text-sm mt-1">{errors.petId.message}</p>
          )}
        </div>

        {/* Plan Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Plan
          </label>
          <select
            {...register("planId", {
              required: "Please select a plan",
            })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="" disabled>
              Select Plan
            </option>
            {subscriptions?.map((item) => (
              <option key={item._id} value={item._id}>
                {item?.duration
                  ? `${item.subscriptionType?.purpose} - ${item.duration} days`
                  : `${item.subscriptionType?.purpose} - ${item.numberOfGroomings} groomings`}
              </option>
            ))}
          </select>
          {errors.planId && (
            <p className="text-red-500 text-sm mt-1">{errors.planId.message}</p>
          )}
        </div>

        {/* Price Details */}
        <div className="flex mt-3 items-center justify-between">
          <label className="text-gray-600">Total Price:</label>
          <div className="text-lg font-semibold text-green-600">
            ${totalPrice(planId)}
          </div>
        </div>

        <button
          type="submit"
          disabled={!petId || !planId || !visitType || isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "Purchase Subscription"}
        </button>
      </form>
    </div>
  );
};

export default BuySubscription;