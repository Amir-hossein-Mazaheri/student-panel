import { createSlice } from "@reduxjs/toolkit";

const exam = createSlice({
  name: "exam",
  initialState: {
      remainingTime: 0,
  },
  reducers: {
      SET_REMAINING_TIME: (store, action) => {
          store.remainingTime = action.payload.time;
      }
  },
});

export default exam.reducer;

export const { SET_REMAINING_TIME } = exam.actions;
