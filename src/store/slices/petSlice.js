import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
const initialState = {
  petList: [],
  getPetListLoading: false,
  petDetails: null,
  petDetailsLoading: false,
  filterPetsByBreedLoading: false,
  addPetLoading: false,
};

export const addPet = createAsyncThunk(
  "/pet/addpet",
  async (formdata, { dispatch }) => {
    const token = localStorage?.getItem("authtoken") || "";
    const response = await fetch(`${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/pet/addpet`, {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });

    if (response.status === 401) {
      dispatch(logout());
    }

    const data = await response.json();
    return data;
  }
);

export const getPetList = createAsyncThunk(
  "/pet/getpet",
  async (_, { dispatch }) => {
    const token = localStorage?.getItem("authtoken") || "";
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/pet/getallpets`,
      {
        headers: {
          "Authorization": token,
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

export const getPetDetails = createAsyncThunk(
  "/pet/getpetdetails",
  async (id, { dispatch }) => {
    const token = localStorage?.getItem("authtoken") || "";
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/pet/getpetdetails/${id}`,
      {
        method: "GET",
        headers: {
          "Authorization": token,
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

export const getfilterPetsByBreed = createAsyncThunk(
  "/pets/getfilterpetsbybreedandspecies",
  async (querystring, { dispatch }) => {
    const token = localStorage?.getItem("authtoken") || "";
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/pet/getfilteredpetsbybreedandspecies/?${querystring}`,
      {
        method: "GET",
        headers: {
          "Authorization": token,
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

export const getPetsByRegistrationDate = createAsyncThunk(
  "/pet/getpetbyregistartiondate",
  async (formattedDate, { dispatch }) => {
    const token = localStorage?.getItem("authtoken") || "";
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/pet/getpetsbyregistrationdate/${formattedDate}`,
      {
        headers: {
          "Authorization": token,
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

export const filterPetsByNameAndPhone = createAsyncThunk(
  "/pets/filterpetsbynameandphone",
  async (querystring, { dispatch }) => {
    const token = localStorage?.getItem("authtoken") || "";
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/pet/getfilteredpetsbynameandphone/?${querystring}`,
      {
        method: "GET",
        headers: {
          "Authorization": token,
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

export const getPetHistory = createAsyncThunk(
  "/pet/getpetdetails",
  async (petId, { dispatch }) => {
    const token = localStorage?.getItem("authtoken") || "";
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/pet/getpethistory/${petId}`,
      {
        method:"GET",
        headers: {
          "Authorization": token,
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

export const editPetDetails=createAsyncThunk("/pet/editpetdetails",
  async (formdata, { dispatch }) => {
    const token = localStorage?.getItem("authtoken") || "";
    const response = await fetch(`${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/pet/editpetdetails`, {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });

    if (response.status === 401) {
      dispatch(logout());
    }

    const data = await response.json();
    return data;
})

export const editOwnerDetails=createAsyncThunk("/pet/editownerdetails",
  async (formdata, { dispatch }) => {
    const token = localStorage?.getItem("authtoken") || "";
    const response = await fetch(`${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/pet/editownerdetails`, {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });

    if (response.status === 401) {
      dispatch(logout());
    }

    const data = await response.json();
    return data;
})

const petSlice = createSlice({
  name: "pet",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPetList.pending, (state) => {
        state.getPetListLoading = true;
      })
      .addCase(getPetList.fulfilled, (state, action) => {
        state.getPetListLoading = false;
        state.petList = action?.payload?.success ? action?.payload?.list : [];
      })
      .addCase(getPetList.rejected, (state) => {
        state.getPetListLoading = false;
      })
      .addCase(getPetDetails.pending, (state) => {
        state.petDetailsLoading = true;
      })
      .addCase(getPetDetails.fulfilled, (state, action) => {
        state.petDetailsLoading = false;
        state.petDetails = action?.payload?.success
          ? action?.payload?.pet
          : null;
      })
      .addCase(getPetDetails.rejected, (state) => {
        state.petDetailsLoading = false;
      })
      .addCase(getfilterPetsByBreed.pending, (state) => {
        state.filterPetsByBreedLoading = true;
      })
      .addCase(getfilterPetsByBreed.fulfilled, (state) => {
        state.filterPetsByBreedLoading = false;
      })
      .addCase(getfilterPetsByBreed.rejected, (state) => {
        state.filterPetsByBreedLoading = false;
      })
      .addCase(filterPetsByNameAndPhone.pending, (state) => {
        state.getPetListLoading = true;
      })
      .addCase(filterPetsByNameAndPhone.fulfilled, (state, action) => {
        state.getPetListLoading = false;
        state.petList = action?.payload?.success ? action?.payload?.list : [];
      })
      .addCase(filterPetsByNameAndPhone.rejected, (state) => {
        state.getPetListLoading = false;
      })
      .addCase(addPet.pending, (state) => {
        state.addPetLoading = true;
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.addPetLoading = false;
      })
      .addCase(addPet.rejected, (state) => {
        state.addPetLoading = false;
      });
  },
});

export default petSlice.reducer;
