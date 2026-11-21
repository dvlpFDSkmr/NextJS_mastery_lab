type PageHeadingProps = {
  heading: string;
};

export default function PageHeading({ heading }: PageHeadingProps) {
  return <h1>{heading}</h1>;
}
