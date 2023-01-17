#! /usr/bin/env node

import logs from "../packages/logs/index.js";
import errors from "../packages/utils/errors.js";
import FileSystem from "../packages/file-system/index.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// template-generator [name] [path] [options]
(async () => {
  // Removes first two arguments
  // (first is node, the second is the file path)
  const [type] = process.argv.slice(2);

  if (!type) {
    return logs.warning(errors.NO_TYPE_PROVIDED);
  }

  const fse = new FileSystem();
  const processPath = process.cwd();
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const folderPath = path.resolve(__dirname, "../templates");

  await fse.copyFolder(`${folderPath}/${type}`, processPath);
  logs.success(`Successfully copied ${type} project to '${processPath}'`);
})();
