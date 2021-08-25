const { simpleSitemapAndIndex } = require("sitemap");
const fs = require("fs");

const currentTimestamp = new Date().toISOString();
const hostname = "https://nadundesilva.github.io";
const buildDir = "./build/";

simpleSitemapAndIndex({
    hostname: hostname,
    destinationDir: buildDir,
    gzip: false,
    sourceData: [
        {
            url: "/",
            changefreq: "daily",
            lastmod: currentTimestamp
        },
        {
            url: "/nadundesilva-cv.pdf",
            changefreq: "daily",
            lastmod: currentTimestamp
        }
    ]
}).then(() => {
    console.log("Sitemap generated");
    fs.open(buildDir + "robots.txt", "a", 666, function(err, id) {
        const siteMapEntry = `Sitemap: ${hostname}/sitemap-index.xml\n`;
        fs.write(id, siteMapEntry, null, "utf8", function() {
            fs.close(id, function() {
                console.log("Added sitemap to robots.txt");
            });
        });
    });
});
