const listHelper = require("../utils/list_helper");
const { noBlogs, blog, blogs } = require("./test_helper");

describe("most blogs", () => {

  test("of empty list is zero", () => {
    const result = listHelper.mostBlogs(noBlogs);
    expect(result).toBe(null);
  });

  test("when list has only one blog, equals to that blog", () => {
    const result = listHelper.mostBlogs(blog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("of a bigger list, equals to the author with the most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
