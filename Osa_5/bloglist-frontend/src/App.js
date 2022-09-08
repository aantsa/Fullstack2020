import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Toast from "./components/Toast";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setNotification({ message: `Welcome ${user.name}` });
      setUser(user);
    } catch (exception) {
      setNotification({
        message: "Wrong username or password",
        error: true,
      });
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setNotification({ message: "You have logged out" });
  };

  const addBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      });
      setBlogs([...blogs, blog]);
      setNotification({ message: `A new blog ${title} by ${author} added` });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Toast notification={notification} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>

          <BlogForm addBlog={addBlog} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
