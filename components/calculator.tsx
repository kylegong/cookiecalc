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
import * as rational from "../lib/rational";
import { History } from "./history";

export interface CalculatorProps {
  ingredients: Ingredient[];
}

export default function Calculator(props: CalculatorProps) {
  const [volStr, setVol] = useState("");
  const addVol = (vol: rational.Rational) => {
    const prev = rational.parse(volStr);
    setVol(rational.toString(rational.add(prev, vol)));
  };
  const [unit, setUnit] = useState("cups");
  const [ingredient, setIngredient] = useState<Ingredient>();
  let calculation = "=";
  let addAmount = null;
  const [amounts, setAmounts] = useState<Amount[]>([]);
  if (volStr != "" && ingredient != null) {
    const amount = { vol: rational.parse(volStr), unit, ingredient };
    addAmount = () => {
      setAmounts([amount, ...amounts]);
      setVol("");
      setIngredient(undefined);
    };
    calculation = `= ${grams(amount).toFixed(0)} grams`;
  }
  const delAmount = (i: number) => {
    const newAmounts = amounts.slice();
    newAmounts.splice(i, 1);
    setAmounts(newAmounts);
  };
  const buttonVols = [
    { n: 1, d: 1 },
    { n: 1, d: 2 },
    { n: 1, d: 3 },
    { n: 1, d: 4 },
  ];
  const addVolButtons = buttonVols.map((v) => (
    <AddVolButton key={rational.toString(v)} addVol={addVol} vol={v} />
  ));
  return (
    <div>
      <div>
        {addVolButtons}
        <Button color="secondary" onClick={() => setVol("")}>
          Clear
        </Button>
      </div>
      <div>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          autoComplete="off"
          inputProps={{ style: { fontSize: "2em" } }}
          fullWidth={true}
          value={volStr}
          onChange={(e) => setVol(e.target.value)}
        />
      </div>
      <UnitSelect unit={unit} setUnit={setUnit} />
      <IngredientSelect
        key={amounts.length} // Resets this component after ADD.
        ingredients={props.ingredients}
        ingredient={ingredient}
        setIngredient={setIngredient}
      />
      <div
        className="Calculation"
        style={{
          textAlign: "center",
          fontSize: "3em",
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

interface AddVolProps {
  vol: rational.Rational;
  addVol(vol: rational.Rational): void;
}

function AddVolButton(props: AddVolProps) {
  let label = `+ ${rational.toString(props.vol)}`;
  const addVol = () => {
    props.addVol(props.vol);
  };
  return <Button onClick={addVol}>{label}</Button>;
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
