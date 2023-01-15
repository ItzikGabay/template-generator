import { cp, writeFile } from "node:fs/promises";
import logs from "../logs/index.js";
import errors from "../utils/errors.js";

export default class FileSystem {
  constructor() {}

  async copyFolder(source, destination) {
    try {
      await cp(source, destination, { recursive: true });
      return true;
    } catch (error) {
      if (error.code === "ENOENT") {
        logs.warning(errors.NO_SUCH_FILE_OR_DIRECTORY);
      } else {
        logs.warning(error);
      }
      return false;
    }
  }

  async writeFile(path, content) {
    try {
      await writeFile(path, content);
      return true;
    } catch (error) {
      logs.warning(error);
      return false;
    }
  }
}
