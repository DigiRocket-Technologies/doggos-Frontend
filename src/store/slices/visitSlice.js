import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";

const initialState = {
  addVisitLoading: false,
  prices: [],
};

export const addVisit = createAsyncThunk(
  "/visit/addvisit",
  async (formData, { dispatch }) => {
    const token = localStorage.getItem("authtoken");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/addvisit`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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

export const addInquiryDetails = createAsyncThunk(
  "/visit/addInquiryDetails",

  async (formData, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || null;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/addinquiryvisit`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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

export const addHostelVisit = createAsyncThunk(
  "/visit/addhostelvisit",

  async (formData, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || null;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/addhostelvisit`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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

export const addDayCareVisit = createAsyncThunk(
  "/visit/adddaycarevisit",

  async (formData, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || null;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/adddaycarevisit`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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

export const addDaySchoolVisit = createAsyncThunk(
  "/visit/adddayschoolvisit",

  async (formData, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || null;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/adddayschoolvisit`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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

export const addPlaySchoolVisit = createAsyncThunk(
  "/visit/addplayschoolvisit",

  async (formData, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || null;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/addplayschoolvisit`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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

export const addDogParkVisit = createAsyncThunk(
  "/visit/adddogparkvisit",

  async (formData, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || null;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/adddogparkvisit`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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

export const addGroomingVisit = createAsyncThunk(
  "/visit/addgroomingvisit",

  async (formData, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || null;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/addgroomingvisit`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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

export const addVeterinaryVisit = createAsyncThunk(
  "/visit/addveterinaryvisit",

  async (formData, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || null;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/addveterinaryvisit`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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

export const addShopVisit = createAsyncThunk(
  "/visit/addshopvisit",

  async (formData, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || null;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/addshopvisit`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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

export const getAllPrices = createAsyncThunk(
  "/visit/getAllPrices",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || "";
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/getallvisitprices`,
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

export const getVisitList = createAsyncThunk(
  "/visit/getvisitlist",
  async (querystring, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || "";

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/getvisitlist?${querystring}`,
      {
        method: "POST",
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

export const getAllVisitType = createAsyncThunk(
  "/visit/getallvisitype",

  async (_, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || "";

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/getallvisittypes`,
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

export const getBoardingCategoryList = createAsyncThunk(
  "/visit/getallvisitype",

  async (_, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || "";

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/getboardingcategories`,
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

export const addShoppingVisit = createAsyncThunk(
  "/visit/addshoppingvisit",

  async (formdata, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || "";

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/addshoppingvisit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body:JSON.stringify(formdata)
      }
    );

    if (response.status === 401) {
      dispatch(logout());
    }
    const data = await response.json();
    return data;
  }
);


const visitSlice = createSlice({
  name: "visit",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllPrices.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.prices = action.payload.prices;
        } else {
          state.prices = [];
        }
      })
      .addCase(addVisit.pending, (state) => {
        state.addVisitLoading = true;
      })
      .addCase(addVisit.fulfilled, (state) => {
        state.addVisitLoading = false;
      })
      .addCase(addVisit.rejected, (state) => {
        state.addVisitLoading = false;
      });
  },
});

export default visitSlice.reducer;
