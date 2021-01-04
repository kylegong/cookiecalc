import * as rational from "./rational";

test("add", () => {
  expect(rational.add({ n: 1, d: 2 }, { n: 1, d: 2 })).toEqual({ n: 1, d: 1 });
  expect(rational.add({ n: 2, d: 3 }, { n: 5, d: 7 })).toEqual({
    n: 29,
    d: 21,
  });
  expect(rational.add({ n: 5, d: 6 }, { n: 2, d: 3 })).toEqual({ n: 3, d: 2 });
});

test("reduce", () => {
  expect(rational.reduce({ n: 0, d: 9 })).toEqual({ n: 0, d: 1 });
  expect(rational.reduce({ n: 2, d: 4 })).toEqual({ n: 1, d: 2 });
  expect(rational.reduce({ n: 6, d: 3 })).toEqual({ n: 2, d: 1 });
});

test("toNumber", () => {
  expect(rational.toNumber({ n: 1, d: 5 })).toEqual(0.2);
  expect(rational.toNumber({ n: 9, d: 6 })).toEqual(1.5);
  expect(rational.toNumber({ n: 7, d: 4 })).toEqual(1.75);
});

test("toString", () => {
  expect(rational.toString({ n: 0, d: 6 })).toEqual("0");
  expect(rational.toString({ n: 547, d: 1 })).toEqual("547");
  expect(rational.toString({ n: 6, d: 2 })).toEqual("3");
  expect(rational.toString({ n: 1, d: 2 })).toEqual("1/2");
  expect(rational.toString({ n: 3, d: 2 })).toEqual("1 1/2");
  expect(rational.toString({ n: 7, d: 4 })).toEqual("1 3/4");
});

test("parse", () => {
  expect(rational.parse("")).toEqual({ n: 0, d: 1 });
  expect(rational.parse("547")).toEqual({ n: 547, d: 1 });
  expect(rational.parse("1/2")).toEqual({ n: 1, d: 2 });
  expect(rational.parse("1 1/2")).toEqual({ n: 3, d: 2 });
  expect(rational.parse("1 3/4")).toEqual({ n: 7, d: 4 });
});
