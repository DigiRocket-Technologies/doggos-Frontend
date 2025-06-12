import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";

const initialState = {
  List: [],
  loadingList: false,
};

export const getRemindersList = createAsyncThunk(
  "/reminders/getreminderslist",

  async (date, { dispatch }) => {
    const token = localStorage.getItem("authtoken");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/reminders/getreminderslist/${date}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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

export const sendReminders = createAsyncThunk(
  "/reminders/sendreminders",

  async (date, { dispatch }) => {
    const token = localStorage.getItem("authtoken");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/reminders/sendreminders/${date}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
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


const reminderSlice = createSlice({
  name: "reminders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRemindersList.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(getRemindersList.fulfilled, (state, action) => {
        state.loadingList = false;
        state.List = action?.payload?.success ? action?.payload?.List : {};
      })
      .addCase(getRemindersList.rejected, (state) => {
        state.loadingList = false;
      });
  },
});

export default reminderSlice.reducer;
