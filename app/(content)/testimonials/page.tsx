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
import { FormatQuote, Launch, People, Work } from "@mui/icons-material";
import { Box, Card, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import type { Metadata } from "next";
import type React from "react";

import { LinkButton, Paragraph, Title } from "@/components/content";
import { FULL_NAME } from "@/constants/metadata";
import TestimonialsData, {
    Relationship,
    type TestimonialData,
} from "@/constants/testimonials";

const renderRelationShip = (
    name: string,
    relationship: Relationship,
): string | null => {
    const firstName = name.includes(" ") ? name.split(" ")[0] : name;
    switch (relationship) {
        case Relationship.ManagedDirectly:
            return `${firstName} managed Nadun directly`;
        case Relationship.Mentor:
            return `${firstName} was Nadun's mentor`;
        case Relationship.WorkedOnSameTeam:
            return `${firstName} worked with Nadun on the same team`;
        case Relationship.Senior:
            return `${firstName} was senior to Nadun`;
        case Relationship.Junior:
            return `Nadun was senior to ${firstName}`;
        default:
            return null;
    }
};

interface TestimonialProps {
    testimonial: TestimonialData;
}

const Testimonial = ({ testimonial }: TestimonialProps): React.ReactElement => {
    const {
        author,
        authorPosition,
        authorCompany,
        relationship,
        position,
        company,
        content,
    } = testimonial;
    const labelId = `testimonial-label-${author.name.toLowerCase().replace(/\s+/g, "-")}`;
    const linkedinUrl =
        "https://www.linkedin.com/in/nadundesilva/details/recommendations/";

    return (
        <Box component="article" aria-labelledby={labelId}>
            <Typography id={labelId} sx={visuallyHidden}>
                Testimonial from {author.name}
            </Typography>
            <Card sx={{ my: 0, p: 3.5 }}>
                <Box
                    sx={{
                        mb: 3,
                    }}
                >
                    <FormatQuote
                        aria-hidden="true"
                        sx={{
                            transform: "rotate(180deg)",
                            fontSize: "2.5rem",
                            color: "text.secondary",
                            opacity: 0.35,
                            mb: 1,
                            ml: -1,
                            display: "block",
                        }}
                    />
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                            lineHeight: 1.4,
                            mb: 1.5,
                            color: "text.primary",
                        }}
                    >
                        {author.name}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                            mb: 1,
                        }}
                    >
                        <Work
                            aria-hidden="true"
                            sx={{
                                fontSize: "1rem",
                                color: "text.secondary",
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.primary",
                                fontWeight: 500,
                                letterSpacing: "0.01em",
                            }}
                        >
                            {authorPosition} at {authorCompany.name}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                            mb: 2.5,
                        }}
                    >
                        <People
                            aria-hidden="true"
                            sx={{
                                fontSize: "1rem",
                                color: "text.secondary",
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                                fontWeight: 300,
                                letterSpacing: "0.01em",
                            }}
                        >
                            {renderRelationShip(author.name, relationship)} when
                            Nadun was a {position} at {company.name}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        "mb": 3,
                        "pb": 2.5,
                        "position": "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "1px",
                            backgroundColor: "divider",
                            opacity: 0.12,
                        },
                    }}
                >
                    <LinkButton
                        icon={Launch}
                        name="View on LinkedIn"
                        href={linkedinUrl}
                        ariaLabel={`View testimonial by ${author.name} on LinkedIn`}
                        target="_blank"
                    />
                </Box>
                {content.map((paragraph, index) => (
                    <Paragraph key={index}>{paragraph}</Paragraph>
                ))}
            </Card>
        </Box>
    );
};

export const metadata: Metadata = {
    title: "Testimonials",
    description: `Testimonials provided by various professionals throughout the career of ${FULL_NAME}.`,
};

const Testimonials = (): React.ReactElement => {
    return (
        <>
            <Title>Testimonials</Title>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mt: 4,
                    mb: 7,
                }}
            >
                {TestimonialsData.map((testimonial, index) => (
                    <Testimonial key={index} testimonial={testimonial} />
                ))}
            </Box>
        </>
    );
};

export default Testimonials;
