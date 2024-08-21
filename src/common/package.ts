import { readFileSync, writeFileSync } from "fs";
import { CliForm } from "types";

export const transformPackage = (path: string, options: CliForm) => {
  const packageJson = readFileSync(path, { encoding: "utf-8" });

  let transformedPackageJson = packageJson.replace(
    "@res",
    `@${options.resourceName}`
  );

  writeFileSync(path, transformedPackageJson);
};
