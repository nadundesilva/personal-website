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
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui";

describe("Card", () => {
    it("shows the title, description and body it is given", () => {
        cy.mount(
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description text</CardDescription>
                </CardHeader>
                <CardContent>Card body content</CardContent>
            </Card>,
        );

        cy.contains("Card Title").should("be.visible");
        cy.contains("Card description text").should("be.visible");
        cy.contains("Card body content").should("be.visible");
    });
});
