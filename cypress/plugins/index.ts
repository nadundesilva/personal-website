/// <reference types="node" />

import { addMatchImageSnapshotPlugin } from "cypress-image-snapshot/plugin";

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
    addMatchImageSnapshotPlugin(on, config);

    on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
            launchOptions.args.push(`--window-size=${config.viewportWidth},${config.viewportHeight}`)
            launchOptions.args.push('--force-device-scale-factor=1')
        }
        if (browser.name === 'electron' && browser.isHeadless) {
            launchOptions.preferences.width = config.viewportWidth
            launchOptions.preferences.height = config.viewportHeight
        }
        if (browser.name === 'firefox' && browser.isHeadless) {
            launchOptions.args.push(`--width=${config.viewportWidth}`)
            launchOptions.args.push(`--height=${config.viewportHeight}`)
        }
        return launchOptions
    })
};
