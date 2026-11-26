import { Expense } from "../../types";

type ExpenseItemProps = {
  expense: Expense;
};

export function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <article className="card">
      <div>
        <h3>{expense.title}</h3>
        <span>{expense.category}</span> <br />
        <span><i>{expense.date}</i></span>
      </div>
      <strong>₹{expense.amount.toLocaleString("en-IN")}</strong>
    </article>
  );
}
