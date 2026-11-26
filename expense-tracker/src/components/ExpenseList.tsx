import { Expense } from "../../types/index";
import { ExpenseItem } from "./ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
  onDelete?: (id: string) => void | Promise<void>;
  onUpdateAmount?: (id: string, amount: number) => Promise<void> | void;
};

export function ExpenseList({ expenses, onDelete, onUpdateAmount }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p>No expenses found.</p>;
  }

  return (
    <ul>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} onUpdateAmount={onUpdateAmount} />
      ))}
    </ul>
  );
}
