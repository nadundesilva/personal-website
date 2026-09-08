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

import Heading from "@/app/(home)/_content/common/Heading";

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

describe("Heading", () => {
    it("is a navigable section heading", () => {
        cy.mount(<Heading>Skills</Heading>);

        cy.findByRole("heading", { level: 2, name: "Skills" }).should("exist");
    });

    it("can be targeted by URL anchor and labelled by section", () => {
        cy.mount(<Heading id="skills-heading">Skills</Heading>);

        cy.findByRole("heading", { level: 2 }).should(
            "have.attr",
            "id",
            "skills-heading",
        );
    });

    it("keeps the oversized section number out of the accessibility tree", () => {
        cy.mount(<Heading number={3}>Skills</Heading>);

        cy.findByText("03").should("have.attr", "aria-hidden", "true");
    });

    it("shows single-digit section numbers with a leading zero", () => {
        cy.mount(<Heading number={3}>Skills</Heading>);

        cy.findByText("03").should("exist");
    });

    it("shows no section number when the section is unnumbered", () => {
        cy.mount(<Heading>Skills</Heading>);

        cy.get('[aria-hidden="true"]').filter("span").should("not.exist");
    });

    it("fails loudly for a section number beyond two digits", () => {
        // The ErrorBoundary catches the deliberate throw; allow exactly it.
        cy.allowConsoleError(
            "Heading number must be at most 2 digits, but got 100",
        );
        cy.mount(
            <ErrorBoundary>
                <Heading number={100}>Skills</Heading>
            </ErrorBoundary>,
        );

        cy.findByTestId("render-error").should(
            "contain.text",
            "Heading number must be at most 2 digits, but got 100",
        );
    });
});
