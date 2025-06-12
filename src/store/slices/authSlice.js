import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  isAuthenticated: localStorage.getItem("authtoken") !== null,
  token: localStorage.getItem("authtoken") || null,
  error: null,
};

export const login = createAsyncThunk("/auth/login", async (formData, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log(data.user);
    if (!response.ok) {
      return rejectWithValue(data.message || 'Login failed');
    }
   
      if(data.success){
           localStorage.setItem("authtoken", data.token);
          //  localStorage.setItem("user", data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
         
      }
          
 
    return data;
  } catch (error) {
    return rejectWithValue(error.message || 'Network error');
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {

  const itemsToRemove = ["authtoken", "user", "userRole", "userId", "customerId"];
  itemsToRemove.forEach(item => {
    if (localStorage.getItem(item) !== null) {
      localStorage.removeItem(item);
    }
  });
  
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // clearError: (state) => {
    //   state.error = null;
    // },
    
    // loginSuccess: (state, action) => {
    //   state.isLoading = false;
    //   state.isAuthenticated = true;
    //   state.user = action?.payload?.user;
    //   state.token = action?.payload?.token;
    //   state.error = null;
      

    //   localStorage.setItem("authtoken", action.payload.token);
    //   localStorage.setItem("user", JSON.stringify(action?.payload?.user));
    //   localStorage.setItem("userId", action.payload.user._id);
    //   if (action.payload.user.role) {
    //     localStorage.setItem("userRole", action?.payload?.user?.role);
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload || 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { clearError, loginSuccess } = authSlice.actions;
export default authSlice.reducer;