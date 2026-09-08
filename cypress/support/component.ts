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
import "../../app/app.css";

import { mount } from "cypress/react";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import React from "react";

import { TooltipProvider } from "@/shadcn/ui";
import "./commands";
import {
    assertNoResidualConsoleErrors,
    handleUncaughtException,
    patchConsoleError,
    resetConsoleGuard,
} from "./console-guard";

// Fail any component test that logs a console error or hits an uncaught
// exception - parity with the e2e suite. See cypress/support/console-guard.ts.
Cypress.on("uncaught:exception", handleUncaughtException);

beforeEach(() => {
    resetConsoleGuard();
    cy.window({ log: false }).then((win) => {
        patchConsoleError(win);
    });
});

afterEach(() => {
    assertNoResidualConsoleErrors();
});

function AllProviders({ children }: { children: React.ReactNode }) {
    return React.createElement(
        ThemeProvider,
        { attribute: "class", defaultTheme: "light", enableSystem: false },
        React.createElement(
            LazyMotion,
            // strict mirrors app/layout.tsx: throws if any component imports
            // motion.* instead of m.*, which would otherwise pass every
            // component spec here and only fail at runtime in production.
            { features: domAnimation, strict: true },
            React.createElement(
                MotionConfig,
                { reducedMotion: "always" },
                React.createElement(TooltipProvider, null, children),
            ),
        ),
    );
}

Cypress.Commands.add("mount", (component, options) =>
    mount(React.createElement(AllProviders, null, component), options),
);
