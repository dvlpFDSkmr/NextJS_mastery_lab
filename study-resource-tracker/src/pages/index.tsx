import { TaskFilter } from "@/components/TaskFilter";
import { getTasks, type Task, type FilterType } from "../types/type";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";

type TaskProp = {
  tasks: Task[];
};

export const getServerSideProps: GetServerSideProps<TaskProp> = async () => {
  const Tasks: Task[] = getTasks();
  console.log(`runs on server side`);
  return { props: { tasks: Tasks } };
};

export default function Home({ tasks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [filter, setFilter] = useState<FilterType>("All");

  const FilterTasks: Task[] = tasks.filter((task) => {
    const TaskFilter: boolean =
      filter === "All" || (filter === "Completed" && task.completed) || (filter === "Pending" && !task.completed);

    return TaskFilter;
  });

  return (
    <div>
      <h1>HomePage</h1>
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <div>
        {tasks.length === 0 ? (
          <h1>Nothing Here....</h1>
        ) : (
          FilterTasks.map((task) => (
            <div key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.completed ? "completed" : "pending"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
