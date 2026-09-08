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
import React from "react";

import ProgressFab from "@/components/primitives/ProgressFab";

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { error: Error | null }
> {
    state = { error: null };

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            return (
                <div data-testid="render-error">
                    {(this.state.error as Error).message}
                </div>
            );
        }
        return this.props.children;
    }
}

describe("ProgressFab", () => {
    it("exposes the given progress percentage to screen readers", () => {
        cy.mount(<ProgressFab progress={42} />);

        cy.findByRole("progressbar", { name: /reading progress/i })
            .should("be.visible")
            .and("have.attr", "aria-valuenow", "42");
    });

    it("shows percentage text when progress is below 100", () => {
        cy.mount(<ProgressFab progress={37} />);

        cy.contains("37%").should("be.visible");
    });

    it("celebrates completion instead of showing a percentage", () => {
        cy.mount(<ProgressFab progress={100} isDone={true} />);

        cy.contains("100%").should("not.be.visible");
        cy.get("svg.lucide-sparkles").should("have.css", "opacity", "1");
    });

    it("keeps the celebration icon hidden while progress is still in flight", () => {
        cy.mount(<ProgressFab progress={37} />);

        cy.get("svg.lucide-sparkles").should("have.css", "opacity", "0");
    });

    it("hides the percentage once progress reaches 100, even without isDone being set", () => {
        cy.mount(<ProgressFab progress={100} />);

        cy.contains("100%").should("not.be.visible");
    });

    it("still shows 100% when the caller says reading is not finished", () => {
        cy.mount(<ProgressFab progress={100} isDone={false} />);

        cy.contains("100%").should("be.visible");
    });

    it("reports whole-number progress to sighted and screen-reader users alike", () => {
        cy.mount(<ProgressFab progress={42.7} />);

        cy.findByRole("progressbar", { name: /reading progress/i }).should(
            "have.attr",
            "aria-valuenow",
            "43",
        );
        cy.contains("43%").should("be.visible");
    });

    it("throws when progress is below 0", () => {
        // The ErrorBoundary catches the deliberate throw; allow exactly it.
        cy.allowConsoleError("ProgressFab: progress must be between 0 and 100");
        cy.mount(
            <ErrorBoundary>
                <ProgressFab progress={-1} />
            </ErrorBoundary>,
        );

        cy.findByTestId("render-error").should(
            "contain.text",
            "progress must be between 0 and 100",
        );
    });

    it("throws when progress is above 100", () => {
        cy.allowConsoleError("ProgressFab: progress must be between 0 and 100");
        cy.mount(
            <ErrorBoundary>
                <ProgressFab progress={101} />
            </ErrorBoundary>,
        );

        cy.findByTestId("render-error").should(
            "contain.text",
            "progress must be between 0 and 100",
        );
    });

    it("does not throw at the minimum valid progress", () => {
        cy.mount(
            <ErrorBoundary>
                <ProgressFab progress={0} />
            </ErrorBoundary>,
        );

        cy.findByTestId("render-error").should("not.exist");
        cy.contains("0%").should("be.visible");
    });

    it("does not throw at the maximum valid progress", () => {
        cy.mount(
            <ErrorBoundary>
                <ProgressFab progress={100} />
            </ErrorBoundary>,
        );

        cy.findByTestId("render-error").should("not.exist");
    });

    it("draws the progress ring further round as progress increases", () => {
        cy.mount(<ProgressFab progress={25} />);
        cy.findByTestId("progress-ring")
            .invoke("attr", "stroke-dashoffset")
            .then((value) => parseFloat(value ?? ""))
            .as("offsetAt25");

        cy.mount(<ProgressFab progress={75} />);
        cy.findByTestId("progress-ring")
            .invoke("attr", "stroke-dashoffset")
            .then((value) => parseFloat(value ?? ""))
            .then(function (offsetAt75) {
                // A smaller offset means more of the ring's circumference is drawn.
                expect(offsetAt75).to.be.lessThan(this.offsetAt25);
            });
    });
});
