/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        childrenByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        matchImageSnapshot(name: string): Chainable<Element>;
    }
}
