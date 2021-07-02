const getRandomIndex = require("../getRandomIndex");

describe("Get array index", () => {
  test("randomly gets an array index", () => {
    const arr = ["apple", "orange", "pineapple", "pear"];
    const index = getRandomIndex(arr);

    expect(typeof index).toBe("number");
    expect(index).not.toBe(arr.length);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(arr.length);
  });
});
