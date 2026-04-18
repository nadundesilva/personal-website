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
import { Mail } from "lucide-react";
import type React from "react";

import { LinkButton } from "@/components/content";
import { Button, Card, CardContent, CopyButton } from "@/components/primitives";
import { CONTACT_EMAIL } from "@/constants/metadata";
import Profiles from "@/constants/profiles";

const Contact = (): React.ReactElement => (
    <Card className="relative mb-16 md:mb-24">
        {/* Decorative blobs */}
        <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-120 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_9%,transparent),transparent_70%)]"
        />
        <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 size-75 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_6%,transparent),transparent_70%)]"
        />

        <CardContent className="relative z-10 flex flex-col items-center gap-10 p-8 sm:p-12 md:p-16 lg:flex-row lg:gap-16">
            {/* Left: heading + profile links */}
            <div className="w-full lg:flex-1">
                <h3 className="mb-4 text-3xl leading-snug font-normal tracking-tight sm:text-[2rem] md:text-4xl">
                    Let&apos;s build something
                    <br />
                    <span className="text-primary">amazing together.</span>
                </h3>
                <p className="text-muted-foreground mb-8 max-w-lg text-lg leading-relaxed font-light">
                    I am always open to discussing new opportunities,
                    collaborations, or just having a chat about technology.
                </p>
                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                    {Object.values(Profiles).map((profile) => (
                        <LinkButton
                            key={profile.name}
                            href={profile.link}
                            name={profile.name}
                            startIcon={profile.Icon}
                            target="_blank"
                            className="text-foreground border-primary/33 hover:bg-muted"
                        />
                    ))}
                </div>
            </div>

            {/* Right: email CTA */}
            <div className="flex flex-col items-center gap-3">
                <Button
                    nativeButton={false}
                    render={<a href={`mailto:${CONTACT_EMAIL}`} />}
                    aria-label={`Say Hello, send an email to ${CONTACT_EMAIL}`}
                    className="h-auto relative flex items-center gap-2.5 overflow-hidden rounded-full px-10 py-3.5 text-lg font-bold no-underline after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-3/5 after:translate-x-[-200%] after:bg-linear-[105deg,transparent_20%,rgba(255,255,255,0.18)_50%,transparent_80%] hover:no-underline motion-safe:transition-transform motion-safe:duration-250 motion-safe:after:transition-transform motion-safe:after:duration-700 motion-safe:hover:-translate-y-1 motion-safe:hover:after:translate-x-[300%]"
                >
                    <Mail size={20} aria-hidden />
                    Say Hello
                </Button>
                <div className="flex items-center gap-1">
                    <span className="text-muted-foreground text-sm">
                        {CONTACT_EMAIL}
                    </span>
                    <CopyButton
                        label="Copy email"
                        copyContent={CONTACT_EMAIL}
                        className="text-muted-foreground motion-safe:transition-colors motion-safe:duration-150"
                    />
                </div>
            </div>
        </CardContent>
    </Card>
);

export default Contact;
