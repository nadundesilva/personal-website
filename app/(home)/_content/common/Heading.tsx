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

interface HeadingProps {
    children: React.ReactNode;
    id?: string;
    number?: number;
}

const Heading = (props: HeadingProps): React.ReactElement => {
    return (
        <div className="relative mb-6 flex flex-col items-center md:mb-8">
            {props.number !== undefined && (
                <span
                    aria-hidden={true}
                    className="text-primary pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] text-[7rem] leading-none font-bold tracking-[-0.04em] whitespace-nowrap opacity-6 select-none md:text-[10rem]"
                >
                    {String(props.number).padStart(2, "0")}
                </span>
            )}
            <h2
                id={props.id}
                className="relative mb-5 scroll-mt-20 text-center text-4xl font-medium text-wrap-balance md:mb-6 md:text-[2.75rem]"
            >
                {props.children}
            </h2>
            <HorizontalGradientLine
                variant="centered"
                className="mt-0 h-0.5 w-14 opacity-70 md:w-20"
            />
        </div>
    );
};

export default Heading;
