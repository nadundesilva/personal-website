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
 * © 2025 Nadun De Silva. All rights reserved.
 */
import type React from "react";

import { ScrollReveal } from "@/components/primitives";
import { Separator } from "@/shadcn/ui";

interface SectionProps {
    children: React.ReactNode;
    labelledById?: string;
}

const Section = ({
    children,
    labelledById,
}: SectionProps): React.ReactElement => (
    <section
        aria-labelledby={labelledById}
        className="group/section clear-both mb-14"
    >
        <ScrollReveal>
            {children}
            {/* Clearfix to ensure spacing is measured from bottom of all floated content */}
            <div className="clear-both h-0 w-full overflow-hidden" />
        </ScrollReveal>
        <Separator
            aria-hidden="true"
            className="mt-14 hidden group-[:not(:last-of-type)]/section:block"
        />
    </section>
);

export default Section;
