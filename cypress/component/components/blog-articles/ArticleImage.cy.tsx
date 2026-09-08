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
import type { StaticImageData } from "next/image";

import ArticleImage from "@/components/blog-articles/ArticleImage";

const mockImage: StaticImageData = {
    src: "/test-image.jpg",
    width: 1200,
    height: 630,
};

const creator = {
    name: "Jane Doe",
    href: "https://example.com/janedoe",
    platform: {
        name: "Unsplash",
        href: "https://unsplash.com",
    },
};

describe("ArticleImage", () => {
    it("describes the image to screen readers with the caller's alt text", () => {
        cy.mount(<ArticleImage src={mockImage} alt="A scenic mountain view" />);

        cy.findByRole("img", { name: /scenic mountain view/i }).should(
            "be.visible",
        );
    });

    it("shows no photo credit when the photo is uncredited", () => {
        cy.mount(<ArticleImage src={mockImage} alt="Test image" />);

        cy.get("figcaption").should("not.exist");
    });

    it("credits the photo's creator and platform with links when provided", () => {
        cy.mount(
            <ArticleImage src={mockImage} alt="Test image" creator={creator} />,
        );

        cy.get("figcaption").should("contain.text", "Photo by");

        cy.findByRole("link", { name: /jane doe/i })
            .should("have.attr", "href", creator.href)
            .and("have.attr", "target", "_blank")
            .and("have.attr", "rel")
            .and("include", "noopener");

        cy.findByRole("link", { name: /unsplash/i })
            .should("have.attr", "href", creator.platform.href)
            .and("have.attr", "target", "_blank")
            .and("have.attr", "rel")
            .and("include", "noopener");
    });
});
