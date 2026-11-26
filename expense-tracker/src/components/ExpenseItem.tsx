import { Expense } from "../../types";

type ExpenseItemProps = {
  expense: Expense;
};

export function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <div className="card">
      <h3>{expense.title}</h3>
      <p>{expense.category}</p>
      <p>
        <b>{expense.amount.toLocaleString("en-IN")}</b>
      </p>
    </div>
  );
}
