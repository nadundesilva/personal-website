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
import { Box, Button, Typography } from "@mui/material";
import { type Metadata } from "next";
import React from "react";

import {
    Link,
    List,
    ListItem,
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
    <Box sx={{ pt: 2 }}>
        <Link
            href={`https://github.com/${props.repoOrg}/${props.repoName}`}
            target="_blank"
        >
            <Button
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
        <List>{children}</List>
    </Box>
);

export const metadata: Metadata = {
    title: "Nadun De Silva | Personal Projects",
};

const PersonalProjects = (): React.ReactElement => {
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
                            Aply common network level restrictions using Network
                            Policies across namespaces.
                        </Typography>
                    </ListItem>
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
                    <ListItem>
                        <Typography>
                            Ensuring that dependencies are not removed when
                            microservices using it is still using them.
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
                            Finding all the microservices that depends on a
                            given microservice.
                        </Typography>
                    </ListItem>
                </UseCasesSection>
            </Section>
        </React.Fragment>
    );
};

export default PersonalProjects;
