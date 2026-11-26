import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CategoryFilter, Expense } from "../../types";
import { expensesDB } from "../../utils/db";
import { ExpenseList } from "@/components/ExpenseList";
import { useState } from "react";

type HomeProps = {
  expenses: Expense[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  console.log(`Running in server`);
  return { props: { expenses: expensesDB } };
};

export default function Home({ expenses }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [category, setCategory] = useState<CategoryFilter>(`All`);
  const [sortmode, setSortmode] = useState<string>("default");

  const filteredExpense: Expense[] = expenses.filter((item) => {
    const filterCategory = category === "All" ? true : category === item.category;

    return filterCategory;
  });
  const sortedExpense: Expense[] = [...filteredExpense].sort((a, b) => {
    if (sortmode === "amount") return b.amount - a.amount;
    if (sortmode === "date") return b.date.localeCompare(a.date);

    return 0;
  });

  return (
    <div className="main">
      <h1>Expense Tracker</h1>
      <select value={category} onChange={(e) => setCategory(e.target.value as CategoryFilter)}>
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Shopping">Shopping</option>
      </select>

      <select value={sortmode} onChange={(e) => setSortmode(e.target.value)}>
        <option value="default">Default</option>
        <option value="amount">Amount</option>
        <option value="date">Date</option>
      </select>

      <ExpenseList expenses={sortedExpense} />
    </div>
  );
}
