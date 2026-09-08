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
import ContentContainer from "@/components/layout/ContentContainer";
import { CONTENT_BREAKPOINTS } from "@/utils/common/image-sizes";

// One representative viewport width per content breakpoint. The image `sizes`
// attribute (utils/common/image-sizes.ts) is computed from CONTENT_BREAKPOINTS
// on the assumption that it always matches this component's actual padding -
// if the two drift apart, images are served at the wrong resolution.
const VIEWPORT_WIDTH_BY_BREAKPOINT: Record<
    keyof typeof CONTENT_BREAKPOINTS,
    number
> = {
    "2xl": 1536,
    "xl": 1280,
    "lg": 1024,
    "md": 768,
    "sm": 640,
    "default": 375,
};

describe("ContentContainer", () => {
    Object.entries(CONTENT_BREAKPOINTS).forEach(([breakpoint, { padding }]) => {
        it(`applies ${padding}px of total horizontal padding at the ${breakpoint} breakpoint`, () => {
            cy.viewport(
                VIEWPORT_WIDTH_BY_BREAKPOINT[
                    breakpoint as keyof typeof CONTENT_BREAKPOINTS
                ],
                768,
            );
            cy.mount(
                <ContentContainer data-testid="content-container">
                    content
                </ContentContainer>,
            );

            cy.findByTestId("content-container").should(($el) => {
                const style = window.getComputedStyle($el[0]);
                const totalPadding =
                    parseFloat(style.paddingLeft) +
                    parseFloat(style.paddingRight);
                expect(totalPadding).to.eq(padding);
            });
        });
    });
});
