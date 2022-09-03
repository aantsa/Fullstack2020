const listHelper = require("../utils/list_helper");
const { noBlogs, blog, blogs } = require("./test_helper");

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(noBlogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(blog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});