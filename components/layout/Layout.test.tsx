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
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

import Layout from "./Layout";
import WebsiteThemeProvider from "./theme";
import { Routes } from "@/constants/routes";

const scrollState = {
    scrolledDown: false,
    setScrolledDown: (scrolledDown: boolean) => {},
};
jest.mock("@mui/material/useScrollTrigger", () => (options?: any): boolean => {
    const [scrolledDown, setScrolledDown] = useState<boolean>(false);
    scrollState.scrolledDown = scrolledDown;
    scrollState.setScrolledDown = setScrolledDown;
    return scrolledDown;
});

jest.mock("@/constants/routes", () => ({
    Routes: {
        "/test-page-1": {
            name: "Test Page 1",
        },
        "/test-page-2": {
            name: "Test Page 2",
            subRoutes: {
                "/test-page-2-a": {
                    name: "Test Page 2 A",
                },
            },
        },
        "/test-page-3": {
            name: "Test Page 3",
            subRoutes: {
                "/test-page-3-a": {
                    name: "Test Page 3 A",
                },
                "/test-page-3-b": {
                    name: "Test Page 3 B",
                    subRoutes: {},
                },
                "/test-page-3-c": {
                    name: "Test Page 3 C",
                    subRoutes: {
                        "/test-page-3-c-i": {
                            name: "Test Page 3 C I",
                        },
                    },
                },
            },
        },
        "/test-page-4": {
            name: "Test Page 4",
        },
    },
}));

type Theme = "light" | "dark";
type ScrollState = "initial" | "scrolled-down" | "top";

interface ValidateResult {
    changeThemeButton: HTMLElement;
    scrollBackToTopButton?: HTMLElement;
}

const validateLayout = async (
    theme: Theme,
    scrollState: ScrollState,
): Promise<ValidateResult> => {
    await screen.findByText("Test Layout children written by Nadun De Silva");
    await screen.findByRole("heading", {
        name: /nadun de silva/i,
    });
    const changeThemeButton = await screen.findByRole("button", {
        name: RegExp(`change to ${theme} theme`, "i"),
    });
    await screen.findByText(/© 2021 nadun de silva/i);

    let scrollBackToTopButton: HTMLElement | undefined;
    if (scrollState !== "initial") {
        scrollBackToTopButton = await screen.findByRole("button", {
            name: /scroll back to top/i,
        });

        if (scrollState === "scrolled-down") {
            expect(scrollBackToTopButton.parentElement).toHaveStyle(
                "transform: none",
            );
        } else if (scrollState === "top") {
            expect(scrollBackToTopButton.parentElement).toHaveStyle(
                "transform: scale(0)",
            );
        }
    }

    return {
        changeThemeButton,
        scrollBackToTopButton,
    };
};

afterEach(() => {
    jest.resetAllMocks();
});

afterAll(() => {
    jest.resetModules();
});

test("render layout without appbar items", async () => {
    render(<Layout>Test Layout children written by Nadun De Silva</Layout>);

    await validateLayout("dark", "initial");
});

const validateLayoutWithScroll = async (): Promise<ValidateResult> => {
    act(() => {
        render(<Layout>Test Layout children written by Nadun De Silva</Layout>);
    });

    await validateLayout("dark", "initial");

    act(() => {
        scrollState.setScrolledDown(true);
    });

    return await validateLayout("dark", "scrolled-down");
};

test("render layout with scrolled down from top", async () => {
    await validateLayoutWithScroll();
});

test("render layout with scroll back to top clicked", async () => {
    const { scrollBackToTopButton } = await validateLayoutWithScroll();

    if (scrollBackToTopButton instanceof HTMLElement) {
        const scrollIntoViewMock = jest.fn();
        scrollIntoViewMock.mockImplementation(() => {
            scrollState.setScrolledDown(false);
        });
        window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

        act(() => {
            fireEvent.click(scrollBackToTopButton);
        });

        expect(scrollIntoViewMock).toBeCalledTimes(1);

        await validateLayout("dark", "top");
    } else {
        throw new Error("scrollBackToTopButton is undefined");
    }
});

test("change theme", async () => {
    render(
        <WebsiteThemeProvider>
            <Layout>Test Layout children written by Nadun De Silva</Layout>
        </WebsiteThemeProvider>,
    );

    let layoutValidation = await validateLayout("dark", "initial");
    fireEvent.click(layoutValidation.changeThemeButton);

    layoutValidation = await validateLayout("light", "initial");
    fireEvent.click(layoutValidation.changeThemeButton);

    await validateLayout("dark", "initial");
});

test("render layout with window function", async () => {
    render(
        <Layout window={() => window}>
            Test Layout children written by Nadun De Silva
        </Layout>,
    );

    await validateLayout("dark", "initial");
});

test("renders navigation panel", async () => {
    render(
        <Layout window={() => window}>
            Test Layout children written by Nadun De Silva
        </Layout>,
    );

    Object.entries(Routes).map(async ([key, value]) => {
        const link = await screen.findByRole("link", {
            name: new RegExp(value.name, "i"),
        });
        expect(link).toHaveAttribute("href", key);
    });
});
