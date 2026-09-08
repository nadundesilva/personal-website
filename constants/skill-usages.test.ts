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
import { describe, expect, it } from "@jest/globals";

import Certificates from "@/constants/certificates";
import Experiences from "@/constants/experience";
import { EnterpriseProjects, PersonalProjects } from "@/constants/projects";
import SkillUsages from "@/constants/skill-usages";
import Skills from "@/constants/skills";

const allExperiences = Object.values(Experiences);
const allProjects = [
    ...Object.values(EnterpriseProjects),
    ...Object.values(PersonalProjects),
];
const allCertifications = Object.values(Certificates);

describe("SkillUsages", () => {
    it("records usage for every skill referenced by an experience, project or certification", () => {
        // SkillUsages is keyed by object identity (Object.values(Skills).filter(...)),
        // so a skill reference that isn't one of the shared Skills entries (e.g. an
        // inline clone) would silently disappear from a usage popover instead of
        // failing loudly - this pins that every referenced skill resolves.
        const referencedSkills = [
            ...Object.values(Experiences),
            ...Object.values(EnterpriseProjects),
            ...Object.values(PersonalProjects),
            ...Object.values(Certificates),
        ].flatMap((entry) => entry.skills);

        const unresolved = referencedSkills
            .filter((skill) => !SkillUsages.has(skill))
            .map((skill) => skill.name);

        expect(unresolved).toEqual([]);
    });

    it("attributes each skill's usages to the source they actually came from", () => {
        for (const usage of SkillUsages.values()) {
            expect(allExperiences).toEqual(
                expect.arrayContaining(usage.experiences),
            );
            expect(allProjects).toEqual(expect.arrayContaining(usage.projects));
            expect(allCertifications).toEqual(
                expect.arrayContaining(usage.certifications),
            );
        }
    });

    // The superset check above still passes if the filtering in
    // skill-usages.ts silently returned nothing for every skill, so this
    // independently recomputes the expected usage for every real skill
    // from the same source data and compares exact membership - it stays
    // correct as the site's content changes, unlike pinning to a
    // hand-picked skill/experience/project/certification by name.
    it("attributes each skill's usages to exactly the sources that reference it", () => {
        for (const skill of Object.values(Skills)) {
            const usage = SkillUsages.get(skill);

            expect(usage?.experiences).toEqual(
                allExperiences.filter((e) => e.skills.includes(skill)),
            );
            expect(usage?.projects).toEqual(
                allProjects.filter((p) => p.skills.includes(skill)),
            );
            expect(usage?.certifications).toEqual(
                allCertifications.filter((c) => c.skills.includes(skill)),
            );
        }
    });
});
