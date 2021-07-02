const generateToken = require("../index");

test("randomly generates a string of numbers and alphabets", () => {
  const token = generateToken();

  expect(typeof token).toBe("string");
  expect(token).toHaveLength(45);

  const matchesPattern = !/[^a-z\d]/gi.test(token);
  expect(matchesPattern).toBe(true);
});
