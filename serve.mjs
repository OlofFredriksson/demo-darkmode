/* eslint-disable sonarjs/x-powered-by -- demo */
import express from "express";

const app = express();
const port = 3000;

app.use(express.static("src"));
app.use(express.static("dist"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
