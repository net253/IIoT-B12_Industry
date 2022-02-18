import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allMCSlice = createSlice({
  name: "allMCAction",
  initialState,
  reducers: {
    updateAllMCInfo: (state, action) => [...action.payload],
  },
});

// Action creators
export const { updateAllMCInfo } = allMCSlice.actions;

// Reducer
export default allMCSlice.reducer;
