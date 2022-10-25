import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserLogin: (state, action) => {
      state.username = action.payload.username;
      state.language = action.payload.language;
      state.token = action.payload.token;
      state.roleId = action.payload.roleId;
    },
  },
});

export const { updateUserLogin } = userSlice.actions;

export const selectUserLogin = (state) => state.user;

export default userSlice.reducer;
