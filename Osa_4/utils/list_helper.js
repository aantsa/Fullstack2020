const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, post) => sum + post.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return null;

  const favorite = blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr;
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length < 1) return null;

  const count = lodash.countBy(blogs, "author");

  const top = Object.keys(count).reduce((a, b) => {
    return count[a] > count[b] ? a : b;
  });

  return {
    author: top,
    blogs: count[top],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length < 1) return null;

  const count = lodash(blogs)
    .groupBy("author")
    .map((o, k) => ({
      author: k,
      likes: lodash.sumBy(o, "likes"),
    }))
    .value();

  return count.reduce((a, b) => {
    return a.likes > b.likes ? a : b;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
