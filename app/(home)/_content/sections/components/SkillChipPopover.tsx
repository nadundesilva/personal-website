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
"use client";

import { Award, Briefcase, Code2 } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { type SkillProficiency } from "@/constants/skill-categories";
import {
    Popover,
    PopoverContent,
    PopoverTitle,
    PopoverTrigger,
    Separator,
} from "@/shadcn/ui";
import SkillChipProficiencyIndicator from "./SkillProficiencyIndicator";

interface SkillChipPopoverSkillSectionProps {
    title: string;
    items: string[];
    icon: React.ReactElement;
}

const SkillChipPopoverSkillSection = ({
    title,
    items,
    icon,
}: SkillChipPopoverSkillSectionProps): React.ReactElement => {
    const titleId = `skill-popover-${title.toLowerCase().replace(/\s+/g, "-")}`;
    return (
        <div>
            <div className="text-muted-foreground mb-1 flex items-center gap-2">
                {icon}
                <span id={titleId} className="text-xs font-semibold">
                    {title}
                </span>
            </div>
            {/* VoiceOver in Safari strips list semantics when list-style: none is applied by Tailwind preflight — role="list" restores them. */}
            <ul role="list" aria-labelledby={titleId}>
                {items.map((item) => (
                    <li
                        key={item}
                        className="before:bg-muted-foreground/50 relative mb-1 pl-5 text-xs before:absolute before:top-2 before:left-2 before:size-0.75 before:rounded-full before:content-[''] last:mb-0"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export interface SkillChipPopoverProps {
    name: string;
    proficiencyLevel: SkillProficiency;
    experiences: string[];
    projects: string[];
    certifications: string[];
    chipClassName: string;
    children: React.ReactNode;
}

// Tooltip is semantically correct for hover content but doesn't support complex
// structured children. Popover is used here with custom hover logic to accommodate
// the multi-section skill detail content.
const SkillChipPopover = ({
    name,
    proficiencyLevel,
    experiences,
    projects,
    certifications,
    chipClassName,
    children,
}: SkillChipPopoverProps): React.ReactElement => {
    const [open, setOpen] = useState(false);

    // True when the popover was opened by mouse hover rather than keyboard/click.
    // Passed to Popover returnFocus to suppress @base-ui/react's automatic
    // focus-return on close, which is correct for keyboard users but jarring for
    // hover users who never focused the trigger in the first place.
    const [openedByMouse, setOpenedByMouse] = useState(false);

    // True while the mouse pointer is inside the trigger or the popover content.
    // Used to block onOpenChange(false) that originates from a click while hovering.
    const isMouseInsideRef = useRef(false);

    const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        return () => {
            if (closeTimerRef.current !== null)
                clearTimeout(closeTimerRef.current);
        };
    }, []);

    const cancelClose = () => {
        if (closeTimerRef.current !== null) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    };

    const scheduleClose = () => {
        cancelClose();
        closeTimerRef.current = setTimeout(() => setOpen(false), 150);
    };

    const handleOpenChange = (newOpen: boolean) => {
        // When the mouse is inside, the only way the popover can be asked to close
        // is by moving away from the chip.
        if (!newOpen && isMouseInsideRef.current) return;

        if (newOpen) setOpenedByMouse(false);
        setOpen(newOpen);
    };

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger
                render={
                    <button
                        type="button"
                        // PopoverTrigger merges aria-haspopup="dialog" and aria-expanded via useRole.
                        aria-label={`${name} - ${proficiencyLevel} level.`}
                        className={chipClassName}
                        onPointerDown={(e) => {
                            if (e.pointerType === "mouse") e.preventDefault();
                        }}
                        onPointerEnter={(e) => {
                            if (e.pointerType === "mouse") {
                                isMouseInsideRef.current = true;
                                setOpenedByMouse(true);
                                cancelClose();
                                setOpen(true);
                            }
                        }}
                        onPointerLeave={(e) => {
                            if (e.pointerType === "mouse") {
                                isMouseInsideRef.current = false;
                                scheduleClose();
                            }
                        }}
                    />
                }
            >
                {children}
            </PopoverTrigger>
            <PopoverContent
                side="top"
                sideOffset={8}
                finalFocus={!openedByMouse}
                className="flex max-w-xs flex-col items-stretch gap-3 border border-border p-3.5 ring-0"
                onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") {
                        isMouseInsideRef.current = true;
                        cancelClose();
                    }
                }}
                onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") {
                        isMouseInsideRef.current = false;
                        scheduleClose();
                    }
                }}
            >
                <div className="flex items-center justify-between gap-4">
                    <PopoverTitle className="text-sm font-bold">
                        {name}
                    </PopoverTitle>
                    <div className="bg-foreground/6 flex items-center gap-2 rounded px-2 py-0.5">
                        <span className="text-xs font-medium">
                            {proficiencyLevel}
                        </span>
                        <SkillChipProficiencyIndicator
                            proficiencyLevel={proficiencyLevel}
                        />
                    </div>
                </div>

                {experiences.length > 0 && (
                    <SkillChipPopoverSkillSection
                        title="Used as"
                        icon={<Briefcase size={14} aria-hidden={true} />}
                        items={experiences}
                    />
                )}

                {experiences.length > 0 &&
                    (projects.length > 0 || certifications.length > 0) && (
                        <Separator aria-hidden={true} />
                    )}

                {projects.length > 0 && (
                    <SkillChipPopoverSkillSection
                        title="Applied in"
                        icon={<Code2 size={14} aria-hidden={true} />}
                        items={projects}
                    />
                )}

                {projects.length > 0 && certifications.length > 0 && (
                    <Separator aria-hidden={true} />
                )}

                {certifications.length > 0 && (
                    <SkillChipPopoverSkillSection
                        title="Proven via"
                        icon={<Award size={14} aria-hidden={true} />}
                        items={certifications}
                    />
                )}
            </PopoverContent>
        </Popover>
    );
};

export default SkillChipPopover;
