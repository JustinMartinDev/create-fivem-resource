import { program as commander } from "commander";
import { createFivemResource } from "./create-fivem-resource";

import packageJson from "../package.json";

const parseArguments = (program = commander) => {
  program
    .version(packageJson.version, "-v, --version", "output the current version")
    .description("FiveM resource boilerplate CLI")
    .argument("<resource-name>", "name of the resource")
    .action(createFivemResource);

  program.parse(process.argv);
};

export default parseArguments;
