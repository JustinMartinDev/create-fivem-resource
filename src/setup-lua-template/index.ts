import { basename, join } from "path";
import { rmSync, readdirSync, renameSync } from "fs";
import chalk from "chalk";

import { CliForm } from "../types";
import { findFileRecursive } from "../utils";

import { transformFxManifest } from "../common/fxmanifest";
import { transformReadme } from "../common/readme";
import { transformPackage } from "../common/package";

const transformer = {
  "fxmanifest.lua": transformFxManifest,
  "README_res.md": transformReadme,
  "package.json": transformPackage,
};

export const setupLuaTemplate = async (
  resourcePath: string,
  options: CliForm
) => {
  // move 'res' folder into direct parent folder
  const resFolderPath = join(resourcePath, "res");
  const allFilesAndFolders = readdirSync(resFolderPath);

  allFilesAndFolders.forEach((fileOrFolder) => {
    renameSync(
      join(resFolderPath, fileOrFolder),
      join(resourcePath, fileOrFolder)
    );
  });

  // Remove 'res' folder
  rmSync(resFolderPath, { recursive: true });

  // Process transformation on each file
  const filesToUpdate = ["fxmanifest.lua", "README_res.md", "package.json"];

  const pathToUpdate = filesToUpdate
    .map((file) => findFileRecursive(resourcePath, file))
    .flat();

  pathToUpdate.forEach((filePath) => {
    const fileName = basename(filePath) as
      | "fxmanifest.lua"
      | "README_res.md"
      | "package.json";

    transformer[fileName](filePath, options);
  });

  // Remove unnecessary folders
  if (!options.hasClientSide) {
    const clientFolderPath = join(resourcePath, "client");
    rmSync(clientFolderPath, { recursive: true });
  }

  if (!options.hasServerSide) {
    const serverFolderPath = join(resourcePath, "server");
    rmSync(serverFolderPath, { recursive: true });
  }

  if (options.hasNui) {
    console.log(
      chalk.dim(`\nDone. Now run in ${options.rootResourcesFolderPath}:`)
    );
    console.log(chalk.green(`\n  cd ${resourcePath}/web`));
    console.log(chalk.green("  npm run install\n"));
  }
};
