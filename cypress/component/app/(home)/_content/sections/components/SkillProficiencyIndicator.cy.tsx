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
import SkillProficiencyIndicator from "@/app/(home)/_content/sections/components/SkillProficiencyIndicator";
import { SkillProficiency } from "@/constants/skill-categories";

describe("SkillProficiencyIndicator", () => {
    it("is hidden from screen readers as a purely visual indicator", () => {
        cy.mount(
            <SkillProficiencyIndicator
                proficiencyLevel={SkillProficiency.Expert}
            />,
        );

        // The indicator is a visual-only bar chart; conveying level to screen readers
        // is the responsibility of the sr-only text in the parent chip.
        cy.findByTestId("skill-proficiency-indicator").should(
            "have.attr",
            "aria-hidden",
            "true",
        );
    });

    it("shows proficiency on a three-level scale", () => {
        cy.mount(
            <SkillProficiencyIndicator
                proficiencyLevel={SkillProficiency.Novice}
            />,
        );

        cy.findAllByTestId("skill-proficiency-bar").should("have.length", 3);
    });

    it("fills more bars for higher proficiency levels", () => {
        const filledBars = () =>
            cy
                .findAllByTestId("skill-proficiency-bar")
                .filter('[data-test-filled="true"]');

        cy.mount(
            <SkillProficiencyIndicator
                proficiencyLevel={SkillProficiency.Novice}
            />,
        );
        filledBars().should("have.length", 1);

        cy.mount(
            <SkillProficiencyIndicator
                proficiencyLevel={SkillProficiency.Intermediate}
            />,
        );
        filledBars().should("have.length", 2);

        cy.mount(
            <SkillProficiencyIndicator
                proficiencyLevel={SkillProficiency.Expert}
            />,
        );
        filledBars().should("have.length", 3);
    });

    // Decorative: SkillChip.tsx always passes animate (SkillChip.tsx:67,77),
    // so the bars staggering in on entrance is what every visitor actually
    // sees, even though it's a purely visual flourish.
    it("staggers each bar's entrance animation so they rise in sequence", () => {
        cy.mount(
            <SkillProficiencyIndicator
                proficiencyLevel={SkillProficiency.Expert}
                animate
            />,
        );

        cy.findAllByTestId("skill-proficiency-bar").should(($bars) => {
            const delays = $bars.toArray().map((el) => el.style.animationDelay);
            expect(delays).to.deep.equal(["0s", "0.1s", "0.2s"]);
        });
    });

    it("shrinks in its compact form", () => {
        cy.mount(
            <SkillProficiencyIndicator
                proficiencyLevel={SkillProficiency.Intermediate}
                size="sm"
            />,
        );

        cy.findByTestId("skill-proficiency-indicator").should(
            "have.css",
            "height",
            "8px",
        );
    });
});
