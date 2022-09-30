import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: null,
  type: null,
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      const content = action.payload;
      state.text = content.text;
      state.type = content.type;
      return state;
    },
    hideNotification(state) {
      state.text = null;
      state.type = null;
      return state;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (notification, timer) => {
  return async (dispatch) => {
    window.clearTimeout(window.timeout);
    dispatch(showNotification(notification));
    window.timeout = setTimeout(() => dispatch(hideNotification()), 3000);
  };
};
export default notificationSlice.reducer;
