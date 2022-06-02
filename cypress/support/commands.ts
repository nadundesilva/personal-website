/*
 * Copyright (c) 2021, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
