import { SubmitEvent, useState } from "react";
import { Category } from "../../types/index";

type NewExpenseInput = {
  title: string;
  amount: number;
  category: Category;
};

type ExpenseFormProps = {
  onAdd: (expense: NewExpenseInput) => void;
};

const CATEGORIES: Category[] = ["Food", "Travel", "Bills", "Shopping", "Other"];

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<Category>("Food");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    const trimmedTitle = title.trim();
    const numericAmount = Number(amount);

    if (!trimmedTitle) {
      setFormError("Please enter a title.");
      return;
    }

    if (amount.trim() === "" || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setFormError("Please enter an amount greater than 0.");
      return;
    }

    try {
      setIsSubmitting(true);
      onAdd({
        title: trimmedTitle,
        amount: numericAmount,
        category,
      });

      setTitle("");
      setAmount("");
      setCategory("Food");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to add expense.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Title (e.g., Movie)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />

        <input
          type="number"
          placeholder="Amount (e.g., 350)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isSubmitting}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value as Category)} disabled={isSubmitting}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </div>

      {formError && (
        <p role="alert" style={{ color: "crimson", marginTop: "6px" }}>
          {formError}
        </p>
      )}
    </form>
  );
}
