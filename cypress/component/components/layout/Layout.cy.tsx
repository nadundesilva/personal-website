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
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

import Layout from "@/components/layout/Layout";
import { WebsiteHome } from "@/constants/routes";

const mountAtPath = (pathname: string): void => {
    cy.mount(
        <PathnameContext.Provider value={pathname}>
            <Layout topLevelRoutes={WebsiteHome.subRoutes}>
                <p>Page content</p>
            </Layout>
        </PathnameContext.Provider>,
    );
};

describe("theme toggle", () => {
    it("names the toggle after the theme it will switch to", () => {
        mountAtPath("/");

        cy.findByRole("button", { name: /switch to dark theme/i }).should(
            "exist",
        );
    });
});

describe("responsive navigation", () => {
    // The e2e suite runs at a single 1280px viewport (see AGENTS.md §9) and so
    // never checks that only one of the two nav systems shows at a time. A
    // broken breakpoint would render both the desktop bar and the mobile menu
    // button together with a green suite.
    // Plain attribute selectors, not findByRole: whichever nav is inactive is
    // display:none and so absent from the accessibility tree query.
    const desktopNav = () => cy.get('nav[aria-label="Primary Navigation"]');
    const menuButton = () =>
        cy.get('button[aria-label="Open navigation menu"]');

    it("shows the horizontal nav bar and hides the menu button on wide viewports", () => {
        cy.viewport(1280, 768);
        mountAtPath("/");

        desktopNav().should("have.css", "display", "flex");
        menuButton().should("have.css", "display", "none");
    });

    it("shows the menu button and hides the horizontal nav bar on narrow viewports", () => {
        cy.viewport(375, 667);
        mountAtPath("/");

        desktopNav().should("have.css", "display", "none");
        menuButton().should("not.have.css", "display", "none");
    });
});

describe("landmark regions", () => {
    // Nothing else in the suite reaches these by role - the skip link and
    // scroll-to-top FAB tests target #main-content by id, and the footer is
    // matched by tag name for its copyright text. A `<main>`/`<footer>`
    // swapped for a `<div>` would pass every one of those while breaking
    // screen-reader landmark navigation.
    it("exposes exactly one main content region", () => {
        cy.viewport(1280, 768);
        mountAtPath("/");

        cy.findAllByRole("main").should("have.length", 1);
    });

    it("exposes the app bar as a banner region", () => {
        cy.viewport(1280, 768);
        mountAtPath("/");

        cy.findByRole("banner").should("exist");
    });

    it("exposes the footer as a content-info region", () => {
        cy.viewport(1280, 768);
        mountAtPath("/");

        cy.findByRole("contentinfo").should("exist");
    });

    it("gives the primary navigation its own accessible name", () => {
        cy.viewport(1280, 768);
        mountAtPath("/");

        cy.findByRole("navigation", { name: "Primary Navigation" }).should(
            "exist",
        );
    });
});

describe("active route matching", () => {
    it("does not mark a section active when the path merely shares its prefix", () => {
        // Regression pin, not a live bug today: the `+ "/"` in
        // Layout's isRouteActive already guards this correctly, and no real
        // route can produce a sibling-prefix path like this to exercise it.
        mountAtPath("/projects-archive");

        cy.findByRole("navigation", { name: /primary navigation/i })
            .findByRole("link", { name: "Projects" })
            .should("not.have.attr", "aria-current");
    });
});
