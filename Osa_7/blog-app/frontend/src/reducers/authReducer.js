import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";
import { setNotification } from "./notificationReducer";
import loginService from "../services/login";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      const content = action.payload;
      state.user = content.user;
      return state;
    },
    clearUser(state) {
      state.user = null;
      return state;
    }
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const user = userService.getUser();
    if (user) {
      dispatch(setUser({ user }));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(clearUser(null));
    dispatch(setNotification({ text: "good bye!" }));
    userService.clearUser();
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    await loginService
      .login(username, password)
      .then((user) => {
        userService.setUser(user);
        dispatch(setUser({ user }));
        dispatch(setNotification({ text: `${user.name} logged in!` }));
      })
      .catch(() => {
        dispatch(
          setNotification({ text: "wrong username/password", type: "alert" })
        );
      });
  };
};

export default authSlice.reducer;
