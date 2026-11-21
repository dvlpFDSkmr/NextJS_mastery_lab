type PageInformarionProps = {
  info: string;
};

export default function PageInformarion({ info }: PageInformarionProps) {
  return <p>{info}</p>;
}
