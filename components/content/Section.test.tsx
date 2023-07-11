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

import Section from "./Section";

test("renders section with correct content", async () => {
    render(<Section>Test Section content written by Nadun De Silva</Section>);

    await screen.findByText("Test Section content written by Nadun De Silva");
});
