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
import Skills from "@/app/(home)/_content/sections/Skills";
import { skillProficiencyLevels } from "@/app/(home)/_content/sections/components/SkillProficiencyIndicator";
import Certificates from "@/constants/certificates";
import Experiences from "@/constants/experience";
import { EnterpriseProjects, PersonalProjects } from "@/constants/projects";
import SkillCategories from "@/constants/skill-categories";
import SkillUsages from "@/constants/skill-usages";

describe("Skills", () => {
    beforeEach(() => {
        cy.mount(<Skills />);
    });

    it("is visually hidden until reached by keyboard, then offers a way to skip past the skill list", () => {
        cy.findByRole("link", { name: /skip skills/i })
            .should("have.css", "position", "absolute")
            .and("have.css", "width", "1px");

        cy.findByRole("link", { name: /skip skills/i }).focus();

        cy.findByRole("link", { name: /skip skills/i }).should(
            "have.css",
            "position",
            "static",
        );

        cy.findByRole("link", { name: /skip skills/i })
            .should("have.attr", "href", "#skip-skills-target")
            .then(($link) => {
                const id = $link.attr("href")!.replace("#", "");
                cy.get(`#${id}`).should("have.attr", "tabindex", "-1");
            });
    });

    it("announces its items as a list to screen readers", () => {
        cy.get('ul[role="list"]').should(
            "have.length",
            Object.keys(SkillCategories).length,
        );
    });

    it("labels each skill category's list with its own visible heading", () => {
        for (const skillCategory of Object.values(SkillCategories)) {
            cy.findByRole("heading", {
                name: skillCategory.category,
                level: 3,
            })
                .invoke("attr", "id")
                .then((id) => {
                    void expect(id).to.exist;
                    cy.get(`ul[aria-labelledby="${id}"]`).should("exist");
                });
        }
    });

    it("orders the proficiency legend from least to most proficient", () => {
        const expectedOrder = Object.entries(skillProficiencyLevels)
            .sort(([, a], [, b]) => a.bars - b.bars)
            .map(([level]) => level);

        cy.findByRole("group", { name: /proficiency legend/i })
            .children()
            .then(($children) => {
                // Last child is the "hover, tap, or focus" hint, not a level.
                const renderedLabels = $children
                    .toArray()
                    .slice(0, -1)
                    .map((el) => el.textContent?.trim());
                expect(renderedLabels).to.deep.equal(expectedOrder);
            });
    });

    it("makes a skill interactive only when it has recorded usage, matching SkillUsages", () => {
        // SkillUsages (constants/skill-usages.ts) keys its Map by object
        // identity of each SkillDefinition. If a skill were ever added to
        // SkillCategories via a copy instead of the shared reference from
        // skills.ts, SkillUsages.get would miss it here and the chip would
        // silently render as inert text instead of an openable trigger.
        for (const skillCategory of Object.values(SkillCategories)) {
            for (const skill of skillCategory.skills) {
                const usage = SkillUsages.get(skill);
                const hasUsages =
                    usage !== undefined &&
                    (usage.experiences.length > 0 ||
                        usage.projects.length > 0 ||
                        usage.certifications.length > 0);

                // The trigger's accessible name is "{name} - {level} level."
                // (SkillChipPopover). Anchored to the start so e.g. "Java"
                // never matches the "JavaScript" chip's trigger.
                const exactNamePattern = new RegExp(
                    `^${skill.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} - `,
                    "i",
                );

                if (hasUsages) {
                    cy.findByRole("button", {
                        name: exactNamePattern,
                    }).should("exist");
                } else {
                    cy.findByRole("button", {
                        name: exactNamePattern,
                    }).should("not.exist");
                }
            }
        }
    });

    it("lists every skill used by an experience, project or certification", () => {
        const categorizedSkills = new Set(
            Object.values(SkillCategories).flatMap(
                (skillCategory) => skillCategory.skills,
            ),
        );
        const usedSkills = [
            ...Object.values(Experiences),
            ...Object.values(EnterpriseProjects),
            ...Object.values(PersonalProjects),
            ...Object.values(Certificates),
        ].flatMap((entry) => entry.skills);

        for (const skill of usedSkills) {
            void expect(
                categorizedSkills.has(skill),
                `skill "${skill.name}" is used but missing from SkillCategories`,
            ).to.be.true;
        }
    });
});
