import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "10px 0" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        style={{ padding: "5px", marginRight: "5px" }}
      />
      <button type="submit" style={{ padding: "5px 15px" }}>
        Add Task
      </button>
    </form>
  );
}
