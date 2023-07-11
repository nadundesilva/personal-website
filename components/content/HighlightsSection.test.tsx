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
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import { render, screen } from "@testing-library/react";

import HighlightsSection from "./HighlightsSection";

test("renders highlights section", async () => {
    render(
        <HighlightsSection>
            <li>Highlight 01</li>
            <li>Highlight 02</li>
            <li>Highlight 03</li>
        </HighlightsSection>,
    );

    await screen.findByText("Highlight 01");
    await screen.findByText("Highlight 02");
    await screen.findByText("Highlight 03");
});
