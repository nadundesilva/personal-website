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
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import { Launch } from "@mui/icons-material";
import { Box, Button, Link, Typography } from "@mui/material";
import { type Metadata } from "next";
import React from "react";

import {
    Paragraph,
    Section,
    SectionHeading,
    Title,
} from "@/components/content";

interface ViewOnGitHubButtonProps {
    repoOrg: string;
    repoName: string;
}

const ViewOnGitHubButton = (
    props: ViewOnGitHubButtonProps,
): React.ReactElement => (
    <Box sx={{ pt: 1 }}>
        <Link
            target={"_blank"}
            href={`https://github.com/${props.repoOrg}/${props.repoName}`}
        >
            <Button
                sx={{ color: "#000000" }}
                size="small"
                variant="outlined"
                // TODO: Switch to GitHub icon
                endIcon={<Launch />}
            >
                View on GitHub
            </Button>
        </Link>
    </Box>
);

interface UseCasesSectionProps {
    children: React.ReactNode;
}

const UseCasesSection = ({
    children,
}: UseCasesSectionProps): React.ReactElement => (
    <Box sx={{ m: 0, pt: 2, textAlign: "justify" }}>
        <Typography sx={{ fontWeight: "bold" }}>Use Cases:</Typography>
        <ul>{children}</ul>
    </Box>
);

export const metadata: Metadata = {
    title: "Nadun De Silva | Personal Projects",
};

const PersonalProjects = (): React.ReactElement => {
    const Secret = (
        <Link
            target={"_blank"}
            href={"https://kubernetes.io/docs/concepts/configuration/secret/"}
        >
            Secret
        </Link>
    );
    const ConfigMap = (
        <Link
            target={"_blank"}
            href={
                "https://kubernetes.io/docs/concepts/configuration/configmap/"
            }
        >
            Config Map
        </Link>
    );
    const NetworkPolicy = (
        <Link
            target={"_blank"}
            href={
                "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
            }
        >
            Network Policy
        </Link>
    );
    return (
        <React.Fragment>
            <Title>Personal Projects</Title>
            <Section>
                <SectionHeading>K8s Replicator</SectionHeading>
                <ViewOnGitHubButton
                    repoOrg="nadundesilva"
                    repoName="k8s-replicator"
                />
                <Paragraph>
                    In Kubernetes deployments when the same {Secret},{" "}
                    {ConfigMap} or {NetworkPolicy} needs to be accessed across
                    multiple namespaces, it needs to be manually created in all
                    of them, this handy Kubernetes controller can come to your
                    rescue. It will automatically watch the namespaces and
                    create the resources in them as soon as they are created. By
                    doing so, this will allow removing some of the burden on the
                    operational aspects
                </Paragraph>
                <UseCasesSection>
                    <li>Use a wildcard TLS Secret across namespaces.</li>
                    <li>
                        Use a Config Map containing configurations for
                        connecting into a DB across namespaces.
                    </li>
                    <li>
                        Aply common network level restrictions using Network
                        POlicies across namespaces.
                    </li>
                </UseCasesSection>
            </Section>
            <Section>
                <SectionHeading>Mesh Manager</SectionHeading>
                <ViewOnGitHubButton
                    repoOrg="nadundesilva"
                    repoName="mesh-manager"
                />
                <Paragraph>
                    When working with a large deployment based on a
                    microservices architecture, it can get quite complex when
                    the number of microservices grows to a very large number.
                    This controller allows the users to declaratively specify
                    the microservices including its dependencies so that the
                    controller will properly manage them.
                </Paragraph>
                <UseCasesSection>
                    <li>
                        Ensuring that dependencies are not removed when
                        microservices using it is still using them.
                    </li>
                    <li>
                        Ensuring the order of startup based on the dependencies.
                    </li>
                    <li>
                        Finding all the microservices that depends on a given
                        microservice.
                    </li>
                </UseCasesSection>
            </Section>
        </React.Fragment>
    );
};

export default PersonalProjects;
