import { program } from "commander";
import { createFivemResource } from "./create-fivem-resource";

program
  .version("1.0.0", "-v, --version", "output the current version")
  .description("FiveM resource boilerplate CLI")
  .name("create-fivem-resource")
  .argument("<resource-name>", "name of the resource")
  .action(createFivemResource);

program.parse(process.argv);
