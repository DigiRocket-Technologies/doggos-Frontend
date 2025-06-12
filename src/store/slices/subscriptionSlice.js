import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";

const initialState = {
  loadingSubscriptionDetails: false,
  subscriptionDetails: null,
  subscriptions: [],
};

export const getSubscriptionDetails = createAsyncThunk(
  "/subscription/getsubscriptiondetails",
  async (queryString, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || "";
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/subscription/getsubscriptiondetails/?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response.status === 401) {
      dispatch(logout());
    }
    const data = await response.json();
    return data;
  }
);

export const buySubscription = createAsyncThunk(
  "/subscription/buysubscription",
  
  async (formData, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || "";
    console.log(formData)
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/subscription/buysubscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData)
      }
    );
    if (response.status === 401) {
      dispatch(logout());
    }
    const data = await response.json();
    console.log(data)
    return data;
  }
);

export const getAllSubscription = createAsyncThunk(
  "/subscription/getAllsubscription",
  async (_,{ dispatch }) => {
    const token = localStorage.getItem("authtoken") || "";
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/subscription/getallsubscription`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    if (response.status === 401) {
      dispatch(logout());
    }
    const data = await response.json();
    return data;
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionDetails.pending, (state) => {
        state.loadingSubscriptionDetails = true;
      })
      .addCase(getSubscriptionDetails.fulfilled, (state, action) => {
        state.loadingSubscriptionDetails = false;
        state.subscriptionDetails = action?.payload?.success
          ? action?.payload?.subscription
          : null;
      })
      .addCase(getSubscriptionDetails.rejected, (state) => {
        state.loadingSubscriptionDetails = false;
      })
      .addCase(getAllSubscription.fulfilled, (state, action) => {
        state.subscriptions = action?.payload?.success
          ? action?.payload?.subscriptionPlans
          : [];
      })
  },
});


export default subscriptionSlice.reducer;
