type PageHeadingProps = {
  heading1: string;
  heading3?: string;
};

export default function PageHeading({ heading1, heading3 }: PageHeadingProps) {
  return (
    <div>
      <b>
        <h1>{heading1}</h1>
      </b>
      <i>
        <h3>{heading3}</h3>
      </i>
    </div>
  );
}
