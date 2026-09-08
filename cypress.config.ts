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
 * Website: https://nadundesilva.com
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import runCoverageTask from "@cypress/code-coverage/task";
import webpackPreprocessor from "@cypress/webpack-batteries-included-preprocessor";
import { defineConfig } from "cypress";
import {
    discoverBlogArticleFilePaths,
    discoverBlogArticleGroupFilePaths,
    resolveWebsiteBlogArticlesSubPath,
} from "./utils/server/blog-articles";

export default defineConfig({
    projectId: "w712w3",
    viewportWidth: 1280,
    viewportHeight: 768,

    video: true,
    videoCompression: true,

    e2e: {
        setupNodeEvents(
            on: Cypress.PluginEvents,
            config: Cypress.PluginConfigOptions,
        ) {
            runCoverageTask(on, config);

            // Extends Cypress's own default e2e bundler with an asset rule,
            // needed for constants/logos.ts's raw .png/.svg imports to parse.
            // getFullWebpackOptions() builds a fresh options object each
            // call - unlike `.defaultOptions`, a shared singleton this
            // package's own TypeScript wiring also mutates.
            const webpackOptions = webpackPreprocessor.getFullWebpackOptions();
            webpackOptions.module.rules.push({
                test: /\.(png|svg|jpe?g|webp|gif|avif)$/i,
                type: "asset/inline",
            });
            // typescript: true calls getResolvedTypescriptVersion, which
            // only exists in @cypress/webpack-preprocessor >=7.1.0 - see the
            // "overrides" pin in package.json for why that's forced.
            on(
                "file:preprocessor",
                webpackPreprocessor({ webpackOptions, typescript: true }),
            );

            on("task", {
                discoverBlogArticles(subPath: string): string[] {
                    const articles = discoverBlogArticleFilePaths(subPath).map(
                        (filePath) =>
                            `/blog-articles/${resolveWebsiteBlogArticlesSubPath(filePath)}`,
                    );
                    if (articles.length === 0) {
                        throw new Error(
                            `No blog articles discovered under "${subPath}"`,
                        );
                    }
                    return articles;
                },
                discoverBlogArticleSubGroups(subPath: string): string[] {
                    const subGroups = discoverBlogArticleGroupFilePaths(
                        subPath,
                    ).map(
                        (filePath) =>
                            `/blog-articles/${resolveWebsiteBlogArticlesSubPath(filePath)}`,
                    );
                    if (subGroups.length === 0) {
                        throw new Error(
                            `No blog article sub-groups discovered under "${subPath}"`,
                        );
                    }
                    return subGroups;
                },
            });

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
        baseUrl: "http://localhost:3000",
        testIsolation: true,
    },

    component: {
        specPattern: "cypress/component/**/*.cy.{ts,tsx}",
        // Cypress 14+ defaults justInTimeCompile to true: each spec is
        // compiled on demand as the runner navigates to it, instead of
        // bundling every spec upfront. In run mode this has a confirmed race:
        // the runner can navigate to a spec before the dev server's internal
        // spec list has been updated for it (verified via
        // DEBUG=cypress:webpack-dev-server:* - the dev server was still
        // serving the previous spec's file list after Cypress had already
        // announced "Running: <new spec>"), so the new spec's loader finds no
        // match, loads nothing, and the spec registers 0 tests while Cypress
        // still exits 0. Nx hit and documented this same failure and ships an
        // automated migration that disables JIT for exactly this reason:
        // https://nx.dev/docs/technologies/test-tools/cypress/migrations
        // Disabling it trades a slower upfront full-suite compile for
        // eliminating the race.
        justInTimeCompile: false,
        setupNodeEvents(
            on: Cypress.PluginEvents,
            config: Cypress.PluginConfigOptions,
        ) {
            runCoverageTask(on, config);

            // Cypress only fails a run on failing tests, not on a spec that
            // registered none - so any spec whose bundle fails to load or
            // errors before a single it() runs (a syntax error, an exception
            // during module evaluation, a dev-server timing issue, etc.)
            // still exits 0. Treat 0 tests in a spec as a hard failure so
            // that whole class of bug can never pass silently.
            on("after:spec", (spec, results) => {
                if (results.stats.tests === 0) {
                    throw new Error(
                        `Spec "${spec.relative}" registered 0 tests - its ` +
                            `bundle likely failed to load.`,
                    );
                }
            });

            return config;
        },
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
});
