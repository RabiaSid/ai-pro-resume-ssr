import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import SSRProvider from 'react-bootstrap/SSRProvider';
import App from "../src/App";


const app = express();


app.get("/*", (req, res) => {
    const entryPoint = ["/main.js"];

    const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
        <StaticRouter location={req.url}>
            <SSRProvider>
                <App />
            </SSRProvider>
        </StaticRouter>,
        {
            bootstrapScripts: entryPoint,
            onAllReady() {
                res.statusCode = 200;
                res.setHeader("Content-type", "text/html");
                pipe(res);
            },
            onShellError() {
                res.statusCode = 500;
                res.send("<!doctype html><p>Loading...</p>");
            },
        }
    );
});

app.listen(3000, () => {
    console.log("App is running on http://localhost:3000");
});
