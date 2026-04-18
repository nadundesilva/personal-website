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

interface ParagraphProps {
    children: React.ReactNode;
    id?: string;
}

const Paragraph = ({ children, id }: ParagraphProps): React.ReactElement => (
    <p
        id={id}
        className="m-0 mb-5 text-[0.9375rem] leading-[1.75] font-normal sm:text-justify"
    >
        {children}
    </p>
);

export default Paragraph;
