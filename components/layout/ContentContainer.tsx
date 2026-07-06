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

import { cn } from "@/shadcn/lib/cn";

type ContentContainerProps = React.ComponentPropsWithoutRef<"div">;

const ContentContainer = ({
    children,
    className,
    ...props
}: ContentContainerProps): React.ReactElement => (
    <div
        className={cn(
            // Padding values are mirrored as CONTENT_BREAKPOINTS in utils/common/image-sizes.ts.
            // Update both together when changing these classes.
            "relative isolate px-4 sm:px-6 md:px-8 lg:px-20 xl:px-40 2xl:px-80",
            className,
        )}
        {...props}
    >
        {children}
    </div>
);

export default ContentContainer;
