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
"use client";

import { Box, Typography, type TypographyProps } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type React from "react";
import { useId } from "react";

import { LeftAccent } from "@/components/primitives";

interface ListItemProps {
    children: React.ReactNode;
}

export const ListItem = ({ children }: ListItemProps): React.ReactElement => (
    <Box component="li">{children}</Box>
);

type ListItemElement = React.ReactElement<
    React.ComponentProps<typeof ListItem>
>;

interface ListBaseProps {
    component?: "ul" | "ol";
    children: ListItemElement | ListItemElement[];
}

interface ListWithHeadingProps extends ListBaseProps {
    heading: React.ReactNode;
    headingVariant: TypographyProps["variant"];
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
    return (
        <>
            {heading && (
                <Typography
                    id={headingId}
                    variant={headingVariant}
                    sx={{
                        mt: 0,
                        mb: 2.5,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.35,
                    }}
                >
                    {heading}
                </Typography>
            )}
            <Box
                component={component ?? "ul"}
                aria-labelledby={heading ? headingId : undefined}
                sx={{
                    "my": 0,
                    "pl": 2.5,
                    "& li": {
                        "mb": 1.5,
                        "&:last-child": {
                            mb: 0,
                        },
                        "&::marker": {
                            color: (theme) =>
                                theme.palette.mode === "light"
                                    ? alpha(theme.palette.primary.main, 0.7)
                                    : alpha(theme.palette.primary.light, 0.7),
                        },
                    },
                }}
            >
                {children}
            </Box>
        </>
    );
};

interface AccentedListProps {
    children: ListItemElement | ListItemElement[];
    heading: React.ReactNode;
    headingVariant: TypographyProps["variant"];
}

export const AccentedList = ({
    children,
    heading,
    headingVariant,
}: AccentedListProps): React.ReactElement => (
    <LeftAccent
        sx={{
            mt: 4,
            pr: 1,
            py: 0.5,
            background: (theme) =>
                theme.palette.mode === "light"
                    ? alpha(theme.palette.primary.main, 0.03)
                    : alpha(theme.palette.primary.light, 0.04),
            borderRadius: "0 4px 4px 0",
        }}
    >
        <List heading={heading} headingVariant={headingVariant}>
            {children}
        </List>
    </LeftAccent>
);

export default List;
