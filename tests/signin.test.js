const supertest = require("supertest");
const server = require("../server");
const DB = require("../utils/db");

const request = supertest(server);

afterAll(async () => {
  const data = [{ id: 1, username: "Jack", password: "1234abc" }];
  await DB.writeToDB(JSON.stringify(data));
});

describe("POST /api/signin", () => {
  test("sign in should fail on unknown fields", done => {
    const body = { name: "John", pass: "abcd" };

    request
      .post("/api/signin")
      .send(body)
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.message).toBe("Bad request. Check your input values");
        expect(res.body.status).toBe(400);
        return done();
      });
  });

  test("sign in should fail on invalid field types", done => {
    const body = { username: 1234, password: true };

    request
      .post("/api/signin")
      .send(body)
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.message).toBe("Bad request. Check your input values");
        expect(res.body.status).toBe(400);
        return done();
      });
  });

  test("sign in should fail on empty field types", done => {
    const body = { username: "", password: "" };

    request
      .post("/api/signin")
      .send(body)
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.message).toBe("Bad request. Check your input values");
        expect(res.body.status).toBe(400);
        return done();
      });
  });

  test("sign in should fail if username and password don't match records", done => {
    const body = { username: "Jack", password: "abc1234" };

    request
      .post("/api/signin")
      .send(body)
      .expect(403)
      .expect("Content-Type", /application\/json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.message).toBe(
          "Invalid username & password combination"
        );
        expect(res.body.status).toBe(403);
        return done();
      });
  });

  test("sign in should generate new token on successful sign in", done => {
    const data = { username: "Jack", password: "1234abc" };

    request
      .post("/api/signin")
      .send(data)
      .expect(200)
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
      .expect(403)
      .expect("Content-Type", /application\/json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.message).toBe(
          "Previous session has ended. Sign in again"
        );
        expect(res.body.status).toBe(403);
        return done();
      });
  });
});
