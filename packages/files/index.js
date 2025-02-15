import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = await fs.readdir(__dirname);
await fs.writeFile(
  path.join(__dirname, "list.json"),
  JSON.stringify(
    files
      .filter((file) => !file.includes("index") && !file.includes("list"))
      .map((file) => file.replace(".json", ""))
  )
);

const data = await Promise.all(
  files
    .filter((file) => !file.includes("index") && !file.includes("list"))
    .map(async (file) => {
      const data = await fs.readFile(path.join(__dirname, file));
      await fs.unlink(path.join(__dirname, file));
      return JSON.parse(data.toString());
    })
    .flat()
);

await fs.writeFile(
  path.join(__dirname, "index.json"),
  JSON.stringify(data.flat(), null, 2)
);

console.log("done");
