/*
 * Copyright (c) 2022, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { createTheme, ThemeProvider } from "@mui/material";
import { render, screen, waitFor } from "@testing-library/react";

import Logo from "./Logo";

test("renders logo with default height", async () => {
    const { container } = render(
        <ThemeProvider
            theme={createTheme({
                palette: {
                    mode: "light",
                },
            })}
        >
            <Logo
                logo={{
                    src: (mode) =>
                        mode === "light"
                            ? "/test-logo-1/light.png"
                            : "/test-logo-1/dark.png",
                    alt: "Test Logo 1 Alt",
                    width: 142,
                    height: 251,
                }}
            />
        </ThemeProvider>,
    );

    expect(container.querySelector("div.MuiBox-root")).toHaveStyle(
        "height: 3em",
    );
    const image = await screen.findByRole("img", {
        name: /test logo 1 alt/i,
    });
    await waitFor(() => {
        expect(image.getAttribute("src")).toMatch(/\/_next\/image/i);
    });
    expect(image).toHaveAttribute(
        "src",
        "/_next/image?url=%2Ftest-logo-1%2Flight.png&w=3840&q=75",
    );
});

test("renders logo with specific height", async () => {
    const { container } = render(
        <ThemeProvider
            theme={createTheme({
                palette: {
                    mode: "light",
                },
            })}
        >
            <Logo
                height={"4.5em"}
                logo={{
                    src: (mode) =>
                        mode === "light"
                            ? "/test-logo-2/light.png"
                            : "/test-logo-2/dark.png",
                    alt: "Test Logo 2 Alt",
                    width: 144,
                    height: 257,
                }}
            />
        </ThemeProvider>,
    );

    expect(container.querySelector("div.MuiBox-root")).toHaveStyle(
        "height: 4.5em",
    );
    const image = await screen.findByRole("img", {
        name: /test logo 2 alt/i,
    });
    await waitFor(() => {
        expect(image.getAttribute("src")).toMatch(/\/_next\/image/i);
    });
    expect(image).toHaveAttribute(
        "src",
        "/_next/image?url=%2Ftest-logo-2%2Flight.png&w=3840&q=75",
    );
});

test("renders logo with dark theme", async () => {
    render(
        <ThemeProvider
            theme={createTheme({
                palette: {
                    mode: "dark",
                },
            })}
        >
            <Logo
                logo={{
                    src: (mode) =>
                        mode === "light"
                            ? "/test-logo-3/light.png"
                            : "/test-logo-3/dark.png",
                    alt: "Test Logo 3 Alt",
                    width: 149,
                    height: 253,
                }}
            />
        </ThemeProvider>,
    );

    const image = await screen.findByRole("img", {
        name: /test logo 3 alt/i,
    });
    await waitFor(() => {
        expect(image.getAttribute("src")).toMatch(/\/_next\/image/i);
    });
    expect(image).toHaveAttribute(
        "src",
        "/_next/image?url=%2Ftest-logo-3%2Fdark.png&w=3840&q=75",
    );
});
