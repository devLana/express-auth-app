const supertest = require("supertest");
const server = require("../server");
const resetDB = require("./helper");

const request = supertest(server);
const message = "Invalid token. Logging user out";

afterAll(async () => {
  resetDB();
});

const testRequest = (token, status, errMessage) => {
  return request
    .get(`/api/verify-token/${token}`)
    .expect("Content-Type", /application\/json/)
    .then(response => {
      expect(response.body.message).toBe(errMessage);
      expect(response.body.status).toBe(status);
    });
};

describe("GET /api/verify-token/:token", () => {
  test("token verification fails on empty token string", () => {
    const token = "";
    return testRequest(token, 404, "Resource not found");
  });

  test("token verification fails on token string with invalid length", () => {
    const token = "Nj1n9E3yBJRw30HGXfWvTd6H4N";
    return testRequest(token, 403, message);
  });

  test("token verification fails on unknown but valid token string", () => {
    const token = "Nj61n9E3yBJRw38i30x672fI21e10HGXfWvT1801d6H4N";
    return testRequest(token, 403, message);
  });

  test("token verification is successful on valid token string", () => {
    const body = { username: "Jack", password: "1234abc" };
    return request
      .post("/api/signin")
      .send(body)
      .then(response => {
        return testRequest(
          response.body.user.token,
          200,
          "Token verified. User is logged in"
        );
      });
  });
});
