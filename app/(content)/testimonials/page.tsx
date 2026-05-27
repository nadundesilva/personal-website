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
import type { Metadata } from "next";
import type React from "react";

import { Title } from "@/components/content";
import CollectionPageJsonLd from "@/components/layout/CollectionPageJsonLd";
import { ScrollReveal } from "@/components/primitives";
import { FULL_NAME } from "@/constants/metadata";
import TestimonialsData from "@/constants/testimonials";
import { resolveRoute } from "@/utils/common/routes";

import Testimonial from "./Testimonial";

export const metadata: Metadata = {
    title: resolveRoute("/testimonials").name,
    description: `Professional testimonials from colleagues and managers who have worked with ${FULL_NAME}.`,
};

const Testimonials = (): React.ReactElement => {
    return (
        <>
            <Title>Testimonials</Title>
            <CollectionPageJsonLd
                metadata={metadata}
                pathname="/testimonials"
            />
            <div className="mt-8 flex flex-col gap-6">
                {Object.entries(TestimonialsData).map(
                    ([testimonialKey, testimonial], index) => (
                        <ScrollReveal key={testimonialKey} delay={index * 75}>
                            <Testimonial testimonial={testimonial} />
                        </ScrollReveal>
                    ),
                )}
            </div>
        </>
    );
};

export default Testimonials;
