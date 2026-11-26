export type Task = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type FilterType = "All" | "Pending" | "Completed";

// GLOBAL MEMORY (Yeh API routes ke beech data share karega)
const globalForTasks = global as unknown as { tasks: Task[] | undefined };

export const memoryTasks: Task[] = globalForTasks.tasks || [
  { userId: 1, id: 1, title: "Complete DBMS ER Model", completed: false },
  { userId: 1, id: 2, title: "Revise Normalization", completed: true },
  { userId: 1, id: 3, title: "Solve 20 GATE PYQs", completed: false },
];

if (process.env.NODE_ENV !== "production") globalForTasks.tasks = memoryTasks;

export function getTasks(): Task[] {
  return memoryTasks;
}