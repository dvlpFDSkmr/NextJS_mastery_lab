import PageHeading from "@/components/PageHeading";
import PageInformarion from "@/components/PageInformation";

export function About() {
  return (
    <div className="About">
      <PageHeading heading="About" />
      <PageInformarion info="We help users browse products." />
    </div>
  );
}

export default About;
