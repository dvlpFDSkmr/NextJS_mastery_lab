import { Task } from "../types/type";

type Props = {
  tasks: Task[];
  onComplete: (id: number) => void;
};

export function TaskList({ tasks, onComplete }: Props) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ border: "1px solid #ccc", padding: "15px", margin: "10px 0", borderRadius: "5px" }}>
          <p style={{ margin: "0 0 10px 0" }}>
            {task.title} - <strong>{task.completed ? "✅ Done" : "⏳ Pending"}</strong>
          </p>
          
          {/* Button ab hamesha dikhega, bas text change hoga */}
          <button 
            onClick={() => onComplete(task.id)}
            style={{ padding: "5px 10px", cursor: "pointer", backgroundColor: task.completed ? "#da3b3b" : "#2f2ba1" }}
          >
            {task.completed ? "Mark Pending" : "Mark Complete"}
          </button>
          
        </div>
      ))}
    </div>
  );
}