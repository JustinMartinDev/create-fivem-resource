import chalk from "chalk";
import { basename, join } from "path";
import { readdirSync, statSync } from "fs";

import { getRawTemplateFile } from "./git";

export const getRootResourcesFolderPath = (cwd: string): string | undefined => {
  const currentFolder = basename(cwd);
  // Check if currentFolder is the "resources" folder
  if (currentFolder === "resources") {
    return cwd;
  }

  // Check if currentFolder match [***] pattern
  if (/\[.+\]/.test(currentFolder)) {
    return getRootResourcesFolderPath(cwd.split("/").slice(-1).join("/"));
  }

  return undefined;
};

export const unableToSetupFile = (templatePath: string, filePath: string) => {
  return [
    chalk.yellow(`\nYou alrady have '${filePath}' in resources root folder`),
    chalk.yellow(`\nOur '${filePath}':`),
    chalk.dim(getRawTemplateFile(templatePath, filePath)),
  ];
};

/**
 * Recursively searches for a file by name in a given directory using .reduce.
 * @param {string} dir - The directory to start the search from.
 * @param {string} fileName - The name of the file to search for.
 * @returns {string[]} - An array of paths to the files found.
 */
export function findFileRecursive(dir: string, fileName: string): string[] {
  const files = readdirSync(dir);

  return files.reduce<string[]>((foundFiles, file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // If the file is a directory, recursively search within it and concatenate results
      return foundFiles.concat(findFileRecursive(filePath, fileName));
    } else if (file === fileName) {
      // If the file name matches, add it to the found files
      foundFiles.push(filePath);
    }

    return foundFiles;
  }, []);
}
