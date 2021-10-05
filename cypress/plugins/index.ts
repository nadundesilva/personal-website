/// <reference types="node" />

import { addMatchImageSnapshotPlugin } from "cypress-image-snapshot/plugin";

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
    addMatchImageSnapshotPlugin(on, config);
};
