const withPlugins = require("next-compose-plugins");

const pwa = require("next-pwa");

const plugins = [
    [
        pwa,
        {
            pwa: {
                dest: "public",
                register: true
            }
        }
    ]
];

const nextConfig = {
    images: {
        loader: "imgix",
        path: "https://nadundesilva.imgix.net/",
    },
    productionBrowserSourceMaps: true,
};

module.exports = withPlugins(plugins, nextConfig);
