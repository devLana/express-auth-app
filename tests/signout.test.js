const supertest = require("supertest");
const server = require("../server");
const DB = require("../utils/db");
const resetDB = require("./helper");

const request = supertest(server);

afterAll(() => {
  resetDB();
});

const testRequest = async (body, status, errMessage) => {
  const response = await request
    .post("/api/signout")
    .send(body)
    .expect("Content-Type", /application\/json/);

  expect(response.body.message).toBe(errMessage);
  expect(response.body.status).toBe(status);
};

describe("POST /api/signout", () => {
  test("sign out should fail on unknown fields", () => {
    const body = { name: "John", pass: "abcd" };
    testRequest(body, 400, "Bad request");
  });

  test("sign out should fail on invalid field types", () => {
    const body = { username: 1234, token: true };
    testRequest(body, 400, "Bad request");
  });

  test("sign out should fail on empty field types", () => {
    const body = { username: "", token: "" };
    testRequest(body, 400, "Bad request");
  });

  test("sign out should fail on invalid user credentials", () => {
    const body = { username: "Jackson", token: "InvalidTestToken" };
    testRequest(body, 403, "Invalid user credentials");
  });

  test("User token should be deleted on successful sign out", async () => {
    const data = { username: "Jack", password: "1234abc" };

    const signinResponse = await request.post("/api/signin").send(data);
    const { user } = signinResponse.body;

    const body = { username: data.username, token: user.token };

    const response = await request
      .post("/api/signout")
      .send(body)
      .expect("Content-Type", /application\/json/);

    expect(response.body.message).toBe(`User "${data.username}" signed out`);
    expect(response.body.status).toBe(200);

    DB.readFromDB().then(dbRes => {
      const db = JSON.parse(dbRes);
      const testUser = db.find(item => item.username === data.username);

      expect(testUser).not.toHaveProperty("token");
    });
  });
});
