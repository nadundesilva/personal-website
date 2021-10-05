import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

const testIdSelector = (testId: string) => `[data-testid="${testId}"]`;

Cypress.Commands.add("getByTestId", (testId: string) => cy.get(testIdSelector(testId)));

Cypress.Commands.add("childrenByTestId", { prevSubject: true }, (sub: Cypress.Chainable<Element>, testId: string) => (
    sub.children(testIdSelector(testId))
));
