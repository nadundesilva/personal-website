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
import { Box, Button } from "@mui/material";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { useState } from "react";

import Layout from "./Layout";
import WebsiteThemeProvider from "./theme";

const scrollState = { scrolledDown: false, setScrolledDown: (scrolledDown: boolean) => {} };
const useMockScrollTrigger = (options?: any): boolean => {
    const [scrolledDown, setScrolledDown] = useState<boolean>(false);
    scrollState.scrolledDown = scrolledDown;
    scrollState.setScrolledDown = setScrolledDown;
    return scrolledDown;
};
jest.mock("@mui/material/useScrollTrigger", () => useMockScrollTrigger);

type Theme = "light" | "dark";
type ScrollState = "initial" | "scrolled-down" | "top";

interface ValidateResult {
    changeThemeButton: HTMLElement,
    scrollBackToTopButton?: HTMLElement,
};

const validateLayout = async(theme: Theme, scrollState: ScrollState): Promise<ValidateResult> => {
    await screen.findByText("Test Layout children written by Nadun De Silva");
    await screen.findByRole("heading", {
        name: /nadun de silva/i
    });
    const changeThemeButton = await screen.findByRole("button", {
        name: RegExp(`change to ${theme} theme`, "i")
    });
    await screen.findByText(/© 2021 nadun de silva/i);

    let scrollBackToTopButton: HTMLElement | undefined;
    if (scrollState !== "initial") {
        scrollBackToTopButton = await screen.findByRole("button", {
            name: /scroll back to top/i
        });

        if (scrollState === "scrolled-down") {
            expect(scrollBackToTopButton.parentElement).toHaveStyle("transform: none");
        } else if (scrollState === "top") {
            expect(scrollBackToTopButton.parentElement).toHaveStyle("transform: scale(0)");
        }
    }

    return {
        changeThemeButton,
        scrollBackToTopButton
    };
};

afterEach(() => {
    jest.resetAllMocks();
});

afterAll(() => {
    jest.resetModules();
});

test("render layout without appbar items", async() => {
    render(<Layout>Test Layout children written by Nadun De Silva</Layout>);

    await validateLayout("dark", "initial");
});

test("render layout with appbar items as a single element", async() => {
    render(
        <Layout appBarItems={
            <Box data-testid="appbar-items-group">
                <Button data-testid={"appbar-item-01"}>Item 01</Button>
                <Button data-testid={"appbar-item-02"}>Item 02</Button>
            </Box>
        }>
            Test Layout children written by Nadun De Silva
        </Layout>
    );

    await validateLayout("dark", "initial");

    const appBarItemsGroup = await screen.findByTestId("appbar-items-group");
    await within(appBarItemsGroup).findByTestId("appbar-item-01");
    await within(appBarItemsGroup).findByTestId("appbar-item-02");
});

test("render layout with appbar items as elements array", async() => {
    render(
        <Layout appBarItems={
            [
                <Button data-testid={"appbar-item-01"} key={"item-01"}>Item 01</Button>,
                <Button data-testid={"appbar-item-02"} key={"item-02"}>Item 02</Button>
            ]
        }>
            Test Layout children written by Nadun De Silva
        </Layout>
    );

    await validateLayout("dark", "initial");

    await screen.findByTestId("appbar-item-01");
    await screen.findByTestId("appbar-item-02");
});

test("render layout with scrolled down from top", async() => {
    act(() => {
        render(<Layout>Test Layout children written by Nadun De Silva</Layout>);
    });

    await validateLayout("dark", "initial");

    act(() => {
        scrollState.setScrolledDown(true);
    });

    await validateLayout("dark", "scrolled-down");
});

test("render layout with scroll back to top clicked", async() => {
    act(() => {
        render(<Layout>Test Layout children written by Nadun De Silva</Layout>);
    });

    await validateLayout("dark", "initial");

    act(() => {
        scrollState.setScrolledDown(true);
    });

    const { scrollBackToTopButton } = await validateLayout("dark", "scrolled-down");

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

test("change theme", async() => {
    render(
        <WebsiteThemeProvider>
            <Layout>Test Layout children written by Nadun De Silva</Layout>
        </WebsiteThemeProvider>
    );

    let layoutValidation = await validateLayout("dark", "initial");
    fireEvent.click(layoutValidation.changeThemeButton);

    layoutValidation = await validateLayout("light", "initial");
    fireEvent.click(layoutValidation.changeThemeButton);

    await validateLayout("dark", "initial");
});

test("render layout with window function", async() => {
    render(<Layout window={() => window}>Test Layout children written by Nadun De Silva</Layout>);

    await validateLayout("dark", "initial");
});
