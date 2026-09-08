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
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui";

describe("Tooltip", () => {
    it("shows tooltip content on hover and hides on mouse leave", () => {
        cy.mount(
            <Tooltip>
                <TooltipTrigger render={<Button>Hover me</Button>} />
                <TooltipContent>Tooltip text</TooltipContent>
            </Tooltip>,
        );

        cy.findByRole("button", { name: /hover me/i })
            .trigger("pointerenter", { pointerType: "mouse" })
            .trigger("mouseenter");
        cy.findByText("Tooltip text").should("be.visible");

        cy.findByRole("button", { name: /hover me/i })
            .trigger("pointerleave", { pointerType: "mouse" })
            .trigger("mouseleave");
        cy.findByText("Tooltip text").should("not.exist");
    });

    it("shows tooltip content on keyboard focus and hides on blur", () => {
        cy.mount(
            <Tooltip>
                <TooltipTrigger render={<Button>Focus me</Button>} />
                <TooltipContent>Keyboard tooltip</TooltipContent>
            </Tooltip>,
        );

        cy.findByRole("button", { name: /focus me/i }).focus();
        cy.findByText("Keyboard tooltip").should("be.visible");

        cy.findByRole("button", { name: /focus me/i }).blur();
        cy.findByText("Keyboard tooltip").should("not.exist");
    });
});
