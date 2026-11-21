import { useRouter } from "next/router";

export default function Orders() {
  const router = useRouter();
  
  return (
    <div>
      <h1>Order History</h1>
      <p>User Id : {router.query.id}</p>
    </div>
  );
}