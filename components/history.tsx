import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Amount, grams } from "../lib/amount";

export interface HistoryProps {
  amounts: Amount[];
  delAmount(i: number): void;
}

export function History(props: HistoryProps) {
  console.log(props.amounts);
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
        alignItems: "center",
      }}
    >
      <div style={{ width: "10%", textAlign: "right" }}>
        {+amount.value.toFixed(3)}
      </div>
      <div style={{ width: "10%", textAlign: "right" }}>{amount.unit}</div>

      <div
        style={{
          width: "65%",
          textAlign: "left",
          paddingLeft: ".5rem",
        }}
      >
        {amount.ingredient.name}
      </div>

      <div style={{ width: "10%", textAlign: "right" }}>
        {grams(amount).toFixed(0)}g
      </div>

      <div style={{ textAlign: "right" }}>
        <IconButton aria-label="delete" onClick={delAmount}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}
