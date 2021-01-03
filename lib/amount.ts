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
}

export function asCups(amount: Amount) {
  return amount.value / unitsPerCup(amount.unit);
}
