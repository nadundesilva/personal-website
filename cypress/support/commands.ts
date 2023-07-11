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
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("loadPage", (url: string): void => {
    cy.clearLocalStorage();

    const viewportWidth = Cypress.config("viewportWidth");
    const viewportHeight = Cypress.config("viewportHeight");
    cy.viewport(viewportWidth, viewportHeight);
    cy.log(`Changed viewport to ${viewportWidth}x${viewportHeight}`);

    cy.visit(url);
    cy.log(`Loaded ${url} page`);
    window.localStorage.setItem("COLOR_SCHEME", "light");
    cy.findByRole("progressbar").should("not.exist");
});

Cypress.Commands.add("clickNavLink", (name: string): void => {
    cy.findByTestId("app-bar").within(() => {
        const link = cy.findByRole("link", {
            name: new RegExp(name, "i"),
        });
        link.should("exist");
        link.click();
        cy.findByRole("progressbar").should("not.exist");
    });
});

Cypress.Commands.add("clickBreadcrumb", (name: string): void => {
    cy.findByRole("navigation", {
        name: /breadcrumb/i,
    }).within(() => {
        const breadcrumb = cy.findByRole("link", {
            name: new RegExp(name, "i"),
        });
        breadcrumb.should("exist");
        breadcrumb.click();
        cy.findByRole("progressbar").should("not.exist");
    });
});
