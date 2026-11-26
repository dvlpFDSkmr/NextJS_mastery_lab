import { TaskFilter } from "@/components/TaskFilter";
import { type Task, type FilterType } from "../types/type";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import { TaskList } from "@/components/TaskList";

type TaskProp = {
  tasks: Task[];
};

export const getServerSideProps: GetServerSideProps<TaskProp> = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10`);
  const Tasks: Task[] = await response.json();
  console.log(`runs on server side`);
  return { props: { tasks: Tasks } };
};

export default function Home({ tasks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [filter, setFilter] = useState<FilterType>("All");
  const [currentTasks, setCurrentTasks] = useState<Task[]>(tasks);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // will be inside home , not outside, as this is main component
  async function handleRefresh() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10`);
      if (response.ok) {
        const data = await response.json();
        setCurrentTasks(data);
      }
    } catch {
      setError("Failed to fetch tasks");
      setCurrentTasks([]);
    } finally {
      setIsLoading(false);
    }

    await new Promise((r) => setTimeout(r, 2000));
  }

  const FilterTasks: Task[] = currentTasks.filter((task) => {
    const matchesFilter: boolean =
      filter === "All" || (filter === "Completed" && task.completed) || (filter === "Pending" && !task.completed);

    return matchesFilter;
  });

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={handleRefresh} style={{ margin: "10px" }} disabled={isLoading}>
        {isLoading ? "Loading..." : "Refresh"}
      </button>
      {error === null ? <TaskFilter filter={filter} onFilterChange={setFilter} /> : <h1>{error}</h1>}
      <div>{tasks.length === 0 ? <h1>Nothing Here....</h1> : <TaskList tasks={FilterTasks} />}</div>
    </div>
  );
}
