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

interface SubHeadingProps {
    children: React.ReactNode;
}

const SubHeading = (props: SubHeadingProps): React.ReactElement => (
    <div className="mb-6 flex flex-col items-center md:mb-8">
        <h3 className="relative mb-2 text-center text-[1.375rem] leading-snug font-normal tracking-[-0.02em] md:mb-3 md:text-[1.75rem]">
            {props.children}
        </h3>
        <div
            aria-hidden="true"
            className="h-[1.5px] w-10 rounded bg-linear-to-r from-transparent via-primary to-transparent opacity-70 md:w-14"
        />
    </div>
);

export default SubHeading;
