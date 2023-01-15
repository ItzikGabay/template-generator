#! /usr/bin/env node

import logs from "../packages/logs/index.js";
import errors from "../packages/utils/errors.js";
import config from "../packages/config/index.js";
import FileSystem from "../packages/file-system/index.js";

const isDebugMode = config.isDebugMode;

// template-generator [name] [path] [options]
(async () => {
    // Removes first two arguments
    // (first is node, the second is the file path)
    const inputArguments = process.argv.slice(2);
    let [name, path, type, ...options] = inputArguments;
    const fse = new FileSystem();
    const currentPath = process.cwd();

    if(!name) {
        return logs.warning(errors.NO_NAME_PROVIDED);
    }

    if(!path) {
        path = './';
    }

    if(!type) {
        type = 'base'
    }

    await fse.copyFolder(`${currentPath}/templates/${type}`, `${currentPath}`)

    isDebugMode && console.log(inputArguments);
})();