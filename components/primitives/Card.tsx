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

import { Link } from "@/components/content";
import { cn } from "@/components/primitives/utils/cn";

interface CardProps {
    href: string;
    target?: "_blank";
    logo: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

const Card = ({
    href,
    target,
    logo,
    children,
    className,
}: CardProps): React.ReactElement => (
    <div
        className={cn(
            "group motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-bounce-out motion-safe:hover:scale-[1.02]",
            className,
        )}
    >
        <Link
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            className="border-border bg-card hover:bg-accent/5 text-foreground flex h-full flex-col rounded-lg border p-5 font-normal no-underline shadow-sm hover:no-underline hover:opacity-100 hover:shadow-md motion-safe:transition-[background-color,box-shadow] motion-safe:duration-300 md:p-7"
        >
            <div className="bg-primary/3 mb-6 w-full overflow-hidden rounded-lg p-2">
                <div className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-bounce-out motion-safe:group-hover:scale-[1.06]">
                    {logo}
                </div>
            </div>
            {children}
        </Link>
    </div>
);

export default Card;
