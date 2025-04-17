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
import "@testing-library/cypress/add-commands";
import { WebsiteHome } from "@/constants/routes";

Cypress.Commands.add("loadPage", (url: string): void => {
    const viewportWidth = Cypress.config("viewportWidth");
    const viewportHeight = Cypress.config("viewportHeight");
    cy.viewport(viewportWidth, viewportHeight);
    cy.log(`Changed viewport to ${viewportWidth}x${viewportHeight}`);

    cy.visit(url);
    cy.scrollTo(0, 0, { duration: 1000 });
    cy.log(`Loaded ${url} page`);
    window.localStorage.setItem("COLOR_SCHEME", "light");

    if (url !== WebsiteHome.path) {
        cy.wait(1000);
        cy.findAllByRole("progressbar").should("not.exist");
    }
});

Cypress.Commands.add("clickNavLink", (name: string): void => {
    cy.findByTestId("app-bar")
        .should("be.visible")
        .within(() => {
            cy.findByRole("link", {
                name: new RegExp(name, "i"),
            })
                .as("navlink")
                .should("be.visible");
            cy.get("@navlink").click({ waitForAnimations: true });
        });

    cy.wait(1000);
    cy.findAllByRole("progressbar").should("not.exist");
});

Cypress.Commands.add("clickBreadcrumb", (name: string): void => {
    cy.findByRole("navigation", {
        name: /breadcrumb/i,
    })
        .should("be.visible")
        .within(() => {
            cy.findByRole("link", {
                name: new RegExp(name, "i"),
            })
                .as("breadcrumb")
                .should("be.visible");
            cy.scrollTo(0, 0, { duration: 1000 });
            cy.get("@breadcrumb").click({ waitForAnimations: true });
        });

    if (name !== WebsiteHome.name) {
        cy.wait(1000);
        cy.findAllByRole("progressbar").should("not.exist");
    }
});
