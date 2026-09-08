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
import {
    Button,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/shadcn/ui";

function TestPopover() {
    return (
        <Popover>
            <PopoverTrigger render={<Button>Open Popover</Button>} />
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Popover title</PopoverTitle>
                    <PopoverDescription>Popover description</PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    );
}

describe("Popover", () => {
    it("opens when trigger is clicked", () => {
        cy.mount(<TestPopover />);

        cy.findByRole("dialog").should("not.exist");
        cy.findByRole("button", { name: /open popover/i }).click();
        cy.findByRole("dialog").should("be.visible");
        cy.findByText("Popover title").should("be.visible");
        cy.findByText("Popover description").should("be.visible");
    });

    it("closes when Escape key is pressed", () => {
        cy.mount(<TestPopover />);

        cy.findByRole("button", { name: /open popover/i }).click();
        cy.findByRole("dialog").should("be.visible");

        cy.get("body").type("{esc}");
        cy.findByRole("dialog").should("not.exist");
    });

    it("closes when clicking outside the popover", () => {
        cy.mount(
            <div>
                <TestPopover />
                <div data-testid="outside">Outside area</div>
            </div>,
        );

        cy.findByRole("button", { name: /open popover/i }).click();
        cy.findByRole("dialog").should("be.visible");

        cy.findByTestId("outside").click();
        cy.findByRole("dialog").should("not.exist");
    });
});
