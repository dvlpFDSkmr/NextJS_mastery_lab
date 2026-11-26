import { FilterType } from "../types/type";

type Props = {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
};

export function TaskFilter({ filter, onFilterChange }: Props) {
  return (
    <div style={{ margin: "10px 0" }}>
      {(["All", "Pending", "Completed"] as FilterType[]).map((f) => (
        <button 
          key={f} 
          onClick={() => onFilterChange(f)}
          style={{ fontWeight: filter === f ? "bold" : "normal", marginRight: "5px" }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}