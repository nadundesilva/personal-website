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

interface SubHeadingProps {
    children: React.ReactNode;
    id?: string;
}

const SubHeading = (props: SubHeadingProps): React.ReactElement => (
    <div className="mb-6 flex flex-col items-center md:mb-8">
        <h3
            id={props.id}
            className="relative mb-2 scroll-mt-20 text-center text-wrap-balance text-[1.375rem] leading-snug font-medium tracking-[-0.02em] md:mb-3 md:text-[1.75rem]"
        >
            {props.children}
        </h3>
        <HorizontalGradientLine
            variant="centered"
            className="mt-0 h-[1.5px] w-10 opacity-70 md:w-14"
        />
    </div>
);

export default SubHeading;
