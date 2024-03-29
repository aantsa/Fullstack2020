import { useState } from "react";

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleAddLike = () => {
    const blogToBeUpdated = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    addLike(blog.id, blogToBeUpdated);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div id="blog" className="blog" style={blogStyle}>
      <div>
        <span className="title">{blog.title} </span>
        <span className="author">{blog.author}</span>
        <button
          aria-label="visibility"
          className="visibility"
          onClick={toggleVisibility}
        >
          {visibility ? "hide" : "show"}
        </button>
      </div>
      {visibility && (
        <div>
          <div className="url">{blog.url}</div>
          <div className="likes">
            likes: {blog.likes}{" "}
            <button
              aria-label="like"
              className="like"
              id="like-button"
              onClick={handleAddLike}
            >
              like
            </button>
          </div>
          <div>{blog.author}</div>
          <div>
            <button id="delete-button" onClick={handleDeleteBlog}>delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
