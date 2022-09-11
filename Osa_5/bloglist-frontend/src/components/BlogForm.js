import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const inputChange = (event) => {
    const blog = event.target;
    setNewBlog({ ...newBlog, [blog.name]: blog.value });
  };

  const handleAddBlog = (event) => {
    event.preventDefault();
    addBlog(newBlog.title, newBlog.author, newBlog.url);
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            name="title"
            type="text"
            value={newBlog.title}
            onChange={inputChange}
          />
        </div>
        <div>
          author:
          <input
            name="author"
            type="text"
            value={newBlog.author}
            onChange={inputChange}
          />
        </div>
        <div>
          url:
          <input
            name="url"
            type="text"
            value={newBlog.url}
            onChange={inputChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
