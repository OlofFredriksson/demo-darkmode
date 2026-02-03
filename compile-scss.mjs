import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { globSync } from "glob";
import * as sass from "sass";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, "src", "styles");
const outDir = path.join(__dirname, "dist", "styles");

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Find all SASS files (excluding partials)
const sassFiles = globSync(path.posix.join(srcDir, "*.scss")).filter(
    (file) => !path.basename(file).startsWith("_"),
);

if (sassFiles.length === 0) {
    console.log("No SASS files found to compile.");
    process.exit(0);
}

let hasErrors = false;

for (const file of sassFiles) {
    const fileName = path.basename(file, ".scss");
    const outFile = path.join(outDir, `${fileName}.css`);

    try {
        const result = sass.compile(file, {
            style: "compressed",
        });

        fs.writeFileSync(outFile, result.css);
        console.log(`✓ Compiled ${path.relative(__dirname, file)}`);
    } catch (error) {
        console.error(`✗ Error compiling ${file}:`);
        console.error(error.message);
        hasErrors = true;
    }
}

if (hasErrors) {
    process.exit(1);
}

console.log(`\nSuccessfully compiled SASS files to ${outDir}`);
