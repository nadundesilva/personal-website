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

import { Card, StaggerReveal } from "@/components/primitives";
import Projects, { type Project } from "@/constants/projects";
import SubHeading from "../common/SubHeading";

const IMAGE_SIZES = "(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw";

const ProjectCard = ({
    project,
    headingLevel: Heading,
}: {
    project: Project;
    headingLevel: "h3" | "h4";
}): React.ReactElement => (
    <Card
        href={project.link}
        target="_blank"
        className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)]"
        logo={
            <div className="relative h-20 w-full">
                <Image
                    src={project.logo.srcLight}
                    alt=""
                    fill
                    sizes={IMAGE_SIZES}
                    className="object-contain dark:hidden"
                />
                <Image
                    src={project.logo.srcDark}
                    alt=""
                    fill
                    sizes={IMAGE_SIZES}
                    className="hidden object-contain dark:block"
                />
            </div>
        }
    >
        <Heading className="mb-3 text-center text-[17px] leading-snug font-medium md:text-lg">
            {project.name}
        </Heading>
        <p className="text-muted-foreground text-center text-sm leading-relaxed">
            {project.description}
        </p>
    </Card>
);

const ContributedProjects = (): React.ReactElement => (
    <>
        <div className="flex flex-wrap justify-center gap-4">
            <StaggerReveal>
                <ProjectCard project={Projects.Indexity} headingLevel="h3" />
                <ProjectCard project={Projects.Choreo} headingLevel="h3" />
                <ProjectCard project={Projects.Ballerina} headingLevel="h3" />
                <ProjectCard project={Projects.Cellery} headingLevel="h3" />
                <ProjectCard project={Projects.Siddhi} headingLevel="h3" />
                <ProjectCard
                    project={Projects.GoogleSummerOfCode}
                    headingLevel="h3"
                />
            </StaggerReveal>
        </div>
        <div className="mt-16 md:mt-20">
            <SubHeading>Personal Projects</SubHeading>
            <div className="flex flex-wrap justify-center gap-4">
                <StaggerReveal>
                    <ProjectCard
                        project={Projects.K8sReplicator}
                        headingLevel="h4"
                    />
                    <ProjectCard
                        project={Projects.MeshManager}
                        headingLevel="h4"
                    />
                </StaggerReveal>
            </div>
        </div>
    </>
);

export default ContributedProjects;
