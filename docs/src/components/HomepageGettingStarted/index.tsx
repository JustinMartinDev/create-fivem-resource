import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

export default function HomepageGettingStarted(): JSX.Element {
  return (
    <div className={styles.gettingStartedSection}>
      <div className="container padding-vert--xl text--left">
        <div className="row">
          <div className="col col--4 col--offset-1">
            <h2>Get started in seconds</h2>
            <p>To create a resource, run this command:</p>
            <CodeBlock className="language-sh">
              npx create-fivem-resource
            </CodeBlock>
            <br />
          </div>
          <div className="col col--5 col--offset-1">
            <img
              className={styles.featureImage}
              alt="Easy to get started in seconds"
              src="img/demo-cli-2.0.2.gif"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
