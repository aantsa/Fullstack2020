import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import authReducer from "./reducers/authReducer";


const store = configureStore({
  reducer: {
    notification: notificationReducer,
    authentication: authReducer,
    blog: blogReducer,
  },
});

export default store;
