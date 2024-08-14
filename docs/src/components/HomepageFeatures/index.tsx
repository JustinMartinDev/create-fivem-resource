import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    description: (
      <>
        This tool provide a simple command line to create your <b>FimeM</b>{" "}
        resource. Fill the prompts and let the tool setup your resource.
      </>
    ),
  },
  {
    title: "Nui support",
    description: (
      <>
        The tool provide an <b>Nui</b> template with <b>React</b> or <b>Vue</b>{" "}
        as framework. You can find utils method to communicate between the
        client and the Nui side.
      </>
    ),
  },
  {
    title: "Template ready to use",
    description: (
      <>
        Once generated, you can start coding your resource with watching mode.
        Template are focused on DX (Developer Experience).
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
