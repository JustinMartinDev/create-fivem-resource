import { readdirSync, statSync } from "fs";
import { dirname, join } from "path";
import { execSync } from "child_process";

// Function to recursively find all package.json files
const findPackageJsonFiles = (dir: string, fileList: string[] = []) => {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findPackageJsonFiles(filePath, fileList);
    } else if (file === "package.json") {
      fileList.push(filePath);
    }
  });

  return fileList;
};

export const hasPackageJson = (projectPath: string): boolean => {
  return findPackageJsonFiles(projectPath).length > 0;
};

export const installDependencies = (projectPath: string) => {
  const packageJsonFiles = findPackageJsonFiles(projectPath);

  for (const packageJsonFile of packageJsonFiles) {
    //get directory of package.json file
    const packageJsonDir = dirname(packageJsonFile);

    //install dependencies
    execSync("npm install", { cwd: packageJsonDir, stdio: "inherit" });
  }
};
