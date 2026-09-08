/*
 * Nadun De Silva - All Rights Reserved
 *
 * This source code and its associated files are the
 * confidential and proprietary information of Nadun De Silva.
 * Unauthorized reproduction, distribution, or disclosure
 * in any form, in whole or in part, is strictly prohibited
 * except as explicitly provided under a separate license
 * agreement with Nadun De Silva.
 *
 * Website: https://nadundesilva.com
 *
 * © 2026 Nadun De Silva. All rights reserved.
 */
import ErrorPage from "@/app/error";
import * as Sentry from "@sentry/nextjs";

const sampleError = new Error("Something broke");

describe("Error boundary page", () => {
    afterEach(() => {
        // The default scope is a module-level singleton - undo the fake
        // client installed below so it doesn't leak into other specs.
        Sentry.getCurrentScope().setClient(undefined);
    });

    it("tells the user something went wrong and offers a retry", () => {
        const reset = cy.stub().as("reset");
        cy.mount(<ErrorPage error={sampleError} reset={reset} />);

        cy.findByRole("alert").should("exist");
        cy.findByRole("heading", {
            name: /something went wrong/i,
            level: 1,
        }).should("be.visible");
        cy.findByRole("button", { name: /try again/i }).should("be.visible");
    });

    it("lets the user retry after an error", () => {
        const reset = cy.stub().as("reset");
        cy.mount(<ErrorPage error={sampleError} reset={reset} />);

        cy.findByRole("button", { name: /try again/i }).click();

        cy.get("@reset").should("have.been.calledOnce");
    });

    it("reports the error to Sentry", () => {
        const captureException = cy.stub().as("captureException");
        Sentry.getCurrentScope().setClient({
            captureException,
        } as unknown as ReturnType<typeof Sentry.getClient>); // fake client - only the method under test is stubbed

        cy.mount(<ErrorPage error={sampleError} reset={cy.stub()} />);

        cy.get("@captureException").should("have.been.calledWith", sampleError);
    });
});
