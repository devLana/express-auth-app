const supertest = require("supertest");
const server = require("../server");
const DB = require("../utils/db");

const request = supertest(server);

afterAll(async () => {
  const data = [{ id: 1, username: "Jack", password: "1234abc" }];
  await DB.writeToDB(JSON.stringify(data));
});

describe("POST /api/signout", () => {
  test("sign out should fail on unknown fields", async () => {
    const body = { name: "John", pass: "abcd" };

    const response = await request
      .post("/api/signout")
      .send(body)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.message).toBe("Bad request");
    expect(response.body.status).toBe(400);
  });

  test("sign out should fail on invalid field types", async () => {
    const body = { username: 1234, token: true };

    const response = await request
      .post("/api/signout")
      .send(body)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.message).toBe("Bad request");
    expect(response.body.status).toBe(400);
  });

  test("sign out should fail on empty field types", async () => {
    const body = { username: "", token: "" };

    const response = await request
      .post("/api/signout")
      .send(body)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.message).toBe("Bad request");
    expect(response.body.status).toBe(400);
  });

  test("sign out should fail on invalid user credentials", async () => {
    const body = { username: "Jackson", token: "InvalidTestToken" };

    const response = await request
      .post("/api/signout")
      .send(body)
      .expect(403)
      .expect("Content-Type", /application\/json/);

    expect(response.body.message).toBe("Invalid user credentials");
    expect(response.body.status).toBe(403);
  });

  test("User token should be deleted on successful sign out", async () => {
    const data = { username: "Jack", password: "1234abc" };

    const signinResponse = await request.post("/api/signin").send(data);
    const { user } = signinResponse.body;

    const body = { username: data.username, token: user.token };

    const response = await request
      .post("/api/signout")
      .send(body)
      .expect(200)
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
