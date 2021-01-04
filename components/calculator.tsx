import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import { Amount, grams, UNITS } from "../lib/amount";
import { Ingredient } from "../lib/ingredients";
import { History } from "./history";

export interface CalculatorProps {
  ingredients: Ingredient[];
}

export default function Calculator(props: CalculatorProps) {
  const [volStr, setVol] = useState("");
  const addVol = (value: number) => {
    setVol(`${value + Number(volStr)}`);
  };
  const [unit, setUnit] = useState("cups");
  const [ingredient, setIngredient] = useState<Ingredient>();
  let calculation = "=";
  let addAmount = null;
  const [amounts, setAmounts] = useState<Amount[]>([]);
  if (volStr != "" && ingredient != null) {
    const amount = { value: Number(volStr), unit, ingredient };
    addAmount = () => {
      setAmounts([...amounts, amount]);
      console.log(amounts);
    };
    calculation = `= ${grams(amount).toFixed(0)} grams`;
  }
  const delAmount = (i: number) => {
    const newAmounts = amounts.slice();
    newAmounts.splice(i, 1);
    setAmounts(newAmounts);
  };
  return (
    <div>
      <div>
        <AddVolButton addVol={addVol} num={1} />
        <AddVolButton addVol={addVol} num={1} denom={2} />
        <AddVolButton addVol={addVol} num={1} denom={3} />
        <AddVolButton addVol={addVol} num={1} denom={4} />
        <Button color="secondary" onClick={() => setVol("")}>
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
          value={volStr}
          onChange={(e) => setVol(e.target.value)}
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
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={addAmount}
          disabled={addAmount == null}
        >
          Add
        </Button>
      </div>
      <div style={{ paddingTop: "1rem" }}>
        <History amounts={amounts} delAmount={delAmount} />
      </div>
    </div>
  );
}

function UnitSelect({
  unit,
  setUnit,
}: {
  unit: string;
  setUnit: (s: string) => void;
}) {
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
  addVol(value: number): void;
}

function AddVolButton(props: AddAmountProps) {
  let label = `+ ${props.num}`;
  let value = props.num;
  if (props.denom) {
    label += `/${props.denom}`;
    value /= props.denom;
  }
  const addAmount = (value: number) => () => {
    props.addVol(value);
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
