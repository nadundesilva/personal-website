Cypress.Commands.add("getByTestId", (testId: string) => cy.get(`[data-testId="${testId}"]`));
