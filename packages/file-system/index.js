import { cp, writeFile } from "node:fs/promises";
import logs from "../logs/index.js";
import errors from "../utils/errors.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import rimraf from "rimraf";

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

export const copyFolderByType = async (type) => {
  const fse = new FileSystem();
  const processPath = process.cwd();
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const folderPath = path.resolve(__dirname, "../../templates");

  await fse.copyFolder(`${folderPath}/${type}`, processPath);
};

export const gitClone = async (path) => {
  const processPath = process.cwd();

  try {
    execSync(`git clone ${path} . --depth=1`, {
      stdio: [0, 1, 2],
      cwd: processPath,
    });

    rimraf.sync(processPath + "/.git");

    execSync(`git init`, {
      stdio: [0, 1, 2],
      cwd: processPath,
    });
  } catch (err) {
    return;
  }
};
