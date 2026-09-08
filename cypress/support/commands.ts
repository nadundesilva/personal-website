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
import { WebsiteHome } from "@/constants/routes";
import "@testing-library/cypress/add-commands";
import { allowConsoleError } from "./console-guard";

Cypress.Commands.add("allowConsoleError", (pattern: RegExp | string): void => {
    allowConsoleError(pattern);
});

Cypress.Commands.add(
    "loadPage",
    (url: string, options?: Partial<Cypress.VisitOptions>): void => {
        const viewportWidth = Cypress.config("viewportWidth");
        const viewportHeight = Cypress.config("viewportHeight");
        cy.viewport(viewportWidth, viewportHeight);
        cy.log(`Changed viewport to ${viewportWidth}x${viewportHeight}`);

        cy.visit(url, {
            ...options,
            onBeforeLoad: (win) => {
                // next-themes reads localStorage.theme during hydration (before React renders).
                // Setting it here (in onBeforeLoad, before any scripts run) forces the
                // ThemeProvider to apply the "light" class to <html> instead of falling back
                // to the system prefers-color-scheme. ThemeProvider is configured with
                // attribute="class" and storageKey="theme" (the default) in app/layout.tsx.
                win.localStorage.setItem("theme", "light");
                options?.onBeforeLoad?.(win);
            },
        });
        cy.scrollTo(0, 0, { duration: 1000, ensureScrollable: false });
        cy.log(`Loaded ${url} page`);

        if (url !== WebsiteHome.path) {
            cy.wait(1000);
            cy.findAllByTestId("route-segment-loading-spinner").should(
                "not.exist",
            );
        }
    },
);

Cypress.Commands.add("clickNavLink", (name: string): void => {
    cy.findByTestId("app-bar")
        .should("be.visible")
        .within(() => {
            cy.findByRole("link", {
                name: new RegExp(`^${name}$`, "i"),
            })
                .as("navlink")
                .should("be.visible");
            cy.get("@navlink").click({ waitForAnimations: true });
        });

    cy.wait(1000);
    cy.findAllByTestId("route-segment-loading-spinner").should("not.exist");
});

Cypress.Commands.add("clickBreadcrumbByName", (name: string): void => {
    cy.findByRole("navigation", {
        name: /breadcrumb/i,
    })
        .should("be.visible")
        .within(() => {
            cy.findByRole("link", {
                name: new RegExp(`^${name}$`, "i"),
            })
                .as("breadcrumb")
                .should("be.visible");
            cy.scrollTo(0, 0, { duration: 1000, ensureScrollable: false });
            cy.get("@breadcrumb").click({ waitForAnimations: true });
        });

    cy.wait(1000);
    if (name !== WebsiteHome.name) {
        cy.findAllByTestId("route-segment-loading-spinner").should("not.exist");
    }
});

Cypress.Commands.add("clickBreadcrumbByHref", (href: string): void => {
    cy.findByRole("navigation", {
        name: /breadcrumb/i,
    })
        .should("be.visible")
        .within(() => {
            cy.get(`a[href="${href}"]`).as("breadcrumb").should("be.visible");
            cy.scrollTo(0, 0, { duration: 1000, ensureScrollable: false });
            cy.get("@breadcrumb").click({ waitForAnimations: true });
        });

    cy.wait(1000);
    cy.findAllByTestId("route-segment-loading-spinner").should("not.exist");
});

Cypress.Commands.add("clickLinkByHref", (href: string): void => {
    cy.get(`a[href="${href}"]`)
        .as("link")
        .scrollIntoView()
        .should("be.visible")
        .click({ waitForAnimations: true });

    cy.wait(1000);
    cy.findAllByTestId("route-segment-loading-spinner").should("not.exist");
});
