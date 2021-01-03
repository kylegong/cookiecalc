import { ChangeEvent, useState } from "react";
import { Ingredient } from "../lib/ingredients";

export interface AmountProps {
  ingredients: Ingredient[];
}

export default function Amount(props: AmountProps) {
  const [amount, setAmount] = useState(0);
  const addAmount = (value: number) => {
    setAmount(value + amount);
  };
  const [unit, setUnit] = useState("cups");
  const ingredient = props.ingredients[0];
  const numGrams = (ingredient.cup_weight * amount) / unitsPerCup(unit);
  return (
    <div>
      <div>
        <AddAmountButton addAmount={addAmount} num={1} />
        <AddAmountButton addAmount={addAmount} num={1} denom={2} />
        <AddAmountButton addAmount={addAmount} num={1} denom={3} />
        <AddAmountButton addAmount={addAmount} num={1} denom={4} />
      </div>
      <div>
        <input
          type="text"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <UnitSelect unit={unit} setUnit={setUnit} />
      <div>
        <input
          type="text"
          id="ingredient"
          name="ingredient"
          value={ingredient.name}
        />
      </div>
      <div>{numGrams} grams</div>
    </div>
  );
}

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

type StringF = (s: string) => void;

const UNITS = ["cups", "tbsp", "tsp"];

function UnitSelect({ unit, setUnit }: { unit: string; setUnit: StringF }) {
  const changeUnit = (e: ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value);
  };
  const inputs = UNITS.map((inputUnit) => (
    <label>
      <input
        type="radio"
        id={inputUnit}
        name="u"
        value={inputUnit}
        onChange={changeUnit}
        checked={inputUnit == unit}
      ></input>
      {inputUnit}
    </label>
  ));
  return <div>{inputs}</div>;
}

interface AddAmountProps {
  num: number;
  denom?: number;
  addAmount(value: number);
}

function AddAmountButton(props: AddAmountProps) {
  let label = `+ ${props.num}`;
  let value = props.num;
  if (props.denom) {
    label += `/${props.denom}`;
    value /= props.denom;
  }
  const addAmount = (value: number) => () => {
    props.addAmount(value);
  };
  return <button onClick={addAmount(value)}>{label}</button>;
}
