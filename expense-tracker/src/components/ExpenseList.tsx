import { Expense } from "../../types/index";
import { ExpenseItem } from "./ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
};

export function ExpenseList({ expenses }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p>No expenses found.</p>;
  }

  return (
    <ul>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </ul>
  );
}