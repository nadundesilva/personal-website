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
import Image from "next-image-export-optimizer";
import type React from "react";

import { Link } from "@/components/content";
import {
    Badge,
    Card,
    CardHeader,
    CardTitle,
    StaggerReveal,
} from "@/components/primitives";
import Certificates, { type Certificate } from "@/constants/certificates";
import { generateSizesForColumnLayout } from "@/utils/common/image-sizes";

// Logo inside mx-5 p-2 (56px inset) or md:mx-7 p-2 (72px inset). flex-wrap gap-4 (16px).
const IMAGE_SIZES = generateSizesForColumnLayout({
    lg: { cols: 3, gapPx: 16, columnInsetPx: 72 },
    md: { cols: 2, gapPx: 16, columnInsetPx: 72 },
    sm: { cols: 2, gapPx: 16, columnInsetPx: 56 },
    default: { cols: 1, columnInsetPx: 56 },
});

const CERTIFICATIONS: Certificate[] = [
    Certificates.CertifiedKubernetesAdministrator,
    Certificates.CertifiedKubernetesApplicationDeveloper,
    Certificates.FundamentalsOfReinforcementLearning,
    Certificates.DeepLearningSpecialization,
    Certificates.BuildBasicGenerativeAdversarialNetworks,
];

const Certifications = (): React.ReactElement => (
    /* Flexbox instead of CSS Grid: CSS Grid shares the same column tracks across
       all rows, so justify-content has no free space to center partial rows with.
       Flexbox wraps independently per row; calc() deducts each card's share of
       the gap so full rows fill exactly 100% and partial rows stay the same
       card width, leaving free space for justify-center to center them. */
    <StaggerReveal
        element="ul"
        className="flex flex-wrap justify-center gap-4"
        itemClassName="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
    >
        {CERTIFICATIONS.map((cert) => (
            <Link
                key={cert.name}
                href={cert.link}
                target="_blank"
                className="group block h-full w-full overflow-visible rounded-lg text-foreground font-normal hover:no-underline hover:opacity-100 focus-visible:rounded-lg motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-bounce-out motion-safe:hover:scale-[1.02]"
            >
                <Card className="h-full hover:bg-accent/5 hover:shadow-md motion-safe:transition-[background-color,box-shadow] motion-safe:duration-300">
                    <div className="bg-primary/3 mx-5 mt-5 overflow-hidden rounded-lg p-2 md:mx-7 md:mt-7">
                        <div className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-bounce-out motion-safe:group-hover:scale-[1.06]">
                            <div className="relative aspect-10/7 w-full">
                                <Image
                                    src={cert.logo.srcLight}
                                    alt=""
                                    fill
                                    sizes={IMAGE_SIZES}
                                    className="object-contain dark:hidden"
                                />
                                <Image
                                    src={cert.logo.srcDark}
                                    alt=""
                                    fill
                                    sizes={IMAGE_SIZES}
                                    className="hidden object-contain dark:block"
                                />
                            </div>
                        </div>
                    </div>
                    <CardHeader className="items-center gap-3 px-5 pt-6 pb-5 text-center md:px-7 md:pb-7">
                        <CardTitle translate="no" className="text-[17px]">
                            {cert.name}
                        </CardTitle>
                        <Badge variant="outline">{cert.type}</Badge>
                        <dl className="text-muted-foreground text-[11px] md:text-[12px]">
                            <dt>Issued by</dt>
                            <dd>
                                <span translate="no">{cert.issuer.name}</span>
                            </dd>
                        </dl>
                    </CardHeader>
                </Card>
            </Link>
        ))}
    </StaggerReveal>
);

export default Certifications;
