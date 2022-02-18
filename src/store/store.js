import { configureStore } from "@reduxjs/toolkit";

import allMCSlice from "./slices/allMCSlice";
import sapSlice from "./slices/sapSlice";
import mcInfoSlice from "./slices/mcInfoSlice";
import authSlice from "./slices/authSlice";

export default configureStore({
  reducer: {
    allMC: allMCSlice,
    sap: sapSlice,
    machineInfo: mcInfoSlice,
    auth: authSlice,
  },
});
