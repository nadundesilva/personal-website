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

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Separator,
} from "@/components/primitives";
import { type SkillProficiency } from "@/constants/skill-categories";
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
}: SkillChipPopoverSkillSectionProps) => {
    const titleId = `skill-popover-${title.toLowerCase().replace(/\s+/g, "-")}`;
    return (
        <div>
            <div className="text-muted-foreground mb-1 flex items-center gap-2">
                {icon}
                <span id={titleId} className="text-xs font-semibold">
                    {title}
                </span>
            </div>
            <ul aria-labelledby={titleId} className="m-0 list-none p-0">
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
    level: SkillProficiency;
    experiences: string[];
    projects: string[];
    certifications: string[];
    chipClassName: string;
    children: React.ReactNode;
}

const SkillChipPopover = ({
    name,
    level,
    experiences,
    projects,
    certifications,
    chipClassName,
    children,
}: SkillChipPopoverProps): React.ReactElement => {
    const [open, setOpen] = useState(false);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
    // True while the mouse pointer is inside the trigger or the popover content.
    // Used to block onOpenChange(false) that originates from a click while hovering.
    const isMouseInsideRef = useRef(false);

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
        // is via a click on the trigger. Mouse users should close by moving away.
        if (!newOpen && isMouseInsideRef.current) return;
        setOpen(newOpen);
    };

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger
                render={
                    <button
                        type="button"
                        aria-label={`${name} - ${level} level. Hover or click for details.`}
                        className={chipClassName}
                        onPointerDown={(e) => {
                            if (e.pointerType === "mouse") e.preventDefault();
                        }}
                        onPointerEnter={(e) => {
                            if (e.pointerType === "mouse") {
                                isMouseInsideRef.current = true;
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
                className="border-border bg-popover text-popover-foreground flex max-w-xs flex-col items-stretch gap-3 rounded-lg border p-3.5 shadow-md ring-0"
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
                    <span className="text-sm font-bold">{name}</span>
                    <div className="bg-foreground/6 flex items-center gap-2 rounded px-2 py-0.5">
                        <span className="text-xs font-medium">{level}</span>
                        <SkillChipProficiencyIndicator level={level} />
                    </div>
                </div>

                {experiences.length > 0 && (
                    <SkillChipPopoverSkillSection
                        title="Used as"
                        icon={<Briefcase size={14} aria-hidden />}
                        items={experiences}
                    />
                )}

                {experiences.length > 0 &&
                    (projects.length > 0 || certifications.length > 0) && (
                        <Separator />
                    )}

                {projects.length > 0 && (
                    <SkillChipPopoverSkillSection
                        title="Applied in"
                        icon={<Code2 size={14} aria-hidden />}
                        items={projects}
                    />
                )}

                {projects.length > 0 && certifications.length > 0 && (
                    <Separator />
                )}

                {certifications.length > 0 && (
                    <SkillChipPopoverSkillSection
                        title="Proven via"
                        icon={<Award size={14} aria-hidden />}
                        items={certifications}
                    />
                )}
            </PopoverContent>
        </Popover>
    );
};

export default SkillChipPopover;
