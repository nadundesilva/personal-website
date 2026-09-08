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
import SkillChipPopover from "@/app/(home)/_content/sections/components/SkillChipPopover";
import { SkillProficiency } from "@/constants/skills";

const defaultProps = {
    name: "TypeScript",
    proficiencyLevel: SkillProficiency.Expert,
    experiences: ["Software Engineer at Acme Corp"],
    projects: ["personal-website"],
    certifications: ["TypeScript Advanced Certification"],
    chipClassName: "px-3 py-1 rounded border",
};

// React maps onPointerEnter → native "pointerover" (not "pointerenter"), and
// onPointerLeave → native "pointerout" (not "pointerleave"). Use the native
// events that React actually registers so the component's handlers fire.
const hoverOpen = () => {
    cy.findByRole("button", { name: /typescript/i }).trigger("pointerover", {
        pointerType: "mouse",
    });
    cy.findByRole("dialog").should("be.visible");
};

describe("SkillChipPopover", () => {
    it("is closed initially", () => {
        cy.mount(
            <SkillChipPopover {...defaultProps}>TypeScript</SkillChipPopover>,
        );

        cy.findByRole("dialog").should("not.exist");
    });

    describe("mouse hover (desktop)", () => {
        it("opens on hover", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            cy.findByRole("button", { name: /typescript/i }).trigger(
                "pointerover",
                { pointerType: "mouse" },
            );
            cy.findByRole("dialog").should("be.visible");
        });

        it("stays open when the mouse moves from the trigger into the popover", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            hoverOpen();

            // Mouse leaves the trigger — schedules a 150 ms close.
            cy.findByRole("button", { name: /typescript/i }).trigger(
                "pointerout",
                { pointerType: "mouse" },
            );
            // Mouse enters the popover before the timer fires — cancels the close.
            // Cypress commands run synchronously in sequence, well within 150 ms.
            cy.findByRole("dialog").trigger("pointerover", {
                pointerType: "mouse",
            });

            // Timer was cancelled; popover must stay open indefinitely.
            cy.findByRole("dialog").should("be.visible");
        });

        it("closes after the mouse leaves the popover content", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            hoverOpen();

            cy.findByRole("dialog").trigger("pointerover", {
                pointerType: "mouse",
            });
            cy.findByRole("dialog").trigger("pointerout", {
                pointerType: "mouse",
            });

            // The 150 ms close timer runs in real time; Cypress retries for 4000 ms.
            cy.findByRole("dialog").should("not.exist");
        });

        it("does not steal focus back to the trigger after a hover-opened popover closes", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            hoverOpen();

            cy.findByRole("dialog").trigger("pointerover", {
                pointerType: "mouse",
            });
            cy.findByRole("dialog").trigger("pointerout", {
                pointerType: "mouse",
            });
            cy.findByRole("dialog").should("not.exist");

            // A mouse user never focused the trigger to begin with; jumping
            // focus there on close would be jarring and unexpected.
            cy.findByRole("button", { name: /typescript/i }).should(
                "not.be.focused",
            );
        });

        it("closes after the mouse leaves the trigger without entering the popover", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            hoverOpen();

            cy.findByRole("button", { name: /typescript/i }).trigger(
                "pointerout",
                { pointerType: "mouse" },
            );

            // The 150 ms close timer runs in real time; Cypress retries for 4000 ms.
            cy.findByRole("dialog").should("not.exist");
        });

        it("does not close when the chip is clicked while hovering", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            hoverOpen();

            // cy.click() fires the full mouse sequence: pointerover → pointerdown →
            // pointerup → click. onPointerDown calls e.preventDefault() (suppressing
            // the click in real browsers), and even if a click fires, handleOpenChange
            // blocks it because isMouseInsideRef is still true.
            cy.findByRole("button", { name: /typescript/i }).click();

            cy.findByRole("dialog").should("be.visible");
        });

        it("does not close when a keyboard-triggered click fires while the mouse is still hovering", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            // Hover opens the popover and sets isMouseInsideRef = true.
            cy.findByRole("button", { name: /typescript/i }).trigger(
                "pointerover",
                { pointerType: "mouse" },
            );
            cy.findByRole("dialog").should("be.visible");

            // Simulates an Enter key press on the trigger (browser turns Enter → click).
            // That click calls onOpenChange(false) (toggle), but handleOpenChange
            // blocks it because isMouseInsideRef is still true.
            cy.findByRole("button", { name: /typescript/i }).trigger("click");

            cy.findByRole("dialog").should("be.visible");
        });

        it("does not close when Escape is pressed while the mouse is still hovering", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            // Hover opens the popover and sets isMouseInsideRef = true.
            cy.findByRole("button", { name: /typescript/i }).trigger(
                "pointerover",
                { pointerType: "mouse" },
            );
            cy.findByRole("dialog").should("be.visible");

            // Escape calls onOpenChange(false), but handleOpenChange blocks it
            // because isMouseInsideRef is still true.
            cy.get("body").type("{esc}");

            cy.findByRole("dialog").should("be.visible");
        });
    });

    describe("touch tap (mobile)", () => {
        it("does not open on touch", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            // Touch fires pointerover with pointerType: "touch"; the hover logic
            // must ignore it (only reacts to pointerType: "mouse").
            cy.findByRole("button", { name: /typescript/i }).trigger(
                "pointerover",
                { pointerType: "touch" },
            );

            cy.findByRole("dialog").should("not.exist");
        });

        it("opens on tap", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            // trigger("click") fires the click that a touch tap generates,
            // bypassing mouse pointer events so isMouseInsideRef stays false.
            cy.findByRole("button", { name: /typescript/i }).trigger("click");

            cy.findByRole("dialog").should("be.visible");
        });

        it("closes on a second tap", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            cy.findByRole("button", { name: /typescript/i }).trigger("click");
            cy.findByRole("dialog").should("be.visible");

            // isMouseInsideRef is false (touch never set it), so
            // handleOpenChange(false) is not blocked and the popover closes.
            cy.findByRole("button", { name: /typescript/i }).trigger("click");

            cy.findByRole("dialog").should("not.exist");
        });

        it("closes when tapping outside the popover", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            cy.findByRole("button", { name: /typescript/i }).trigger("click");
            cy.findByRole("dialog").should("be.visible");

            // isMouseInsideRef is false (touch never set it), so an outside tap
            // calls handleOpenChange(false) unblocked and the popover closes.
            cy.get("body").click(0, 0);

            cy.findByRole("dialog").should("not.exist");
        });

        it("closes with Escape when opened by touch", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            cy.findByRole("button", { name: /typescript/i }).trigger("click");
            cy.findByRole("dialog").should("be.visible");

            cy.get("body").type("{esc}");

            cy.findByRole("dialog").should("not.exist");
        });
    });

    describe("keyboard", () => {
        it("opens when the trigger is activated by keyboard", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            // Focus the trigger then simulate the click that a browser generates
            // when Enter is pressed on a focused <button>.
            cy.findByRole("button", { name: /typescript/i })
                .focus()
                .trigger("click");

            cy.findByRole("dialog").should("be.visible");
        });

        it("closes with Escape key", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );

            cy.findByRole("button", { name: /typescript/i })
                .focus()
                .trigger("click");
            cy.findByRole("dialog").should("be.visible");

            cy.get("body").type("{esc}");

            cy.findByRole("dialog").should("not.exist");
        });
    });

    describe("content sections", () => {
        beforeEach(() => {
            cy.mount(
                <SkillChipPopover {...defaultProps}>
                    TypeScript
                </SkillChipPopover>,
            );
            hoverOpen();
        });

        it("shows the skill name and proficiency level", () => {
            cy.findByRole("dialog").within(() => {
                cy.contains("TypeScript").should("be.visible");
                cy.contains("Expert").should("be.visible");
            });
        });

        it("shows where the skill has been used", () => {
            cy.findByRole("dialog").within(() => {
                cy.contains("Used as").should("be.visible");
                cy.contains("Software Engineer at Acme Corp").should(
                    "be.visible",
                );
            });
        });

        it("shows where the skill has been applied", () => {
            cy.findByRole("dialog").within(() => {
                cy.contains("Applied in").should("be.visible");
                cy.contains("personal-website").should("be.visible");
            });
        });

        it("shows how the skill has been certified", () => {
            cy.findByRole("dialog").within(() => {
                cy.contains("Proven via").should("be.visible");
                cy.contains("TypeScript Advanced Certification").should(
                    "be.visible",
                );
            });
        });
    });

    describe("content sections with only some kinds of usage", () => {
        it("shows only the experience section when there are no projects or certifications", () => {
            cy.mount(
                <SkillChipPopover
                    {...defaultProps}
                    projects={[]}
                    certifications={[]}
                >
                    TypeScript
                </SkillChipPopover>,
            );
            hoverOpen();

            cy.findByRole("dialog").within(() => {
                cy.contains("Used as").should("be.visible");
                cy.contains("Applied in").should("not.exist");
                cy.contains("Proven via").should("not.exist");
                cy.get('[data-slot="separator"]').should("not.exist");
            });
        });

        it("shows only the projects section when there is no experience or certifications", () => {
            cy.mount(
                <SkillChipPopover
                    {...defaultProps}
                    experiences={[]}
                    certifications={[]}
                >
                    TypeScript
                </SkillChipPopover>,
            );
            hoverOpen();

            cy.findByRole("dialog").within(() => {
                cy.contains("Used as").should("not.exist");
                cy.contains("Applied in").should("be.visible");
                cy.contains("Proven via").should("not.exist");
                cy.get('[data-slot="separator"]').should("not.exist");
            });
        });

        it("shows only the certifications section when there is no experience or projects", () => {
            cy.mount(
                <SkillChipPopover
                    {...defaultProps}
                    experiences={[]}
                    projects={[]}
                >
                    TypeScript
                </SkillChipPopover>,
            );
            hoverOpen();

            cy.findByRole("dialog").within(() => {
                cy.contains("Used as").should("not.exist");
                cy.contains("Applied in").should("not.exist");
                cy.contains("Proven via").should("be.visible");
                cy.get('[data-slot="separator"]').should("not.exist");
            });
        });

        it("separates the experience and certifications sections when there are no projects between them", () => {
            cy.mount(
                <SkillChipPopover {...defaultProps} projects={[]}>
                    TypeScript
                </SkillChipPopover>,
            );
            hoverOpen();

            cy.findByRole("dialog").within(() => {
                cy.contains("Used as").should("be.visible");
                cy.contains("Applied in").should("not.exist");
                cy.contains("Proven via").should("be.visible");
                cy.get('[data-slot="separator"]').should("have.length", 1);
            });
        });
    });
});
