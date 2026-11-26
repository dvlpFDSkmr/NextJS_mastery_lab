import styles from "../styles/Card.module.css";
import type { Task } from "../types/type";
type TaskListProps = {
  tasks: Task[];
};

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <div className={styles.card} key={task.id}>
          <h1>{task.title}</h1>
          <p className={styles.status}> {task.completed ? "Completed" : "Pending"}</p>
        </div>
      ))}
    </div>
  );
}
