import { useRouter } from "next/router";
export default function ProductPage() {
  const router = useRouter();
  return <h1>Product ID: {router.query.id}</h1>;
}
