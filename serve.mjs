/* eslint-disable sonarjs/x-powered-by, sonarjs/no-os-command-from-path  -- demo */
import { exec } from "child_process";
import express from "express";

const app = express();
const port = 3000;

app.use(express.static("src"));
app.use(express.static("dist"));

setInterval(() => {
    exec("npm run build", (error, stdout, stderr) => {
        if (error) {
            console.error(`Build error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Build stderr: ${stderr}`);
            return;
        }
        console.log("Build completed successfully");
    });
}, 5000);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
