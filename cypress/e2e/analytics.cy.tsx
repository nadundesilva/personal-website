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
import { WebsiteHome } from "@/constants/routes";

interface ZarazWindow extends Window {
    zaraz?: {
        track: (eventName: string, data?: Record<string, unknown>) => void;
        queue: (eventName: string, data?: Record<string, unknown>) => void;
    };
}

describe("performance analytics", () => {
    it("reports page performance metrics to the analytics collector", () => {
        cy.loadPage(WebsiteHome.path, {
            onBeforeLoad: (win) => {
                (win as ZarazWindow).zaraz = {
                    track: cy.stub().as("zarazTrack"),
                    queue: cy.stub(),
                };
            },
        });

        // Web Vitals report asynchronously as the browser finishes measuring
        // each metric (FCP/TTFB/LCP arrive within the first couple of
        // seconds; CLS/INP need user interaction or page teardown, so they
        // are not waited for here).
        cy.wait(3000);

        cy.get("@zarazTrack")
            .should("have.been.called")
            .then((stub) => {
                const [eventName, data] = (
                    stub as unknown as {
                        args: [string, Record<string, unknown>][];
                    }
                ).args[0];

                expect(eventName).to.eq("web_vital");
                expect(data).to.include.keys(
                    "name",
                    "value",
                    "id",
                    "delta",
                    "rating",
                );
                expect(data.value, "value is reported as a whole number").to.eq(
                    Math.round(data.value as number),
                );
            });
    });

    // CLS is a unitless score, almost always well under 1 - WebVitals.tsx
    // scales it x1000 before rounding so it survives as a meaningful integer
    // (unscaled, Math.round would flatten every real-world score to 0).
    // The CLS metric only flushes on a document "hidden" visibilitychange
    // (verified against the installed next/web-vitals - there is no pagehide
    // listener), so this test forces that path directly rather than waiting
    // for a real tab switch.
    // Firefox has no LayoutShift API (MDN: api/LayoutShift, firefox support
    // is `false`), so web-vitals can never report a CLS metric there.
    it(
        "reports layout shift at a resolution analytics can distinguish",
        { browser: "!firefox" },
        () => {
            cy.loadPage(WebsiteHome.path, {
                onBeforeLoad: (win) => {
                    (win as ZarazWindow).zaraz = {
                        track: cy.stub().as("zarazTrack"),
                        queue: cy.stub(),
                    };
                },
            });

            // Wait for the page to settle before shifting layout, so the shift
            // isn't absorbed into the browser's initial-render grace period.
            cy.wait(1000);

            cy.window().then((win) => {
                // A modest, input-unattributed shift: real CLS for this lands
                // well under 1, so an unscaled Math.round could only ever
                // produce 0 - see the >= 10 assertion below.
                const shiftedEl = win.document.createElement("div");
                shiftedEl.style.height = "100px";
                win.document.body.prepend(shiftedEl);
            });

            // The layout-shift PerformanceObserver entry is delivered
            // asynchronously after the reflow - give the browser a tick before
            // flushing, or the CLS metric reports a false 0.
            cy.wait(500);

            cy.window().then((win) => {
                // Force the CLS metric to flush by simulating the tab being
                // hidden, since it's otherwise only reported via a real
                // visibilitychange event that Cypress doesn't produce.
                Object.defineProperty(win.document, "visibilityState", {
                    configurable: true,
                    get: () => "hidden",
                });
                win.document.dispatchEvent(new win.Event("visibilitychange"));
            });

            cy.get("@zarazTrack")
                .should("have.been.called")
                .then((stub) => {
                    const calls = (
                        stub as unknown as {
                            args: [string, Record<string, unknown>][];
                        }
                    ).args;
                    const clsCall = calls.find(
                        ([, data]) => data.name === "CLS",
                    );

                    // A missing call here means the shift was never captured
                    // (e.g. the visibilitychange stub didn't fire the reporter)
                    // - not that the x1000 scaling is broken. Check the shift
                    // trigger above first if this fails.
                    void expect(clsCall, "no CLS metric was reported").to.exist;

                    // >= 10 rather than > 1 - a large enough shift can occasionally
                    // push raw CLS above 1, so ">1" wouldn't distinguish scaled
                    // from unscaled. A 100px shift scaled x1000 clears this
                    // comfortably; unscaled it can only round to 0.
                    expect(
                        clsCall![1].value,
                        "CLS value should be scaled, not the raw unitless score",
                    ).to.be.at.least(10);
                });
        },
    );
});
