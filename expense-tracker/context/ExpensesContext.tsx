import { createContext, ReactNode, useContext, useState } from "react";
import { Category, Expense } from "../types";

type NewExpenseInput = {
  title: string;
  amount: number;
  category: Category;
};

type ExpensesContextValue = {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
  refreshExpenses: () => Promise<void>;
  addExpense: (input: NewExpenseInput) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  updateExpenseAmount: (id: string, amount: number) => Promise<void>;
};

const ExpensesContext = createContext<ExpensesContextValue | null>(null);

type ExpensesProviderProps = {
  initialExpenses: Expense[];
  children: ReactNode;
};

export function ExpensesProvider({ initialExpenses, children }: ExpensesProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshExpenses() {
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

  async function addExpense(newExpenseData: NewExpenseInput) {
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

  async function deleteExpense(id: string) {
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

  async function updateExpenseAmount(id: string, amount: number) {
    setError(null);

    const res = await fetch(`/api/expenses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update amount");

    setExpenses((prev) => prev.map((item) => (item.id === id ? { ...item, amount: data.amount ?? amount } : item)));
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        isLoading,
        error,
        refreshExpenses,
        addExpense,
        deleteExpense,
        updateExpenseAmount,
      }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const ctx = useContext(ExpensesContext);
  if (!ctx) {
    throw new Error("useExpenses must be used inside ExpensesProvider");
  }
  return ctx;
}
    