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
const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
const fs = require("fs");

const currentTimestamp = new Date().toISOString();
const hostname = "https://nadundesilva.github.io";
const sitemapFileName = "sitemap.xml";
const robotsFileName = "robots.txt";
const buildDir = "./out";

const urls = [
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
];

const stream = new SitemapStream({ hostname: hostname });

streamToPromise(Readable.from(urls).pipe(stream)).then((data) => {
    const sitemapFile = `${buildDir}/${sitemapFileName}`;
    fs.writeFile(sitemapFile, data.toString(), (err) => {
        if (err) {
            console.err(`Failed to generate sitemap ${sitemapFile} file`);
            process.exit(1);
        } else {
            console.log(`Generated sitemap ${sitemapFile} file`);
            writeRobotsFile();
        }
    });
});

function writeRobotsFile() {
    const robotsFile = `${buildDir}/${robotsFileName}`;
    const sitemapEntry = `\nSitemap: ${hostname}/${sitemapFileName}\n`;
    fs.appendFile(robotsFile, sitemapEntry, (err) => {
        if (err) {
            console.err(`Failed to add sitemap to ${robotsFile} file`);
            process.exit(1);
        } else {
            console.log(`Added sitemap to ${robotsFile} file`);
        }
    });
}
