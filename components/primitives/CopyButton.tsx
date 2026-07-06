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

import { AlertCircle, Check, Copy } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/shadcn/ui";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";

type CopyButtonProps = {
    label?: string;
    copiedLabel?: string;
    failedLabel?: string;
    className?: string;
} & (
    | {
          copyContent: string;
          resolveCopyContent?: never;
      }
    | {
          copyContent?: never;
          resolveCopyContent: () => string | Promise<string>;
      }
);

const CopyButton = ({
    copyContent,
    resolveCopyContent,
    label = "Copy",
    copiedLabel = "Copied!",
    failedLabel = "Copy failed",
    className,
}: CopyButtonProps): React.ReactElement => {
    const [copied, setCopied] = useState(false);
    const [copyFailed, setCopyFailed] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleClick = useCallback(async () => {
        try {
            const content = await Promise.resolve(
                copyContent ?? resolveCopyContent?.() ?? "",
            );
            await navigator.clipboard.writeText(content);
            setCopied(true);
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            setCopyFailed(true);
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setCopyFailed(false);
            }, 2000);
        }
    }, [copyContent, resolveCopyContent]);

    const currentLabel = copyFailed
        ? failedLabel
        : copied
          ? copiedLabel
          : label;

    return (
        <Tooltip>
            <TooltipTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClick}
                        // Intentionally the base label, not currentLabel — the button's
                        // accessible name describes its action ("Copy"), not its state.
                        // State feedback is announced via the role="status" span below.
                        aria-label={label}
                        className={className}
                    />
                }
            >
                {copied ? (
                    <Check />
                ) : copyFailed ? (
                    <AlertCircle className="text-destructive" />
                ) : (
                    <Copy />
                )}
            </TooltipTrigger>
            <TooltipContent>{currentLabel}</TooltipContent>

            {/* Sole mechanism for announcing state changes — aria-label is intentionally kept as the action name */}
            <span role="status" className="sr-only">
                {copied || copyFailed ? currentLabel : ""}
            </span>
        </Tooltip>
    );
};

export default CopyButton;
