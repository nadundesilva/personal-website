import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
    failureThreshold: 0.1,
    failureThresholdType: "percent",
    customDiffConfig: { threshold: 0.1 },
    capture: "viewport"
});

const testIdSelector = (testId: string) => `[data-testid="${testId}"]`;

Cypress.Commands.add("getByTestId", (testId: string) => cy.get(testIdSelector(testId)));

Cypress.Commands.add("childrenByTestId", { prevSubject: "element" }, (sub: JQuery<HTMLElement>, testId: string) => (
    cy.wrap(sub).children(testIdSelector(testId))
));
