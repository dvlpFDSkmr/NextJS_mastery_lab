import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { Resource } from "../../types/type";
import { seedResources } from "../../types/data";
import { useRouter } from "next/navigation";

type IdProps = {
  resource: Resource;
};

export const getServerSideProps: GetServerSideProps<IdProps> = async (context) => {
  const id = Number(context.params?.id);
  const resource = seedResources.find((r) => r.id === id);
  if (!resource) return { notFound: true };
  return { props: { resource } };
};

export default function DynamicID({ resource }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <main className="container">
      <button onClick={() => router.push("/")}>Back to click</button>
      <h1>{resource.title}</h1>
      <span className="tag">{resource.category}</span>
      <p>Estimated time: {resource.minutes} minutes</p>
    </main>
  );
}
