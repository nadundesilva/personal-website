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

import { Check, ContentCopy, ErrorOutline } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface CopyButtonProps {
    onCopy: () => void | Promise<void>;
    label?: string;
    copiedLabel?: string;
    failedLabel?: string;
    size?: "small" | "medium" | "large";
    className?: string;
    sx?: SxProps<Theme>;
    onCopiedChange?: (copied: boolean) => void;
}

const CopyButton = ({
    onCopy,
    label = "Copy",
    copiedLabel = "Copied!",
    failedLabel = "Copy failed",
    size = "small",
    className,
    sx,
    onCopiedChange,
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
            await Promise.resolve(onCopy());
            setCopied(true);
            onCopiedChange?.(true);
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setCopied(false);
                onCopiedChange?.(false);
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
    }, [onCopy, onCopiedChange]);

    const currentLabel = copyFailed
        ? failedLabel
        : copied
          ? copiedLabel
          : label;

    return (
        <Tooltip title={currentLabel}>
            <IconButton
                onClick={handleClick}
                aria-label={currentLabel}
                size={size}
                className={className}
                color={copyFailed ? "error" : undefined}
                sx={sx}
            >
                {copied ? (
                    <Check fontSize="small" />
                ) : copyFailed ? (
                    <ErrorOutline fontSize="small" />
                ) : (
                    <ContentCopy fontSize="small" />
                )}
            </IconButton>
        </Tooltip>
    );
};

export default CopyButton;
