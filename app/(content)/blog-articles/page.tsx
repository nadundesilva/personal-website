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
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from "@mui/material";
import { type Metadata } from "next";
import React from "react";

import { FULL_NAME } from "@/constants/metadata";

interface BlogArticle {
    title: string;
    description: string;
    image: string;
    url: string;
}

const blogArticles: BlogArticle[] = [
    {
        title: "Processing Java Annotations at compilation time using Annotation",
        description:
            "A guide for reading custom annotations at compile-time for generating code, validating, etc., which is part of a three-article series.",
        image: "/assets/blog-articles/programming-01.webp",
        url: "https://medium.com/javarevisited/reading-annotations-at-compile-time-using-java-annotation-processors-f5a7604bb2f7",
    },
    {
        title: "Reading Java Annotations on the fly",
        description:
            "A guide for using Java Reflections API to read annotations and perform actions based on them, which is part of a three-article series.",
        image: "/assets/blog-articles/programming-02.webp",
        url: "https://medium.com/javarevisited/reading-annotations-at-run-time-using-the-java-reflections-api-ce175ba43b2",
    },
    {
        title: "Unleashing the Power of Java Custom Annotations",
        description:
            "A guide for writing Java custom annotations, which is part of a three-article series.",
        image: "/assets/blog-articles/programming-03.webp",
        url: "https://medium.com/javarevisited/java-custom-annotation-99eaf3b6cd7e",
    },
    {
        title: "Cellery on MicroK8s",
        description:
            "A guide for deploying Cellery using MicroK8s for Development purposes.",
        image: "/assets/blog-articles/cellery-on-microk8s.webp",
        url: "https://medium.com/wso2-cellery/cellery-on-microk8s-e7bc19320f46",
    },
    {
        title: "Reusing your micro-services using Cellery",
        description:
            "Dive into why Cells are the best way to reuse your micro-services.",
        image: "/assets/blog-articles/cellery.webp",
        url: "https://medium.com/wso2-cellery/reusing-micro-services-as-cells-aa03fe170492",
    },
    {
        title: "Production Grade Code in the Cloud Era",
        description:
            "A guide outlining the best practices for running production-grade code in the cloud.",
        image: "/assets/blog-articles/programming-04.webp",
        url: "https://faun.pub/production-grade-code-in-cloud-era-62d3d4d4d3ec",
    },
    {
        title: "Database Agnostic Pagination of Time-Series Results",
        description:
            "A way to paginate time series results in the DB side even when the DB itself doesn’t support it.",
        image: "/assets/blog-articles/time.webp",
        url: "https://faun.pub/database-agnostic-pagination-of-time-series-results-c1e9723291e5",
    },
    {
        title: "Data Is the New Gold",
        description:
            "A guide outlining the importance of collecting data and considerations to be taken if you do so.",
        image: "/assets/blog-articles/gold.webp",
        url: "https://faun.pub/data-is-the-new-gold-e6dd42e5b048",
    },
    {
        title: "Becoming a Better Software Engineering Team Leader",
        description:
            "A guide for becoming a great team leader who can walk along with a team and guide them toward achieving their goals.",
        image: "/assets/blog-articles/leader.webp",
        url: "https://faun.pub/how-to-become-a-great-team-leader-b80906f14489",
    },
    {
        title: "SCoverage in Maven Parallel Builds",
        description:
            "The SCoverage report goal, like some of the other Maven plugin goals out there, is not truly thread-safe. This article covers how you can solve this issue.",
        image: "/assets/blog-articles/programming-05.webp",
        url: "https://faun.pub/scoverage-in-maven-parallel-builds-a00440b03be2",
    },
    {
        title: "Power Up your Scala Code with Implicit Conversions",
        description:
            "Scala has many powerful capabilities. Implicit conversions stand out among them with the ability to avoid most of the boilerplate code.",
        image: "/assets/blog-articles/programming-06.webp",
        url: "https://faun.pub/power-up-your-scala-code-with-implicit-conversions-b23e3c04643a",
    },
    {
        title: "Kubernetes the Right Way: Speeding Up Pod Startup in an Autoscaling Cluster",
        description:
            "At K8s Cluster scale-up time the new Pods have a high startup time as the Node startup time adds up to the Pod startup time. This article outlines how you can work around that and reduce the overall startup time.",
        image: "/assets/blog-articles/kubernetes-cluster.webp",
        url: "https://faun.pub/speeding-up-pod-startup-in-an-autoscaling-kubernetes-cluster-fb98dbca88ba",
    },
    {
        title: "How to get promoted to a Senior Software Engineer",
        description:
            "Becoming a Senior Software Engineer requires gaining experience and knowledge over time. This article outlines what you should cultivate within you to become one.",
        image: "/assets/blog-articles/professional-01.webp",
        url: "https://faun.pub/how-to-get-promoted-to-a-senior-software-engineer-c24045eba4bf",
    },
    {
        title: "Kubernetes the Right Way: Securing Your Production Cluster with Network Policies",
        description:
            "Kubernetes Network Policies is an important tool at your disposal for improving the Security of your Kubernetes Cluster.",
        image: "/assets/blog-articles/networking.webp",
        url: "https://faun.pub/3-steps-to-securing-your-kubernetes-cluster-with-network-policies-99155bf4df96",
    },
    {
        title: "Handling Production Incidents like a Pro",
        description:
            "If you have been a Developer or a Site Reliability Engineer working on an Application deployed in a production environment, you would probably know how hard it is to deal with a production incident. This article outlines some of the steps you can take to minimize the damage as well as how you can systematically find and solve the problem.",
        image: "/assets/blog-articles/professional-02.jpg",
        url: "https://faun.pub/handling-production-incidents-like-a-pro-203f5cb86d64",
    },
    {
        title: "Reducing the Cloud Observability Expenses and Performance Impact",
        description:
            "Observability is an essential aspect of any production environment, and at the same time, it can be a massive hit on the bottom line.",
        image: "/assets/blog-articles/analysis.webp",
        url: "https://faun.pub/reducing-the-cloud-observability-expenses-and-performance-impact-69c2c0e6f96c",
    },
    {
        title: "Kubernetes the Right Way: Observability for Your Microservices",
        description:
            "This article talks about observing a large distributed application deployed in a Kubernetes Cluster so that you can find issues faster.",
        image: "/assets/blog-articles/metrics.jpg",
        url: "https://faun.pub/kubernetes-the-right-way-observability-for-your-microservices-bcdaf33238ef",
    },
    {
        title: "Why You Should Adopt OpenTelemetry",
        description:
            "OpenTelemtry had been gaining momentum across many Observability vendors and products and it is becoming the de facto standard.",
        image: "/assets/blog-articles/telescope.jpg",
        url: "https://faun.pub/5-reasons-why-you-should-adopt-opentelemetry-89ad209b730c",
    },
    {
        title: "Kubernetes the Right Way: Observability With OpenTelemetry Collector",
        description:
            "OpenTelemetry Collector can play a big role in ensuring your Observability data pipelines work well in large microservices deployments, especially on Kubernetes.",
        image: "/assets/blog-articles/kubernetes.jpg",
        url: "https://faun.pub/kubernetes-the-right-way-observability-with-opentelemetry-collector-7d54ecb38638",
    },
    {
        title: "Kubernetes the Right Way: Minimizing Workload Downtime",
        description:
            "Achieving nearly zero downtime in your Kubernetes Applications requires careful design and proper Site Reliability Engineering.",
        image: "/assets/blog-articles/zero-downtime.webp",
        url: "https://faun.pub/kubernetes-the-right-way-zero-downtime-workloads-5edeea221e69",
    },
    {
        title: "Kubernetes the Right Way: Pod Security",
        description:
            "When you deploy a containerized application you developed, in a Kubernetes Cluster, there are some security-related aspects to remember.",
        image: "/assets/blog-articles/pod-security.webp",
        url: "https://medium.com/faun/kubernetes-the-right-way-security-checklist-c38650898807",
    },
].reverse();

export const metadata: Metadata = {
    title: `${FULL_NAME} | Blog Articles`,
    description: `Various blog articles written by ${FULL_NAME}`,
};

const BlogArticles = (): React.ReactElement => (
    <React.Fragment>
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
        >
            {blogArticles.map((blogArticle) => (
                <Grid key={blogArticle.url} item xs={12} sm={6} md={4} lg={3}>
                    <Card raised sx={{ height: "100%" }}>
                        <CardActionArea href={blogArticle.url} target="_blank">
                            <CardMedia
                                component="img"
                                alt={"Article"}
                                height="140"
                                image={blogArticle.image}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    {blogArticle.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {blogArticle.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </React.Fragment>
);

export default BlogArticles;
