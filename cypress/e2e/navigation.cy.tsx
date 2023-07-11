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

describe("navigation between pages", () => {
    it("validates navigation between pages", () => {
        cy.loadPage("/");

        cy.clickNavLink("experience");
        cy.clickBreadcrumb("home");

        cy.clickNavLink("achievement");
        cy.clickBreadcrumb("home");

        cy.clickNavLink("education");
        cy.findByRole("link", { name: /view certifications/i }).click();
        cy.clickBreadcrumb("education");
        cy.clickBreadcrumb("home");

        cy.clickNavLink("education");
        cy.findByRole("link", { name: /view certifications/i }).click();
        cy.clickBreadcrumb("home");
    });
});
