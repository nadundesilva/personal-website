import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "w712w3",
    viewportWidth: 1024,
    viewportHeight: 768,

    e2e: {
        setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
            on("before:browser:launch", (browser, launchOptions) => {
                if (browser.name === "chrome" && browser.isHeadless) {
                    launchOptions.args.push(
                        `--window-size=${config.viewportWidth},${config.viewportHeight}`,
                    );
                    launchOptions.args.push("--force-device-scale-factor=1");
                }
                if (browser.name === "electron" && browser.isHeadless) {
                    launchOptions.preferences.width = config.viewportWidth;
                    launchOptions.preferences.height = config.viewportHeight;
                }
                if (browser.name === "firefox" && browser.isHeadless) {
                    launchOptions.args.push(`--width=${config.viewportWidth}`);
                    launchOptions.args.push(
                        `--height=${config.viewportHeight}`,
                    );
                }
                return launchOptions;
            });
            return config;
        },
        baseUrl: "https://nadundesilva.github.io",
    },

    component: {
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
});
