const supertest = require("supertest");
const server = require("../server");
const DB = require("../utils/db");

const request = supertest(server);
const message = "Invalid token. Logging user out";

afterAll(async () => {
  const data = [{ id: 1, username: "Jack", password: "1234abc" }];
  await DB.writeToDB(JSON.stringify(data));
});

describe("GET /api/verify-token/:token", () => {
  // test("token verification fails on empty token string", () => {
  //   const token = " ";
  //   return request
  //     .get(`/api/verify-token/${token}`)
  //     .expect("Content-Type", /application\/json/)
  //     .expect(403)
  //     .then(response => {
  //       expect(response.body.message).toBe(message);
  //       expect(response.body.status).toBe(403);
  //     });
  // });

  test("token verification fails on token string with invalid length", () => {
    const token = "Nj1n9E3yBJRw30HGXfWvTd6H4N";
    return request
      .get(`/api/verify-token/${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(403)
      .then(response => {
        expect(response.body.message).toBe(message);
        expect(response.body.status).toBe(403);
      });
  });

  test("token verification fails on unknown but valid token string", () => {
    const token = "Nj61n9E3yBJRw38i30x672fI21e10HGXfWvT1801d6H4N";
    return request
      .get(`/api/verify-token/${token}`)
      .expect("Content-Type", /application\/json/)
      .expect(403)
      .then(response => {
        expect(response.body.message).toBe(message);
        expect(response.body.status).toBe(403);
      });
  });

  test("token verification success on valid token string", () => {
    const body = { username: "Jack", password: "1234abc" };
    return request
      .post("/api/signin")
      .send(body)
      .then(response => {
        return request
          .get(`/api/verify-token/${response.body.user.token}`)
          .expect("Content-Type", /application\/json/)
          .expect(200)
          .then(data => {
            expect(data.body.message).toBe("Token verified. User is logged in");
            expect(data.body.status).toBe(200);
          });
      });
  });
});
