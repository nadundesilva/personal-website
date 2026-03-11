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
import {
    SkillProficiencies,
    type Skill,
    type SkillProficiency,
} from "@/constants/skill-categories";
import {
    Code as CodeIcon,
    WorkOutline as WorkIcon,
    WorkspacePremium as WorkspacePremiumIcon,
} from "@mui/icons-material";
import {
    Box,
    Chip,
    Divider,
    Fade,
    Paper,
    Popper,
    Stack,
    Typography,
    SvgIconProps,
    useTheme,
} from "@mui/material";

import React from "react";

import useHoverDelay from "@/hooks/useHoverDelay";

// All proficiency colors are intentionally kept local to this component.
// They are visual-only bar-chart indicators with no meaning outside of
// SkillChip, so they do not belong in the global MUI theme palette or in
// colors.ts.
const proficiencyColors: Record<SkillProficiency, string> = {
    [SkillProficiencies.Expert]: "#4caf50",
    [SkillProficiencies.Intermediate]: "#2196f3",
    [SkillProficiencies.Novice]: "#cd7f32",
};

interface ProficiencyIndicatorProps {
    level: SkillProficiency;
}

const ProficiencyIndicator = ({
    level,
}: ProficiencyIndicatorProps): React.ReactElement => {
    let bars: number;
    switch (level) {
        case SkillProficiencies.Expert:
            bars = 3;
            break;
        case SkillProficiencies.Intermediate:
            bars = 2;
            break;
        case SkillProficiencies.Novice:
            bars = 1;
            break;
        default:
            throw new Error(`Unsupported skill level: ${level}`);
    }
    const color = proficiencyColors[level];

    return (
        <Box
            aria-hidden={true}
            sx={{
                display: "flex",
                alignItems: "end",
                gap: 0.25,
                height: 12,
                ml: 0.5,
            }}
        >
            {[1, 2, 3].map((i) => (
                <Box
                    key={i}
                    sx={{
                        width: 3,
                        height: i * 4,
                        bgcolor: (theme) =>
                            i <= bars
                                ? color
                                : theme.palette.action.disabledBackground,
                        borderRadius: 0.125,
                    }}
                />
            ))}
        </Box>
    );
};

interface SkillChipTooltipSkillSectionProps {
    title: string;
    items: string[];
    icon: React.ReactElement<SvgIconProps>;
}

const SkillChipTooltipSkillSection = ({
    title,
    items,
    icon,
}: SkillChipTooltipSkillSectionProps) => {
    const titleId = React.useId();
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                    color: (theme) => theme.palette.text.secondary,
                }}
            >
                {React.cloneElement(icon, {
                    "sx": {
                        fontSize: 16,
                        color: (theme) => theme.palette.text.secondary,
                    },
                    "aria-hidden": true,
                })}
                <Typography id={titleId} variant="caption" fontWeight={600}>
                    {title}
                </Typography>
            </Box>
            <Box
                component="ul"
                aria-labelledby={titleId}
                sx={{
                    "m": 0,
                    "pl": 0,
                    "listStyle": "none",
                    "& li": {
                        "fontSize": "0.75rem",
                        "mb": 0.5,
                        "pl": 3,
                        "position": "relative",
                        "&:before": {
                            content: '""',
                            position: "absolute",
                            left: (theme) => theme.spacing(1.25),
                            top: (theme) => theme.spacing(1),
                            width: 3,
                            height: 3,
                            borderRadius: "50%",
                            backgroundColor: (theme) =>
                                theme.palette.text.disabled,
                        },
                        "&:last-child": {
                            mb: 0,
                        },
                    },
                }}
            >
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </Box>
        </Box>
    );
};

interface SkillChipTooltipProps {
    id: string;
    anchorEl: HTMLElement | null;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    skill: Skill;
}

const SkillChipTooltip = ({
    id,
    anchorEl,
    onMouseEnter,
    onMouseLeave,
    skill,
}: SkillChipTooltipProps): React.ReactElement => {
    const theme = useTheme();
    return (
        <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement="top"
            modifiers={[
                {
                    name: "offset",
                    options: { offset: [0, 8] },
                },
                {
                    name: "preventOverflow",
                    options: { padding: 20 },
                },
            ]}
            // "modal" resolves to theme.zIndex.modal, placing the tooltip at the
            // same layer as dialogs so it doesn't float above them when one is open
            sx={{ zIndex: "modal" }}
            transition
        >
            {/* transition prop on Popper enables the render prop pattern, giving access to
            TransitionProps which are forwarded to Fade for a smooth enter/exit animation */}
            {({ TransitionProps }) => (
                <Fade
                    {...TransitionProps}
                    timeout={theme.transitions.duration.shortest}
                >
                    <Paper
                        id={id}
                        role="tooltip"
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.background.paper,
                            color: (theme) => theme.palette.text.primary,
                            maxWidth: 320,
                            fontSize: (theme) => theme.typography.pxToRem(12),
                            border: "1px solid",
                            borderColor: (theme) => theme.palette.divider,
                            boxShadow: 4,
                            p: 1.5,
                            borderRadius: 2,
                        }}
                    >
                        <Stack spacing={1.5} sx={{ p: 0.5 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 2,
                                    pb: 0.5,
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={700}
                                >
                                    {skill.name}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        backgroundColor: (theme) =>
                                            theme.palette.action.hover,
                                        px: 1,
                                        py: 0.25,
                                        borderRadius: 1,
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        color="text.primary"
                                        fontWeight={500}
                                    >
                                        {skill.level}
                                    </Typography>
                                    <ProficiencyIndicator level={skill.level} />
                                </Box>
                            </Box>

                            {/* Experiences */}
                            {skill.usage.experiences.length > 0 && (
                                <SkillChipTooltipSkillSection
                                    title="Used as"
                                    icon={<WorkIcon />}
                                    items={skill.usage.experiences.map(
                                        (e) => `${e.name} at ${e.institute}`,
                                    )}
                                />
                            )}

                            {/* Divider */}
                            {skill.usage.experiences.length > 0 &&
                                (skill.usage.projects.length > 0 ||
                                    skill.usage.certifications.length > 0) && (
                                    <Divider />
                                )}

                            {/* Projects */}
                            {skill.usage.projects.length > 0 && (
                                <SkillChipTooltipSkillSection
                                    title="Applied in"
                                    icon={<CodeIcon />}
                                    items={skill.usage.projects.map(
                                        (p) => p.name,
                                    )}
                                />
                            )}

                            {/* Divider */}
                            {skill.usage.projects.length > 0 &&
                                skill.usage.certifications.length > 0 && (
                                    <Divider />
                                )}

                            {/* Certifications */}
                            {skill.usage.certifications.length > 0 && (
                                <SkillChipTooltipSkillSection
                                    title="Proven via"
                                    icon={<WorkspacePremiumIcon />}
                                    items={skill.usage.certifications.map(
                                        (c) => c.name,
                                    )}
                                />
                            )}
                        </Stack>
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
};

interface SkillChipProps {
    skill: Skill;
}

const SkillChip = ({ skill }: SkillChipProps): React.ReactElement => {
    const hasContent =
        skill.usage.experiences.length > 0 ||
        skill.usage.projects.length > 0 ||
        skill.usage.certifications.length > 0;

    const tooltipId = React.useId();
    const { scheduleOpen, scheduleClose, cancelClose, close, anchorEl } =
        useHoverDelay();

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        scheduleOpen(event.currentTarget);
    };

    const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
        scheduleOpen(event.currentTarget);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            close();
        }
    };

    return (
        <>
            <Chip
                label={
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {skill.name}{" "}
                        <ProficiencyIndicator level={skill.level} />
                    </Box>
                }
                variant="outlined"
                onMouseEnter={hasContent ? handleMouseEnter : undefined}
                onMouseLeave={hasContent ? scheduleClose : undefined}
                onFocus={hasContent ? handleFocus : undefined}
                onBlur={hasContent ? scheduleClose : undefined}
                onKeyDown={hasContent ? handleKeyDown : undefined}
                tabIndex={hasContent ? 0 : undefined}
                aria-label={`${skill.name} - ${skill.level} level.`}
                aria-describedby={hasContent ? tooltipId : undefined}
                sx={{
                    "&:hover": { cursor: "default" },
                }}
            />
            {hasContent && (
                <SkillChipTooltip
                    id={tooltipId}
                    anchorEl={anchorEl}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    skill={skill}
                />
            )}
        </>
    );
};

export default SkillChip;
