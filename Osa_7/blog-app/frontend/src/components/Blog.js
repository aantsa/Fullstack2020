import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const style = {
    padding: 3,
    margin: 5,
    borderStyle: "solid",
    borderWidth: 1,
  };

  return (
    <div style={style} className="blog">
      <a href={`/blogs/${blog.id}`}>{blog.title}</a>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

export default Blog;
