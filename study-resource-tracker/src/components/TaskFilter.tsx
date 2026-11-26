import type { FilterType } from "../types/type";

type TaskFilterProps = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export function TaskFilter({ filter, onFilterChange }: TaskFilterProps) {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
      <button className={filter === 'All'? "active" : ""} type="button" onClick={() => onFilterChange("All")}>
        All
      </button>
      <button className={filter === 'Pending'? "active" : ""} type="button" onClick={() => onFilterChange("Pending")}>
        Pending
      </button>
      <button className={filter === 'Completed'? "active" : ""} type="button" onClick={() => onFilterChange("Completed")}>
        Completed
      </button>
    </div>
  );
}
