import { useRouter } from "next/router";

export default function UserPage() {
  const router = useRouter();
  return <h1>User Id : {router.query.id}</h1>;
}
