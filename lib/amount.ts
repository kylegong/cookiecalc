import { Ingredient } from "./ingredients";

function unitsPerCup(unit: string) {
  switch (unit) {
    case "cups":
      return 1;
    case "tbsp":
      return 16;
    case "tsp":
      return 48;
  }
}

export const UNITS = ["cups", "tbsp", "tsp"];

export interface Amount {
  value: number;
  unit: string;
  ingredient: Ingredient;
}

export function asCups(amount: Amount) {
  return amount.value / unitsPerCup(amount.unit);
}

export function grams(amount: Amount) {
  return amount.ingredient.cup_weight * asCups(amount);
}

export function unitName(amount: Amount) {
  if (amount.value === 1 && amount.unit === "cups") {
    return "cup";
  }
  return amount.unit;
}
