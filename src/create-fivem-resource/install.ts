import { join } from "path";
import { existsSync } from "fs";
import { execSync } from "child_process";

export const hasPackageJson = (projectPath: string) => {
  return existsSync(join(projectPath, "package.json"));
};

export const installDependencies = (projectPath: string) => {
  execSync("pnpm install", { cwd: projectPath, stdio: "inherit" });
};
