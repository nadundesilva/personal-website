/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        childrenByTestId(sub: Chainable<JQuery<HTMLElement>>, testId: string): Chainable<JQuery<HTMLElement>>;
        matchImageSnapshot(name: string): Chainable<Element>;
    }
}
