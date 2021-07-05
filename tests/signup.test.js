const supertest = require("supertest");
const server = require("../server");
const DB = require("../utils/db");
const resetDB = require("./helper");

const request = supertest(server);

afterAll(() => {
  resetDB();
});

const testRequest = ({ body, status, errMessage, done }) => {
  request
    .post("/api/signup")
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

describe("POST /api/signup", () => {
  test("sign up should fail on unknown fields", done => {
    const body = { name: "John", pass: "abcd" };

    testRequest({
      body,
      status: 400,
      errMessage: "Bad request. Check your input values",
      done,
    });
  });

  test("sign up should fail on invalid field types", done => {
    const body = { username: 1234, password: true };

    testRequest({
      body,
      status: 400,
      errMessage: "Bad request. Check your input values",
      done,
    });
  });

  test("sign up should fail on empty field types", done => {
    const body = { username: "", password: "" };

    testRequest({
      body,
      status: 400,
      errMessage: "Bad request. Check your input values",
      done,
    });
  });

  test("sign up should fail if username already exists", done => {
    const body = { username: "Jack", password: "1234abc" };

    testRequest({
      body,
      status: 403,
      errMessage: "This username has been taken. Try another one",
      done,
    });
  });

  test("sign up should create new user with token and id fields", done => {
    const data = { username: "Jane", password: "abcdef123" };

    request
      .post("/api/signup")
      .send(data)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.message).toBe(`New user "${data.username}" created`);
        expect(res.body.status).toBe(201);
        expect(res.body).toHaveProperty("user");

        const hasUsername = "username" in res.body.user;
        const hasToken = "token" in res.body.user;

        expect(hasUsername).toBe(true);
        expect(hasToken).toBe(true);
        expect(res.body.user.username).toBe("Jane");
        expect(typeof res.body.user.token).toBe("string");

        DB.readFromDB().then(dbRes => {
          const db = JSON.parse(dbRes);
          const testUser = db.find(item => item.username === "Jane");

          expect(testUser).toHaveProperty("id");
          expect(testUser.id).toBe(2);
        });

        return done();
      });
  });
});
