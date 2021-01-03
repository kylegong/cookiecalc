import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { Ingredient } from "../lib/ingredients";

export interface AmountProps {
  ingredients: Ingredient[];
}

export default function Amount(props: AmountProps) {
  const [amountStr, setAmount] = useState("");
  const amount = Number(amountStr);
  const addAmount = (value: number) => {
    setAmount(`${value + amount}`);
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
        <Button color="secondary" onClick={() => setAmount("")}>
          Clear
        </Button>
      </div>
      <div>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          inputProps={{ style: { fontSize: "2em" } }}
          fullWidth={true}
          value={amountStr}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <UnitSelect unit={unit} setUnit={setUnit} />
      <div>
        <TextField
          id="ingredient"
          label="Ingredient"
          variant="outlined"
          inputProps={{ style: { fontSize: "2em" } }}
          fullWidth={true}
          value={ingredient.name}
        />
      </div>
      <div
        className="Calculation"
        style={{
          textAlign: "center",
          fontSize: "4em",
        }}
      >
        = {numGrams | 0} grams
      </div>
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
  const inputs = UNITS.map((inputUnit) => {
    const changeUnit = () => {
      setUnit(inputUnit);
    };
    return (
      <FormControlLabel
        value={inputUnit}
        control={<Radio color="primary" />}
        label={inputUnit}
        onChange={changeUnit}
        checked={inputUnit == unit}
      />
    );
  });
  return (
    <RadioGroup row value={unit}>
      {inputs}
    </RadioGroup>
  );
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
  return <Button onClick={addAmount(value)}>{label}</Button>;
}
