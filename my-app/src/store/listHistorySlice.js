import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const listHistorySlice = createSlice({
  name: "listHistories",
  initialState,
  reducers: {
    updateListHistories: (state, action) => {
      state.listHistories = action.payload;
    },
    updateListDetailHistories: (state, action) => {
      const existingHistories = state.listHistories
        ? JSON.parse(JSON.stringify(state.listHistories))
        : [];
      const index = existingHistories
        ? existingHistories.findIndex(
            (item) =>
              item.checkpoint.id === parseInt(action.payload[0].checkpoint_id)
          )
        : -1;
      if (index !== -1) {
        state.listHistories[index].detailHistories = action.payload;
        state.listHistories[index].avg = action.payload.avg
          ? action.payload.avg
          : {};
      }
    },
  },
});

export const { updateListHistories, updateListDetailHistories } =
  listHistorySlice.actions;

export const selectListHistories = (state) => state.listHistories;

export default listHistorySlice.reducer;
