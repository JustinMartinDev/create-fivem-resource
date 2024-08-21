import { readFileSync, writeFileSync } from "fs";
import { CliForm } from "types";

export const transformFxManifest = (path: string, options: CliForm) => {
  const fxManifest = readFileSync(path, { encoding: "utf-8" });

  let transformedFxManifest = fxManifest.replace("<res>", options.resourceName);

  // Remove <description>, <author> tag
  transformedFxManifest = transformedFxManifest
    .replace("author '<author>'", "")
    .replace("description '<description>'", "");

  if (!options.hasClientSide) {
    transformedFxManifest = transformedFxManifest.replace(
      "client_script 'client/dist/**/*.js'",
      ""
    );
  }

  if (!options.hasServerSide) {
    transformedFxManifest = transformedFxManifest.replace(
      "server_script 'server/dist/**/*.js'",
      ""
    );
  }

  if (!options.hasNui) {
    transformedFxManifest = transformedFxManifest
      .replace("ui_page 'client/dist/index.html'", "")
      .replace(
        `files {
          'web/dist/index.html',
          'web/dist/**/*',
        }`,
        ""
      );
  }

  writeFileSync(path, transformedFxManifest);
};
