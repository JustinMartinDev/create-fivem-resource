import simpleGit from "simple-git";
import { CliForm } from "types";
import { join } from "path";
import { mkdirSync, cpSync, rmSync } from "fs";

const repoUrl = "https://github.com/JustinMartinDev/fivem-resource-templates";
const rawRepoUrl =
  "https://raw.githubusercontent.com/JustinMartinDev/fivem-resource-templates/main";

const getInternalTemplatePath = (options: CliForm) => {
  let templateFolderName = "";

  if (options.runtime === "lua") {
    templateFolderName = "lua-";
  } else if (!options.isTypescript) {
    templateFolderName = "javascript-";
  } else if (options.isTypescript) {
    templateFolderName = "typescript-";
  }

  if (options.hasNui) {
    templateFolderName += "nui-";
  } else {
    templateFolderName += "vanilla";
  }

  if (options.nuiRuntime === "react") {
    templateFolderName += "react";
  } else if (options.nuiRuntime === "vue") {
    templateFolderName += "vue";
  }

  return templateFolderName;
};

export const cloneTemplate = async (options: CliForm, resourcePath: string) => {
  const tmpPath = join(resourcePath, "tmp");
  mkdirSync(tmpPath);

  await simpleGit().clone(repoUrl, tmpPath, { "--depth": 1 });

  const templatePath = getInternalTemplatePath(options);
  cpSync(join(tmpPath, templatePath), resourcePath, { recursive: true });

  rmSync(tmpPath, { recursive: true });

  return templatePath;
};

export const getRawTemplateFile = (templatePath: string, filePath: string) => {
  return `${rawRepoUrl}/${templatePath}/${filePath}`;
};
