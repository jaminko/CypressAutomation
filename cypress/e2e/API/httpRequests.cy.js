describe("HTTP Requests examples", () => {
  it("GET call", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1")
      .its("status")
      .should("eq", 200);
  });

  it("POST call", () => {
    cy.request({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      body: {
        title: "Tets post",
        body: "This is post call",
        userId: 1,
      },
    })
      .its("status")
      .should("equal", 201);
  });

  it("PUT call", () => {
    cy.request({
      method: "PUT",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      body: {
        title: "Tets post",
        body: "This is post call",
        userId: 1,
        id: 174102,
      },
    })
      .its("status")
      .should("equal", 200);
  });

  it("DELETE call", () => {
    cy.request({
      method: "DELETE",
      url: "https://jsonplaceholder.typicode.com/posts/1",
    })
      .its("status")
      .should("equal", 200);
  });
});
