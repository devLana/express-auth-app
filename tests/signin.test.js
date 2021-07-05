const supertest = require("supertest");
const server = require("../server");
const DB = require("../utils/db");
const resetDB = require("./helper");

const request = supertest(server);

afterEach(async () => {
  resetDB();
});

const testRequest = ({ body, status, errMessage, done }) => {
  request
    .post("/api/signin")
    .send(body)
    .expect("Content-Type", /application\/json/)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      expect(res.body.message).toBe(errMessage);
      expect(res.body.status).toBe(status);
      return done();
    });
};

describe("POST /api/signin", () => {
  test("sign in should fail on unknown fields", done => {
    const body = { name: "John", pass: "abcd" };

    testRequest({
      body,
      status: 400,
      errMessage: "Bad request. Check your input values",
      done,
    });
  });

  test("sign in should fail on invalid field types", done => {
    const body = { username: 1234, password: true };

    testRequest({
      body,
      status: 400,
      errMessage: "Bad request. Check your input values",
      done,
    });
  });

  test("sign in should fail on empty field types", done => {
    const body = { username: "", password: "" };

    testRequest({
      body,
      status: 400,
      errMessage: "Bad request. Check your input values",
      done,
    });
  });

  test("sign in should fail if username and password don't match records", done => {
    const body = { username: "Jack", password: "abc1234" };

    testRequest({
      body,
      status: 403,
      errMessage: "Invalid username & password combination",
      done,
    });
  });

  test("sign in should generate new token on successful sign in", done => {
    const data = { username: "Jack", password: "1234abc" };

    request
      .post("/api/signin")
      .send(data)
      .expect("Content-Type", /application\/json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.message).toBe(`Login for "${data.username}" verified`);
        expect(res.body.status).toBe(200);
        expect(res.body).toHaveProperty("user");

        const hasUsername = "username" in res.body.user;
        const hasToken = "token" in res.body.user;

        expect(hasUsername).toBe(true);
        expect(hasToken).toBe(true);
        expect(res.body.user.username).toBe(data.username);
        expect(typeof res.body.user.token).toBe("string");

        DB.readFromDB().then(dbRes => {
          const db = JSON.parse(dbRes);
          const testUser = db.find(item => item.username === data.username);

          expect(testUser).toHaveProperty("token");
          expect(typeof testUser.token).toBe("string");
        });

        return done();
      });
  });

  test("sign in should delete token and end session if user is already logged in ", done => {
    const body = { username: "Jack", password: "1234abc" };

    request
      .post("/api/signin")
      .send(body)
      .expect("Content-Type", /application\/json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.message).toBe(`Login for "${body.username}" verified`);
        expect(res.body.status).toBe(200);
        return done();
      });

    testRequest({
      body,
      status: 403,
      errMessage: "Previous session has ended. Sign in again",
      done,
    });
  });
});
