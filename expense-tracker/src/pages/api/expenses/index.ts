import type { NextApiRequest, NextApiResponse } from "next";
import { expensesDB, removeExpenseById } from "../../../../utils/db";
import type { Expense } from "../../../../types/index";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(expensesDB);
  }

  if (req.method === "POST") {
    const { title, amount, category } = req.body;
    const numericAmount = typeof amount === "number" ? amount : Number(amount);

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is Required" });
    } else if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: "Enter valid amount" });
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      title: String(title).trim(),
      amount: numericAmount,
      category,
      date: new Date().toISOString().slice(0, 10),
    };

    expensesDB.push(newExpense);
    return res.status(201).json(newExpense);
  }

  if (req.method === "DELETE") {
    const { id } = req.body ?? {};
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Valid id is required" });
    }

    const deleted = removeExpenseById(id);
    if (!deleted) {
      return res.status(404).json({ error: "Expense not found" });
    }

    return res.status(200).json({ deletedId: id });
  }

  return res.status(405).json({ message: `Method not allowed` });
}
