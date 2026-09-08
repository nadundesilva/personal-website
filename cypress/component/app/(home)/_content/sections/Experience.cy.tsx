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
import Experience from "@/app/(home)/_content/sections/Experience";
import Experiences from "@/constants/experience";

describe("Experience", () => {
    beforeEach(() => {
        cy.mount(<Experience />);
    });

    it("lists every job role as an item in the experience timeline", () => {
        cy.findByRole("list", { name: /experience timeline/i })
            .find("> li")
            .should("have.length", Object.keys(Experiences).length)
            .then(($items) => {
                const itemTexts = $items
                    .toArray()
                    .map((el) => el.textContent ?? "");

                // Role titles repeat across employers, so an entry is only
                // accounted for when one item carries both its title and its
                // institute — a matching count alone would still pass if one
                // role were rendered twice and another dropped.
                for (const experience of Object.values(Experiences)) {
                    void expect(
                        itemTexts.some(
                            (text) =>
                                text.includes(experience.name) &&
                                text.includes(experience.institute),
                        ),
                        `no timeline item for "${experience.name}" at "${experience.institute}"`,
                    ).to.be.true;
                }
            });
    });

    it("exposes each role's employment period in machine-readable form for crawlers and assistive tech", () => {
        // Every entry in constants/experience currently ends in a dated Date
        // or in "Now" (never left undated some other way), so there is
        // always at least one <time> with a real ISO dateTime and — for
        // ongoing roles — a plain "Now" span with none.
        cy.get("time").should("have.length.at.least", 1);
        cy.get("time").each(($time) => {
            const dateTime = $time.attr("datetime");
            expect(dateTime).to.match(/^\d{4}(-\d{2})?$/);
        });
    });

    it("tells screen readers what each employment-period and company line means", () => {
        cy.get(".sr-only").should("contain.text", "Employment period:");
        cy.get(".sr-only").should("contain.text", "Company:");
    });

    // Decorative: Experience.tsx alternates each card between the left and
    // right side of the desktop timeline (Experience.tsx:32,136-183) purely
    // as a visual zig-zag; the underlying content is identical either way.
    it("alternates card placement side to side down the desktop timeline", () => {
        const [first, second] = Object.values(Experiences);

        const sideOfName = (name: string) =>
            cy
                .findByRole("list", { name: /experience timeline/i })
                .find("> li")
                .filter((_, el) => (el.textContent ?? "").includes(name))
                .first()
                .within(() => {
                    cy.contains(name)
                        .filter(":visible")
                        .first()
                        .then(($name) => {
                            cy.root().then(($li) => {
                                const nameMid =
                                    $name[0].getBoundingClientRect().left +
                                    $name[0].getBoundingClientRect().width / 2;
                                const liRect = $li[0].getBoundingClientRect();
                                const liMid = liRect.left + liRect.width / 2;
                                cy.wrap(nameMid > liMid).as("isRightOfCentre");
                            });
                        });
                });

        sideOfName(first.name);
        cy.get("@isRightOfCentre").should("eq", true); // index 0 is even → right

        sideOfName(second.name);
        cy.get("@isRightOfCentre").should("eq", false); // index 1 is odd → left
    });

    it("offers a 'Show More' toggle for a real role with more than 5 skills, and reveals the rest on click", () => {
        // ExperienceSkills (tested in isolation with fixtures) collapses
        // past 5 chips - this pins that a real role's skill list actually
        // triggers that behaviour.
        const experienceWithManySkills = Object.values(Experiences).find(
            (experience) => experience.skills.length > 5,
        );
        void expect(
            experienceWithManySkills,
            "expected at least one experience entry with more than 5 skills to exercise this",
        ).to.exist;
        const experience = experienceWithManySkills!;
        const hiddenSkill = experience.skills[5];

        // Role titles repeat across employers (see the timeline-items test
        // above), so the containing <li> is found by name + institute together.
        cy.findByRole("list", { name: /experience timeline/i })
            .find("> li")
            .filter((_, el) => {
                const text = el.textContent ?? "";
                return (
                    text.includes(experience.name) &&
                    text.includes(experience.institute)
                );
            })
            .first()
            .within(() => {
                cy.contains(hiddenSkill.name)
                    .closest("li")
                    .should("have.class", "sr-only");
                cy.findByRole("button", { name: /more/i }).click();
                cy.contains(hiddenSkill.name)
                    .closest("li")
                    .should("not.have.class", "sr-only");
            });
    });
});
