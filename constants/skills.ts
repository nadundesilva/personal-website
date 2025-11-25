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

export interface Skill {
    category: string;
    skills: string[];
}

const Skills: Skill[] = [
    {
        category: "Programming Languages",
        skills: [
            "Java",
            "GoLang",
            "Python",
            "Scala",
            "JavaScript",
            "TypeScript",
        ],
    },
    {
        category: "Cloud Platforms",
        skills: ["AWS", "GCP", "Azure"],
    },
    {
        category: "Containerization & Orchestration",
        skills: [
            "Kubernetes",
            "Azure Kubernetes Service",
            "AWS Elastic Container Service",
            "Docker",
            "Kustomize",
            "Helm",
            "Kubernetes Operator Framework",
            "Istio",
        ],
    },
    {
        category: "Infrastructure as Code & Automation",
        skills: ["Terraform", "Ansible", "GitHub Actions", "GitLab CI/CD"],
    },
    {
        category: "Application Frameworks & Libraries",
        skills: [
            "Spring Boot",
            "ExpressJS",
            "React",
            "NextJS",
            "Apache Lucene",
            "D3.js",
        ],
    },
    {
        category: "Databases & Data Storage",
        skills: [
            "Influx DB",
            "Redis",
            "Orient DB",
            "Azure Data Explorer",
            "Azure Data Lake",
            "MySQL",
            "MsSQL",
        ],
    },
    {
        category: "Event-Driven Architecture & Messaging",
        skills: ["Kafka", "SQS", "Azure Event Hub"],
    },
    {
        category: "API Development & Standards",
        skills: ["REST", "GraphQL", "gRPC", "OpenAPI", "OAuth2", "OIDC"],
    },
    {
        category: "Observability & Monitoring",
        skills: [
            "OpenTelemetry",
            "DataDog",
            "Prometheus",
            "Jaeger",
            "CloudWatch",
        ],
    },
    {
        category: "Software Engineering Practices",
        skills: [
            "Agile",
            "DevOps",
            "GitOps",
            "Site Reliability Engineering",
            "Disaster Recovery Planning",
            "Threat Modeling",
        ],
    },
];

export default Skills;
