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
import { Box, Button } from "@mui/material";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import React, { useState } from "react";

import WebsiteThemeProvider, {
    type ColorScheme,
    useWebsiteTheme,
} from "./theme";

const mediaQueryHook = { result: false };
jest.mock(
    "@mui/material/useMediaQuery",
    () =>
        (queryInput: string): boolean => {
            expect(queryInput).toBe("(prefers-color-scheme: dark)");
            return mediaQueryHook.result;
        },
);

afterEach(() => {
    jest.resetAllMocks();
});

afterAll(() => {
    jest.resetModules();
});

const WebsiteThemeConsumer = (): React.ReactElement => {
    const websiteTheme = useWebsiteTheme();
    const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
    const [error, setError] = useState<Error | undefined>(undefined);

    const onSetColorScheme = (): void => {
        const newColorScheme = colorScheme === "light" ? "dark" : "light";
        try {
            websiteTheme.setColorScheme(newColorScheme);
            setError(undefined);
        } catch (e) {
            setError(e as Error);
        }
        setColorScheme(newColorScheme);
    };

    return (
        <Box data-testid={"theme-data-group"}>
            <Box data-testid={"theme-data-error"}>{error?.message}</Box>
            <Box data-testid={"theme-data-color-scheme"}>
                {websiteTheme.colorScheme}
            </Box>
            <Button onClick={onSetColorScheme}>Toggle Theme</Button>
        </Box>
    );
};

type Theme = "light" | "dark";

const renderTestComponent = async (
    initialTheme: Theme,
): Promise<{ themeDataGroupDiv: HTMLElement; colorSchemeDiv: HTMLElement }> => {
    render(
        <WebsiteThemeProvider>
            <WebsiteThemeConsumer />
        </WebsiteThemeProvider>,
    );

    const themeDataGroupDiv = await screen.findByTestId("theme-data-group");
    const colorSchemeDiv = await within(themeDataGroupDiv).findByTestId(
        "theme-data-color-scheme",
    );
    expect(colorSchemeDiv.innerHTML).toBe(initialTheme);

    const themeDataErrorDiv = await within(themeDataGroupDiv).findByTestId(
        "theme-data-error",
    );
    expect(
        await within(themeDataErrorDiv).queryByText(
            "Setting color theme not implemented",
        ),
    ).toBeNull();

    return { themeDataGroupDiv, colorSchemeDiv };
};

afterEach(() => {
    localStorage.removeItem("COLOR_SCHEME");
});

test("fails when provider is not present", async () => {
    render(<WebsiteThemeConsumer />);
    const themeDataGroupDiv = await screen.findByTestId("theme-data-group");
    const setColorSchemeButton = await within(themeDataGroupDiv).findByRole(
        "button",
        {
            name: /toggle theme/i,
        },
    );
    act(() => {
        fireEvent.click(setColorSchemeButton);
    });
    const themeDataErrorDiv = await within(themeDataGroupDiv).findByTestId(
        "theme-data-error",
    );
    await within(themeDataErrorDiv).findByText(
        "Setting color theme not implemented",
    );
});

test("initializes with default color scheme", async () => {
    await renderTestComponent("light");
});

test("initializes with browser color scheme preferences", async () => {
    mediaQueryHook.result = true;
    await renderTestComponent("dark");
    mediaQueryHook.result = false;
});

test("initializes with color scheme set in localStorage", async () => {
    localStorage.setItem("COLOR_SCHEME", "dark");
    await renderTestComponent("dark");
});

test("initializes with default color scheme when accessing localStorage fails", async () => {
    localStorage.setItem("COLOR_SCHEME", "dark");

    const localStorageGetItemMock = jest.fn();
    localStorageGetItemMock.mockImplementation((key) => {
        expect(key).toBe("COLOR_SCHEME");
        throw new Error("Unable to access local storage");
    });
    window.Storage.prototype.getItem = localStorageGetItemMock;

    await renderTestComponent("light");
});

const testTogglingTheme = async (
    themeDataGroupDiv: HTMLElement,
    colorSchemeDiv: HTMLElement,
    newTheme: Theme,
): Promise<HTMLElement> => {
    const setColorSchemeButton = await within(themeDataGroupDiv).findByRole(
        "button",
        {
            name: /toggle theme/i,
        },
    );
    act(() => {
        fireEvent.click(setColorSchemeButton);
    });
    expect(colorSchemeDiv.innerHTML).toBe(newTheme);

    const themeDataErrorDiv = await within(themeDataGroupDiv).findByTestId(
        "theme-data-error",
    );
    expect(
        await within(themeDataErrorDiv).queryByText(
            "Setting color theme not implemented",
        ),
    ).toBeNull();

    return setColorSchemeButton;
};

test("toggles color scheme", async () => {
    const { themeDataGroupDiv, colorSchemeDiv } = await renderTestComponent(
        "light",
    );
    const setColorSchemeButton = await testTogglingTheme(
        themeDataGroupDiv,
        colorSchemeDiv,
        "dark",
    );

    act(() => {
        fireEvent.click(setColorSchemeButton);
    });
    expect(colorSchemeDiv.innerHTML).toBe("light");
});

const testChangingColorSchemeInLocalStorage = async (
    newLocalStorageTheme: Theme | null,
    expectedNewTheme: Theme,
): Promise<void> => {
    const { themeDataGroupDiv, colorSchemeDiv } = await renderTestComponent(
        "light",
    );
    await testTogglingTheme(themeDataGroupDiv, colorSchemeDiv, "dark");

    const localStorageGetItemMock = jest.fn();
    localStorageGetItemMock.mockImplementation((key) => {
        expect(key).toBe("COLOR_SCHEME");
        return newLocalStorageTheme;
    });
    window.Storage.prototype.getItem = localStorageGetItemMock;

    act(() => {
        window.dispatchEvent(
            new StorageEvent("storage", {
                key: "COLOR_SCHEME",
                newValue: newLocalStorageTheme,
            }),
        );
    });

    expect(colorSchemeDiv.innerHTML).toBe(expectedNewTheme);
};

test("set color scheme to localStorage after rendering", async () => {
    await testChangingColorSchemeInLocalStorage("light", "light");
});

test("remove color scheme from localStorage after rendering", async () => {
    await testChangingColorSchemeInLocalStorage(null, "dark");
});
