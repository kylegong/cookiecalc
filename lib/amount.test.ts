import { asCups, grams } from "./amount";
import { INGREDIENTS } from "./ingredients";

test("asCups", () => {
  const ingredient = INGREDIENTS[0];
  expect(asCups({ vol: { n: 16, d: 5 }, unit: "cups", ingredient })).toBe(3.2);
  expect(asCups({ vol: { n: 24, d: 1 }, unit: "tbsp", ingredient })).toBe(1.5);
  expect(asCups({ vol: { n: 32, d: 1 }, unit: "tbsp", ingredient })).toBe(2);
  expect(asCups({ vol: { n: 1, d: 1 }, unit: "tsp", ingredient })).toBe(1 / 48);
});

test("grams", () => {
  const ingredient = { name: "stuff", cup_weight: 100 };
  expect(grams({ vol: { n: 16, d: 5 }, unit: "cups", ingredient })).toBe(320);
  expect(grams({ vol: { n: 24, d: 1 }, unit: "tbsp", ingredient })).toBe(150);
  expect(grams({ vol: { n: 32, d: 1 }, unit: "tbsp", ingredient })).toBe(200);
  expect(grams({ vol: { n: 1, d: 1 }, unit: "tsp", ingredient })).toBeCloseTo(
    100 / 48
  );
});
