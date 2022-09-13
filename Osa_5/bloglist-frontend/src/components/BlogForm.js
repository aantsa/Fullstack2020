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
            className="title"
            value={newBlog.title}
            onChange={inputChange}
          />
        </div>
        <div>
          author:
          <input
            name="author"
            type="text"
            className="author"
            value={newBlog.author}
            onChange={inputChange}
          />
        </div>
        <div>
          url:
          <input
            name="url"
            type="text"
            className="url"
            value={newBlog.url}
            onChange={inputChange}
          />
        </div>
        <button aria-label="submit" className="submit" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
