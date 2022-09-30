import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";
import BlogDetails from "./components/BlogDetails";
import Menu from "./components/Menu";
import Notification from "./components/Notification";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById("root")
);
