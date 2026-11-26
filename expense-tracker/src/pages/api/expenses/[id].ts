import type { NextApiRequest, NextApiResponse } from "next";
import { expensesDB } from "../../../../utils/db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const id = String(req.query.id ?? "");
  const expense = expensesDB.find((item) => item.id === id);
  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  const nextAmount = Number(req.body?.amount);

  if (Number.isNaN(nextAmount) || nextAmount <= 0) {
    return res.status(400).json({ error: "Amount 0 se bada hona chahiye" });
  }

  expense.amount = nextAmount;
  return res.status(200).json(expense);
}
