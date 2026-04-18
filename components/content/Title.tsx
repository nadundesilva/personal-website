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

import { HorizontalGradientLine, ScrollReveal } from "@/components/primitives";

interface TitleProps {
    children: React.ReactNode;
}

const Title = ({ children }: TitleProps): React.ReactElement => (
    <ScrollReveal>
        <div className="mt-8 mb-6 md:mt-10">
            <h1 className="text-4xl leading-tight font-medium tracking-[-0.03em] text-wrap-balance">
                {children}
            </h1>
            <HorizontalGradientLine className="mt-2.5 w-25 opacity-70 md:w-40" />
        </div>
    </ScrollReveal>
);

export default Title;
