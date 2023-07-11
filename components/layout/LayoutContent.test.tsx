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

import LayoutContent from "./LayoutContent";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

afterEach(() => {
    jest.resetAllMocks();
});

afterAll(() => {
    jest.resetModules();
});

test("renders layout content with correct content", async () => {
    render(
        <LayoutContent>
            Test Layout content written by Nadun De Silva
        </LayoutContent>,
    );

    await screen.findByRole("navigation", {
        name: /breadcrumb/i,
    });

    await screen.findByText("Test Layout content written by Nadun De Silva");
});
