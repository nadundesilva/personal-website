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
import WebVitals from "@/components/WebVitals";

interface ZarazWindow extends Window {
    zaraz?: {
        track: (eventName: string, data?: Record<string, unknown>) => void;
        queue: (eventName: string, data?: Record<string, unknown>) => void;
    };
}

describe("WebVitals", () => {
    // This is the branch every visitor with an ad/tracker blocker (or a CSP
    // that drops the Zaraz script) actually takes - it must not throw trying
    // to reach window.zaraz.
    it("does nothing when the analytics collector is unavailable", () => {
        cy.mount(<WebVitals />);

        cy.window().then((win) => {
            void expect((win as ZarazWindow).zaraz).to.be.undefined;
        });
    });

    // The CLS x1000 scaling (WebVitals.tsx) and the general metric shape are
    // covered end-to-end in cypress/e2e/analytics.cy.tsx instead: a real page
    // load is required for next/web-vitals' PerformanceObserver-based CLS
    // flush to fire reliably - it did not fire inside a bare cy.mount() AUT.
});
