import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";


const store = configureStore({
  reducer: {
    notification: notificationReducer,
    authentication: authReducer,
    blog: blogReducer,
    users: userReducer
  },
});

export default store;
