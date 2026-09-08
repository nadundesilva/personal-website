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
import SkillChip from "@/app/(home)/_content/sections/components/SkillChip";
import SkillUsages from "@/constants/skill-usages";
import Skills, {
    SkillProficiency,
    type SkillDefinition,
} from "@/constants/skills";

// New object references are not in the SkillUsages Map, so both render as
// the non-interactive span path (with the sr-only proficiency text).
const expertSkill: SkillDefinition = {
    name: "TypeScript",
    proficiencyLevel: SkillProficiency.Expert,
};

const intermediateSkill: SkillDefinition = {
    name: "Python",
    proficiencyLevel: SkillProficiency.Intermediate,
};

describe("SkillChip", () => {
    it("shows the skill's name", () => {
        cy.mount(<SkillChip skill={expertSkill} />);

        cy.contains("TypeScript").should("be.visible");
    });

    it("announces the proficiency level to screen readers", () => {
        cy.mount(<SkillChip skill={expertSkill} />);

        cy.get(".sr-only").should("contain.text", "Expert");
    });

    it("shows the skill name and announces a different proficiency level to screen readers", () => {
        cy.mount(<SkillChip skill={intermediateSkill} />);

        cy.contains("Python").should("be.visible");
        // The proficiency level is conveyed visually by styling; the sr-only span makes it available to screen readers.
        cy.get(".sr-only").should("contain.text", "Intermediate");
    });

    it("uses smaller text in its compact form", () => {
        cy.mount(<SkillChip skill={expertSkill} size="sm" />);

        cy.contains("TypeScript")
            .closest("span")
            .should("have.css", "font-size", "10px");
    });

    it("opens details when a skill with recorded usage is activated", () => {
        // Skills.GoLang is used by a real experience entry, so it is present
        // in SkillUsages with a non-empty experiences array - unlike
        // expertSkill/intermediateSkill above, which are new object
        // references SkillUsages has never seen. Only the open path is
        // checked here, to confirm SkillChip wires its button to a working
        // trigger - close-on-Escape and the rest of the interaction matrix
        // are SkillChipPopover's own contract, covered there.
        cy.mount(<SkillChip skill={Skills.GoLang} />);

        cy.findByRole("dialog").should("not.exist");

        cy.findByRole("button", { name: /GoLang/i })
            .focus()
            .trigger("click");
        cy.findByRole("dialog").should("be.visible");
    });

    it("tells the reader which role used a skill with recorded experience", () => {
        cy.mount(<SkillChip skill={Skills.GoLang} />);

        cy.findByRole("button", { name: /GoLang/i })
            .focus()
            .trigger("click");

        // Verifies experiences.map(e => `${e.name} at ${e.institute}`)
        // against every experience SkillUsages itself records for GoLang
        const expectedUsages = SkillUsages.get(Skills.GoLang)!.experiences.map(
            (e) => `${e.name} at ${e.institute}`,
        );
        cy.findByRole("dialog").within(() => {
            cy.findByRole("list", { name: /used as/i })
                .findAllByRole("listitem")
                .should(($items) => {
                    const texts = $items.toArray().map((el) => el.textContent);
                    expect(texts).to.deep.equal(expectedUsages);
                });
        });
    });

    it("does not offer to open details for a skill with no recorded usage", () => {
        cy.mount(<SkillChip skill={expertSkill} />);

        cy.findByRole("button").should("not.exist");
    });

    it("uses smaller text in its compact form for a skill with recorded usage", () => {
        cy.mount(<SkillChip skill={Skills.GoLang} size="sm" />);

        cy.findByRole("button", { name: /GoLang/i }).should(
            "have.css",
            "font-size",
            "10px",
        );
    });
});
