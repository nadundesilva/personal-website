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
import { Launch } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import type { Metadata } from "next";
import type React from "react";

import {
    AccentedList,
    Link,
    ListItem,
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Title,
} from "@/components/content";
import Certificates, { type Certificate } from "@/constants/certificates";
import Institutes, { type Institute } from "@/constants/institutes";
import { FULL_NAME } from "@/constants/metadata";
import People, { type Person } from "@/constants/people";

export const metadata: Metadata = {
    title: "Certifications",
    description: `Various certifications obtained by ${FULL_NAME}.`,
};

interface CertificationSectionHeadingProps {
    id: string;
    certificate: Certificate;
}

const CertificationSectionHeading = ({
    id,
    certificate,
}: CertificationSectionHeadingProps): React.ReactElement => (
    <SectionHeading
        id={id}
        date={certificate.completedOn}
        logo={
            <Logo
                srcLight={certificate.logo.srcLight}
                srcDark={certificate.logo.srcDark}
                alt=""
                recommendedSx={{ height: "5em" }}
            />
        }
        actionButton={{
            href: certificate.link,
            name: "View Credential",
            ariaLabel: `View credential: ${certificate.name}`,
            endIcon: Launch,
        }}
    >
        {certificate.name}
        <Box component="span" sx={visuallyHidden}>
            {" "}
            from {certificate.issuer.name}
        </Box>
    </SectionHeading>
);

const Certifications = (): React.ReactElement => {
    const generateLink = (text: string, href: string): React.ReactElement => (
        <Link href={href} target="_blank">
            {text}
        </Link>
    );

    const generateInstituteLink = (institute: Institute): React.ReactElement =>
        generateLink(institute.name, institute.link);
    const AlbertaMachineIntelligenceInstitute = generateInstituteLink(
        Institutes.AlbertaMachineIntelligenceInstitute,
    );
    const UniversityOfAlberta = generateInstituteLink(
        Institutes.UniversityOfAlberta,
    );
    const DeepLearningAi = generateInstituteLink(Institutes.DeepLearningAi);
    const Coursera = generateInstituteLink(Institutes.Coursera);
    const LinuxFoundation = generateInstituteLink(Institutes.LinuxFoundation);

    const generatePersonLink = (person: Person): React.ReactElement =>
        generateLink(person.name, person.profile);
    const AndrewNg = generatePersonLink(People.AndrewNg);
    const SharonZhou = generatePersonLink(People.SharonZhou);
    const AdamWhite = generatePersonLink(People.AdamWhite);
    const MarthaWhite = generatePersonLink(People.MarthaWhite);

    const CertifiedKubernetesApplicationDeveloper = generateLink(
        "Certified Kubernetes Application Developer",
        "https://www.cncf.io/certification/ckad/",
    );
    const CertifiedKubernetesAdministrator = generateLink(
        "Certified Kubernetes Administrator",
        "https://www.cncf.io/certification/cka/",
    );
    const Kubernetes = generateLink("Kubernetes", "https://kubernetes.io/");
    const Etcd = generateLink("etcd", "https://etcd.io/");

    return (
        <>
            <Title>Certifications</Title>
            <Section labelledById="section-cert-rl">
                <CertificationSectionHeading
                    id="section-cert-rl"
                    certificate={
                        Certificates.FundamentalsOfReinforcementLearning
                    }
                />
                <Paragraph>
                    This course is offered by{" "}
                    {AlbertaMachineIntelligenceInstitute} at the{" "}
                    {UniversityOfAlberta} on {Coursera}, taught mainly by{" "}
                    {AdamWhite} &amp; {MarthaWhite}. It covers the basics of
                    Reinforcement Learning.
                </Paragraph>
            </Section>
            <Section labelledById="section-cert-gans">
                <CertificationSectionHeading
                    id="section-cert-gans"
                    certificate={
                        Certificates.BuildBasicGenerativeAdversarialNetworks
                    }
                />
                <Paragraph>
                    This course is offered by {DeepLearningAi} on {Coursera},
                    taught mainly by {SharonZhou}. It covers how the{" "}
                    <abbr title="Generative Adversarial Networks">GANs</abbr>{" "}
                    work as well as some of the latest developments in this
                    Neural Network architecture.
                </Paragraph>
            </Section>
            <Section labelledById="section-cert-dl">
                <CertificationSectionHeading
                    id="section-cert-dl"
                    certificate={Certificates.DeepLearningSpecialization}
                />
                <Paragraph>
                    Deep Learning specialization is offered by {DeepLearningAi}{" "}
                    on {Coursera}, taught mainly by {AndrewNg}. It is an
                    excellent specialization consisting of five courses covering
                    a deep dive into Deep Learning as well as many novel Deep
                    Learning architectures. The specialization included
                    coursework as well as{" "}
                    <abbr title="Multiple Choice Questions">MCQ</abbr> and
                    Lab-based hands-on evaluations.
                </Paragraph>
                <AccentedList heading="Course Content" headingVariant="h3">
                    <ListItem>
                        <Typography>
                            Neural Networks and Deep Learning
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Improving Deep Neural Networks: Hyperparameter
                            Tuning, Regularization and Optimization
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Structuring Machine Learning Projects
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>Convolutional Neural Networks</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>Sequence Models</Typography>
                    </ListItem>
                </AccentedList>
            </Section>
            <Section labelledById="section-cert-cka">
                <CertificationSectionHeading
                    id="section-cert-cka"
                    certificate={Certificates.CertifiedKubernetesAdministrator}
                />
                <Paragraph>
                    {CertifiedKubernetesAdministrator} is offered and governed
                    by the {LinuxFoundation}. This covers the administrative
                    aspects and in-depth knowledge about {Kubernetes} Clusters
                    including {Etcd} clusters. The{" "}
                    <abbr title="Certified Kubernetes Administrator">CKA</abbr>{" "}
                    certification is a standard for Kubernetes administrators.
                </Paragraph>
            </Section>
            <Section labelledById="section-cert-ckad">
                <CertificationSectionHeading
                    id="section-cert-ckad"
                    certificate={
                        Certificates.CertifiedKubernetesApplicationDeveloper
                    }
                />
                <Paragraph>
                    {CertifiedKubernetesApplicationDeveloper} is offered and
                    governed by the {LinuxFoundation}. This covers aspects
                    related to developing applications to be run on {Kubernetes}
                    . The{" "}
                    <abbr title="Certified Kubernetes Application Developer">
                        CKAD
                    </abbr>{" "}
                    certification is a common requirement for Cloud Native
                    developers.
                </Paragraph>
            </Section>
        </>
    );
};

export default Certifications;
