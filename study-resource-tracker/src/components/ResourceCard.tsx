import { useState } from "react";
import type { Resource } from "../types/type";
import styles from '../styles/Card.module.css'

type ResourceCardProps = {
  resource: Resource;
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [saved, setSaved] = useState<boolean>(false);

  return (
    <div className={styles.card}>
      <h3>{resource.title}</h3>
      <span className="tag">{resource.category}</span>
      <span className="muted">{resource.minutes} min</span>
      <button onClick={() => setSaved(!saved)}>{saved ? "✅" : "❌"}</button>
    </div>
  );
}
