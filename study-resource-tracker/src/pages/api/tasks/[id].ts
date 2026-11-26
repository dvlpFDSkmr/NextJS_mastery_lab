import type { NextApiRequest, NextApiResponse } from "next";
import { memorytasks, type Task } from "../../../types/type";

const allTasks: Task[] = memorytasks;
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  // converts id to int, and 10 is base of number system being used
  const taskId = parseInt(id, 10);
  const task = allTasks.find((t) => t.id === taskId);
   if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  task.completed = true;

  return res.status(200).json({ task: task });
}
