import { asCups } from "./amount";

test("asCups", () => {
  expect(asCups({ value: 3.2, unit: "cups" })).toBe(3.2);
  expect(asCups({ value: 24, unit: "tbsp" })).toBe(1.5);
  expect(asCups({ value: 32, unit: "tbsp" })).toBe(2);
  expect(asCups({ value: 1, unit: "tsp" })).toBe(1 / 48);
});
