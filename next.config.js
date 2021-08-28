const withPWA = require("next-pwa");

module.exports = withPWA({
    pwa: {
        dest: "public",
        register: true
    },
    images: {
        loader: "imgix",
        path: "https://nadundesilva.imgix.net/",
    },
    productionBrowserSourceMaps: true
});
