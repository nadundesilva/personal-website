const { simpleSitemapAndIndex } = require("sitemap")

const currentTimestamp = new Date().toISOString();

simpleSitemapAndIndex({
    hostname: "https://nadundesilva.github.io",
    destinationDir: "./build/",
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
    console.log("Sitemap generated\n");
});
