import { renameSync, readdirSync, rmSync } from "fs";
import { join, basename } from "path";
import chalk from "chalk";

import { CliFormJs } from "../types";
import { findFileRecursive } from "../utils";
import {
  setupWorkspacePackageJson,
  setupWorkspacePnpmWorkspace,
  setupWorkspaceReadmeServer,
} from "./workspace";

import { transformPackage } from "../common/package";
import { transformFxManifest } from "../common/fxmanifest";
import { transformReadme } from "../common/readme";

const transformer = {
  "package.json": transformPackage,
  "fxmanifest.lua": transformFxManifest,
  "README_res.md": transformReadme,
};

export const setupJsTemplate = async (
  resourcePath: string,
  templatePath: string,
  options: CliFormJs
) => {
  // Workspace setup
  setupWorkspacePackageJson(resourcePath, templatePath, options);
  setupWorkspacePnpmWorkspace(resourcePath, templatePath, options);
  setupWorkspaceReadmeServer(resourcePath, options);

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
  const filesToUpdate = ["fxmanifest.lua", "package.json", "README_res.md"];

  const pathToUpdate = filesToUpdate
    .map((file) => findFileRecursive(resourcePath, file))
    .flat();

  pathToUpdate.forEach((filePath) => {
    const fileName = basename(filePath) as
      | "package.json"
      | "fxmanifest.lua"
      | "README_res.md";

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

  console.log(
    chalk.dim(`\nDone. Now run in ${options.rootResourcesFolderPath}:`)
  );
  console.log(chalk.green("\n  pnpm install\n"));
};
