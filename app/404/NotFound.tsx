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
import "./NotFound.css";

import type React from "react";

import { LinkButton } from "@/components/content";
import { ContentContainer } from "@/components/layout";

const NotFound = (): React.ReactElement => (
    <ContentContainer>
        <div className="flex flex-col items-center py-16 text-center md:py-24">
            {/* Floating 404 */}
            <p
                aria-hidden="true"
                className="text-primary mb-6 text-[7rem] leading-none font-light tracking-tighter opacity-35 select-none motion-safe:animate-not-found-float md:text-[11rem] md:opacity-40"
            >
                404
            </p>

            {/* Title + accent line */}
            <div className="mb-8 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.05s]">
                <h1 className="mb-3 text-4xl font-bold tracking-tight">
                    Page Not Found
                </h1>
                <div
                    aria-hidden="true"
                    className="mx-auto h-0.5 w-20 rounded bg-linear-to-r from-transparent via-primary to-transparent opacity-65 md:w-36"
                />
            </div>

            <p className="text-muted-foreground mb-10 max-w-105 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.15s]">
                The page you&apos;re looking for doesn&apos;t exist or may have
                been moved.
            </p>

            <div className="flex flex-wrap justify-center gap-4 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0.25s]">
                <LinkButton href="/" name="Go to Homepage" />
                <LinkButton href="/blog-articles" name="Browse Blog Articles" />
            </div>
        </div>
    </ContentContainer>
);

export default NotFound;
