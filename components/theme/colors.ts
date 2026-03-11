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

// Primary and secondary palette definitions — exported so server components
// (e.g. app/layout.tsx) can reference the raw color values without importing
// the client-only WebsiteThemeProvider.

export const themePrimary = {
    main: "#384959",
    light: "#BDDDFC",
    dark: "#6A89A7",
    contrastText: "#ffffff",
};

export const themeSecondary = {
    main: "#4a6785",
    light: "#88BDF2",
    dark: "#384959",
    contrastText: "#ffffff",
};

// Link colors: dark mode uses the lighter secondary for readability on dark
// backgrounds; light mode uses a hand-picked blue that meets WCAG AA contrast
// on white.

export const linkColors = {
    dark: themeSecondary.light,
    light: "#2E5C82",
};
