import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const handleAddLike = () => {
    console.log(blog.user.id)
    const blogToBeUpdated = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    addLike(blog.id, blogToBeUpdated)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>
          {visibility ? 'hide' : 'show'}
        </button>
      </div>
      {visibility && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes} <button onClick={handleAddLike}>like</button>
          </div>
          <div>{blog.author}</div>
          <div>
            <button onClick={handleDeleteBlog}>delete</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
