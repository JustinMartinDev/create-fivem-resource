import { join } from "path";
import { existsSync, mkdirSync, cpSync, rmSync, renameSync } from "fs";
import simpleGit from "simple-git";
import { promptForm } from "./form";
import { getInternalTemplatePath } from "./template";
import {
  removeUnecessaryFiles,
  updateFxManifest,
  updatePackageJson,
  updateReadme,
} from "./update";
import { hasPackageJson, installDependencies } from "./install";
import chalk from "chalk";

export const createFivemResource = async (
  _1: any,
  _2: any,
  { args }: { args: string[] }
) => {
  const resourceName = args[0];
  const projectPath = join(process.cwd(), resourceName);

  if (existsSync(projectPath)) {
    console.error(`Project directory "${resourceName}" already exists!`);
    process.exit(1);
  }

  const config = await promptForm();

  const repoUrl = "https://github.com/JustinMartinDev/fivem-resource-templates";

  const git = simpleGit();

  try {
    console.log(
      "Creating a new fivem resource in",
      chalk.greenBright(resourceName),
      "\n"
    );

    mkdirSync(projectPath);

    ///// FETCH TEMPLATE /////
    console.log("Fetching template...");

    const tmpPath = join(projectPath, "tmp");
    mkdirSync(tmpPath);
    await git.clone(repoUrl, tmpPath, { "--depth": 1 });

    console.log("Template fetched successfully!");

    ///// COPY TEMPLATE FILES /////
    console.log("Copying template files...");

    const templatePath = getInternalTemplatePath(config);
    cpSync(join(tmpPath, templatePath), projectPath, { recursive: true });

    console.log("Template files copied!");

    ///// UPDATE /////
    console.log("Update package.json...");
    updatePackageJson(projectPath, resourceName, config);
    console.log("Package.json updated!");

    const readmePath = join(projectPath, "README.md");

    console.log("Update README.md...");
    rmSync(readmePath);
    renameSync(join(projectPath, "README_res.md"), readmePath);
    updateReadme(readmePath, resourceName, config);
    console.log("README.md updated!");

    console.log("Update fxmanifest.lua...");
    const fxmanifestPath = join(projectPath, "fxmanifest.lua");
    updateFxManifest(fxmanifestPath, resourceName, config);
    console.log("fxmanifest.lua updated!");

    console.log("Remove unnecessary files...");
    removeUnecessaryFiles(projectPath, config);
    rmSync(tmpPath, { recursive: true });
    console.log("Unnecessary files removed!\n");

    if (hasPackageJson(projectPath)) {
      console.log(
        "Installing packages. This might take a couple of minutes.\n"
      );
      installDependencies(projectPath);
    }
  } catch (error) {
    console.error("An error occurred while fetching the template", error);
    process.exit(1);
  }
};
