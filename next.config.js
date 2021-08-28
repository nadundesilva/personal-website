const withPWA = require("next-pwa");

module.exports = withPWA({
    pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development",
    },
    images: {
        loader: "imgix",
        path: "https://nadundesilva.imgix.net/",
    },
    productionBrowserSourceMaps: true
});
