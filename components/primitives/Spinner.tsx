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

// shadcn/ui component

import { Loader2Icon } from "lucide-react";

import { cn } from "@/components/primitives/utils/cn";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <Loader2Icon
            role="status"
            aria-label="Loading"
            className={cn("size-4 motion-safe:animate-spin", className)}
            {...props}
        />
    );
}

export { Spinner };
