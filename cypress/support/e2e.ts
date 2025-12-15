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
import "@cypress/code-coverage/support";

import "./commands";

// Track console errors and fail tests if any occur
let consoleErrors: string[] = [];

// Clear errors before each test
beforeEach(() => {
    consoleErrors = [];
});

// Fail test if console errors occurred
afterEach(function () {
    if (consoleErrors.length > 0) {
        const errorMessages = consoleErrors.join("\n");
        consoleErrors = []; // Clear for next test
        throw new Error(`Test failed due to console errors:\n${errorMessages}`);
    }
});

Cypress.on("window:before:load", (win) => {
    // Override console.error to capture errors
    const originalConsoleError = win.console.error;
    win.console.error = (...args: unknown[]) => {
        const errorMessage = args
            .map((arg) => {
                if (typeof arg === "string") {
                    return arg;
                }
                if (arg instanceof Error) {
                    return `${arg.name}: ${arg.message}${arg.stack ? `\n${arg.stack}` : ""}`;
                }
                try {
                    return JSON.stringify(arg);
                } catch {
                    return String(arg);
                }
            })
            .join(" ");

        consoleErrors.push(errorMessage);
        // Log immediately to Cypress
        Cypress.log({
            name: "console.error",
            message: errorMessage,
            consoleProps: () => ({ error: errorMessage }),
        });

        // Call original console.error to maintain normal behavior
        originalConsoleError.apply(win.console, args);
    };
});

// Also catch uncaught exceptions
Cypress.on("uncaught:exception", (err) => {
    const errorMessage = `${err.name}: ${err.message}${err.stack ? `\n${err.stack}` : ""}`;
    consoleErrors.push(errorMessage);
    // Log immediately to Cypress
    Cypress.log({
        name: "uncaught:exception",
        message: errorMessage,
        consoleProps: () => ({ error: errorMessage }),
    });
    // Don't prevent Cypress from failing the test
    return false;
});
