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
import { Button } from "@/shadcn/ui";

describe("Button", () => {
    it("shows the label text", () => {
        cy.mount(<Button>Click me</Button>);

        cy.findByRole("button", { name: /click me/i }).should("be.visible");
    });

    it("invokes its action when clicked", () => {
        const onClick = cy.stub().as("onClick");
        cy.mount(<Button onClick={onClick}>Click me</Button>);

        cy.findByRole("button", { name: /click me/i }).click();
        cy.get("@onClick").should("have.been.calledOnce");
    });

    it("does not fire onClick when disabled", () => {
        const onClick = cy.stub().as("onClick");
        cy.mount(
            <Button disabled onClick={onClick}>
                Click me
            </Button>,
        );

        const button = cy.findByRole("button", { name: /click me/i });
        button.should("be.disabled");
        button.click({ force: true });
        cy.get("@onClick").should("not.have.been.called");
    });

    it("can receive focus", () => {
        cy.mount(<Button>Press me</Button>);

        cy.findByRole("button", { name: /press me/i })
            .focus()
            .should("be.focused");
    });

    it("shrinks to a compact square for an icon-only button", () => {
        cy.mount(
            <Button size="icon" aria-label="Icon button">
                X
            </Button>,
        );

        cy.findByRole("button", { name: /icon button/i })
            .should("have.css", "width", "32px")
            .and("have.css", "height", "32px");
    });
});
