import type { NextApiRequest, NextApiResponse } from "next";
import { memoryTasks } from "../../types/type";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. GET: Saare tasks bhejo
  if (req.method === "GET") {
    return res.status(200).json(memoryTasks);
  }

  // 2. POST: Naya task banao
  if (req.method === "POST") {
    const { title } = req.body;

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is Required" });
    }

    const nayaTask = {
      userId: 1,
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    // Save
    memoryTasks.push(nayaTask);

    // Response
    return res.status(201).json(nayaTask);
  }

  // 3. Fallback: Baaki methods block karo
  res.status(405).json({ message: "Method Not Allowed" });
}
