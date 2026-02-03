#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";
import * as sass from "sass";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = join(__dirname, "src", "styles");
const distDir = join(__dirname, "dist/styles");

async function compileScss() {
    // Create dist directory if it doesn't exist
    if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
    }

    // Find all SCSS files
    const scssFiles = await glob("src/styles/**/*.scss");

    if (scssFiles.length === 0) {
        console.log(`No SCSS files found in ${srcDir}`);
        return;
    }

    console.log(`Compiling ${scssFiles.length} SCSS file(s)...`);

    let compiledCount = 0;

    for (const file of scssFiles) {
        try {
            const result = sass.compile(file, { style: "compressed" });
            const relativePath = file
                .replace(srcDir, "")
                .replace(/\.scss$/, ".css");
            const outputPath = join(distDir, relativePath);

            // Create subdirectories if needed
            const outputDir = dirname(outputPath);
            if (!existsSync(outputDir)) {
                mkdirSync(outputDir, { recursive: true });
            }

            writeFileSync(outputPath, result.css);
            console.log(`✓ ${relativePath}`);
            compiledCount++;
        } catch (error) {
            console.error(`✗ Error compiling ${file}:`);
            console.error(error.message);
        }
    }

    console.log(
        `\nCompilation complete: ${compiledCount}/${scssFiles.length} file(s) compiled.`,
    );
}

compileScss().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
