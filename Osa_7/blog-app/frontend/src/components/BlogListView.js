import { useRef } from "react";
import { useSelector } from "react-redux";
import BlogList from "./BlogList";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Toggleable";
import User from "./User";
import { useNavigate } from "react-router-dom";

const BlogListView = () => {
  const navigate = useNavigate();
  const blogFormRef = useRef();
  return (
    <div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>

      <BlogList />
      <button
        onClick={() => {
          navigate("/users");
        }}
      >List of users</button>
    </div>
  );
};

export default BlogListView;
