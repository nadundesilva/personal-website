/*
 * Copyright (c) 2022, Nadun De Silva. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { GitHub } from "@mui/icons-material";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

import { Paragraph, Section, SectionHeading } from "@/components/content";
import Layout, { LayoutContent } from "@/components/layout";

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
                endIcon={<GitHub />}
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
        <Container maxWidth={false} disableGutters>
            <Head>
                <title>Nadun De Silva | Personal Projects</title>
            </Head>
            <Layout>
                <LayoutContent>
                    <Section>
                        <SectionHeading>K8s Replicator</SectionHeading>
                        <ViewOnGitHubButton
                            repoOrg="nadundesilva"
                            repoName="k8s-replicator"
                        />
                        <Paragraph>
                            In Kubernetes deployments when the same {Secret},{" "}
                            {ConfigMap} or {NetworkPolicy} needs to be accessed
                            across multiple namespaces, it needs to be manually
                            created in all of them, this handy Kubernetes
                            controller can come to your rescue. It will
                            automatically watch the namespaces and create the
                            resources in them as soon as they are created. By
                            doing so, this will allow removing some of the
                            burden on the operational aspects
                        </Paragraph>
                        <UseCasesSection>
                            <li>
                                Use a wildcard TLS Secret across namespaces.
                            </li>
                            <li>
                                Use a Config Map containing configurations for
                                connecting into a DB across namespaces.
                            </li>
                            <li>
                                Aply common network level restrictions using
                                Network POlicies across namespaces.
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
                            microservices architecture, it can get quite complex
                            when the number of microservices grows to a very
                            large number. This controller allows the users to
                            declaratively specify the microservices including
                            its dependencies so that the controller will
                            properly manage them.
                        </Paragraph>
                        <UseCasesSection>
                            <li>
                                Ensuring that dependencies are not removed when
                                microservices using it is still using them.
                            </li>
                            <li>
                                Ensuring the order of startup based on the
                                dependencies.
                            </li>
                            <li>
                                Finding all the microservices that depends on a
                                given microservice.
                            </li>
                        </UseCasesSection>
                    </Section>
                </LayoutContent>
            </Layout>
        </Container>
    );
};

export default PersonalProjects;
