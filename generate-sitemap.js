/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const { simpleSitemapAndIndex } = require("sitemap");
const fs = require("fs");

const currentTimestamp = new Date().toISOString();
const hostname = "https://nadundesilva.github.io";
const buildDir = "./out/";

simpleSitemapAndIndex({
    hostname: hostname,
    destinationDir: buildDir,
    gzip: false,
    sourceData: [
        {
            url: "/",
            changefreq: "daily",
            lastmod: currentTimestamp,
        },
        {
            url: "/experience",
            changefreq: "daily",
            lastmod: currentTimestamp,
        },
        {
            url: "/achievements",
            changefreq: "daily",
            lastmod: currentTimestamp,
        },
        {
            url: "/nadundesilva-cv.pdf",
            changefreq: "daily",
            lastmod: currentTimestamp,
        },
    ],
}).then(() => {
    console.log("Sitemap generated");
    fs.open(buildDir + "robots.txt", "a", 666, function (err, id) {
        const siteMapEntry = `\nSitemap: ${hostname}/sitemap-index.xml\n`;
        fs.write(id, siteMapEntry, null, "utf8", function () {
            fs.close(id, function () {
                console.log("Added sitemap to robots.txt\n");
            });
        });
    });
});
