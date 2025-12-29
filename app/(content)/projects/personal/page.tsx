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
import type { Metadata } from "next";
import type React from "react";

import {
    Link,
    List,
    ListItem,
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Title,
} from "@/components/content";
import { Logos } from "@/constants/logos";
import { FULL_NAME } from "@/constants/metadata";

interface UseCasesSectionProps {
    children: React.ReactNode;
}

const UseCasesSection = ({
    children,
}: UseCasesSectionProps): React.ReactElement => (
    <Box sx={{ m: 0, pt: 2 }}>
        <Typography
            sx={{
                fontWeight: 500,
                letterSpacing: "-0.01em",
                mb: 2,
            }}
        >
            Use Cases:
        </Typography>
        <List>{children}</List>
    </Box>
);

export const metadata: Metadata = {
    title: `${FULL_NAME} | Personal Projects`,
    description: `Personal projects developed by ${FULL_NAME}.`,
};

const PersonalProjects = (): React.ReactElement => {
    const k8sReplicatorLogo = (
        <Logo logo={Logos.K8sReplicator} height="3.5em" />
    );
    const meshManagerLogo = <Logo logo={Logos.MeshManager} height="4.5em" />;

    const generateLink = (text: string, href: string): React.ReactElement => (
        <Link href={href} target="_blank">
            {text}
        </Link>
    );
    const Secret = generateLink(
        "Secret",
        "https://kubernetes.io/docs/concepts/configuration/secret/",
    );
    const ConfigMap = generateLink(
        "Config Map",
        "https://kubernetes.io/docs/concepts/configuration/configmap/",
    );
    const NetworkPolicy = generateLink(
        "Network Policy",
        "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    );
    return (
        <>
            <Title>Personal Projects</Title>
            <Section>
                <SectionHeading
                    logo={k8sReplicatorLogo}
                    actionButton={{
                        href: "https://github.com/nadundesilva/k8s-replicator",
                        name: "View on GitHub",
                        icon: Launch,
                    }}
                >
                    K8s Replicator
                </SectionHeading>
                <Paragraph>
                    In Kubernetes deployments when the same {Secret},{" "}
                    {ConfigMap} or {NetworkPolicy} needs to be accessed across
                    multiple namespaces, it needs to be manually created in all
                    of them. This handy Kubernetes controller can come to your
                    rescue. It will automatically watch the namespaces and
                    create the resources in them as soon as they are created. By
                    doing so, this will allow removing some of the burden on the
                    operational aspects.
                </Paragraph>
                <UseCasesSection>
                    <ListItem>
                        <Typography>
                            Use a wildcard TLS Secret across namespaces.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Use a Config Map containing configurations for
                            connecting into a DB across namespaces.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Apply common network level restrictions using
                            Network Policies across namespaces.
                        </Typography>
                    </ListItem>
                </UseCasesSection>
            </Section>
            <Section>
                <SectionHeading
                    logo={meshManagerLogo}
                    actionButton={{
                        href: "https://github.com/nadundesilva/mesh-manager",
                        name: "View on GitHub",
                        icon: Launch,
                    }}
                >
                    Mesh Manager
                </SectionHeading>
                <Paragraph>
                    When working with a large deployment based on a
                    microservices architecture, it can get quite complex when
                    the number of microservices grows to a very large number.
                    This controller allows the users to declaratively specify
                    the microservices including its dependencies so that the
                    controller will properly manage them.
                </Paragraph>
                <UseCasesSection>
                    <ListItem>
                        <Typography>
                            Ensuring that dependencies are not removed when
                            microservices are still using them.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Ensuring the order of startup based on the
                            dependencies.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Finding all the microservices that depend on a given
                            microservice.
                        </Typography>
                    </ListItem>
                </UseCasesSection>
            </Section>
        </>
    );
};

export default PersonalProjects;
