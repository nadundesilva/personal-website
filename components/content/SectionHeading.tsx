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
import type React from "react";

import { HorizontalGradientLine } from "@/components/primitives";
import { cn } from "@/components/primitives/utils/cn";
import type { FormattableDate } from "@/constants/date";

import DateInfo from "./DateInfo";
import LinkButton, { type LinkButtonProps } from "./LinkButton";

interface SectionHeadingProps {
    children: React.ReactNode;
    date?: FormattableDate;
    logo?: React.ReactElement;
    actionButton?: LinkButtonProps;
    id?: string;
}

const SectionHeading = ({
    children,
    date,
    logo,
    actionButton,
    id,
}: SectionHeadingProps): React.ReactElement => (
    <div className="mt-8 mb-6 flex flex-col items-start gap-4 sm:flex-row sm:gap-6 md:mt-10">
        <div className="min-w-0 flex-1">
            <h2
                id={id}
                className="scroll-mt-20 text-[1.75rem] leading-tight font-medium tracking-[-0.03em] text-wrap-balance"
            >
                {children}
            </h2>
            <HorizontalGradientLine
                className={cn(
                    "w-14 md:w-20",
                    date || actionButton ? undefined : "mb-2",
                )}
            />
            {date && <DateInfo value={date} />}
            {actionButton && (
                <div className={cn(date ? undefined : "mt-5")}>
                    <LinkButton {...actionButton} />
                </div>
            )}
        </div>
        {logo && (
            <div className="flex w-full shrink-0 items-center justify-start sm:mt-0.5 sm:w-70 sm:justify-end">
                {logo}
            </div>
        )}
    </div>
);

export default SectionHeading;
