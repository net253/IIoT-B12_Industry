import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const sapSlice = createSlice({
  name: "sapAction",
  initialState,
  reducers: {
    updateSapOrder: (state, action) => [...action.payload],
  },
});

// Action creators
export const { updateSapOrder } = sapSlice.actions;

// Reducer
export default sapSlice.reducer;
