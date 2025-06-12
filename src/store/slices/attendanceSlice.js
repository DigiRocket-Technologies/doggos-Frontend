import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {logout} from "./authSlice"
const initialState = {
  attendanceListLoading: false,
  attendanceList: [],
};

export const getAttendance = createAsyncThunk(
  "/attendance/getattendance",
  async (date,{dispatch}) => {
    const token = localStorage.getItem("authtoken")||"";
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/attendance/getattendancelist/${date}`,
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

export const updateAttendance = createAsyncThunk(
  "/attendance/updateattendance",
  async ({ date, presentIds,absentIds },{dispatch}) => {
    console.log(date,presentIds,absentIds)
    const token = localStorage.getItem("authtoken")||"" ;
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/attendance/updateattendancelist`,
      {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, presentIds,absentIds }),
      }
    );

    if (response.status === 401) {
      dispatch(logout());
    }

    const data = await response.json();
    return data;
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAttendance.pending, (state) => {
        state.attendanceListLoading = true;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.attendanceListLoading = false;
        state.attendanceList = action?.payload?.success
          ? action?.payload?.attendance?.List
          : [];
      })
      .addCase(getAttendance.rejected, (state) => {
        state.attendanceListLoading = false;
      })
      .addCase(updateAttendance.pending, (state) => {
        state.attendanceListLoading = true;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.attendanceListLoading = false;
        state.attendanceList = action?.payload?.success
          ? action?.payload?.attendance?.List
          : [];
      })
      .addCase(updateAttendance.rejected, (state) => {
        state.attendanceListLoading = false;
      });
  },
});

export default attendanceSlice.reducer;
