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
import { useId } from "react";

import { cn } from "@/components/primitives/utils/cn";

import { LeftAccent } from "@/components/primitives";

interface ListItemProps {
    children: React.ReactNode;
}

export const ListItem = ({ children }: ListItemProps): React.ReactElement => (
    <li>{children}</li>
);

type ListItemElement = React.ReactElement<
    React.ComponentProps<typeof ListItem>
>;

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface ListBaseProps {
    component?: "ul" | "ol";
    children: ListItemElement | ListItemElement[];
}

interface ListWithHeadingProps extends ListBaseProps {
    heading: React.ReactNode;
    headingVariant: HeadingLevel;
}

interface ListWithoutHeadingProps extends ListBaseProps {
    heading?: never;
    headingVariant?: never;
}

type ListProps = ListWithHeadingProps | ListWithoutHeadingProps;

const List = ({
    children,
    heading,
    headingVariant,
    component,
}: ListProps): React.ReactElement => {
    const headingId = useId();
    const Tag = headingVariant ?? "h3";
    const ListTag = component ?? "ul";
    return (
        <>
            {heading && (
                <Tag
                    id={headingId}
                    className="mb-5 leading-snug tracking-[-0.01em]"
                >
                    {heading}
                </Tag>
            )}
            <ListTag
                aria-labelledby={heading ? headingId : undefined}
                className={cn(
                    "pl-5 [&_li]:mb-3 [&_li::marker]:text-primary/70 [&_li:last-child]:mb-0",
                    component === "ol" ? "list-decimal" : "list-disc",
                )}
            >
                {children}
            </ListTag>
        </>
    );
};

interface AccentedListProps {
    children: ListItemElement | ListItemElement[];
    heading: React.ReactNode;
    headingVariant: HeadingLevel;
}

export const AccentedList = ({
    children,
    heading,
    headingVariant,
}: AccentedListProps): React.ReactElement => (
    <LeftAccent className="clear-both mt-8 bg-primary/3 py-1 pr-2 dark:bg-primary/4">
        <List heading={heading} headingVariant={headingVariant}>
            {children}
        </List>
    </LeftAccent>
);

export default List;
