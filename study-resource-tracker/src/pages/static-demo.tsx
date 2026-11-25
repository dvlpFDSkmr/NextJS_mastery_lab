import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { seedResources } from "../types/data";

type staticDemoProps = {
  builtAt: string;
  total: number;
};

export const getStaticProps: GetStaticProps<staticDemoProps> = async () => {
  return { props: { builtAt: new Date().toISOString(), total: seedResources.length } };
};

export default function StaticDemo(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h3>Made at : {props.builtAt}</h3>
      <h4>Total seeds : {props.total}</h4>
    </div>
  );
}
