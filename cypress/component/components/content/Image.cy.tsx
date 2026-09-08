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

import Image from "@/components/content/Image";

const mockImage: StaticImageData = {
    src: "/test-image.jpg",
    width: 800,
    height: 450,
};

describe("Image", () => {
    it("describes the image to screen readers with the caller's alt text", () => {
        cy.mount(<Image src={mockImage} alt="A descriptive caption" />);

        cy.get("img").should("have.attr", "alt", "A descriptive caption");
    });

    it("lets text wrap down its right side", () => {
        cy.mount(<Image src={mockImage} alt="" float="left" />);

        cy.get("img").parent().should("have.css", "float", "left");
    });

    it("lets text wrap down its left side", () => {
        cy.mount(<Image src={mockImage} alt="" float="right" />);

        cy.get("img").parent().should("have.css", "float", "right");
    });

    it("stays in the normal text flow by default", () => {
        cy.mount(<Image src={mockImage} alt="" />);

        cy.get("img").parent().should("have.css", "float", "none");
    });

    it("fills and crops to its container when fill is set", () => {
        cy.mount(<Image src={mockImage} alt="" fill />);

        cy.get("img").parent().should("have.css", "position", "relative");
        cy.get("img").should("have.css", "object-fit", "cover");
    });

    it("loads high-priority images eagerly", () => {
        cy.mount(<Image src={mockImage} alt="" fetchPriority="high" />);

        cy.get("img").should("have.attr", "loading", "eager");
    });

    it("fetches at the width the caller asks for", () => {
        cy.mount(<Image src={mockImage} alt="" sizes="100vw" />);

        cy.get("img").should("have.attr", "sizes", "100vw");
    });

    it("gives the browser a responsive sizes hint even when the caller doesn't specify one", () => {
        cy.mount(<Image src={mockImage} alt="" />);

        cy.get("img").should("have.attr", "sizes").and("not.be.empty");
    });

    it("gives a floated image a narrower sizes hint than a full-width one", () => {
        // The sizes attribute is a comma-separated list of clauses, each either
        // "(min-width: Npx) calc(Xvw - Ypx)" or a bare unconditional fallback -
        // evaluate the first clause whose min-width the viewport satisfies, the
        // same rule a browser applies, so this compares actual pixel widths
        // rather than the two strings being non-identical.
        const evaluateSizesAtViewport = (
            sizes: string,
            viewportWidth: number,
        ): number => {
            for (const clause of sizes.split(", ")) {
                const conditioned = clause.match(
                    /^\(min-width:\s*(\d+)px\)\s*(.+)$/,
                );
                const [minWidth, value] = conditioned
                    ? [parseInt(conditioned[1], 10), conditioned[2]]
                    : [0, clause];
                if (viewportWidth < minWidth) continue;

                const calc = value.match(
                    /^calc\((\d+(?:\.\d+)?)vw - (\d+(?:\.\d+)?)px\)$/,
                );
                if (calc) {
                    return (
                        (parseFloat(calc[1]) / 100) * viewportWidth -
                        parseFloat(calc[2])
                    );
                }
                return parseFloat(value);
            }
            throw new Error(
                `No sizes clause matched viewport ${viewportWidth}`,
            );
        };

        cy.window().then((win) => {
            const viewportWidth = win.innerWidth;

            cy.mount(<Image src={mockImage} alt="" />);
            cy.get("img")
                .invoke("attr", "sizes")
                .then((fullWidthSizes) => {
                    const fullWidthPx = evaluateSizesAtViewport(
                        fullWidthSizes as unknown as string,
                        viewportWidth,
                    );

                    cy.mount(<Image src={mockImage} alt="" float="left" />);
                    cy.get("img")
                        .invoke("attr", "sizes")
                        .then((floatSizes) => {
                            const floatPx = evaluateSizesAtViewport(
                                floatSizes as unknown as string,
                                viewportWidth,
                            );
                            expect(floatPx).to.be.lessThan(fullWidthPx);
                        });
                });
        });
    });
});
