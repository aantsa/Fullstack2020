const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const { noBlogs, blog, blogs } = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
});

describe("fetching blog/blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs identifier named as id", async () => {
    const res = await api.get("/api/blogs");

    const ids = res.body.map((blog) => blog.id);

    for (const id of ids) {
      expect(id).toBeDefined();
    }
  });
});

describe("post a blog", () => {
  test("new valid blog test ", async () => {
    const blog = {
      title: "A Blog",
      author: "Eventful Blogger",
      url: "https://fullstackopen.com/",
      likes: 4,
    };

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogListAfter = await Blog.find({});
    const afterLength = blogListAfter.map((b) => b.toJSON());

    expect(afterLength).toHaveLength(blogs.length + 1);

    const addedBlog = blogListAfter.map((blog) => blog.title);
    expect(addedBlog).toContain("A Blog");
  });

  test("set likes to 0 as default", async () => {
    const blog = {
      title: "A blog with 0 likes",
      author: "Joyful Blogger",
      url: "https://fullstackopen.com/",
    };

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogListAfter = await Blog.find({});
    const afterLength = blogListAfter.map((b) => b.toJSON());

    expect(afterLength).toHaveLength(blogs.length + 1);
    expect(afterLength[afterLength.length - 1].likes).toEqual(0);
  });

  test("status 400 if title or url missing", async () => {
    const blog = {
      author: "Playful blogger",
    };

    await api.post("/api/blogs").send(blog).expect(400);

    const blogListAfter = await Blog.find({});
    const afterLength = blogListAfter.map((b) => b.toJSON());

    expect(afterLength).toHaveLength(blogs.length);
  });
});

describe("delete blog", () => {
  test("delete blog if status code 204", async () => {
    const blogs = await Blog.find({});
    const blogList = blogs.map((blog) => blog.toJSON());

    const blogDelete = blogList[0];

    await api.delete(`/api/blogs/${blogDelete.id}`).expect(204);

    const blogListAfter = await Blog.find({});
    const afterLength = blogListAfter.map((b) => b.toJSON());
    expect(afterLength).toHaveLength(blogs.length - 1);

    expect(afterLength.map((r) => r.id)).not.toContain(blogDelete.id);
  });
});

describe("update blog", () => {
  test("200 if updated, othewise 404", async () => {
    const blogs = await Blog.find({});
    const blogList = blogs.map((blog) => blog.toJSON());

    const blogUpdate = blogList[0];

    await api.put(`/api/blogs/${blogUpdate.id}`).send({ likes: 1 }).expect(200);

    const blogListAfter = await Blog.find({});
    const afterLength = blogListAfter.map((b) => b.toJSON());
    const updateBlog = afterLength[0];

    expect(afterLength).toHaveLength(blogs.length);

    expect(updateBlog.likes).toBe(1);

  });
});

afterAll(() => {
  mongoose.connection.close();
});

afterAll(() => {
  mongoose.connection.close();
});
