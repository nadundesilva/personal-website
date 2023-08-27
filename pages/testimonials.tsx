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
import { FormatQuote } from "@mui/icons-material";
import { Card, Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Head from "next/head";
import React from "react";

import { Paragraph } from "@/components/content";
import Layout, { LayoutContent } from "@/components/layout";

enum Relationship {
    ManagedDirectly,
    Mentor,
    WorkedOnSameTeam,
    Senior,
    Junior,
}

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
            return `Nadun was Senior to ${firstName}`;
        default:
            return null;
    }
};

interface TestimonialProps {
    children: React.ReactNode;
    position: string;
    company: string;
    recomender: string;
    recomenderPosition: string;
    recomenderCompany: string;
    relationship: Relationship;
}

const Testimonial = ({
    children,
    position,
    company,
    recomender,
    recomenderPosition,
    recomenderCompany,
    relationship,
}: TestimonialProps): React.ReactElement => (
    <Card sx={{ my: 2, p: 2 }} raised>
        <FormatQuote
            htmlColor={grey[600]}
            sx={{ transform: "rotate(180deg) scale(2)", m: 0.5 }}
        />
        <Typography variant="h5">{recomender}</Typography>
        <Typography
            variant="body2"
            color={grey[700]}
            fontSize={17}
            sx={{ pb: 0.5 }}
        >
            {recomenderPosition} at {recomenderCompany}
        </Typography>
        <Typography variant="body2" color={grey[700]}>
            {renderRelationShip(recomender, relationship)} when Nadun was a{" "}
            {position} at {company}
        </Typography>
        {children}
    </Card>
);

const Testimonials = (): React.ReactElement => {
    return (
        <Container maxWidth={false} disableGutters>
            <Head>
                <title>Nadun De Silva | Testimonials</title>
            </Head>
            <Layout>
                <LayoutContent>
                    <Testimonial
                        position="Associate Technical Lead"
                        company="WSO2"
                        recomender="Tishan Dahanayakage"
                        recomenderPosition="Senior Technical Lead & Engineering Manager"
                        recomenderCompany="WSO2"
                        relationship={Relationship.ManagedDirectly}
                    >
                        <Paragraph>
                            I have worked with Nadun directly on two occasions.
                            Once when he was doing his internship and then again
                            as his engineering manager while he was acting as
                            the lead of Choreo Observability team. Nadun is a
                            highly motivated and passionate individual. He would
                            almost always deliver beyond expectations. He
                            possess great analytical and problem solving skills.
                            He has the ability to take a project from design to
                            delivery confirming to highest standards. Nadun was
                            repeatedly rated as an exceptional employee and I
                            will always have him in my team
                        </Paragraph>
                    </Testimonial>
                    <Testimonial
                        position="Associate Technical Lead"
                        company="WSO2"
                        recomender="Malith Jayasinghe"
                        recomenderPosition="Vice President & Head of Research & AI"
                        recomenderCompany="WSO2"
                        relationship={Relationship.ManagedDirectly}
                    >
                        <Paragraph>
                            Nadun was the primary technical lead in Choreo
                            observability team where led a team of software
                            engineers working on observability features.
                        </Paragraph>
                        <Paragraph>
                            Nadun has strong hands-on technical experience in
                            multiple areas which include software architecture,
                            programming, performance, scalability, security and
                            K8s. As a software developer, Nadun puts his best
                            effort to follow software development best
                            practices. His code reviews are very thorough and
                            helps developers improve their coding skills. Nadun
                            cares a lot about the quality of the product and
                            spends a lot of time improving test coverage as well
                            as doing a lot of manual testing. Nadun has
                            exceptional reasoning and analytical skills which
                            allow him to solve challenging problems faster. He
                            has excellent written and verbal communication
                            skills and he is able to lead others in high-demand
                            situations. I have no doubt that Nadun will succeed
                            in all his endeavors and I recommend him in the
                            strongest terms.
                        </Paragraph>
                    </Testimonial>
                    <Testimonial
                        position="Associate Technical Lead"
                        company="WSO2"
                        recomender="Isuru Haththotuwa"
                        recomenderPosition="Senior Technical Lead"
                        recomenderCompany="WSO2"
                        relationship={Relationship.Senior}
                    >
                        <Paragraph>
                            I had the pleasure of working with Nadun closely in
                            two projects at WSO2 - Cellery (2019 - 2020) and
                            Choreo (2020 - 2022). He spearheaded the monitoring
                            and metering side (a.k.a observability) in these two
                            cloud native projects, which were based on cutting
                            edge technology.
                        </Paragraph>
                        <Paragraph>
                            Nadun is one of the best brains I have worked with.
                            Even as a junior engineer, his technical skills,
                            critical thinking and analytical ability was on par
                            with more experienced engineers. I specially noted
                            his ability to pick and choose the best one among
                            two equal-looking options by looking in to possible
                            outcomes which might occur in future.
                        </Paragraph>
                        <Paragraph>
                            I wish Nadun all the very best, and would not have
                            any hesitation in recommending him for any
                            challenging software engineering related role.
                        </Paragraph>
                    </Testimonial>
                    <Testimonial
                        position="Associate Technical Lead"
                        company="WSO2"
                        recomender="Duneesha Fernando"
                        recomenderPosition="Senior Software Engineer - Machine Learning"
                        recomenderCompany="WSO2"
                        relationship={Relationship.Senior}
                    >
                        <Paragraph>
                            I worked with Nadun when he was serving WSO2 as a
                            Senior Software Engineer as well as an Associate
                            Technical Lead. Nadun is a highly-skilled engineer,
                            who has a vast breadth of knowledge on programming,
                            software architecture, container orchestration,
                            software engineering best practices etc. As the lead
                            of Choreo&apos;s Observability team, Nadun&apos;s
                            knowledge contributions towards successfully
                            building the AI-based performance anomaly detector
                            (the project that I worked in) was invaluable. As a
                            senior engineer he was always approachable to us
                            from the time of planning the project until
                            deployment and even beyond that. As an individual, I
                            learnt a lot from his technical knowledge and the
                            vision he had on software development.
                        </Paragraph>
                        <Paragraph>
                            Apart from his technical skills, what makes Nadun
                            stand out from other engineers is the fact that he
                            genuinely spends time to help junior engineers in
                            solving their issues. As a team lead I have seen
                            numerous instances where he sat together with others
                            in his team whenever problems arose and debug those.
                            It was the same for us (who were members of another
                            but closely related team) whenever we ran into
                            issues related to observability. Existence of senior
                            engineers such as Nadun at any workplace is a relief
                            for newly joined engineers who are initially
                            overwhelmed when learning the company culture and
                            adapting to their respective projects, and I have
                            personally experienced that as I started planning my
                            project during the Covid period virtually.
                        </Paragraph>
                        <Paragraph>
                            It was an absolute pleasure to work with and learn
                            from a talented, kind-hearted and empathetic
                            individual like Nadun. I&apos;m certain that he
                            would further excel in his bright career path and
                            inspire more and more upcoming engineers the same
                            way he did for me and many of my colleagues.
                        </Paragraph>
                    </Testimonial>
                    <Testimonial
                        position="Associate Technical Lead"
                        company="WSO2"
                        recomender="Srinath Perera"
                        recomenderPosition="Chief Architect"
                        recomenderCompany="WSO2"
                        relationship={Relationship.Senior}
                    >
                        <Paragraph>
                            I have known Nadun for over 2+ years on his work at
                            WSO2. He is a 10x engineer. Although he did not
                            report to me, I had a direct view of his work, and I
                            have worked with him closely several times. Nadun is
                            passionate, smart, and thoughtful and a joy to work
                            with.
                        </Paragraph>
                    </Testimonial>
                    <Testimonial
                        position="Associate Technical Lead"
                        company="WSO2"
                        recomender="Binura Gunasekara"
                        recomenderPosition="Technical Lead"
                        recomenderCompany="WSO2"
                        relationship={Relationship.Senior}
                    >
                        <Paragraph>
                            I&apos;ve had the pleasure of crossing paths with
                            Nadun on multiple occasions during his time at WSO2,
                            and he&apos;s definitely one of the sharpest
                            engineers I&apos;ve had the opportunity to work
                            with—extremely reliable, proficient, and thorough in
                            what he does, and still one of the most approachable
                            and humble people I&apos;ve met on the team.
                        </Paragraph>
                        <Paragraph>
                            I wish him the best with his future career, and I
                            know any team would be lucky to have him onboard.
                        </Paragraph>
                    </Testimonial>
                    <Testimonial
                        position="Associate Technical Lead"
                        company="WSO2"
                        recomender="Kanchana Wickremasinghe"
                        recomenderPosition="VP & GM Choreo Business Unit"
                        recomenderCompany="WSO2"
                        relationship={Relationship.Senior}
                    >
                        <Paragraph>
                            I got to know Nadun when I joined WSO2 in June 2021.
                            Nadun is an excellent software engineer and data
                            scientist who is eager to learn, listen to others,
                            try out things, and get his hands dirty. He learns
                            things very quickly and applies them in his work. He
                            is very likable by co-workers for his ethics,
                            working habits, and helping others when needed. We
                            are very sad to lose him at WSO2. We wish him all
                            the very best in his future endeavors.
                        </Paragraph>
                    </Testimonial>
                    <Testimonial
                        position="Senior Software Engineer"
                        company="WSO2"
                        recomender="Nuwan Bandara"
                        recomenderPosition="Senior Director, Head of Product - Integration Cloud"
                        recomenderCompany="WSO2"
                        relationship={Relationship.ManagedDirectly}
                    >
                        <Paragraph>
                            Nadun was one of the key members of my team, during
                            the last two years of my tenure at WSO2. A diligent,
                            smart individual that the team can always rely on.
                            Nadun is a problem solver, dives deep to understand
                            the domain and context before jumping into
                            conclusions. He can think in abstract and can come
                            up with creative solutions to challenging problems.
                            Over the years I have seen Nadun growing into a
                            senior engineer role, mentoring new team members
                            while giving the highest priority to engineering
                            quality. I wish all the best to Nadun and
                            wouldn&apos;t hesitate to recommend him to any
                            engineering role.
                        </Paragraph>
                    </Testimonial>
                    <Testimonial
                        position="Senior Software Engineer"
                        company="WSO2"
                        recomender="Sinthuja Rajendran Suhothayan"
                        recomenderPosition="Architect/Associate Director"
                        recomenderCompany="WSO2"
                        relationship={Relationship.ManagedDirectly}
                    >
                        <Paragraph>
                            I worked with Nadun for 1.5 years in an open source
                            project - Cellery. Nadun is a brilliant software
                            engineer, and he has full breadth of knowledge from
                            front-end to backend-programming, and also devops
                            knowledge on how to manage k8s clusters, best
                            practices to follow, and so on. He had owned the
                            area of Observability and Tooling in the Cellery
                            project, and always completes the tasks and features
                            on time with a good quality. He learns what ever the
                            technology that is required to complete a feature by
                            him self, and get it completed on time. As a team
                            lead of the Cellery project, I can depend on him to
                            work on critical feature, and I&apos;m sure that he
                            will deliver it through! Nadun not-only focuses on
                            his work, but also helps co-team mates and interns
                            on solving their technical problems.
                        </Paragraph>
                        <Paragraph>
                            It was a great pleasure to work with Nadun and I
                            would rank him as one of the best engineers that I
                            have worked with. I would not have a second thought
                            in recommending him for any challenging technical
                            positions in the IT field.
                        </Paragraph>
                    </Testimonial>
                </LayoutContent>
            </Layout>
        </Container>
    );
};

export default Testimonials;
