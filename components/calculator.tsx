import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import { Ingredient } from "../lib/ingredients";
import { asCups, UNITS } from "../lib/amount";

export interface CalculatorProps {
  ingredients: Ingredient[];
}

export default function Calculator(props: CalculatorProps) {
  const [amountStr, setAmount] = useState("");
  const addAmount = (value: number) => {
    setAmount(`${value + Number(amountStr)}`);
  };
  const [unit, setUnit] = useState("cups");
  const [ingredient, setIngredient] = useState<Ingredient>();
  let calculation = "";
  if (amountStr != "" && ingredient != null) {
    const amount = { value: Number(amountStr), unit };
    const numGrams = ingredient.cup_weight * asCups(amount);
    calculation = `= ${numGrams | 0} grams`;
  }
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
      <IngredientSelect
        ingredients={props.ingredients}
        ingredient={ingredient}
        setIngredient={setIngredient}
      />
      <div
        className="Calculation"
        style={{
          textAlign: "center",
          fontSize: "4em",
        }}
      >
        {calculation}
      </div>
    </div>
  );
}

type StringF = (s: string) => void;

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

interface IngredientSelectProps {
  ingredients: Ingredient[];
  ingredient: Ingredient;
  setIngredient(ing: Ingredient): void;
}

function IngredientSelect(props: IngredientSelectProps) {
  return (
    <div>
      <Autocomplete
        id="ingredient"
        autoHighlight
        options={props.ingredients}
        getOptionLabel={(opt) => opt.name}
        onChange={(e, t: Ingredient) => props.setIngredient(t)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Ingredient"
            variant="outlined"
            margin="normal"
          />
        )}
      />
    </div>
  );
}
