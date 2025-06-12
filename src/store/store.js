import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./slices/inventorySlice.js"
import petSlice from "./slices/petSlice.js"
import visitSlice from "./slices/visitSlice.js"
import authSlice from "./slices/authSlice.js"
import attendanceSlice from "./slices/attendanceSlice.js"
import reminderSlice from "./slices/remindersSlice.js"
import subscriptionSlice from "./slices/subscriptionSlice.js"
import deboardSlice from "./slices/deboardSlice.js"
import servicesSlice from './slices/customerServiceSlice.js'; 
import appointSlice from "./slices/CustomerAppointmentslice.js"

export const store=configureStore({
    reducer:{
        inventory:inventorySlice,
        pets:petSlice,
        visits:visitSlice,
        auth:authSlice,
        attendance:attendanceSlice,
        reminders:reminderSlice,
        subscription:subscriptionSlice,
        deboard:deboardSlice,
        services: servicesSlice,
        appointments:appointSlice,
    }
})