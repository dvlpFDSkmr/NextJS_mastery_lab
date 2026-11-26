import { getTasks, type Task } from "../types/type";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

type TaskProp = {
  tasks: Task[];
};

export const getServerSideProps: GetServerSideProps<TaskProp> = async () => {
  const Tasks: Task[] = getTasks();
  console.log(`runs on server side`);
  return { props: { tasks: Tasks } };
};

export default function Home({ tasks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>HomePage</h1>
      {tasks.length === 0 ? (
        <h1>Nothing Here....</h1>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.completed ? "completed" : "pending"}</p>
          </div>
        ))
      )}
    </div>
  );
}
