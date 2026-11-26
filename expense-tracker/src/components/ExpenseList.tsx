import { Expense } from "../../types";
import { ExpenseItem } from "./ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
};

export function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <div className="list">
      {expenses.length === 0 ? (
        <h1>No expenses left</h1>
      ) : (
        expenses.map((item) => (
          <ExpenseItem expense={item} key={item.id} />
        ))
      )}
    </div>
  );
}