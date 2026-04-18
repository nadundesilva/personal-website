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

import type React from "react";
import { useRef } from "react";

import { CopyButton } from "@/components/primitives";

const CodeBlock = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLPreElement>): React.ReactElement => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dataLanguage = (props as Record<string, unknown>)["data-language"] as
        | string
        | undefined;

    return (
        <div
            ref={wrapperRef}
            className="code-block-wrapper group/code relative"
        >
            <pre
                {...props}
                aria-label={
                    dataLanguage ? `${dataLanguage} code block` : "code block"
                }
            >
                {children}
            </pre>
            <CopyButton
                className="copy-btn absolute top-2 right-2 bg-[color-mix(in_srgb,var(--code-title-bg)_90%,transparent)] text-(--code-comment) opacity-0 motion-safe:transition-[color,opacity] motion-safe:duration-200 group-focus-within/code:opacity-100 group-hover/code:opacity-100 hover:bg-[color-mix(in_srgb,var(--code-border)_95%,transparent)] [@media(hover:none)]:opacity-100"
                label="Copy to clipboard"
                resolveCopyContent={() =>
                    wrapperRef.current?.querySelector("code")?.textContent ?? ""
                }
            />
        </div>
    );
};

export default CodeBlock;
