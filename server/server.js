// import express from "express";
// import path from "path";
// import React from "react";
// import ReactDOMServer from "react-dom/server";
// import { StaticRouter } from "react-router-dom/server";
// // import SSRProvider from 'react-bootstrap/SSRProvider';
// import App from "../src/App";


// const app = express();


// app.get("/*", (req, res) => {
//     const entryPoint = ["/main.js"];

//     const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
//         <StaticRouter location={req.url}>
//             {/* <SSRProvider> */}
//             <App />
//             {/* </SSRProvider> */}
//         </StaticRouter>,
//         {
//             bootstrapScripts: entryPoint,
//             onAllReady() {
//                 res.statusCode = 200;
//                 res.setHeader("Content-type", "text/html");
//                 pipe(res);
//             },
//             onShellError() {
//                 res.statusCode = 500;
//                 res.send("<!doctype html><p>Loading...</p>");
//             },
//         }
//     );
// });

// app.listen(3000, () => {
//     console.log("App is running on http://localhost:3000");
// });
import express from "express";
import path from "path";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App.js";
import sharp from "sharp";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Serve static files (React build + public folder)
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "public")));

// ✅ WebP Image Optimization - Dynamically Convert & Serve Images
app.get("/images/:imageName", async (req, res) => {
    const { imageName } = req.params;
    const imagePath = path.join(__dirname, "public/images", imageName);

    try {
        if (!fs.existsSync(imagePath)) {
            return res.status(404).send("Image not found");
        }

        // Convert image to WebP format dynamically
        const webpImage = await sharp(imagePath).webp().toBuffer();
        res.set("Content-Type", "image/webp");
        res.send(webpImage);
    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).send("Error processing image");
    }
});

// ✅ Handle Server-Side Rendering for All Routes
// app.get("/*", (req, res) => {
//     const entryPoint = ["/static/js/main.js"];

//     const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
//         <StaticRouter location={req.url}>
//             <App />
//         </StaticRouter>,
//         {
//             bootstrapScripts: entryPoint,
//             onAllReady() {
//                 res.status(200);
//                 res.setHeader("Content-Type", "text/html");

//                 // Stream the SSR response
//                 res.write(`<!DOCTYPE html>
//                     <html lang="en">
//                     <head>
//                         <meta charset="UTF-8">
//                         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                         <title>React SSR</title>
//                     </head>
//                     <body>
//                         <div id="root">`);

//                 pipe(res);

//                 res.write(`</div>
//                     <script src="/static/js/main.js"></script>
//                     </body>
//                     </html>`);
//             },
//             onShellError() {
//                 res.status(500).send("<!DOCTYPE html><p>Server Error</p>");
//             },
//         }
//     );

//     // Handle request aborts
//     req.on("close", () => abort());
// });
app.get("/*", (req, res) => {
    const entryPoint = ["/main.js"];

    const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
        <StaticRouter location={req.url}>
            {/* <SSRProvider> */}
            <App />
            {/* </SSRProvider> */}
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

// ✅ Start the Express Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
