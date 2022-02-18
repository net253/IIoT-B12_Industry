import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: "", username: "" };

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateAuth: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { updateAuth } = authSlice.actions;

export default authSlice.reducer;
