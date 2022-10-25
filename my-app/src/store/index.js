import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import listCheckpointReducer from "./listCheckpointSlice";
import historyReducer from "./listHistorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    listCheckpoints: listCheckpointReducer,
    listHistories: historyReducer,
  },
});
