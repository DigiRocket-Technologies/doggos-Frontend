import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CustomerSubscriptions = () => {
  const { user } = useSelector((state) => state.auth);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomerSubscriptions = async () => {
    try {
      const token = localStorage?.getItem("authtoken") || "";
      const encodedEmail = encodeURIComponent(user.email);
      
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/subscription/customer-subscriptions?email=${encodedEmail}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setSubscriptions(data.subscriptions || []);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchCustomerSubscriptions();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  // Group subscriptions by pet
  const subscriptionsByPet = subscriptions.reduce((acc, subscription) => {
    const petId = subscription.petId._id;
    if (!acc[petId]) {
      acc[petId] = {
        pet: subscription.petId,
        subscriptions: []
      };
    }
    acc[petId].subscriptions.push(subscription);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-[#EFE3C2] to-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-[#123524]">My Pet Subscriptions</h1>
      
      {subscriptions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#3E7B27]">No subscriptions found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.values(subscriptionsByPet).map((petGroup) => (
            <div key={petGroup.pet._id} className="border border-[#85A947] rounded-lg p-6 bg-white shadow-lg">
              {/* Pet Header */}
              <div className="border-b border-[#EFE3C2] pb-4 mb-4">
                <h2 className="text-xl font-bold text-[#123524]">
                  {petGroup.pet.name}
                </h2>
                <p className="text-[#3E7B27]">{petGroup.pet.breed}</p>
                <p className="text-sm text-[#85A947]">{petGroup.pet.email}</p>
              </div>
              
              {/* Pet's Subscriptions */}
              <div className="space-y-3">
                <h3 className="font-semibold text-[#3E7B27] mb-3">
                  Active Subscriptions ({petGroup.subscriptions.length})
                </h3>
                
                {petGroup.subscriptions.map((subscription) => (
                  <div key={subscription._id} className="border border-[#EFE3C2] rounded-lg p-4 bg-[#EFE3C2] bg-opacity-30">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-[#3E7B27]">Subscription Type</p>
                        <p className="font-medium text-[#123524]">{subscription.planId?.subscriptionType?.purpose || 'N/A'}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-[#3E7B27]">Days Left</p>
                        <p className={`font-bold ${subscription.daysLeft <= 7 ? 'text-red-600' : subscription.daysLeft <= 30 ? 'text-yellow-600' : 'text-[#85A947]'}`}>
                          {subscription.daysLeft}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-[#3E7B27]">Status</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          subscription.active ? 'bg-[#85A947] text-white' : 'bg-red-100 text-red-800'
                        }`}>
                          {subscription.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      {subscription.numberOfGroomings && (
                        <div>
                          <p className="text-sm text-[#3E7B27]">Grooming Sessions</p>
                          <p className="font-medium text-[#123524]">{subscription.numberOfGroomings}</p>
                        </div>
                      )}
                      
                      <div>
                        <p className="text-sm text-[#3E7B27]">Duration</p>
                        <p className="font-medium text-[#123524]">{subscription.planId?.duration || 'N/A'} days</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-[#85A947] flex justify-between items-center text-sm text-[#3E7B27]">
                      <span>Started: {new Date(subscription.firstPaymentDate).toLocaleDateString()}</span>
                      <span>Last Payment: {new Date(subscription.lastPaymentDate).toLocaleDateString()}</span>
                      {subscription.planId?.price && (
                        <span className="font-semibold text-[#85A947]">${subscription.planId.price}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Summary */}
      {subscriptions.length > 0 && (
        <div className="mt-6 bg-[#EFE3C2] bg-opacity-50 border border-[#85A947] rounded-lg p-4">
          <h3 className="font-semibold text-[#123524] mb-2">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-[#3E7B27]">Total Pets</p>
              <p className="font-bold text-[#123524]">{Object.keys(subscriptionsByPet).length}</p>
            </div>
            <div>
              <p className="text-[#3E7B27]">Total Subscriptions</p>
              <p className="font-bold text-[#123524]">{subscriptions.length}</p>
            </div>
            <div>
              <p className="text-[#3E7B27]">Active Subscriptions</p>
              <p className="font-bold text-[#123524]">{subscriptions.filter(sub => sub.active).length}</p>
            </div>
            <div>
              <p className="text-[#3E7B27]">Expiring Soon (≤7 days)</p>
              <p className="font-bold text-red-600">{subscriptions.filter(sub => sub.daysLeft <= 7 && sub.active).length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSubscriptions;