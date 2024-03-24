import { Command } from "commander";
import inquirer from "inquirer";
import { consola } from "consola";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { ConfigValidator } from "../lib/validate-config";
import { saveInformation, traverseDirectory } from "../utils";
import {
  ignore_extensions,
  ignore_files,
  ignore_folders,
} from "../utils/constants/ignore";

export const count = new Command()
  .name("count")
  .description("count the lines within the directory")
  .option("--ignore-extensions <extensions...>", "List of extensions to ignore")
  .option("--ignore-folders <folders...>", "List of folders to ignore")
  .option("--ignore-files <folders...>", "List of files to ignore")
  .option(
    "--exclude-empty-line, --exclude",
    "Exclude empty lines (line breaks)",
    false
  )
  .option("--verbose", "List of files to ignore", true)
  .option(
    "--load <config-file>",
    "Load from a config file instead of typing it again"
  )
  .option("--save <config-file>", "Save settings to config file")
  .option(
    "--default-ignores",
    "Use the default ignored list / combine it with your current list of ignored files"
  )
  .action(async (opts) => {
    let {
      ignoreFiles: IGNORE_FILES = [],
      ignoreExtensions: IGNORE_EXTENSIONS = [],
      ignoreFolders: IGNORE_FOLDERS = [],
      exclude: EXCLUDE_EMPTY_LINES = true,
      verbose,
      load,
      save,
      defaultIgnores,
    } = opts;

    if (load) {
      if (!fs.existsSync(load))
        return consola.error("Invalid config file was found!");

      if (path.extname(load) !== ".yaml")
        return consola.error("Config file must be YAML!");

      const yamlFile = fs.readFileSync(load, "utf8");
      const data = yaml.load(yamlFile);

      try {
        const {
          "exclude-empty-lines": exclude_empty_lines,
          validation,
          verbose: $verbose,
        } = ConfigValidator.parse(data);

        IGNORE_FILES = validation.ignore_files;
        IGNORE_EXTENSIONS = validation.ignore_extensions;
        IGNORE_FOLDERS = validation.ignore_folders;

        EXCLUDE_EMPTY_LINES = exclude_empty_lines;
        verbose = $verbose;
      } catch (err) {
        consola.error("Invalid config file - failed to parse.");
      }
    }

    if (defaultIgnores) {
      IGNORE_EXTENSIONS = Array.from(
        new Set([...ignore_extensions, ...IGNORE_EXTENSIONS])
      );
      IGNORE_FILES = Array.from(new Set([...ignore_files, ...IGNORE_FILES]));
      IGNORE_FOLDERS = Array.from(
        new Set([...ignore_folders, ...IGNORE_FOLDERS])
      );
    }

    let totalLines = 0;

    const { directory } = await inquirer.prompt({
      name: "directory",
      message: "What directory would you like to parse?",
      type: "input",
      default: ".",
      validate(value) {
        if (!fs.existsSync(value)) return "Please provide a valid directory";
        return true;
      },
    });

    totalLines += traverseDirectory(directory, {
      EXCLUDE_EMPTY_LINES,
      IGNORE_EXTENSIONS,
      IGNORE_FILES,
      IGNORE_FOLDERS,
      verbose,
    });

    const formattedTotalLines = new Intl.NumberFormat().format(totalLines);
    consola.warn(
      `Found (${formattedTotalLines}) ${totalLines} lines in ${directory}`
    );

    if (save)
      saveInformation({
        EXCLUDE_EMPTY_LINES,
        IGNORE_EXTENSIONS,
        IGNORE_FILES,
        IGNORE_FOLDERS,
        verbose,
        save,
      });
  });
