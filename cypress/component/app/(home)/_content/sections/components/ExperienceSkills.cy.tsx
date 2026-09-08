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
import type React from "react";

import ExperienceSkills from "@/app/(home)/_content/sections/components/ExperienceSkills";
import type { SkillChipProps } from "@/app/(home)/_content/sections/components/SkillChip";
import SkillChip from "@/app/(home)/_content/sections/components/SkillChip";
import { SkillProficiency } from "@/constants/skills";

const makeChips = (names: string[]): React.ReactElement<SkillChipProps>[] =>
    names.map((n) => (
        <SkillChip
            key={n}
            skill={{
                name: n,
                proficiencyLevel: SkillProficiency.Expert,
            }}
            size="sm"
        />
    ));

describe("ExperienceSkills", () => {
    it("shows every skill outright when the list is short", () => {
        cy.mount(
            <ExperienceSkills contentAlignment="start">
                {makeChips(["A", "B", "C", "D", "E"])}
            </ExperienceSkills>,
        );

        cy.findAllByRole("listitem").should("have.length", 5);
        cy.findByRole("button").should("not.exist");
    });

    it("visually hides chips beyond the first 5 (while keeping them for screen readers) and offers a 'Show More' button", () => {
        cy.mount(
            <ExperienceSkills contentAlignment="start">
                {makeChips(["A", "B", "C", "D", "E", "F", "G"])}
            </ExperienceSkills>,
        );

        // Chips beyond index 4 are sr-only (visually hidden but in the accessibility tree).
        // The sr-only class is applied to the <li> wrapper, not the chip span.
        cy.contains("F").closest("li").should("have.class", "sr-only");
        cy.contains("G").closest("li").should("have.class", "sr-only");
        cy.findByRole("button", { name: /more/i })
            .should("be.visible")
            .and("have.attr", "aria-expanded", "false");
    });

    it("reveals all chips and changes button to 'Show Less' after clicking 'Show More'", () => {
        cy.mount(
            <ExperienceSkills contentAlignment="start">
                {makeChips(["A", "B", "C", "D", "E", "F", "G"])}
            </ExperienceSkills>,
        );

        cy.findByRole("button", { name: /more/i }).click();

        cy.contains("F").closest("li").should("not.have.class", "sr-only");
        cy.contains("G").closest("li").should("not.have.class", "sr-only");
        cy.findByRole("button", { name: /less/i })
            .should("be.visible")
            .and("have.attr", "aria-expanded", "true");
    });

    it("collapses chips again when 'Show Less' is clicked", () => {
        cy.mount(
            <ExperienceSkills contentAlignment="start">
                {makeChips(["A", "B", "C", "D", "E", "F"])}
            </ExperienceSkills>,
        );

        cy.findByRole("button", { name: /more/i }).click();
        cy.findByRole("button", { name: /less/i }).click();

        cy.contains("F").closest("li").should("have.class", "sr-only");
        cy.findByRole("button", { name: /more/i })
            .should("be.visible")
            .and("have.attr", "aria-expanded", "false");
    });

    // Decorative: Experience.tsx alternates contentAlignment "start"/"end"
    // per card (Experience.tsx:109-111) to mirror the left/right timeline
    // layout, but the alignment itself is a purely visual placement choice.
    it("aligns chips to the opposite edge for right-to-left timeline cards", () => {
        cy.mount(
            <ExperienceSkills contentAlignment="start">
                {makeChips(["A", "B"])}
            </ExperienceSkills>,
        );
        // No alignment utility is applied for "start" - this is the flex
        // container's own initial value, not a class this component sets.
        cy.get('ul[aria-label="Skills used"]')
            .parent()
            .should("have.css", "justify-content", "normal");

        cy.mount(
            <ExperienceSkills contentAlignment="end">
                {makeChips(["A", "B"])}
            </ExperienceSkills>,
        );
        cy.get('ul[aria-label="Skills used"]')
            .parent()
            .should("have.css", "justify-content", "flex-end");
    });

    it("announces the skills as a list to screen readers", () => {
        cy.mount(
            <ExperienceSkills contentAlignment="start">
                {makeChips(["X"])}
            </ExperienceSkills>,
        );

        // VoiceOver in Safari strips list semantics when list-style:none is applied by Tailwind preflight; role="list" restores them.
        cy.get("ul[role='list']").should("exist");
    });
});
