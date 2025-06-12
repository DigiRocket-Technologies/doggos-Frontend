import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";

const initialState = {
  getAllInventoryLoading: false,
  inventoryList: [],
  editInventoryLoading: false,
  addInventoryLoading: false,
  deleteInventoryLoading: false
};

export const getAllInventory = createAsyncThunk(
  "/inventory/getallinventory",
  async (_,{dispatch}) => {
    const token=localStorage.getItem("authtoken")||""
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/inventory/getallinventory`,
      {
        method: "GET",
        headers:{
          "Authorization":token,
          "Content-Type":"application/json"
        }
      }
    );

    if (response.status === 401) {
      dispatch(logout());
    }
    const data = await response.json();
    return data;
  }
);

export const editInventoryItem = createAsyncThunk(
  "/inventory/editinventoryitem",
  async (formData,{dispatch}) => {
    const token=localStorage.getItem("authtoken")||""
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/inventory/editinventory`,
      {
        method: "POST",
        headers:{
          "Authorization":token,
          "Content-Type":"application/json"
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.status === 401) {
      dispatch(logout());
    }
    const data = await response.json();
    return data;
  }
);

export const addInventoryItem = createAsyncThunk(
  "/inventory/addinventoryitem",
  async (formData,{dispatch}) => {
    const token=localStorage.getItem("authtoken")||""
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/inventory/addinventory`,
      {
        method: "POST",
        headers:{
          "Authorization":token,
          "Content-Type":"application/json"
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.status === 401) {
      dispatch(logout());
    }
    const data = await response.json();
    return data;
  }
);

export const deleteInventoryItem = createAsyncThunk(
  "/inventory/deleteinventoryitem",
  async (id, {dispatch}) => {
    const token = localStorage.getItem("authtoken") || ""
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/inventory/deleteinventory/${id}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        }
      }
    );

    if (response.status === 401) {
      dispatch(logout());
    }
    const data = await response.json();
    return data;
  }
);

export const getInventoryItemDetails = createAsyncThunk(
  "/inventory/getinventoryitemdetails",
  async (id,{dispatch}) => {
    const token=localStorage.getItem("authtoken")||""
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/inventory/getinventoryitemdetails/${id}`,
      {
        method: "Get",
        headers:{
          "Authorization":token,
          "Content-Type":"application/json"
        }
      }
    );
    if (response.status === 401) {
      dispatch(logout());
    }
    const data = await response.json();
    return data;
  }
);

export const getAlertListOfInventory = createAsyncThunk(
  "/inventory/getalertlist",
  async (_,{dispatch}) => {
    const token=localStorage.getItem("authtoken")||""
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/inventory/getalertlist`,
      {
        method: "get",
        headers:{
          "Authorization":token,
          "Content-Type":"application/json"
        }
      }
    );

    if (response.status === 401) {
      dispatch(logout());
    }
    const data = await response.json();
    return data;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllInventory.pending, (state) => {
        state.getAllInventoryLoading = true;
      })
      .addCase(getAllInventory.fulfilled, (state, action) => {
        state.getAllInventoryLoading = false;
        state.inventoryList = action?.payload?.success
          ? action?.payload?.items
          : [];
      })
      .addCase(getAllInventory.rejected, (state) => {
        state.getAllInventoryLoading = false;
      })
      .addCase(getAlertListOfInventory.fulfilled,(state,action)=>{
        state.inventoryList=action?.payload?.success?action?.payload?.items:[];
      })
      .addCase(deleteInventoryItem.pending, (state) => {
        state.deleteInventoryLoading = true;
      })
      .addCase(deleteInventoryItem.fulfilled, (state, action) => {
        state.deleteInventoryLoading = false;
      })
      .addCase(deleteInventoryItem.rejected, (state) => {
        state.deleteInventoryLoading = false;
      });
  },
});

export default inventorySlice.reducer;