const error = require("./index");

describe("Generate an error object", () => {
  test("generates a new error object", () => {
    const errObj = error("Not Found Error", 404);

    expect(errObj).toBeInstanceOf(Error);
    expect(errObj).toHaveProperty("message");
    expect(errObj).toHaveProperty("statusCode");
    expect(errObj.message).toBe("Not Found Error");
    expect(errObj.statusCode).toBe(404);
  });
});
