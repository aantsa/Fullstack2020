const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const { blogs, usersInDb } = require("./test_helper");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
});

describe("get blog/blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs identifier named id", async () => {
    const res = await api.get("/api/blogs");

    const ids = res.body.map((blog) => blog.id);

    for (const id of ids) {
      expect(id).toBeDefined();
    }
  });
});

describe("post a blog", () => {
  let token = null;
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("test1", 10);
    const user = await new User({ username: "name", passwordHash }).save();

    const tokenUser = { username: "name", id: user.id };
    return (token = jwt.sign(tokenUser, config.SECRET));
  });

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
      .set("Authorization", `Bearer ${token}`)
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
      .set("Authorization", `Bearer ${token}`)
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

    await api
      .post("/api/blogs")
      .send(blog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    const blogListAfter = await Blog.find({});
    const afterLength = blogListAfter.map((b) => b.toJSON());

    expect(afterLength).toHaveLength(blogs.length);
  });
});

describe("delete blog", () => {
  let token = null;
  beforeEach(async () => {
    await User.deleteMany({});

    await User.deleteMany({});
    await Blog.deleteMany({});

    const passwordHash = await bcrypt.hash("test1", 10);
    const user = await new User({ username: "name", passwordHash }).save();

    const tokenUser = { username: "name", id: user.id };
    token = jwt.sign(tokenUser, config.SECRET);

    const blogToDelete = {
      title: "delete blog",
      author: "wonderful blogger",
      url: "https://fullstackopen.com/",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blogToDelete)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    return token;

  });

  test("delete blog if status code 204", async () => {
    const blogs = await Blog.find({}).populate("user");
    const blogDelete = blogs[0];

    await api
      .delete(`/api/blogs/${blogDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

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

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

afterAll(() => {
  mongoose.connection.close();
});
