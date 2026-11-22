type PageHeadingProps = {
  heading1: string;
  heading2?: string;
  heading3?: string;
};

export default function PageHeading({ heading1, heading3, heading2 }: PageHeadingProps) {
  return (
    <div>
      <b>
        <h1>{heading1}</h1>
      </b>
      <i>
        <b>
          <h2>{heading2}</h2>
        </b>
      </i>
      <i>
        <h3>{heading3}</h3>
      </i>
    </div>
  );
}
