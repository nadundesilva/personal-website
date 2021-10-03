interface Section {
    name: string,
    testIdPrefix: string,
    hasNavBarButton: boolean
}

describe("Test Home Page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.getByTestId("home-page")
            .childrenByTestId("section-loader")
            .should("not.exist");
        cy.log("Loaded Home page");
    });

    it("validates page load", () => {
        cy.getByTestId("view-cv-button")
            .should("be.visible");
    });

    it("validates sections", () => {
        cy.fixture("sections").then((sections: Section[]) => {
            sections.forEach((section) => {
                if (section.hasNavBarButton) {
                    cy.getByTestId(`${section.testIdPrefix}-nav-button`)
                        .should("be.visible")
                        .click()
                        .wait(3000);
                    cy.getByTestId(`${section.testIdPrefix}-section`)
                        .should("be.visible");
                }
            });
        });
    });
});
