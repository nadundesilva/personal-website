/*
 * Nadun De Silva - All Rights Reserved
 *
 * This source code and its associated files are the
 * confidential and proprietary information of Nadun De Silva.
 * Unauthorized reproduction, distribution, or disclosure
 * in any form, in whole or in part, is strictly prohibited
 * except as explicitly provided under a separate license
 * agreement with Nadun De Silva.
 *
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
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
    "/",
    "/nadundesilva-cv.pdf",
    "/experience",
    "/achievements",
    "/education",
    "/education/certifications",
].map((url) => ({
    url: url,
    changefreq: "daily",
    lastmod: currentTimestamp,
}));

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
