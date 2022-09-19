import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      const content = action.payload;
      state = content;
      return state;
    },
    hideNotification(state) {
      state = "";
      return state;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
