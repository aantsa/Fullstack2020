describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Anton Fagerholm",
      username: "anton",
      password: "fagerholm",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", () => {
    cy.contains("blogs");
  });

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("#username").type("anton");
      cy.get("#password").type("fagerholm");
      cy.get("#login-button").click();
      cy.contains("Anton Fagerholm logged in");
    });

    it("fails with wrong credentials", () => {
      cy.get("#username").type("typoanton");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();
      cy.get("html").should("not.contain", "Anton Fagerholm logged in");
    });
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.login({ username: "anton", password: "fagerholm" });
    });

    it("a new blog can be created after login", () => {
      cy.createBlog({
        title: "a blog created by cypress",
        author: "cypress",
        url: "https://fullstackopen.com/",
      });
      cy.contains("a blog created by cypress");
    });

    describe("and several blogs exist", () => {
      beforeEach(() => {
        cy.createBlog({
          title: "first blog",
          author: "cypress",
          url: "https://fullstackopen.com/",
        });
        cy.createBlog({
          title: "second blog",
          author: "cypress",
          url: "https://fullstackopen.com/",
        });
        cy.createBlog({
          title: "third blog",
          author: "cypress",
          url: "https://fullstackopen.com/",
        });
      });

      it("one of those can be liked", () => {
        cy.contains("first blog").parent().find("button").click();
        cy.get("#like-button").click();
      });

      it("one of those can be deleted", () => {
        cy.contains("second blog").parent().find("button").click();
        cy.get("#delete-button").click();
        cy.get("html").should("not.contain", "second blog");
      });

      it("blogs arranged in descending order according to likes", async () => {
        cy.contains("third blog").parent().find("button").click();
        cy.get("#like-button").click().wait(500);
        cy.contains("third blog").parent().find("button").click();
        cy.contains("second blog").parent().find("button").click();
        cy.get("#like-button").click().wait(500).click().wait(500);
        cy.get("#blog").eq(0).should("contain", "second blog");
        cy.get("#blog").eq(1).should("contain", "third blog");
        cy.get("#blog").eq(2).should("contain", "first blog");
      });
    });
  });
});
