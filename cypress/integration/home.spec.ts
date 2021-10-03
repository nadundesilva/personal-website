describe("Test Home Page", () => {
    it("validates page", () => {
        cy.visit("/");
        cy.getByTestId("view-cv-button").should("be.visible");
    });
});
