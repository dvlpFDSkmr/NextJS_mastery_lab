import { useMemo, useState } from "react";
import { seedResources } from "../types/data";
import type { Resource } from "../types/type";
import ResourceCard from "@/components/ResourceCard";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

type HomeProps = {
  resources: Resource[];
};

export const getServerSideProps = (async () => {
  const resources = seedResources;
  console.log(`getServerSideProps`);
  return { props: { resources } };
}) as GetServerSideProps<HomeProps>;

export default function Home({ resources }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [search, setSearch] = useState<string>("");

  const filteredResources: Resource[] = useMemo(() => {
    const query = search.trim().toLowerCase();
    return resources.filter((resource) => resource.title.toLowerCase().includes(query));
  }, [search, resources]);

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
