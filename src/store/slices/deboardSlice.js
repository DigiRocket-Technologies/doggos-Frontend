import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
const initialState = {
  petsList: [],
  petsListLoading: false,
  boardingDetails: null,
};

export const getBoardedPetList = createAsyncThunk(
  "/pets/getboardedpetlist",
  async (querystring, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || "";
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/pet/getboardedpetslist/?${querystring}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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

export const getBoardingDetails = createAsyncThunk(
  "/boarding/getboardingdetails",
  async (_id, { dispatch }) => {
    const token = localStorage.getItem("authtoken") || "";
    console.log("Hii");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/boarding/getboardingdetails`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      }
    );
    console.log("Hello");
    if (response.status === 401) {
      dispatch(logout());
    }

    const data = await response.json();
    return data;
  }
);

export const dogParkDeboarding = createAsyncThunk(
  "/pets/dogparkdeboarding",
  async (boardingid, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authtoken") || "";

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/deboard/dogparkdeboarding`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ boardingid }),
        }
      );

      if (response.status === 401) {
        dispatch(logout());
      }

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } 
  
);

export const daySchoolDeboarding = createAsyncThunk(
  "/pets/dayschooldeboarding",
  async (boardingid, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authtoken") || "";

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/boarding/dayschooldeboarding`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boardingid }),
      }
    );

    if (response.status === 401) {
      dispatch(logout());
    }

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message);
    }

    return data;
  }
);

export const playSchoolDeboarding = createAsyncThunk(
  "/pets/playschooldeboarding",
  async (boardingid, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authtoken") || "";

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/boarding/playchooldeboarding`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boardingid }),
      }
    );

    if (response.status === 401) {
      dispatch(logout());
    }

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message);
    }

    return data;
  }
);

export const hostelDeboarding = createAsyncThunk(
  "/pets/hosteldeboarding",
  async (boardingid, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authtoken") || "";

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/boarding/hosteldeboarding`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boardingid }),
      }
    );

    if (response.status === 401) {
      dispatch(logout());
    }

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message);
    }

    return data;
  }
);

export const dayCareDeboarding = createAsyncThunk(
  "/boarding/dayCaredeboarding",
  async (boardingid, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authtoken") || "";

    // Updated to use /api/v1/deboard/ instead of /api/v1/pet/
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/boarding/daycaredeboarding`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boardingid }),
      }
    );

    if (response.status === 401) {
      dispatch(logout());
      return rejectWithValue("Authentication failed");
    }

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || "Failed to deboard pet");
    }

    return data;
  }
);

export const updateHostelVisit = createAsyncThunk(
  "/boarding/updatehostelvisit",

  async (formdata, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authtoken") || "";

    // Updated to use /api/v1/deboard/ instead of /api/v1/pet/
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/visit/updatehostelvisit`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      }
    );

    if (response.status === 401) {
      dispatch(logout());
      return rejectWithValue("Authentication failed");
    }

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || "Failed to deboard pet");
    }

    return data;
  }
);

const deboardingSlice = createSlice({
  name: "deboard",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBoardedPetList.pending, (state) => {
        state.petsListLoading = true;
      })
      .addCase(getBoardedPetList.fulfilled, (state, action) => {
        state.petsListLoading = false;
        state.petsList = action?.payload?.success
          ? action?.payload?.boardedPetList
          : [];
      })
      .addCase(getBoardedPetList.rejected, (state) => {
        state.petsListLoading = false;
      })
      .addCase(getBoardingDetails.fulfilled, (state, action) => {
        state.boardingDetails = action?.payload?.success
          ? action?.payload?.boardingDetails
          : null;
      });
  },
});

export default deboardingSlice.reducer;
