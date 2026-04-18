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
 * © 2024 Nadun De Silva. All rights reserved.
 */
import type React from "react";

import { LeftAccent } from "@/components/primitives";

interface SubsectionHeadingProps {
    children: React.ReactNode;
    id?: string;
}

const SubsectionHeading = ({
    children,
    id,
}: SubsectionHeadingProps): React.ReactElement => (
    <LeftAccent thickness="thin" className="mt-8 mb-4 pl-3">
        <h3
            id={id}
            className="scroll-mt-20 text-[1.375rem] leading-snug font-medium tracking-normal text-wrap-balance"
        >
            {children}
        </h3>
    </LeftAccent>
);

export default SubsectionHeading;
