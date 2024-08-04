import { join } from "path";
import { readFileSync, writeFileSync, rmSync } from "fs";

const removeScripts = (scripts: Record<string, string>, workspace: string) => {
  // Create a copy of the scripts object to avoid mutating the original
  const updatedScripts = { ...scripts };

  // Iterate over the keys of the object
  for (const key in updatedScripts) {
    // Check if the key contains ":web"
    if (key.includes(`:${workspace}`)) {
      // Delete the key from the updatedScripts object
      delete updatedScripts[key];
    }
  }

  return updatedScripts;
};

export const updatePackageJson = (
  projectPath: string,
  resourceName: string,
  config: Record<string, any>
) => {
  // Update package.json with user inputs
  const packageJsonPath = join(projectPath, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

  packageJson.name = resourceName;

  if (!config.description) {
    delete packageJson.description;
  } else {
    packageJson.description = config.description;
  }

  if (!config.author) {
    delete packageJson.author;
  } else {
    packageJson.author = config.author;
  }

  let scripts = packageJson.scripts;

  // Remove scripts if not needed
  if (!config.type.includes("server")) {
    scripts = removeScripts(scripts, "server");
  }

  if (!config.type.includes("client")) {
    scripts = removeScripts(scripts, "client");
  }

  if (!config.nuiFramework) {
    scripts = removeScripts(scripts, "web");
  }

  packageJson.scripts = scripts;

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

const removeRegexFromFile = (
  filePath: string,
  regexOrString: RegExp | string
) => replaceRegexFromFile(filePath, regexOrString, "");

const replaceRegexFromFile = (
  filePath: string,
  regexOrString: RegExp | string,
  replace: string
) => {
  const fxmanifestPath = join(filePath);
  const fxmanifest = readFileSync(fxmanifestPath, "utf-8");
  const newFxmanifest = fxmanifest.replace(regexOrString, replace);
  writeFileSync(fxmanifestPath, newFxmanifest);
};

export const updateReadme = (
  readmePath: string,
  resourceName: string,
  config: Record<string, any>
) => {
  replaceRegexFromFile(readmePath, "<res>", resourceName);

  if (config.description) {
    replaceRegexFromFile(readmePath, "<description>", config.description);
  }

  if (!config.type.includes("server")) {
    removeRegexFromFile(readmePath, "**Server** - `./server/server.ts`");
    removeRegexFromFile(readmePath, /## Server commands[\s\S]*?(?=##|$)/g);
  }

  if (!config.type.includes("client")) {
    removeRegexFromFile(readmePath, "**Client** - `./client/client.ts`");
    removeRegexFromFile(readmePath, /## Client commands[\s\S]*?(?=##|$)/g);
  }
};

export const updateFxManifest = (
  fxmanifestPath: string,
  resourceName: string,
  config: Record<string, any>
) => {
  replaceRegexFromFile(fxmanifestPath, "<res>", resourceName);

  if (config.description) {
    replaceRegexFromFile(fxmanifestPath, "<description>", config.description);
  } else {
    removeRegexFromFile(fxmanifestPath, /description .*/g);
  }

  if (config.author) {
    replaceRegexFromFile(fxmanifestPath, "<author>", config.author);
  } else {
    removeRegexFromFile(fxmanifestPath, /author .*/g);
  }

  if (!config.type.includes("server")) {
    removeRegexFromFile(fxmanifestPath, /server_script .*/g);
  }

  if (!config.type.includes("client")) {
    removeRegexFromFile(fxmanifestPath, /client_script .*/g);
  }
};

export const removeUnecessaryFiles = (
  projectPath: string,
  config: Record<string, any>
) => {
  if (!config.type.includes("server")) {
    rmSync(join(projectPath, "server"), { recursive: true });
  }

  if (!config.type.includes("client")) {
    rmSync(join(projectPath, "client"), { recursive: true });
  }
};
