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

import Paragraph from "./Paragraph";

test("renders paragraph with correct children", async () => {
    render(<Paragraph>Test Paragraph written by Nadun De Silva</Paragraph>);

    await screen.findByText("Test Paragraph written by Nadun De Silva");
});
