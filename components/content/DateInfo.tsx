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
 * © 2023 Nadun De Silva. All rights reserved.
 */
import { Calendar } from "lucide-react";
import type React from "react";

import { PrimaryTintedIcon } from "@/components/primitives";
import { cn } from "@/components/primitives/utils/cn";
import type { FormattableDate } from "@/constants/date";

interface DateInfoProps {
    value: FormattableDate;
    className?: string;
}

const DateInfo = ({ value, className }: DateInfoProps): React.ReactElement => (
    <div
        className={cn("mt-1.5 mb-5 flex items-center gap-2 text-sm", className)}
    >
        <span className="sr-only">Date:</span>
        <PrimaryTintedIcon icon={Calendar} size="1.125rem" />
        <span className="text-muted-foreground leading-relaxed font-normal tracking-[0.01em]">
            {value.getRenderSegments().map((segment, index) =>
                segment.dateTime ? (
                    <time key={index} dateTime={segment.dateTime}>
                        {segment.text}
                    </time>
                ) : (
                    <span key={index}>{segment.text}</span>
                ),
            )}
        </span>
    </div>
);

export default DateInfo;
