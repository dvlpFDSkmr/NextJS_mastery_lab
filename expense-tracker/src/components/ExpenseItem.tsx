import { Expense } from "../../types/index";
import { useState } from "react";
import { useExpenses } from "../../context/ExpensesContext";

type ExpenseItemProps = {
  expense: Expense;
};

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const { deleteExpense, updateExpenseAmount } = useExpenses();
  const [isEditing, setIsEditing] = useState(false);
  const [draftAmount, setDraftAmount] = useState(String(expense.amount));
  const [isSaving, setIsSaving] = useState(false);

  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(expense.amount);

  function startEdit() {
    setDraftAmount(String(expense.amount));
    setIsEditing(true);
  }

  async function handleSave() {
    const nextAmount = Number(draftAmount);
    if (draftAmount.trim() === "" || Number.isNaN(nextAmount) || nextAmount <= 0) {
      return;
    }

    try {
      setIsSaving(true);
      await updateExpenseAmount(expense.id, nextAmount);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <li style={{ marginBottom: "8px" }}>
      {isEditing ? (
        <>
          <strong>{expense.title}</strong> ({expense.category}) • {expense.date} —{" "}
          <input
            type="number"
            value={draftAmount}
            onChange={(e) => setDraftAmount(e.target.value)}
            disabled={isSaving}
            style={{ width: "90px" }}
          />
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            style={{ marginLeft: "6px" }}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            disabled={isSaving}
            style={{ marginLeft: "4px" }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span>
            <strong>{expense.title}</strong> — {formattedAmount} ({expense.category}) •{" "}
            {expense.date}
          </span>
          <button
            type="button"
            onClick={startEdit}
            style={{ marginLeft: "10px" }}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => deleteExpense(expense.id)}
            style={{ marginLeft: "6px" }}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}