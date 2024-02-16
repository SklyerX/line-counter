import { consola } from "consola";
import path from "path";
import fs from "fs";

import yaml from "js-yaml";

type DirectoryOptions = {
  verbose: string;
  EXCLUDE_EMPTY_LINES: boolean;
  IGNORE_FOLDERS: Array<string>;
  IGNORE_FILES: Array<string>;
  IGNORE_EXTENSIONS: Array<string>;
};

let totalLines = 0;

export function traverseDirectory(dir: string, opts: DirectoryOptions) {
  const {
    IGNORE_EXTENSIONS,
    EXCLUDE_EMPTY_LINES,
    IGNORE_FILES,
    IGNORE_FOLDERS,
    verbose,
  } = opts;

  const directoryItems = fs.readdirSync(dir);

  if (verbose) consola.info(`Found ${directoryItems.length} items in ${dir}\n`);

  directoryItems.map((item) => {
    const itemPath = path.join(dir, item);

    if (!fs.existsSync(itemPath))
      return consola.error(`Path '${path}' was not found!`);

    const stats = fs.lstatSync(itemPath);

    if (stats.isDirectory()) {
      if (IGNORE_FOLDERS.includes(item)) {
        if (verbose) consola.info(`Skipping directory - ${item}\n`);
        return;
      }
      traverseDirectory(itemPath, opts);
    } else {
      if (
        IGNORE_EXTENSIONS.includes(path.extname(item)) ||
        IGNORE_FILES.includes(item)
      ) {
        if (verbose) consola.info(`Skipping file - ${item}\n`);
        return;
      }

      if (verbose) consola.info(`Reading ${item}\n`);

      const data = fs.readFileSync(itemPath, "utf-8");

      let lines = data.split("\n");

      if (EXCLUDE_EMPTY_LINES) lines = lines.filter((x) => x !== "");

      if (verbose)
        consola.info(
          `Total lines from ${item} was ${lines.length} ${
            EXCLUDE_EMPTY_LINES ? "(excluding empty lines | line breaks)" : ""
          }\n`
        );

      totalLines += lines.length;
    }
  });

  return totalLines;
}

export function saveInformation({
  EXCLUDE_EMPTY_LINES,
  IGNORE_EXTENSIONS,
  IGNORE_FILES,
  IGNORE_FOLDERS,
  verbose,
  save,
}: DirectoryOptions & { save: string }) {
  const configFileDetails = {
    "exclude-empty-lines": EXCLUDE_EMPTY_LINES,
    verbose: verbose,
    validation: {
      ignore_folders: IGNORE_FOLDERS,
      ignore_files: IGNORE_FILES,
      ignore_extensions: IGNORE_EXTENSIONS,
    },
  };

  const yamlContent = yaml.dump(configFileDetails);

  let fileName = save;

  fs.writeFileSync(fileName, yamlContent, "utf8");
}
