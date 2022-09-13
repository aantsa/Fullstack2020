import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("child calls parent component with correct form values", async () => {
  const newBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm addBlog={newBlog} />);

  const title = container.querySelector(".title");
  const author = container.querySelector(".author");
  const url = container.querySelector(".url");
  const submitButton = screen.getByRole("button", {
    name: /submit/i,
  });

  await user.type(title, "My first blog");
  await user.type(author, "Bob the blogger");
  await user.type(url, "https://fullstackopen.com");
  await user.click(submitButton);

  expect(newBlog.mock.calls).toHaveLength(1);
  expect(newBlog.mock.calls[0][0]).toBe("My first blog");
  expect(newBlog.mock.calls[0][1]).toBe("Bob the blogger");
  expect(newBlog.mock.calls[0][2]).toBe("https://fullstackopen.com");
});
