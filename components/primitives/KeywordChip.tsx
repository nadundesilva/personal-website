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
import type React from "react";

import { Badge } from "@/components/primitives";

interface KeywordChipProps {
    label: string;
}

const KeywordChip = ({ label }: KeywordChipProps): React.ReactElement => (
    <Badge
        variant="outline"
        className="hover:border-primary text-primary h-5 cursor-default rounded border-primary/35 px-1.5 text-[0.625rem] font-normal tracking-[0.04em] uppercase motion-safe:transition-colors hover:bg-primary/5 dark:border-primary/50 dark:hover:bg-primary/8"
    >
        {label}
    </Badge>
);

export default KeywordChip;
