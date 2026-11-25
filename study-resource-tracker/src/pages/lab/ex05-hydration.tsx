import { useEffect, useState } from "react";

export default function Hyderation() {
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(Math.random().toFixed(3));
  }, []);

  if (!value) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      <h1>hydration mismatch</h1>
      <p>{value}</p>
    </div>
  );
}
