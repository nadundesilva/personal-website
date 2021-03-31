describe("Page Validation Test", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Validates whether page loads", () => {
        cy.get("[data-cy-section=welcome-banner]")
            .should('be.visible')
            .and("contain", "Nadun")
            .and("contain", "De Silva");
    });

    it("Validates all sections", () => {
        cy.fixture("sections.json").then((sections) => {
            sections.forEach((section) => {
                cy.get("[data-cy-section=" + section.name + "]")
                    .scrollIntoView({
                        duration: 1000
                    })
                    .should('be.visible');
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
                    cy.get("[data-cy-nav-item=" + section.name + "]")
                        .should('be.visible')
                        .click();
                    cy.get("[data-cy-section=" + section.name + "]")
                        .should('be.visible');
                    cy.wait(1000);
                    cy.document()
                        .toMatchImageSnapshot({
                            name: "section-" + section.name + "-nav-click-test"
                        });
                });
        });
    });
});
