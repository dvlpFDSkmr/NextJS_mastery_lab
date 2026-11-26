import type { NextApiRequest, NextApiResponse } from "next";
import { memoryTasks } from "../../types/type";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(memoryTasks);
  }

  if (req.method === "POST") {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is Required" });

    // Check karo ki same title pehle se toh nahi hai
    const exists = memoryTasks.find((t) => t.title === title);
    if (exists) return res.status(200).json(exists); // Agar hai, toh naya mat banao

    const nayaTask = { 
      userId: 1, 
      id: Date.now(), 
      title: title, 
      completed: false 
    };
    
    memoryTasks.push(nayaTask);
    return res.status(201).json(nayaTask);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}