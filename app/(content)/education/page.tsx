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
import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, type SxProps, type Theme, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import type { Metadata } from "next";
import type React from "react";

import {
    HighlightsSection,
    Link,
    LinkButton,
    List,
    ListItem,
    Logo,
    Paragraph,
    Section,
    SectionHeading,
    Title,
} from "@/components/content";
import Educations, { type Education } from "@/constants/education";
import Institutes, { type Institute } from "@/constants/institutes";
import { FULL_NAME } from "@/constants/metadata";
import { WebsiteHome } from "@/constants/routes";

export const metadata: Metadata = {
    title: "Education",
    description: `Educational qualifications of ${FULL_NAME}.`,
};

interface EducationSectionHeadingProps {
    id: string;
    education: Education;
    logoSx?: SxProps<Theme>;
}

const EducationSectionHeading = ({
    id,
    education,
    logoSx,
}: EducationSectionHeadingProps): React.ReactElement => (
    <SectionHeading
        id={id}
        date={education.timePeriod}
        logo={
            <Logo
                srcLight={education.institute.logo.srcLight}
                srcDark={education.institute.logo.srcDark}
                alt=""
                recommendedSx={logoSx}
            />
        }
    >
        {education.title}
        <Box component="span" sx={visuallyHidden}>
            {" "}
            at {education.institute.name}
        </Box>
    </SectionHeading>
);

const Education = (): React.ReactElement => {
    const generateInstituteLink = (
        institute: Institute,
    ): React.ReactElement => (
        <Link href={institute.link} target="_blank">
            {institute.name}
        </Link>
    );
    const UniversityOfMoratuwa = generateInstituteLink(
        Institutes.UniversityOfMoratuwa,
    );
    const StJosephsCollegeColombo10 = generateInstituteLink(
        Institutes.StJosephsCollegeColombo10,
    );

    const GanBasedAnomalyDetectionInIndustrialSoftwareSystems = (
        <Link
            href="https://ieeexplore.ieee.org/document/8818750"
            target="_blank"
        >
            &quot;Generative Adversarial Networks (GAN) based Anomaly Detection
            in Industrial Software Systems&quot; published in 2019 at Moratuwa
            Engineering Research Conference (MERCon)
        </Link>
    );
    const AnomalyDetectionInIndustrialSoftwareSystemsUsingVae = (
        <Link
            href="https://www.scitepress.org/Papers/2018/66003/pdf/index.html"
            target="_blank"
        >
            &quot;Anomaly Detection in Industrial Software Systems — Using
            Variational Autoencoders&quot; published in 2017 at the Proceedings
            of the 7th International Conference on Pattern Recognition
            Applications and Methods (ICPRAM)
        </Link>
    );

    return (
        <>
            <Title>Education</Title>
            <Box sx={{ pt: 2, pb: 2 }}>
                <LinkButton
                    href={
                        WebsiteHome.subRoutes["/education"].subRoutes![
                            "/education/certifications"
                        ].path
                    }
                    name="View Certifications"
                    icon={KeyboardArrowRight}
                />
            </Box>
            <Section labelledById="section-bsc-uom">
                <EducationSectionHeading
                    id="section-bsc-uom"
                    education={Educations.BScUniversityOfMoratuwa}
                    logoSx={{ height: "4em" }}
                />
                <Paragraph>
                    I studied for my four-year bachelor&apos;s degree at the{" "}
                    {UniversityOfMoratuwa}. The degree covered many in-depth
                    areas (e.g.:- Computer Architecture, Operating Systems,
                    Compiler Theory, Database Internals) as well as novel
                    technical areas (e.g.:- Machine Learning, Deep Learning,
                    Data Mining &amp; Information Retrieval). The degree covered
                    many other aspects such as general engineering knowledge,
                    ethics and professional conduct.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>Academic Standing: First Class</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Overall{" "}
                            <abbr title="Cumulative Grade Point Average">
                                CGPA
                            </abbr>{" "}
                            - 3.85 / 4.20
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Dean&apos;s List Placements on 6 out of 8 semesters
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography
                            id="uom-publications-heading"
                            component="h3"
                            variant="h6"
                            sx={{ mt: 3, mb: 1.5 }}
                        >
                            Publications:
                        </Typography>
                        <Box sx={{ display: "block", mt: 1 }}>
                            <List ariaLabelledBy="uom-publications-heading">
                                <ListItem>
                                    <Typography>
                                        {
                                            GanBasedAnomalyDetectionInIndustrialSoftwareSystems
                                        }
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>
                                        {
                                            AnomalyDetectionInIndustrialSoftwareSystemsUsingVae
                                        }
                                    </Typography>
                                </ListItem>
                            </List>
                        </Box>
                    </ListItem>
                </HighlightsSection>
            </Section>
            <Section labelledById="section-al-sjc">
                <EducationSectionHeading
                    id="section-al-sjc"
                    education={Educations.ALStJosephsCollegeColombo10}
                    logoSx={{ height: "4em" }}
                />
                <Paragraph>
                    I attended school at {StJosephsCollegeColombo10} where I
                    studied many subjects. At the end of my studies, I passed
                    the{" "}
                    <abbr title="General Certificate of Education">G.C.E.</abbr>{" "}
                    Advanced Level examination with distinctions in all the
                    subjects granting me entrance into the{" "}
                    {UniversityOfMoratuwa} as well.
                </Paragraph>
                <HighlightsSection>
                    <ListItem>
                        <Typography>Z - Score: 2.2441</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography
                            id="sjc-main-subjects-heading"
                            component="h3"
                            variant="h6"
                            sx={{ mt: 3, mb: 1.5 }}
                        >
                            Main Subjects:
                        </Typography>
                        <Box sx={{ display: "block", mt: 1 }}>
                            <List ariaLabelledBy="sjc-main-subjects-heading">
                                <ListItem>
                                    <Typography>
                                        Combined Mathematics - A
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>Physics - A</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>Chemistry - A</Typography>
                                </ListItem>
                            </List>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Typography
                            id="sjc-other-subjects-heading"
                            component="h3"
                            variant="h6"
                            sx={{ mt: 3, mb: 1.5 }}
                        >
                            Other Subjects:
                        </Typography>
                        <Box sx={{ display: "block", mt: 1 }}>
                            <List ariaLabelledBy="sjc-other-subjects-heading">
                                <ListItem>
                                    <Typography>
                                        General{" "}
                                        <abbr title="Information Technology">
                                            IT
                                        </abbr>{" "}
                                        - A
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>General English - A</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>
                                        General Knowledge - A
                                    </Typography>
                                </ListItem>
                            </List>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Editor of the Science Union 2011 / 2012
                        </Typography>
                    </ListItem>
                </HighlightsSection>
            </Section>
        </>
    );
};

export default Education;
