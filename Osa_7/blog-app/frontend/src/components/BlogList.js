import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs, likeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div id="blogs">
      {blogs?.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user.user} />
      ))}
    </div>
  );
};

export default BlogList;
