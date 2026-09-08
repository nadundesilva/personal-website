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
import Loading from "@/app/loading";

// With `output: "export"` every route is prerendered, so this spinner may
// rarely be seen by a real user.
describe("Loading", () => {
    it("announces a loading state to screen readers", () => {
        cy.mount(<Loading />);

        cy.findByRole("status", { name: /loading/i }).should("exist");
    });
});
