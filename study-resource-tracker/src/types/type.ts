export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const tasks: Task[] = [
  { id: 1, title: "Complete DBMS ER Model", completed: false },
  { id: 2, title: "Revise Normalization", completed: true },
  { id: 3, title: "Solve GATE PYQS", completed: false },
  { id: 4, title: "Study Next.js API Routes", completed: false },
  { id: 5, title: "Practice SQL Joins and Transactions", completed: true },
  { id: 6, title: "Review Operating System Deadlocks", completed: false },
];

export function getTasks(): Task[] {
  return tasks;
}
