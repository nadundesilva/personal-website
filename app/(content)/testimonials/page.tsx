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
import { Box } from "@mui/material";
import type { Metadata } from "next";
import type React from "react";

import { ScrollReveal, Title } from "@/components/content";
import { FULL_NAME } from "@/constants/metadata";
import TestimonialsData from "@/constants/testimonials";

import Testimonial from "./Testimonial";

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
                }}
            >
                {TestimonialsData.map((testimonial, index) => (
                    <ScrollReveal key={index} delay={index * 75}>
                        <Testimonial testimonial={testimonial} />
                    </ScrollReveal>
                ))}
            </Box>
        </>
    );
};

export default Testimonials;
