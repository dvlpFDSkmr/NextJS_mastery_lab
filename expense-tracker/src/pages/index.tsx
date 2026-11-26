import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Category, CategoryFilter, Expense } from "../../types";
import { expensesDB } from "../../utils/db";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { TotalCard } from "@/components/TotalCard";
import { useState } from "react";

type HomeProps = {
  expenses: Expense[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  return { props: { expenses: expensesDB } };
};

export default function Home({ expenses: initialExpenses }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [sortmode, setSortmode] = useState<string>("default");

  async function handleRefresh() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/expenses", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load expenses");

      const data: Expense[] = await res.json();
      setExpenses(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddExpense(newExpenseData: { title: string; amount: number; category: Category }) {
    setError(null);

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpenseData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add expense");

    setExpenses((prev) => [...prev, data]);
  }

  async function handleDeleteExpense(id: string) {
    setError(null);

    try {
      const res = await fetch("/api/expenses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete expense");

      setExpenses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleUpdateAmount(id: string, amount: number) {
    setError(null);

    const res = await fetch(`/api/expenses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to update amount");
    }

    setExpenses((prev) => prev.map((item) => (item.id === id ? { ...item, amount: data.amount ?? amount } : item)));
  }

  const filteredExpense: Expense[] = expenses.filter((item) =>
    category === "All" ? true : item.category === category,
  );

  const sortedExpense: Expense[] = [...filteredExpense].sort((a, b) => {
    if (sortmode === "amount") return b.amount - a.amount;
    if (sortmode === "date") return b.date.localeCompare(a.date);
    return 0;
  });

  return (
    <div className="main">
      <h1>Expense Tracker</h1>

      <button type="button" onClick={handleRefresh} disabled={isLoading}>
        {isLoading ? "Refreshing..." : "Refresh"}
      </button>

      {isLoading && <p>Loading...</p>}

      {error && (
        <div role="alert" style={{ color: "crimson", border: "1px solid crimson", padding: "8px" }}>
          {error}
        </div>
      )}

      <TotalCard expenses={sortedExpense} label={category === "All" ? "Total Expenses" : `Total (${category})`} />

      <ExpenseForm onAdd={handleAddExpense} />

      <div style={{ margin: "12px 0" }}>
        <select value={category} onChange={(e) => setCategory(e.target.value as CategoryFilter)}>
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>

        <select value={sortmode} onChange={(e) => setSortmode(e.target.value)}>
          <option value="default">Default</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>
      </div>
      <ExpenseList expenses={sortedExpense} onDelete={handleDeleteExpense} onUpdateAmount={handleUpdateAmount} />
    </div>
  );
}
