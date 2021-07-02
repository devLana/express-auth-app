const getId = require("./index");

describe("Generate new id", () => {
  test("generates id from max id", () => {
    const arr = [
      { id: 1, username: "Jack", password: "1234abc" },
      { id: 2, username: "Jane", password: "abc1234" },
    ];
    const id = getId(arr);

    expect(id).toBe(3);

    const newArr = arr.filter(obj => obj.id !== 1);
    const newId = getId(newArr);

    expect(newId).toBe(3);
  });
});
