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
 * © 2026 Nadun De Silva. All rights reserved.
 */

// Shared console-error / uncaught-exception guard for both the e2e and component
// suites. A disallowed console.error is re-thrown from a microtask so it escapes
// any React render try/catch that called console.error and fails the *current
// test* (a test failure, not a hook failure - so sibling tests in the same spec
// file still run). The re-throw lists every console error seen so far: a browser
// / React incident logs its console.error calls in one synchronous burst, and
// the microtask only drains once that burst is complete. (Cypress halts the test
// on the first failure, so no further test code runs to log more.)

import { WEBSITE_DOMAIN } from "@/constants/metadata";

type ConsoleErrorMatcher = RegExp | string;

// Patterns allowed everywhere. Keep minimal - only messages verified to be
// framework/tooling noise, never app code.
const GLOBAL_ALLOWLIST: ConsoleErrorMatcher[] = [
    // Cypress component runner's webpack-dev-server, not the app under test.
    "[webpack-dev-server] Invalid Host/Origin header",
];

let perTestAllowlist: ConsoleErrorMatcher[] = [];
let residualErrors: string[] = [];
let throwScheduled = false;

// Identifiers derived from the site domain so nothing an app logs could collide:
// THROWN_PREFIX tags the errors this guard re-throws; GUARD_FLAG marks a
// console.error we have already wrapped.
const GUARD_ID = `${WEBSITE_DOMAIN} console-guard`;
const THROWN_PREFIX = `${GUARD_ID}: `;
const GUARD_FLAG = `__${WEBSITE_DOMAIN.replace(/[^a-z0-9]+/gi, "_")}_console_guard`;

const toRegExp = (matcher: ConsoleErrorMatcher): RegExp =>
    typeof matcher === "string"
        ? new RegExp(matcher.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        : matcher;

const isAllowed = (message: string): boolean =>
    [...GLOBAL_ALLOWLIST, ...perTestAllowlist]
        .map(toRegExp)
        .some((pattern) => pattern.test(message));

export const formatConsoleArgs = (args: unknown[]): string =>
    args
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

/** One message verbatim; several as a numbered block. */
export const formatConsoleErrorList = (messages: string[]): string => {
    if (messages.length <= 1) {
        return messages[0] ?? "";
    }
    return [
        `${messages.length} console errors in this test:`,
        ...messages.map((m, i) => `[${i + 1}/${messages.length}] ${m}`),
    ].join("\n\n");
};

/**
 * Whitelist console.error messages matching `pattern` for the current test only.
 * Exposed to specs as `cy.allowConsoleError()`. Pass the *specific* expected
 * message (a string is matched as a literal substring) - a broad pattern would
 * also swallow an unrelated error the test didn't intend to trigger.
 */
export const allowConsoleError = (pattern: ConsoleErrorMatcher): void => {
    perTestAllowlist.push(pattern);
};

/** Clears per-test state. Call in `beforeEach`. */
export const resetConsoleGuard = (): void => {
    perTestAllowlist = [];
    residualErrors = [];
    throwScheduled = false;
};

/**
 * Wraps `win.console.error` so a disallowed error fails the current test.
 * Idempotent: a window whose console.error is already wrapped is left untouched,
 * so this can be called per-test on the component runner's reused AUT window.
 */
export const patchConsoleError = (win: Cypress.AUTWindow): void => {
    const current = win.console.error as typeof win.console.error & {
        [GUARD_FLAG]?: boolean;
    };
    if (current[GUARD_FLAG]) {
        return;
    }

    const original = win.console.error.bind(win.console);
    const wrapped = ((...args: unknown[]): void => {
        original(...args);

        const message = formatConsoleArgs(args);
        Cypress.log({
            name: "console.error",
            message,
            consoleProps: () => ({ error: message }),
        });

        if (isAllowed(message)) {
            return;
        }
        residualErrors.push(message);
        if (throwScheduled) {
            return;
        }
        throwScheduled = true;
        // Re-throw on a fresh stack so it escapes any React render try/catch that
        // called console.error and becomes an uncaught exception -> Cypress fails
        // this test (a test failure, not a hook failure, so siblings still run).
        // A microtask (not setTimeout) so it lands inside the command queue,
        // before this test's afterEach runs the residual net. An exception from a
        // queueMicrotask callback is reported as an uncaught exception (not an
        // unhandled rejection), which is what handleUncaughtException expects.
        // The message is built here, after the synchronous console.error burst
        // has finished pushing, so it lists every error from the incident.
        win.queueMicrotask(() => {
            throw new Error(
                `${THROWN_PREFIX}${formatConsoleErrorList(residualErrors)}`,
            );
        });
    }) as typeof win.console.error & { [GUARD_FLAG]?: boolean };
    wrapped[GUARD_FLAG] = true;
    win.console.error = wrapped;
};

/**
 * `afterEach` backstop. If a re-throw was scheduled it already failed the test
 * (throwing here would be a hook failure and make Mocha skip the rest of the
 * spec file), so stay quiet. Only throw for the shouldn't-happen case of a
 * recorded error with no scheduled re-throw.
 */
export const assertNoResidualConsoleErrors = (): void => {
    if (throwScheduled || residualErrors.length === 0) {
        return;
    }
    const list = formatConsoleErrorList(residualErrors);
    residualErrors = [];
    throw new Error(`Test failed due to console errors:\n${list}`);
};

/**
 * `Cypress.on("uncaught:exception")` handler. Returns `undefined` so Cypress
 * fails the test at the throw site (with a screenshot) - the previous
 * `return false` suppressed that.
 */
export const handleUncaughtException = (err: Error): undefined => {
    if (err.message.startsWith(THROWN_PREFIX)) {
        // Our own re-thrown console.error - Cypress is already failing the test
        // for it; the afterEach backstop stays quiet because throwScheduled.
        return undefined;
    }
    Cypress.log({
        name: "uncaught:exception",
        message: `${err.name}: ${err.message}`,
        consoleProps: () => ({ error: err }),
    });
    return undefined;
};
