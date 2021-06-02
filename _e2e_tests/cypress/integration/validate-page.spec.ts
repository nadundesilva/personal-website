const path = require("path");

describe("Page Validation Test", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Validates whether page loads", () => {
        cy.get("[data-cy-section=welcome-banner]")
            .should("be.visible")
            .and("contain", "Nadun")
            .and("contain", "De Silva");
    });

    it("Validates all sections", () => {
        cy.fixture("sections.json").then((sections) => {
            sections.forEach((section) => {
                cy.wait(1000);
                cy.get("[data-cy-section=" + section.name + "]")
                    .scrollIntoView({
                        duration: 1000
                    })
                    .should("be.visible");
                cy.wait(1000);
                cy.document()
                    .toMatchImageSnapshot({
                        name: "section-" + section.name + "-scroll-test"
                    });
            });
        });
    });

    it("Validate nav item click", () => {
        cy.fixture("sections.json").then((sections) => {
            sections.filter((section) => section.hasNavBarItem)
                .forEach((section) => {
                    cy.wait(1000);
                    cy.get("[data-cy-nav-item=" + section.name + "]")
                        .should("be.visible")
                        .click();
                    cy.get("[data-cy-section=" + section.name + "]")
                        .should("be.visible");
                    cy.wait(1000);
                    cy.document()
                        .toMatchImageSnapshot({
                            name: "section-" + section.name + "-nav-click-test"
                        });
                });
        });
    });

    it("Validate PDF Download", () => {
        cy.get("[data-cy-section=welcome-banner]")
            .should("be.visible")
            .and("contain", "Nadun")
            .and("contain", "De Silva");
        cy.get("[data-cy-button=download-cv]")
            .should("be.visible")
            .and("contain", "Download CV")
            .click();

        const downloadsFolder = Cypress.config("downloadsFolder");
        cy.readFile(path.join(downloadsFolder, "nadundesilva-cv.pdf")).should("exist");
    });
});
