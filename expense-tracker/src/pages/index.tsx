import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Expense } from "../../types";
import { expensesDB } from "../../utils/db";
import { ExpenseList } from "@/components/ExpenseList";

type HomeProps = {
  expenses: Expense[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  console.log(`Running in server`);
  return { props: { expenses: expensesDB } };
};

export default function Home({expenses} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseList expenses={expenses}/>
    </div>
  );
}
