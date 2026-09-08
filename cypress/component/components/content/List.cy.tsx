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
import List, { AccentedList, ListItem } from "@/components/content/List";

describe("List", () => {
    it("announces its items as a list to screen readers by default", () => {
        cy.mount(
            <List>
                <ListItem>Item one</ListItem>
                <ListItem>Item two</ListItem>
            </List>,
        );

        // Tailwind preflight sets list-style:none globally, which strips VoiceOver's list semantics; role="list" restores them.
        cy.get("ul[role='list']").should("exist");
    });

    it("announces its items as a list even when rendered as an ordered list", () => {
        cy.mount(
            <List component="ol">
                <ListItem>First</ListItem>
                <ListItem>Second</ListItem>
            </List>,
        );

        // Tailwind preflight sets list-style:none globally, which strips VoiceOver's list semantics; role="list" restores them.
        cy.get("ol[role='list']").should("exist");
    });

    it("exposes each child as a distinct list item to screen readers", () => {
        cy.mount(
            <List>
                <ListItem>Alpha</ListItem>
                <ListItem>Beta</ListItem>
                <ListItem>Gamma</ListItem>
            </List>,
        );

        cy.findAllByRole("listitem").should("have.length", 3);
        cy.findByRole("listitem", { name: /alpha/i }).should("not.exist");
        cy.get("li").first().should("have.text", "Alpha");
    });

    it("introduces its items with a navigable heading", () => {
        cy.mount(
            <List heading="My List" headingVariant="h3">
                <ListItem>Item</ListItem>
            </List>,
        );

        cy.findByRole("heading", { level: 3, name: /my list/i }).should(
            "be.visible",
        );
        // The heading must name the list itself, so a screen reader announces
        // "My List, list" rather than an unlabelled list.
        cy.findByRole("list", { name: /my list/i }).should("exist");
    });
});

describe("AccentedList", () => {
    it("introduces its items with a navigable heading", () => {
        cy.mount(
            <AccentedList heading="Key Points" headingVariant="h3">
                <ListItem>First point</ListItem>
                <ListItem>Second point</ListItem>
            </AccentedList>,
        );

        cy.findByRole("heading", { level: 3, name: /key points/i }).should(
            "be.visible",
        );
        cy.findAllByRole("listitem").should("have.length", 2);
        // The heading must name the list itself, so a screen reader announces
        // "Key Points, list" rather than an unlabelled list.
        cy.findByRole("list", { name: /key points/i }).should("exist");
    });

    it("announces its items as a list to screen readers", () => {
        cy.mount(
            <AccentedList heading="Points" headingVariant="h3">
                <ListItem>Point A</ListItem>
            </AccentedList>,
        );

        // Tailwind preflight sets list-style:none globally, which strips VoiceOver's list semantics; role="list" restores them.
        cy.get("ul[role='list']").should("exist");
    });
});
