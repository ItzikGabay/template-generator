#! /usr/bin/env node

import logs from "../packages/logs/index.js";
import errors from "../packages/utils/errors.js";
import { copyFolderByType } from "../packages/file-system/index.js";
import config from "../packages/config/index.js";

(async () => {
  // Removes the first two arguments
  const [templateName, installType] = process.argv.slice(2);

  if (!templateName || !config.availableTemplates[templateName]) {
    return logs.warning(errors.NO_TYPE_PROVIDED);
  }

  await copyFolderByType(templateName);
})();

// usage: template-generator [name] [path] [options]
