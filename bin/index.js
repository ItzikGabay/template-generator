#! /usr/bin/env node

import logs from "../packages/logs/index.js";

(async () => {
    // Removes first two arguments
    // (first is node, the second is the file path)
    const inputArguments = process.argv.slice(2);

    if(!inputArguments.length) {
        return logs.warning('Error!')
    }

    console.log(inputArguments);
})();