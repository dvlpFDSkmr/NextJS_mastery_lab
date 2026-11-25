import { useMemo, useState } from "react";
import { seedResources } from "../types/data";
import type { Resource } from "../types/type";
import ResourceCard from "@/components/ResourceCard";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  const filteredResources: Resource[] = useMemo(() => {
    const query = search.trim().toLowerCase();
    return seedResources.filter((resource) => resource.title.toLowerCase().includes(query));
  }, [search]);

  return (
    <main className="container">
      <h1>Study Resource Tracker</h1>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder=".... enter item" />
      {filteredResources.length === 0 ? (
        <h1>Nothing here....</h1>
      ) : (
        filteredResources.map((resource) => <ResourceCard resource={resource} key={resource.id} />)
      )}
    </main>
  );
}
