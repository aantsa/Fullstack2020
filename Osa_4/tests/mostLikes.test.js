const listHelper = require("../utils/list_helper");
const { noBlogs, blog, blogs } = require("./test_helper");

describe("most likes", () => {

  test("of empty list is zero", () => {
    const result = listHelper.mostLikes(noBlogs);
    expect(result).toBe(null);
  });

  test("when list has only one blog, equals to that blog", () => {
    const result = listHelper.mostLikes(blog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a bigger list, equals to the author with the most blogs", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
