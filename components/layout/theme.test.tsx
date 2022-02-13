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
import React, { useState } from "react";

import WebsiteThemeProvider, { ColorScheme, useWebsiteTheme } from "./theme";

const mediaQueryHook = { result: false };
const useMockMediaQuery = (queryInput: string): boolean => {
    expect(queryInput).toBe("(prefers-color-scheme: dark)");
    return mediaQueryHook.result;
};
jest.mock("@mui/material/useMediaQuery", () => useMockMediaQuery);

afterEach(() => {
    jest.resetAllMocks();
});

afterAll(() => {
    jest.resetModules();
});

const WebsiteThemeConsumer = (): React.ReactElement => {
    const websiteTheme = useWebsiteTheme();
    const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

    const onSetColorScheme = (): void => {
        const newColorScheme = colorScheme === "light" ? "dark" : "light";
        websiteTheme.setColorScheme(newColorScheme);
        setColorScheme(newColorScheme);
    };

    return (
        <Box data-testid={"theme-data-group"}>
            <Box data-testid={"theme-data-color-scheme"}>{websiteTheme.colorScheme}</Box>
            <Button onClick={onSetColorScheme}>
                Toggle Theme
            </Button>
        </Box>
    );
};

afterEach(() => {
    localStorage.removeItem("COLOR_SCHEME");
});

test("initializes with default color scheme", async() => {
    render(
        <WebsiteThemeProvider>
            <WebsiteThemeConsumer/>
        </WebsiteThemeProvider>
    );

    const themeDataGroupDiv = await screen.findByTestId("theme-data-group");
    const colorSchemeDiv = await within(themeDataGroupDiv).findByTestId("theme-data-color-scheme");
    expect(colorSchemeDiv.innerHTML).toBe("light");
});

test("initializes with browser color scheme preferences", async() => {
    mediaQueryHook.result = true;

    render(
        <WebsiteThemeProvider>
            <WebsiteThemeConsumer/>
        </WebsiteThemeProvider>
    );

    const themeDataGroupDiv = await screen.findByTestId("theme-data-group");
    const colorSchemeDiv = await within(themeDataGroupDiv).findByTestId("theme-data-color-scheme");
    expect(colorSchemeDiv.innerHTML).toBe("dark");

    mediaQueryHook.result = false;
});

test("initializes with color scheme set in localStorage", async() => {
    localStorage.setItem("COLOR_SCHEME", "dark");

    render(
        <WebsiteThemeProvider>
            <WebsiteThemeConsumer/>
        </WebsiteThemeProvider>
    );

    const themeDataGroupDiv = await screen.findByTestId("theme-data-group");
    const colorSchemeDiv = await within(themeDataGroupDiv).findByTestId("theme-data-color-scheme");
    expect(colorSchemeDiv.innerHTML).toBe("dark");
});

test("initializes with default color scheme when accessing localStorage fails", async() => {
    localStorage.setItem("COLOR_SCHEME", "dark");

    const localStorageGetItemMock = jest.fn();
    localStorageGetItemMock.mockImplementation((key) => {
        expect(key).toBe("COLOR_SCHEME");
        throw new Error("Unable to access local storage");
    });
    window.Storage.prototype.getItem = localStorageGetItemMock;

    render(
        <WebsiteThemeProvider>
            <WebsiteThemeConsumer/>
        </WebsiteThemeProvider>
    );

    expect(localStorageGetItemMock).toBeCalledTimes(1);
    const themeDataGroupDiv = await screen.findByTestId("theme-data-group");
    const colorSchemeDiv = await within(themeDataGroupDiv).findByTestId("theme-data-color-scheme");
    expect(colorSchemeDiv.innerHTML).toBe("light");
});

test("toggles color scheme", async() => {
    render(
        <WebsiteThemeProvider>
            <WebsiteThemeConsumer/>
        </WebsiteThemeProvider>
    );

    const themeDataGroupDiv = await screen.findByTestId("theme-data-group");
    const colorSchemeDiv = await within(themeDataGroupDiv).findByTestId("theme-data-color-scheme");
    expect(colorSchemeDiv.innerHTML).toBe("light");

    const setColorSchemeButton = await within(themeDataGroupDiv).findByRole("button", {
        name: /toggle theme/i
    });

    act(() => {
        fireEvent.click(setColorSchemeButton);
    });
    expect(colorSchemeDiv.innerHTML).toBe("dark");

    act(() => {
        fireEvent.click(setColorSchemeButton);
    });
    expect(colorSchemeDiv.innerHTML).toBe("light");
});

test("set color scheme to localStorage after rendering", async() => {
    render(
        <WebsiteThemeProvider>
            <WebsiteThemeConsumer/>
        </WebsiteThemeProvider>
    );

    const themeDataGroupDiv = await screen.findByTestId("theme-data-group");
    const colorSchemeDiv = await within(themeDataGroupDiv).findByTestId("theme-data-color-scheme");

    const setColorSchemeButton = await within(themeDataGroupDiv).findByRole("button", {
        name: /toggle theme/i
    });
    act(() => {
        fireEvent.click(setColorSchemeButton);
    });
    expect(colorSchemeDiv.innerHTML).toBe("dark");

    const localStorageGetItemMock = jest.fn();
    localStorageGetItemMock.mockImplementation((key) => {
        expect(key).toBe("COLOR_SCHEME");
        return "light";
    });
    window.Storage.prototype.getItem = localStorageGetItemMock;

    act(() => {
        window.dispatchEvent(new StorageEvent("storage", {
            key: "COLOR_SCHEME",
            newValue: "light"
        }));
    });

    expect(colorSchemeDiv.innerHTML).toBe("light");
});

test("remove color scheme from localStorage after rendering", async() => {
    render(
        <WebsiteThemeProvider>
            <WebsiteThemeConsumer/>
        </WebsiteThemeProvider>
    );

    const themeDataGroupDiv = await screen.findByTestId("theme-data-group");
    const colorSchemeDiv = await within(themeDataGroupDiv).findByTestId("theme-data-color-scheme");

    const setColorSchemeButton = await within(themeDataGroupDiv).findByRole("button", {
        name: /toggle theme/i
    });
    act(() => {
        fireEvent.click(setColorSchemeButton);
    });
    expect(colorSchemeDiv.innerHTML).toBe("dark");

    const localStorageGetItemMock = jest.fn();
    localStorageGetItemMock.mockImplementation((key) => {
        expect(key).toBe("COLOR_SCHEME");
        return null;
    });
    window.Storage.prototype.getItem = localStorageGetItemMock;

    act(() => {
        window.dispatchEvent(new StorageEvent("storage", {
            key: "COLOR_SCHEME",
            newValue: null
        }));
    });

    expect(colorSchemeDiv.innerHTML).toBe("dark");
});
