import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const mcInfoSlice = createSlice({
  name: "mcInfoAction",
  initialState,
  reducers: {
    updateMachineInfo: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { updateMachineInfo } = mcInfoSlice.actions;

export default mcInfoSlice.reducer;
