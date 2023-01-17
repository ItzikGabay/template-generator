#! /usr/bin/env node

import logs from "../packages/logs/index.js";
import errors from "../packages/utils/errors.js";
import { copyFolderByType } from "../packages/file-system/index.js";

(async () => {
  // Removes the first two arguments
  const [type] = process.argv.slice(2);

  if (!type) {
    return logs.error(errors.NO_TYPE_PROVIDED);
  }

  await copyFolderByType(type);
})();

// usage: template-generator [name] [path] [options]
