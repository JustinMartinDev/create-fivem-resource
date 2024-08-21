import { existsSync, renameSync, rmSync } from "fs";
import { join } from "path";

import { CliFormJs } from "../types";
import { unableToSetupFile } from "../utils";

export const setupWorkspacePackageJson = async (
  resourcePath: string,
  templatePath: string,
  options: CliFormJs
) => {
  const templatePackageJsonPath = join(resourcePath, "package.json");

  const workspacePackageJsonPath = join(
    options.rootResourcesFolderPath,
    "package.json"
  );

  if (existsSync(workspacePackageJsonPath)) {
    console.warn(...unableToSetupFile(templatePath, "package.json"));
    rmSync(templatePackageJsonPath);
  } else {
    renameSync(templatePackageJsonPath, workspacePackageJsonPath);
  }
};

export const setupWorkspacePnpmWorkspace = async (
  resourcePath: string,
  templatePath: string,
  options: CliFormJs
) => {
  const templatePnpmWorkspacePath = join(resourcePath, "pnpm-workspace.yaml");

  const workspacePnpmWorkspacePath = join(
    options.rootResourcesFolderPath,
    "pnpm-workspace.yaml"
  );

  if (existsSync(workspacePnpmWorkspacePath)) {
    console.warn(...unableToSetupFile(templatePath, "pnpm-workspace.yaml"));
    rmSync(templatePnpmWorkspacePath);
  } else {
    renameSync(templatePnpmWorkspacePath, workspacePnpmWorkspacePath);
  }
};

export const setupWorkspaceReadmeServer = async (
  resourcePath: string,
  options: CliFormJs
) => {
  const templateReadmeServerPath = join(resourcePath, "README_server.md");

  const workspaceReadmePath = join(
    options.rootResourcesFolderPath,
    "README_server.md"
  );

  if (!existsSync(workspaceReadmePath)) {
    renameSync(templateReadmeServerPath, workspaceReadmePath);
  } else {
    rmSync(workspaceReadmePath);
  }
};
