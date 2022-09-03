const listHelper = require("../utils/list_helper");
const { noBlogs, blog, blogs } = require("./test_helper");

describe('favorite blog', () => {
  test("of empty list is zero", () => {
    const result = listHelper.favoriteBlog(noBlogs);
    expect(result).toBe(null);
  });

  test("when list has only one blog, equals to that blog", () => {
    const result = listHelper.favoriteBlog(blog);
    expect(result).toEqual({
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
    });
  });

  test("of a bigger list, equals to the most liked blog", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
    });
  });
})