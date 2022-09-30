import { useEffect } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeUser, logout } from "./reducers/authReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";
import { initializeUsers } from "./reducers/userReducer";
import BlogListView from "./components/BlogListView";
import Menu from "./components/Menu";

const App = () => {
  const user = useSelector((state) => state.authentication);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  if (user?.user?.username === undefined) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    );
  }

  return (
    <div>
      <Notification />
      <Menu />
      <BlogListView />
    </div>
  );
};

export default App;
