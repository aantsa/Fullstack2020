import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  const blog = {
    title: "My first blog",
    author: "Bob the blogger",
    url: "https://fullstackopen.com",
    likes: 5,
    user: {
      username: "username",
      name: "name",
      id: 1
    },
  };

  const likeMockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} addLike={likeMockHandler} />
    );
  });

  test("renders the blog title, author, but by default does not render the url or the number of likes", () => {
    expect(component.container.querySelector(".title")).toHaveTextContent(
      blog.title
    );
    expect(component.container.querySelector(".author")).toHaveTextContent(
      blog.author
    );
    const url = component.container.querySelector(".url");
    expect(url).toBeNull();
    const likes = component.container.querySelector(".likes");
    expect(likes).toBeNull();
  });

  test("renders url and the number of likes when the 'visibility' button has been clicked", () => {
    const button = screen.getByRole("button", {
      name: /visibility/i,
    });
    fireEvent.click(button);

    const url = component.container.querySelector(".url");
    expect(url).toHaveTextContent(blog.url);
    const likes = component.container.querySelector(".likes");
    expect(likes).toHaveTextContent(blog.likes);
  });

  test("if like button is clicked twice, the event handler is called twice", () => {
    const showButton = screen.getByRole("button", {
      name: /visibility/i,
    });
    fireEvent.click(showButton);

    const likeButton = screen.getByRole("button", {
      name: /like/i,
    });
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});
