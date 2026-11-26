import { Expense } from "../../types/index";

type TotalCardProps = {
  expenses: Expense[];
  label?: string;
};

export function TotalCard({ expenses, label = "Total Expenses" }: TotalCardProps) {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(total);

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", margin: "12px 0", borderRadius: "6px" }}>
      <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>{label}</p>
      <h2 style={{ margin: "4px 0 0 0" }}>{formattedTotal}</h2>
    </div>
  );
}