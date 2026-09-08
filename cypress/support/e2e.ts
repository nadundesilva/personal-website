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
import "cypress-real-events";

import "./commands";
import {
    assertNoResidualConsoleErrors,
    handleUncaughtException,
    patchConsoleError,
    resetConsoleGuard,
} from "./console-guard";

// Fail any test that logs a console error or hits an uncaught exception.
// See cypress/support/console-guard.ts for the mechanism.
beforeEach(() => {
    resetConsoleGuard();
});

afterEach(() => {
    assertNoResidualConsoleErrors();
});

Cypress.on("window:before:load", (win) => {
    // motion/react's whileInView relies on IntersectionObserver to trigger
    // scroll-reveal animations. In Cypress's headless environment the observer
    // doesn't reliably fire for programmatic scrolling (cy.scrollTo,
    // element.scrollIntoView), leaving ScrollReveal wrappers permanently at
    // opacity: 0. This stub immediately reports every observed element as
    // intersecting so whileInView animations play as soon as the component mounts.
    win.IntersectionObserver = class MockIntersectionObserver {
        private readonly _callback: IntersectionObserverCallback;
        root: Element | Document | null = null;
        rootMargin = "";
        thresholds: ReadonlyArray<number> = [0];

        constructor(callback: IntersectionObserverCallback) {
            this._callback = callback;
        }

        observe(target: Element): void {
            this._callback(
                [
                    {
                        boundingClientRect: target.getBoundingClientRect(),
                        intersectionRatio: 1,
                        intersectionRect: target.getBoundingClientRect(),
                        isIntersecting: true,
                        rootBounds: null,
                        target,
                        time: performance.now(),
                    } as IntersectionObserverEntry,
                ],
                this as unknown as IntersectionObserver,
            );
        }

        unobserve(): void {}
        disconnect(): void {}
        takeRecords(): IntersectionObserverEntry[] {
            return [];
        }
    } as unknown as typeof IntersectionObserver;

    patchConsoleError(win);
});

Cypress.on("uncaught:exception", handleUncaughtException);
