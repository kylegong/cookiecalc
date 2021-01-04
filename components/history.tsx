import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Amount, grams, unitName } from "../lib/amount";
import * as rational from "../lib/rational";

export interface HistoryProps {
  amounts: Amount[];
  delAmount(i: number): void;
}

export function History(props: HistoryProps) {
  const historyItems = props.amounts.map((amount, i) =>
    HistoryRow(amount, () => props.delAmount(i))
  );
  return <>{historyItems}</>;
}

function HistoryRow(amount: Amount, delAmount: () => void) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "2.5rem",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "3.5rem",
          textAlign: "right",
        }}
      >
        {rational.toString(amount.vol)}
      </div>
      <div
        style={{
          width: "2.8rem",
          paddingLeft: ".25rem",
          textAlign: "left",
        }}
      >
        {unitName(amount)}
      </div>

      <div
        style={{
          width: "70%",
          textAlign: "left",
          paddingLeft: ".25rem",
        }}
      >
        {amount.ingredient.name}
      </div>

      <div
        style={{
          width: "2.5rem",
          textAlign: "right",
        }}
      >
        {grams(amount).toFixed(0)}g
      </div>

      <div>
        <IconButton aria-label="delete" size="small" onClick={delAmount}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}
