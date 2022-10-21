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
import runCoverageTask from "@cypress/code-coverage/task";
import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "w712w3",
    viewportWidth: 1024,
    viewportHeight: 768,

    e2e: {
        setupNodeEvents(
            on: Cypress.PluginEvents,
            config: Cypress.PluginConfigOptions,
        ) {
            runCoverageTask(on, config);

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
