import type { NextApiRequest, NextApiResponse } from "next";
import { memoryTasks } from "../../../types/type";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;

  // String compare taaki lambi ID match ho jaye
  const task = memoryTasks.find((t) => String(t.id) === String(id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = !task.completed;

  return res.status(200).json({ task });
}
