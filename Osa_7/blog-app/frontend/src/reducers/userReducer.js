import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/userList";

const initialState = [];

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload.response;
    },
  },
});

export const { setUsers } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const response = await usersService.getUsers();
    dispatch(setUsers({ response }));
  };
};

export default userSlice.reducer;
