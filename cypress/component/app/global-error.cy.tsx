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
import GlobalErrorPage from "@/app/global-error";
import * as Sentry from "@sentry/nextjs";

const sampleError = new Error("Something broke");

describe("Global error boundary page", () => {
    beforeEach(() => {
        // Next.js renders global-error.tsx as the entire document (it replaces
        // the root layout), so GlobalErrorPage *must* emit <html><body>.
        // cy.mount() puts that inside the harness's <div>, so React's
        // validateDOMNesting fires and React then bails from concurrent to
        // synchronous rendering. Both messages are artifacts of isolated
        // mounting, not defects — the same class of limitation ArticlesGroup.cy.tsx
        // documents for an un-mountable async Server Component.
        cy.allowConsoleError("In HTML, %s cannot be a child of <%s>.");
        cy.allowConsoleError(
            "There was an error during concurrent rendering but React was able to recover",
        );
    });

    afterEach(() => {
        // The default scope is a module-level singleton - undo the fake
        // client installed below so it doesn't leak into other specs.
        Sentry.getCurrentScope().setClient(undefined);
    });

    it("shows a 500 error page to the user", () => {
        cy.mount(<GlobalErrorPage error={sampleError} />);

        cy.contains("500").should("be.visible");
        cy.contains(/internal server error/i).should("be.visible");
    });

    it("reports the error to Sentry", () => {
        const captureException = cy.stub().as("captureException");
        Sentry.getCurrentScope().setClient({
            captureException,
        } as unknown as ReturnType<typeof Sentry.getClient>); // fake client - only the method under test is stubbed

        cy.mount(<GlobalErrorPage error={sampleError} />);

        cy.get("@captureException").should("have.been.calledWith", sampleError);
    });
});
