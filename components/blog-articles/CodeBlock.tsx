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
"use client";

import Box from "@mui/material/Box";
import GlobalStyles from "@mui/material/GlobalStyles";
import { alpha } from "@mui/material/styles";
import type React from "react";
import { useRef, useState } from "react";

import { CopyButton } from "@/components/primitives";
import { NO_HOVER_QUERY } from "@/components/theme/media-queries";

// rehype-pretty-code data attributes
const DATA_ATTR_REHYPE_FIGURE = "data-rehype-pretty-code-figure";
const DATA_ATTR_REHYPE_TITLE = "data-rehype-pretty-code-title";
const DATA_ATTR_REHYPE_CODE_THEME = "data-theme";
const DATA_ATTR_REHYPE_LINE = "data-line";
const DATA_ATTR_REHYPE_LINE_NUMBERS_MAX_DIGITS = "data-line-numbers-max-digits";
const DATA_ATTR_REHYPE_HIGHLIGHTED_LINE = "data-highlighted-line";
const DATA_ATTR_REHYPE_HIGHLIGHTED_CHARS = "data-highlighted-chars";

// Internal data attributes
const DATA_ATTR_COPIED = "data-copied";

// Gutter CSS variable: number width + padding-right (1rem) + margin-right (1rem)
const CSS_VAR_GUTTER_SIZE = "--website-blog-articles-code-gutter";

const CODE_BLOCK_MAX_HEIGHT = "30rem";

// Dark palette: Dracula  |  Light palette: GitHub Light
const PALETTE = {
    light: {
        bg: "#ffffff",
        titleBg: "#f6f8fa",
        border: "#d0d7de",
        comment: "#6e7781",
        accent: "#0550ae", // blue – highlights, scrollbar hover
        success: "#1a7f37", // green – copy-success state
    },
    dark: {
        bg: "#282a36",
        titleBg: "#21222c",
        border: "#44475a",
        comment: "#6272a4",
        accent: "#bd93f9", // purple
        success: "#50fa7b", // green
    },
};

const CodeBlock = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLPreElement>): React.ReactElement => {
    const [copied, setCopied] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleCopy = async () => {
        const text =
            wrapperRef.current?.querySelector("code")?.textContent ?? "";
        await navigator.clipboard.writeText(text);
    };

    return (
        <>
            {/*
             * The figure wrapper and title bar are rendered by rehype-pretty-code
             * outside this component's subtree, so they are styled via GlobalStyles.
             * MUI deduplicates GlobalStyles instances by content hash — rendering
             * this inside every CodeBlock is safe and produces a single <style> tag.
             */}
            <GlobalStyles
                styles={(theme) => {
                    const codeTheme =
                        theme.palette.mode === "dark"
                            ? PALETTE.dark
                            : PALETTE.light;
                    return {
                        // Activate the correct Shiki token colors based on MUI color mode.
                        // code[data-theme*=' '] targets only dual-theme blocks (value contains a space,
                        // e.g. "dark light"). --shiki-light / --shiki-dark are defined per-token on
                        // each <span> by Shiki; --shiki-light-bg / --shiki-dark-bg are on <pre>.
                        [`code[${DATA_ATTR_REHYPE_CODE_THEME}*=' '], code[${DATA_ATTR_REHYPE_CODE_THEME}*=' '] span`]:
                            {
                                color: "var(--shiki-light)",
                                ...theme.applyStyles("dark", {
                                    color: "var(--shiki-dark)",
                                }),
                            },

                        [`figure[${DATA_ATTR_REHYPE_FIGURE}]`]: {
                            margin: "1.5rem 0",
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            borderRadius: `${theme.shape.borderRadius}px`,
                            overflow: "hidden",
                            ...theme.applyStyles("dark", {
                                borderColor: alpha(
                                    theme.palette.primary.light,
                                    0.2,
                                ),
                            }),
                        },
                        [`[${DATA_ATTR_REHYPE_TITLE}]`]: {
                            padding: "0.5rem 1rem",
                            backgroundColor: codeTheme.titleBg,
                            borderBottom: `1px solid ${codeTheme.border}`,
                            fontFamily: `${theme.typography.codeFontFamily}, monospace`,
                            fontSize: "0.8rem",
                            color: codeTheme.comment,
                        },
                    };
                }}
            />
            <Box
                ref={wrapperRef}
                {...{ [DATA_ATTR_COPIED]: copied || undefined }}
                sx={(theme) => {
                    const codeTheme =
                        theme.palette.mode === "dark"
                            ? PALETTE.dark
                            : PALETTE.light;
                    return {
                        "position": "relative",

                        // Copy button — hidden until the block is hovered/focused
                        "& .copy-btn": {
                            "position": "absolute",
                            "top": 8,
                            "right": 8,
                            "color": codeTheme.comment,
                            "backgroundColor": alpha(codeTheme.titleBg, 0.9),
                            "opacity": 0,
                            "transition": "color 0.2s, opacity 0.15s",
                            "&:hover": {
                                backgroundColor: alpha(codeTheme.border, 0.95),
                            },
                        },
                        "&:hover .copy-btn": { opacity: 1 },
                        "&:focus-within .copy-btn": { opacity: 1 },
                        [`&[${DATA_ATTR_COPIED}] .copy-btn`]: {
                            opacity: 1,
                            color: codeTheme.success,
                        },
                        [NO_HOVER_QUERY]: {
                            "& .copy-btn": { opacity: 1 },
                        },

                        // Apply code font to all rehype-pretty-code themed tokens
                        [`& code[${DATA_ATTR_REHYPE_CODE_THEME}], & code[${DATA_ATTR_REHYPE_CODE_THEME}] *`]:
                            {
                                fontFamily: `${theme.typography.codeFontFamily}, monospace`,
                            },

                        // Give pre the Shiki theme background; code is transparent so pre shows through
                        "& pre": {
                            margin: 0,
                            backgroundColor: "var(--shiki-light-bg)",
                            ...theme.applyStyles("dark", {
                                backgroundColor: "var(--shiki-dark-bg)",
                            }),
                        },

                        // Scrollable code area with line-number gutter
                        "& pre > code": {
                            "overflow": "auto",
                            "maxHeight": CODE_BLOCK_MAX_HEIGHT,
                            "padding": "1rem",
                            "counterReset": "line",

                            // Gutter size shared between [data-line] padding and ::before margin
                            [CSS_VAR_GUTTER_SIZE]: "3rem",

                            // Themed scrollbar — track matches the code background
                            "scrollbarWidth": "thin",
                            "scrollbarColor": `${codeTheme.comment} transparent`,

                            [`&[${DATA_ATTR_REHYPE_LINE_NUMBERS_MAX_DIGITS}='2']`]:
                                {
                                    [CSS_VAR_GUTTER_SIZE]: "4rem",
                                },
                            [`&[${DATA_ATTR_REHYPE_LINE_NUMBERS_MAX_DIGITS}='3']`]:
                                {
                                    [CSS_VAR_GUTTER_SIZE]: "5rem",
                                },

                            "&::-webkit-scrollbar": {
                                width: "6px",
                                height: "6px",
                            },
                            "&::-webkit-scrollbar-track": {
                                background: "transparent",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                background: codeTheme.comment,
                                borderRadius: "3px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                background: codeTheme.accent,
                            },

                            // Hanging indent — continuation lines align with code content
                            [`& [${DATA_ATTR_REHYPE_LINE}]`]: {
                                paddingLeft: `var(${CSS_VAR_GUTTER_SIZE})`,
                                lineHeight: 1.8,
                            },

                            // Line number rendered via CSS counter in the gutter.
                            // box-sizing: content-box is required because MUI's CSS reset applies
                            // border-box globally (including ::before). Without it, width is the
                            // *total* box size, so padding-right consumes the number's content
                            // area and the border cuts through multi-digit numbers.
                            [`& [${DATA_ATTR_REHYPE_LINE}]::before`]: {
                                counterIncrement: "line",
                                content: "counter(line)",
                                display: "inline-block",
                                boxSizing: "content-box",
                                marginLeft: `calc(-1 * var(${CSS_VAR_GUTTER_SIZE}))`,
                                width: "1rem",
                                paddingRight: "1rem",
                                marginRight: "1rem",
                                borderRight: `1px solid ${codeTheme.border}`,
                                textAlign: "right",
                                color: codeTheme.comment,
                            },
                            [`&[${DATA_ATTR_REHYPE_LINE_NUMBERS_MAX_DIGITS}='2'] [${DATA_ATTR_REHYPE_LINE}]::before`]:
                                { width: "2rem" },
                            [`&[${DATA_ATTR_REHYPE_LINE_NUMBERS_MAX_DIGITS}='3'] [${DATA_ATTR_REHYPE_LINE}]::before`]:
                                { width: "3rem" },

                            // Highlighted line
                            [`& [${DATA_ATTR_REHYPE_HIGHLIGHTED_LINE}]`]: {
                                backgroundColor: alpha(codeTheme.accent, 0.08),
                                boxShadow: `inset 3px 0 0 0 ${codeTheme.accent}`,
                            },
                        },

                        // Highlighted character range
                        [`& [${DATA_ATTR_REHYPE_HIGHLIGHTED_CHARS}]`]: {
                            backgroundColor: alpha(codeTheme.accent, 0.12),
                            borderRadius: "3px",
                            boxShadow: `0 0 0 2px ${alpha(codeTheme.accent, 0.25)}`,
                        },
                    };
                }}
            >
                <pre {...props}>{children}</pre>
                <CopyButton
                    className="copy-btn"
                    label="Copy to clipboard"
                    onCopy={handleCopy}
                    onCopiedChange={setCopied}
                />
            </Box>
        </>
    );
};

export default CodeBlock;
