import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import { CategoryFilter, Expense } from "../../types";
import { expensesDB } from "../../utils/db";
import { ExpensesProvider, useExpenses } from "../../context/ExpensesContext";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { TotalCard } from "@/components/TotalCard";

type HomeProps = {
  expenses: Expense[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  return { props: { expenses: expensesDB } };
};

function ExpenseDashboard() {
  const { expenses, isLoading, error, refreshExpenses, addExpense } = useExpenses();
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [sortmode, setSortmode] = useState<string>("default");

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

      <button type="button" onClick={refreshExpenses} disabled={isLoading}>
        {isLoading ? "Refreshing..." : "Refresh"}
      </button>

      {isLoading && <p>Loading...</p>}

      {error && (
        <div role="alert" style={{ color: "crimson", border: "1px solid crimson", padding: "8px" }}>
          {error}
        </div>
      )}

      <TotalCard expenses={sortedExpense} label={category === "All" ? "Total Expenses" : `Total (${category})`} />

      <ExpenseForm onAdd={addExpense} />

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

      <ExpenseList expenses={sortedExpense} />
    </div>
  );
}

export default function Home({ expenses }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ExpensesProvider initialExpenses={expenses}>
      <ExpenseDashboard />
    </ExpensesProvider>
  );
}
