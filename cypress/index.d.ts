/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        getByTestId(value: string): Chainable<Element>;
        childrenByTestId(value: string): Chainable<Element>;
        matchImageSnapshot(name: string): Chainable<Element>;
    }
}
