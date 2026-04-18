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
import { Card, CardContent, StaggerReveal } from "@/components/primitives";
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
    <Card className="group w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-bounce-out motion-safe:hover:scale-[1.02]">
        <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card hover:bg-accent/5 text-foreground flex h-full flex-col rounded-lg no-underline hover:no-underline hover:opacity-100 hover:shadow-md motion-safe:transition-[background-color,box-shadow] motion-safe:duration-300"
        >
            <CardContent className="flex h-full flex-col p-5 md:p-7">
                <div className="bg-primary/3 mb-6 w-full overflow-hidden rounded-lg p-2">
                    <div className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-bounce-out motion-safe:group-hover:scale-[1.06]">
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
                    </div>
                </div>
                <Heading className="mb-3 text-center text-[17px] leading-snug font-medium md:text-lg">
                    {project.name}
                </Heading>
                <p className="text-muted-foreground text-center text-sm leading-relaxed">
                    {project.description}
                </p>
            </CardContent>
        </Link>
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
