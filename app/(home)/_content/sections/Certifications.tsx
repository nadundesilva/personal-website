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

import { Badge, Card, StaggerReveal } from "@/components/primitives";
import Certificates, { type Certificate } from "@/constants/certificates";

const IMAGE_SIZES =
    "(min-width: 1536px) 25vw, (min-width: 900px) 34vw, (min-width: 600px) 50vw, 100vw";

const CERTIFICATIONS: Certificate[] = [
    Certificates.CertifiedKubernetesAdministrator,
    Certificates.CertifiedKubernetesApplicationDeveloper,
    Certificates.FundamentalsOfReinforcementLearning,
    Certificates.DeepLearningSpecialization,
    Certificates.BuildBasicGenerativeAdversarialNetworks,
];

const Certifications = (): React.ReactElement => (
    <div className="flex flex-wrap justify-center gap-4">
        <StaggerReveal>
            {CERTIFICATIONS.map((cert) => (
                <Card
                    key={cert.name}
                    href={cert.link}
                    target="_blank"
                    className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)]"
                    logo={
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
                    }
                >
                    <div className="flex flex-1 flex-col items-start">
                        <h3 className="mb-4 text-base leading-snug md:text-[17px]">
                            {cert.name}
                        </h3>
                        <div className="flex-1" />
                        <Badge
                            variant="secondary"
                            className="mb-3 h-5.5 text-[10px] md:h-6 md:text-[11px]"
                        >
                            {cert.type}
                        </Badge>
                        <p className="text-muted-foreground mt-1 text-[11px] md:text-[12px]">
                            Issued by
                            <br />
                            {cert.issuer.name}
                        </p>
                    </div>
                </Card>
            ))}
        </StaggerReveal>
    </div>
);

export default Certifications;
