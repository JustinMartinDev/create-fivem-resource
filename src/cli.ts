import { program as commander } from "commander";
import { join } from "path";
import chalk from "chalk";
import { mkdirSync } from "fs";

import { CliForm, CliFormJs } from "types";
import { cloneTemplate } from "./git";
import { displayCliForm } from "./form";

import { setupJsTemplate } from "./setup-js-template";
import { setupLuaTemplate } from "./setup-lua-template";

import packageJson from "../package.json";

export const createFivemResource = async () => {
  console.log("\nFiveM Resource Boilerplate CLI\n");

  let options = await displayCliForm();

  const resourcePath = join(
    options.rootResourcesFolderPath ?? process.cwd(),
    options.resourceName
  );

  console.log(chalk.dim(`\nScaffolding resource in ${resourcePath}...`));

  mkdirSync(resourcePath);

  const templateFolder = await cloneTemplate(options, resourcePath);

  if (options.runtime === "js") {
    await setupJsTemplate(resourcePath, templateFolder, options as CliFormJs);
  } else {
    await setupLuaTemplate(resourcePath, options as CliForm);
  }
};

const parseArguments = (program = commander) => {
  program
    .version(packageJson.version, "-v, --version", "output the current version")
    .description("FiveM resource boilerplate CLI")
    .action(createFivemResource);

  program.parse(process.argv);
};

export default parseArguments;
