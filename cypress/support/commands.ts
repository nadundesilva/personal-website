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

Cypress.Commands.add("assertVisibleImagesLoaded", (): void => {
    // Only the currently-visible theme variant of a light/dark image pair is
    // checked - its hidden sibling is "display: none" and browsers never
    // fetch a lazy-loaded image that has no layout box. Scrolling each one
    // into view is required (not optional): a pair's counterpart only gains
    // its layout box once the theme switch flips its "hidden"/"block" class,
    // and by then the page may already be scrolled past it, so the browser's
    // native lazy-loading would otherwise never trigger a fetch for it.
    //
    // cy.get("body").then() rather than cy.get("img:visible") directly:
    // some routes legitimately have no images at all, and cy.get() fails
    // the test when nothing matches instead of vacuously passing.
    cy.get("body").then(($body) => {
        if ($body.find("img:visible").length === 0) return;

        cy.get("img:visible").each(($img) => {
            cy.wrap($img).scrollIntoView();

            // Waits on the browser actually starting the fetch, not a fixed
            // guess at how long that takes: Cypress's .should() retries this
            // assertion on its own timer until currentSrc is set, so the
            // wait is exactly as long as needed - no shorter (which would
            // under-wait on a slower runner) and no longer (which would
            // waste time once the fetch has already started). The retry
            // timer doesn't run continuous rendering work, so it doesn't
            // compete with the image's own decode/paint for main-thread
            // time on constrained runners the way a scroll animation would.
            cy.wrap($img, { timeout: 20000 })
                .should("have.prop", "currentSrc")
                .and("not.equal", "");

            // The 20s timeout is a margin for genuine decode-under-load
            // latency once the fetch has actually started. It must be set
            // on the command directly preceding .should() - it retries that
            // command, not the whole chain.
            cy.wrap($img, { timeout: 20000 })
                .should("have.prop", "complete", true)
                .and("have.prop", "naturalWidth")
                .and("be.greaterThan", 0);
        });
    });
});
