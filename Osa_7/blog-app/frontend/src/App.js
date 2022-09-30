import { useEffect, useRef } from "react";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Toggleable";
import NewBlogForm from "./components/NewBlogForm";

import { useDispatch, useSelector } from "react-redux";
import { initializeUser, logout } from "./reducers/authReducer";
import BlogList from "./components/BlogList";

const App = () => {
  const user = useSelector((state) => state.authentication);

  const dispatch = useDispatch();
  const blogFormRef = useRef();


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
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.user.username} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
      </div>

      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>

      <BlogList />
    </div>
  );
};

export default App;
