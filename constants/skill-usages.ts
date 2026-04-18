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

import Certificates, { type Certificate } from "./certificates";
import Experiences, { type Experience } from "./experience";
import { EnterpriseProjects, PersonalProjects, type Project } from "./projects";
import Skills, { type SkillDefinition } from "./skills";

export interface SkillUsage {
    experiences: Experience[];
    projects: Project[];
    certifications: Certificate[];
}

const SkillUsages = new Map<SkillDefinition, SkillUsage>();

Object.values(Skills).forEach((def) => {
    SkillUsages.set(def, {
        experiences: Object.values(Experiences).filter((e) =>
            e.skills.includes(def),
        ),
        projects: [
            ...Object.values(EnterpriseProjects),
            ...Object.values(PersonalProjects),
        ].filter((p) => p.skills.includes(def)),
        certifications: Object.values(Certificates).filter((c) =>
            c.skills.includes(def),
        ),
    });
});

export default SkillUsages;
