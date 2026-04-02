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

import Experiences, { type Experience } from "./experience";
import Projects, { type Project } from "./projects";
import Certificates, { type Certificate } from "./certificates";
import Skills from "./skills";

export enum SkillProficiency {
    Novice = "Novice",
    Intermediate = "Intermediate",
    Expert = "Expert",
}

export interface SkillUsage {
    experiences: Experience[];
    projects: Project[];
    certifications: Certificate[];
}

export interface Skill {
    name: string;
    level: SkillProficiency;
    usage: SkillUsage;
}

export interface SkillGroup {
    category: string;
    skills: Skill[];
}

const createSkill = (
    skillName: string,
    skillLevel: SkillProficiency,
): Skill => {
    const skill: Skill = {
        name: skillName,
        level: skillLevel,
        usage: {
            experiences: [],
            projects: [],
            certifications: [],
        },
    };

    Object.values(Experiences)
        .filter((experience) => experience.skills.includes(skillName))
        .forEach((experience) => skill.usage.experiences.push(experience));

    Object.values(Projects)
        .filter((project) => project.skills.includes(skillName))
        .forEach((project) => skill.usage.projects.push(project));

    Object.values(Certificates)
        .filter((certificate) => certificate.skills.includes(skillName))
        .forEach((certificate) => skill.usage.certifications.push(certificate));

    return skill;
};

const SkillCategoryProgrammingLanguages = "Programming Languages";
const SkillCategoryCloudPlatforms = "Cloud Platforms";
const SkillCategoryContainerizationAndOrchestration =
    "Containerization & Orchestration";
const SkillCategoryInfrastructureAsCodeAndAutomation =
    "Infrastructure as Code & Automation";
const SkillCategoryApplicationFrameworksAndLibraries =
    "Application Frameworks & Libraries";
const SkillCategoryDatabasesAndDataStorage = "Databases & Data Storage";
const SkillCategoryEventDrivenArchitectureAndMessaging =
    "Event-Driven Architecture & Messaging";
const SkillCategoryApiDevelopmentAndStandards = "API Development & Standards";
const SkillCategoryObservabilityAndMonitoring = "Observability & Monitoring";
const SkillCategorySoftwareEngineeringPractices =
    "Software Engineering Practices";
const SkillCategoryArtificialIntelligenceAndMachineLearning =
    "Artificial Intelligence & Machine Learning";

const SkillCategories: SkillGroup[] = [
    {
        category: SkillCategoryProgrammingLanguages,
        skills: [
            createSkill(Skills.Java, SkillProficiency.Expert),
            createSkill(Skills.GoLang, SkillProficiency.Expert),
            createSkill(Skills.Python, SkillProficiency.Intermediate),
            createSkill(Skills.Scala, SkillProficiency.Intermediate),
            createSkill(Skills.JavaScript, SkillProficiency.Intermediate),
            createSkill(Skills.TypeScript, SkillProficiency.Intermediate),
            createSkill(Skills.Ballerina, SkillProficiency.Intermediate),
            createSkill(Skills.CompilerTheory, SkillProficiency.Intermediate),
        ],
    },
    {
        category: SkillCategoryCloudPlatforms,
        skills: [
            createSkill(Skills.Aws, SkillProficiency.Expert),
            createSkill(Skills.Gcp, SkillProficiency.Intermediate),
            createSkill(Skills.Azure, SkillProficiency.Novice),
        ],
    },
    {
        category: SkillCategoryContainerizationAndOrchestration,
        skills: [
            createSkill(Skills.Kubernetes, SkillProficiency.Expert),
            createSkill(Skills.AwsEcs, SkillProficiency.Expert),
            createSkill(Skills.Docker, SkillProficiency.Expert),
            createSkill(Skills.Kustomize, SkillProficiency.Intermediate),
            createSkill(Skills.Helm, SkillProficiency.Intermediate),
            createSkill(Skills.Istio, SkillProficiency.Intermediate),
            createSkill(Skills.KubernetesControllers, SkillProficiency.Expert),
            createSkill(
                Skills.KubernetesOperatorFramework,
                SkillProficiency.Expert,
            ),
        ],
    },
    {
        category: SkillCategoryInfrastructureAsCodeAndAutomation,
        skills: [
            createSkill(Skills.Terraform, SkillProficiency.Expert),
            createSkill(Skills.Ansible, SkillProficiency.Novice),
            createSkill(Skills.GitHubActions, SkillProficiency.Expert),
            createSkill(Skills.GitLabCi, SkillProficiency.Expert),
        ],
    },
    {
        category: SkillCategoryApplicationFrameworksAndLibraries,
        skills: [
            createSkill(Skills.SpringBoot, SkillProficiency.Intermediate),
            createSkill(Skills.ExpressJS, SkillProficiency.Intermediate),
            createSkill(Skills.React, SkillProficiency.Intermediate),
            createSkill(Skills.NextJS, SkillProficiency.Intermediate),
            createSkill(Skills.ApacheLucene, SkillProficiency.Intermediate),
            createSkill(Skills.D3js, SkillProficiency.Novice),
        ],
    },
    {
        category: SkillCategoryDatabasesAndDataStorage,
        skills: [
            createSkill(Skills.InfluxDB, SkillProficiency.Novice),
            createSkill(Skills.Redis, SkillProficiency.Intermediate),
            createSkill(Skills.OrientDB, SkillProficiency.Intermediate),
            createSkill(Skills.AzureDataExplorer, SkillProficiency.Expert),
            createSkill(Skills.AzureDataLake, SkillProficiency.Expert),
            createSkill(Skills.MySQL, SkillProficiency.Expert),
            createSkill(Skills.MsSQL, SkillProficiency.Expert),
        ],
    },
    {
        category: SkillCategoryEventDrivenArchitectureAndMessaging,
        skills: [
            createSkill(Skills.Kafka, SkillProficiency.Expert),
            createSkill(Skills.AwsSqs, SkillProficiency.Expert),
            createSkill(Skills.AzureEventHub, SkillProficiency.Expert),
            createSkill(Skills.StreamProcessing, SkillProficiency.Expert),
        ],
    },
    {
        category: SkillCategoryApiDevelopmentAndStandards,
        skills: [
            createSkill(Skills.Rest, SkillProficiency.Expert),
            createSkill(Skills.GraphQl, SkillProficiency.Expert),
            createSkill(Skills.Grpc, SkillProficiency.Expert),
            createSkill(Skills.OpenApi, SkillProficiency.Expert),
            createSkill(Skills.OAuth2, SkillProficiency.Expert),
            createSkill(Skills.Oidc, SkillProficiency.Expert),
        ],
    },
    {
        category: SkillCategoryObservabilityAndMonitoring,
        skills: [
            createSkill(Skills.OpenTelemetry, SkillProficiency.Expert),
            createSkill(Skills.Prometheus, SkillProficiency.Expert),
            createSkill(Skills.Jaeger, SkillProficiency.Expert),
            createSkill(Skills.DataDog, SkillProficiency.Intermediate),
            createSkill(Skills.AwsCloudWatch, SkillProficiency.Intermediate),
        ],
    },
    {
        category: SkillCategorySoftwareEngineeringPractices,
        skills: [
            createSkill(Skills.Agile, SkillProficiency.Expert),
            createSkill(Skills.DevOps, SkillProficiency.Expert),
            createSkill(Skills.GitOps, SkillProficiency.Expert),
            createSkill(
                Skills.SiteReliabilityEngineering,
                SkillProficiency.Intermediate,
            ),
            createSkill(
                Skills.DisasterRecoveryPlanning,
                SkillProficiency.Expert,
            ),
            createSkill(Skills.ThreatModeling, SkillProficiency.Intermediate),
            createSkill(Skills.SoftwareEngineering, SkillProficiency.Expert),
            createSkill(Skills.TechnicalLeadership, SkillProficiency.Expert),
            createSkill(Skills.Microservices, SkillProficiency.Expert),
            createSkill(
                Skills.CloudNativeApplicationDevelopment,
                SkillProficiency.Expert,
            ),
            createSkill(
                Skills.CellBasedArchitecture,
                SkillProficiency.Intermediate,
            ),
        ],
    },
    {
        category: SkillCategoryArtificialIntelligenceAndMachineLearning,
        skills: [
            createSkill(Skills.NeuralNetworks, SkillProficiency.Novice),
            createSkill(Skills.DeepLearning, SkillProficiency.Novice),
            createSkill(Skills.ReinforcementLearning, SkillProficiency.Novice),
            createSkill(Skills.TensorFlow, SkillProficiency.Novice),
        ],
    },
];

export default SkillCategories;
