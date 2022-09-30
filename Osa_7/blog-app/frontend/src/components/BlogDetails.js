import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { initializeUser } from "../reducers/authReducer";
import { initializeBlogs, likeBlog, removeBlog } from "../reducers/blogReducer";
import Menu from "./Menu";

const BlogDetails = () => {
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.authentication);
  let { id } = useParams();
  const blog = blogs.find((x) => x.id === id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  if (!blog) return null;

  const handleLike = async () => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    dispatch(likeBlog(blog.id, likedBlog));
  };

  const handleRemove = (blog) => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`);
    if (!ok) {
      return;
    } else {
      dispatch(removeBlog(blog.id));
      navigate("/");
    }
  };

  const addedBy = blog.user && blog.user.name ? blog.user.name : "anonymous";

  return (
    <div>
      <Menu />
      <h2>{blog.name}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => handleLike(blog.id, blog)}>like</button>
      </div>
      {addedBy}
      {blog.user && user.user.username === blog.user.username && (
        <button onClick={() => handleRemove(blog)}>remove</button>
      )}
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back to list of blogs
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
