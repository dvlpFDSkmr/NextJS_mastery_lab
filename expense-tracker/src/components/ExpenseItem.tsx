import { Expense } from "../../types/index";
import { useState } from "react";

type ExpenseItemProps = {
  expense: Expense;
  onDelete?: (id: string) => void | Promise<void>;
  onUpdateAmount?: (id: string, amount: number) => Promise<void> | void;
};

export function ExpenseItem({
  expense,
  onDelete,
  onUpdateAmount,
}: ExpenseItemProps) {
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
    if (!onUpdateAmount) return;

    const nextAmount = Number(draftAmount);
    if (draftAmount.trim() === "" || Number.isNaN(nextAmount) || nextAmount <= 0) {
      return;
    }

    try {
      setIsSaving(true);
      await onUpdateAmount(expense.id, nextAmount);
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
          {onUpdateAmount && (
            <button
              type="button"
              onClick={startEdit}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(expense.id)}
              style={{ marginLeft: "6px" }}
            >
              Delete
            </button>
          )}
        </>
      )}
    </li>
  );
}