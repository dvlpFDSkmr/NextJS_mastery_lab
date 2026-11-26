import type { NextApiRequest, NextApiResponse } from "next";
import { memorytasks, type Task } from "../../types/type";

const allTasks: Task[] = memorytasks;
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(allTasks);
  }

  if (req.method === "POST") {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is Required" });
    }

    const nayaTask = { userId: Date.now(), id: Date.now(), title: title, completed: false };
    allTasks.push(nayaTask);

    return res.status(201).json(nayaTask);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
