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
import { Star } from "lucide-react";

import PrimaryTintedIcon from "@/components/primitives/PrimaryTintedIcon";

describe("PrimaryTintedIcon", () => {
    it("shows the icon it is given", () => {
        cy.mount(<PrimaryTintedIcon icon={Star} />);

        // Lucide tags each icon's svg with a name-derived class (lucide-star for Star);
        // this confirms the passed icon rendered, not just any svg.
        cy.get("svg.lucide-star").should("exist");
    });

    it("hides the decorative icon from screen readers", () => {
        cy.mount(<PrimaryTintedIcon icon={Star} />);

        cy.get("svg").should("have.attr", "aria-hidden", "true");
    });
});
