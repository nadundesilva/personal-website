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
import { glob } from "glob";
import { defineConfig } from "cypress";
import {
    BLOG_ARTICLE_FILE,
    BLOG_ARTICLES_DIRECTORY_PREFIX,
    BLOG_ARTICLES_GROUP_FILE,
    resolveWebsiteBlogArticlesSubPath,
} from "./utils/blog-articles";

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

            on("task", {
                discoverBlogArticles(subPath: string): string[] {
                    const pathPattern = `${BLOG_ARTICLES_DIRECTORY_PREFIX}/${subPath}/**/${BLOG_ARTICLE_FILE}`;
                    const articleFiles = glob.sync(pathPattern);
                    return articleFiles.map((filePath) => {
                        const relativePath =
                            resolveWebsiteBlogArticlesSubPath(filePath);
                        return `/blog-articles/${relativePath}`;
                    });
                },
                discoverBlogArticleSubGroups(subPath: string): string[] {
                    const pathPattern = `${BLOG_ARTICLES_DIRECTORY_PREFIX}/${subPath}/*/**/${BLOG_ARTICLES_GROUP_FILE}`;
                    const groupFiles = glob.sync(pathPattern);
                    return groupFiles.map((filePath) => {
                        const relativePath =
                            resolveWebsiteBlogArticlesSubPath(filePath);
                        return `/blog-articles/${relativePath}`;
                    });
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
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
});
