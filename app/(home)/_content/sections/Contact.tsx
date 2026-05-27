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

import { LinkButton, Paragraph } from "@/components/content";
import {
    Button,
    Card,
    CardContent,
    CopyButton,
    ScrollReveal,
} from "@/components/primitives";
import { CONTACT_EMAIL } from "@/constants/metadata";
import Profiles from "@/constants/profiles";

const Contact = (): React.ReactElement => (
    <ScrollReveal>
        <Card className="relative mb-16 md:mb-24">
            {/* Decorative blobs */}
            <div
                aria-hidden={true}
                className="pointer-events-none absolute -top-24 -right-24 size-120 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_9%,transparent),transparent_70%)]"
            />
            <div
                aria-hidden={true}
                className="pointer-events-none absolute -bottom-20 -left-20 size-75 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_6%,transparent),transparent_70%)]"
            />

            <CardContent className="relative z-10 flex flex-col items-center gap-10 p-8 sm:p-12 md:p-16 lg:flex-row lg:gap-16">
                {/* Left: heading + profile links */}
                <div className="w-full lg:flex-1">
                    <p className="mb-4 text-3xl leading-snug font-normal tracking-tight sm:text-[2rem] md:text-4xl">
                        Let&rsquo;s build something
                        <br />
                        <span className="text-primary">amazing together.</span>
                    </p>
                    <Paragraph
                        textAlign="start"
                        className="text-muted-foreground mb-8 max-w-lg text-lg leading-relaxed font-light"
                    >
                        I am always open to discussing new opportunities,
                        collaborations, or just having a chat about technology.
                    </Paragraph>
                    <ul
                        role="list"
                        aria-label="Social profiles"
                        className="flex flex-wrap justify-center gap-3 lg:justify-start"
                    >
                        {Object.entries(Profiles).map(
                            ([profileKey, profile]) => (
                                <li key={profileKey}>
                                    <LinkButton
                                        href={profile.url}
                                        name={profile.name}
                                        startIcon={profile.Icon}
                                        target="_blank"
                                        rel="me"
                                        className="text-foreground border-primary/33 hover:bg-muted"
                                    />
                                </li>
                            ),
                        )}
                    </ul>
                </div>

                {/* Right: email CTA */}
                <div className="flex flex-col items-center gap-3">
                    {/* Plain <a> is used instead of the custom Link or
                    LinkButton (which both wrap next/link internally) because
                    next/link treats mailto: as an invalid href — it issues a
                    dev warning and can cause unexpected behaviour (e.g. mail
                    app flooding on macOS). role="link" overrides the
                    role="button" that @base-ui adds when nativeButton={false},
                    keeping screen reader semantics correct. */}
                    <Button
                        nativeButton={false}
                        render={<a href={`mailto:${CONTACT_EMAIL}`} />}
                        role="link"
                        aria-label={`Say Hello, send an email to ${CONTACT_EMAIL}`}
                        className="h-auto relative flex items-center gap-2.5 overflow-hidden rounded-full px-10 py-3.5 text-lg font-bold after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-3/5 after:translate-x-[-200%] after:bg-linear-[105deg,transparent_20%,rgba(255,255,255,0.18)_50%,transparent_80%] motion-safe:transition-transform motion-safe:duration-250 motion-safe:after:transition-transform motion-safe:after:duration-700 motion-safe:hover:-translate-y-1 motion-safe:hover:after:translate-x-[300%]"
                    >
                        <Mail size={20} aria-hidden={true} />
                        Say Hello
                    </Button>

                    <div className="flex items-center gap-1">
                        {/* Intentionally unstyled beyond muted text — the
                        "Say Hello" button above handles all primary contact
                        interactions. This link is a plain fallback for users
                        who click directly on the visible email address. */}
                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            translate="no"
                            className="text-muted-foreground text-sm font-normal hover:text-foreground focus-visible:rounded-sm focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-safe:transition-colors motion-safe:duration-150"
                        >
                            {CONTACT_EMAIL}
                        </a>

                        <CopyButton
                            label="Copy email"
                            copyContent={CONTACT_EMAIL}
                            className="text-muted-foreground motion-safe:transition-colors motion-safe:duration-150"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    </ScrollReveal>
);

export default Contact;
