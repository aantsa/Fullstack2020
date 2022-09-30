import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogSlice",
  initialState: [],
  reducers: {
    addLike(state, action) {
      const { id } = action.payload;
      const likeToUpdate = state.find((a) => a.id === id);
      const updatedLike = {
        ...likeToUpdate,
        likes: likeToUpdate.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : updatedLike));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlog(state, action) {
      return action.payload;
    },
  },
});

export const { addLike, appendBlog, setBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogList = await blogService.getAll();
    dispatch(setBlog(blogList));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);
    const blogs = await blogService.getAll();
    blogService.remove(id).then(() => {
      const updatedBlogs = blogs.filter((b) => b.id !== id).sort(byLikes);
      dispatch(setBlog(updatedBlogs));
    });
  };
};

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    const liked = await blogService.update(id, blog);
    dispatch(addLike(liked));
  };
};

export default blogSlice.reducer;
