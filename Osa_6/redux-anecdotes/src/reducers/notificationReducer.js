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

export const setNotification = (message, timer) => {
  return async (dispatch) => {
    window.clearTimeout(window.timeout);
    dispatch(showNotification(message));
    window.timeout = setTimeout(
      () => dispatch(hideNotification()),
      timer * 1000
    );
  };
};
export default notificationSlice.reducer;
