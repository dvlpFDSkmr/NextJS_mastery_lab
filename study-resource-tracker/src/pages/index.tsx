import { TaskFilter } from "@/components/TaskFilter";
import { TaskList } from "@/components/TaskList";
import { TaskForm } from "@/components/TaskForm";
import { type Task, type FilterType, getTasks } from "../types/type";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";

type TaskProp = { tasks: Task[] };

// Server Side Fetch (Ab JSONPlaceholder nahi, apna data)
export const getServerSideProps: GetServerSideProps<TaskProp> = async () => {
  return { props: { tasks: getTasks() } };
};

export default function Home({ tasks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [filter, setFilter] = useState<FilterType>("All");
  const [currentTasks, setCurrentTasks] = useState<Task[]>(tasks);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Refresh Function (no-store taaki cache ka issue na aaye)
  async function handleRefresh() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/tasks`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCurrentTasks(data);
    } catch {
      setError("Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  }

  // Add Task
  async function handleAdd(title: string) {
    await fetch(`/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    handleRefresh();
  }

  // Mark Complete (PATCH)
  async function handleComplete(id: number) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        cache: "no-store",
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.log("Error from API:", errorData); // <-- YEH ADD KARO
      }
      await handleRefresh();
    } catch (err) {
      console.error(err);
    }
  }
  const filteredTasks = currentTasks.filter((task) => {
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>My Study Tasks</h1>

      <TaskForm onAdd={handleAdd} />

      <button onClick={handleRefresh} disabled={isLoading} style={{ padding: "5px 15px", marginBottom: "10px" }}>
        {isLoading ? "Loading..." : "Refresh"}
      </button>

      <TaskFilter filter={filter} onFilterChange={setFilter} />

      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      {currentTasks.length === 0 ? (
        <h3>Nothing Here....</h3>
      ) : (
        <TaskList tasks={filteredTasks} onComplete={handleComplete} />
      )}
    </div>
  );
}
