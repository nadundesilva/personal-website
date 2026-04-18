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

import { cn } from "@/components/primitives/utils/cn";

interface ContentContainerProps extends React.ComponentPropsWithoutRef<"div"> {
    className?: string;
}

const ContentContainer = ({
    children,
    className,
    ...props
}: ContentContainerProps): React.ReactElement => (
    <div
        className={cn(
            "relative isolate px-2 sm:px-6 md:px-8 lg:px-20 xl:px-40 2xl:px-80",
            className,
        )}
        {...props}
    >
        {children}
    </div>
);

export default ContentContainer;
