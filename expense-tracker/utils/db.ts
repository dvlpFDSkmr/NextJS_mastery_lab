import type { Expense } from "../types";

const seedExpenses: Expense[] = [
  {
    id: "1",
    title: "Groceries",
    amount: 650,
    category: "Food",
    date: "2026-11-12",
  },
  {
    id: "2",
    title: "Metro Pass",
    amount: 420,
    category: "Travel",
    date: "2026-10-28",
  },
  {
    id: "3",
    title: "Electricity Bill",
    amount: 1250,
    category: "Bills",
    date: "2026-11-05",
  },
];

const globalForDb = globalThis as typeof globalThis & {
  expensesDB?: Expense[];
};

if (!globalForDb.expensesDB) {
  globalForDb.expensesDB = [...seedExpenses];
}

export let expensesDB: Expense[] = globalForDb.expensesDB;

export function removeExpenseById(id: string): boolean {
  const exists = expensesDB.some((item) => item.id === id);
  if (!exists) return false;

  expensesDB = expensesDB.filter((item) => item.id !== id);
  globalForDb.expensesDB = expensesDB;
  return true;
}