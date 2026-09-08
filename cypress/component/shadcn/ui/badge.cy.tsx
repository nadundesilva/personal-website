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
import { Badge } from "@/shadcn/ui";

describe("Badge", () => {
    it("shows the label text", () => {
        cy.mount(<Badge>Engineering</Badge>);

        cy.contains("Engineering").should("be.visible");
    });

    it("stands out as a filled label by default", () => {
        cy.mount(<Badge>Default</Badge>);

        cy.contains("Default")
            .should("be.visible")
            .and("have.class", "bg-primary");
    });

    it("recedes to an outlined label", () => {
        cy.mount(<Badge variant="outline">Outline</Badge>);

        cy.contains("Outline")
            .should("be.visible")
            .and("have.class", "border-border")
            .and("have.class", "text-foreground");
    });

    it("can act as a link", () => {
        cy.mount(<Badge render={<a href="/test" />}>Link Badge</Badge>);

        cy.findByRole("link", { name: /link badge/i }).should("be.visible");
    });
});
