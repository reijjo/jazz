"use strict";
const sum = (a, b) => {
    return a + b;
};
test.skip("1 + 2 = 3", () => {
    expect(sum(1, 2)).toBe(3);
});
