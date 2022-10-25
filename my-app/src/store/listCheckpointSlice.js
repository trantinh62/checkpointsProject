import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const listCheckpointSlice = createSlice({
  name: "listCheckpoints",
  initialState,
  reducers: {
    updateListCheckpoints: (state, action) => {
      state.listCheckpoints = action.payload;
    },
    updateListReviews: (state, action) => {
      const existingCheck = state.listCheckpoints
        ? JSON.parse(JSON.stringify(state.listCheckpoints))
        : [];
      const index = existingCheck
        ? existingCheck.findIndex(
            (item) =>
              item.checkpoint.id === parseInt(action.payload[0].checkpoint_id)
          )
        : -1;
      if (index !== -1) {
        state.listCheckpoints[index].reviews = action.payload;
      }
    },
  },
});

export const { updateListCheckpoints, updateListReviews } =
  listCheckpointSlice.actions;

export const selectListCheckpoints = (state) => state.listCheckpoints;

export default listCheckpointSlice.reducer;
