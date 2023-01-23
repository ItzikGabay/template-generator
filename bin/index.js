#! /usr/bin/env node

import logs from "../packages/logs/index.js";
import errors from "../packages/utils/errors.js";
import {copyFolderByType, gitClone} from "../packages/file-system/index.js";
import config from "../packages/config/index.js";


(async () => {
  // Removes the first two arguments
  const [template, repoPath] = process.argv.slice(2);

  if (!template || !config.availableTemplates[template]) {
    return logs.warning(errors.NO_TYPE_PROVIDED);
  }

  if(template === '--git') {
    return await gitClone(repoPath);
  }

  return await copyFolderByType(template);
})();
// usage: template-generator [name] [path] [options]
