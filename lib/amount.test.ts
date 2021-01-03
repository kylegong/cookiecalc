import { asCups, grams } from "./amount";
import { INGREDIENTS } from "./ingredients";

test("asCups", () => {
  const ingredient = INGREDIENTS[0];
  expect(asCups({ value: 3.2, unit: "cups", ingredient })).toBe(3.2);
  expect(asCups({ value: 24, unit: "tbsp", ingredient })).toBe(1.5);
  expect(asCups({ value: 32, unit: "tbsp", ingredient })).toBe(2);
  expect(asCups({ value: 1, unit: "tsp", ingredient })).toBe(1 / 48);
});

test("grams", () => {
  const ingredient = { name: "stuff", cup_weight: 100 };
  expect(grams({ value: 3.2, unit: "cups", ingredient })).toBe(320);
  expect(grams({ value: 24, unit: "tbsp", ingredient })).toBe(150);
  expect(grams({ value: 32, unit: "tbsp", ingredient })).toBe(200);
  expect(grams({ value: 1, unit: "tsp", ingredient })).toBeCloseTo(100 / 48);
});
