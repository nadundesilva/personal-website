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

export const SkillProficiencies = {
    Novice: "Novice",
    Intermediate: "Intermediate",
    Expert: "Expert",
};

export type SkillProficiency =
    | typeof SkillProficiencies.Novice
    | typeof SkillProficiencies.Intermediate
    | typeof SkillProficiencies.Expert;

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
            createSkill(Skills.Java, SkillProficiencies.Expert),
            createSkill(Skills.GoLang, SkillProficiencies.Expert),
            createSkill(Skills.Python, SkillProficiencies.Intermediate),
            createSkill(Skills.Scala, SkillProficiencies.Intermediate),
            createSkill(Skills.JavaScript, SkillProficiencies.Intermediate),
            createSkill(Skills.TypeScript, SkillProficiencies.Intermediate),
            createSkill(Skills.Ballerina, SkillProficiencies.Intermediate),
            createSkill(Skills.CompilerTheory, SkillProficiencies.Intermediate),
        ],
    },
    {
        category: SkillCategoryCloudPlatforms,
        skills: [
            createSkill(Skills.Aws, SkillProficiencies.Expert),
            createSkill(Skills.Gcp, SkillProficiencies.Intermediate),
            createSkill(Skills.Azure, SkillProficiencies.Novice),
        ],
    },
    {
        category: SkillCategoryContainerizationAndOrchestration,
        skills: [
            createSkill(Skills.Kubernetes, SkillProficiencies.Expert),
            createSkill(Skills.AwsEcs, SkillProficiencies.Expert),
            createSkill(Skills.Docker, SkillProficiencies.Expert),
            createSkill(Skills.Kustomize, SkillProficiencies.Intermediate),
            createSkill(Skills.Helm, SkillProficiencies.Intermediate),
            createSkill(Skills.Istio, SkillProficiencies.Intermediate),
            createSkill(
                Skills.KubernetesControllers,
                SkillProficiencies.Expert,
            ),
            createSkill(
                Skills.KubernetesOperatorFramework,
                SkillProficiencies.Expert,
            ),
        ],
    },
    {
        category: SkillCategoryInfrastructureAsCodeAndAutomation,
        skills: [
            createSkill(Skills.Terraform, SkillProficiencies.Expert),
            createSkill(Skills.Ansible, SkillProficiencies.Novice),
            createSkill(Skills.GitHubActions, SkillProficiencies.Expert),
            createSkill(Skills.GitLabCi, SkillProficiencies.Expert),
            createSkill(Skills.AzureEventHub, SkillProficiencies.Intermediate),
        ],
    },
    {
        category: SkillCategoryApplicationFrameworksAndLibraries,
        skills: [
            createSkill(Skills.SpringBoot, SkillProficiencies.Intermediate),
            createSkill(Skills.ExpressJS, SkillProficiencies.Intermediate),
            createSkill(Skills.React, SkillProficiencies.Intermediate),
            createSkill(Skills.NextJS, SkillProficiencies.Intermediate),
            createSkill(Skills.ApacheLucene, SkillProficiencies.Intermediate),
            createSkill(Skills.D3js, SkillProficiencies.Novice),
        ],
    },
    {
        category: SkillCategoryDatabasesAndDataStorage,
        skills: [
            createSkill(Skills.InfluxDB, SkillProficiencies.Novice),
            createSkill(Skills.Redis, SkillProficiencies.Intermediate),
            createSkill(Skills.OrientDB, SkillProficiencies.Intermediate),
            createSkill(Skills.AzureDataExplorer, SkillProficiencies.Expert),
            createSkill(Skills.AzureDataLake, SkillProficiencies.Expert),
            createSkill(Skills.MySQL, SkillProficiencies.Expert),
            createSkill(Skills.MsSQL, SkillProficiencies.Expert),
        ],
    },
    {
        category: SkillCategoryEventDrivenArchitectureAndMessaging,
        skills: [
            createSkill(Skills.Kafka, SkillProficiencies.Expert),
            createSkill(Skills.AwsSqs, SkillProficiencies.Expert),
            createSkill(Skills.AzureEventHub, SkillProficiencies.Expert),
            createSkill(Skills.StreamProcessing, SkillProficiencies.Expert),
        ],
    },
    {
        category: SkillCategoryApiDevelopmentAndStandards,
        skills: [
            createSkill(Skills.Rest, SkillProficiencies.Expert),
            createSkill(Skills.GraphQl, SkillProficiencies.Expert),
            createSkill(Skills.Grpc, SkillProficiencies.Expert),
            createSkill(Skills.OpenApi, SkillProficiencies.Expert),
            createSkill(Skills.OAuth2, SkillProficiencies.Expert),
            createSkill(Skills.Oidc, SkillProficiencies.Expert),
        ],
    },
    {
        category: SkillCategoryObservabilityAndMonitoring,
        skills: [
            createSkill(Skills.OpenTelemetry, SkillProficiencies.Expert),
            createSkill(Skills.Prometheus, SkillProficiencies.Expert),
            createSkill(Skills.Jaeger, SkillProficiencies.Expert),
            createSkill(Skills.DataDog, SkillProficiencies.Intermediate),
            createSkill(Skills.AwsCloudWatch, SkillProficiencies.Intermediate),
        ],
    },
    {
        category: SkillCategorySoftwareEngineeringPractices,
        skills: [
            createSkill(Skills.Agile, SkillProficiencies.Expert),
            createSkill(Skills.DevOps, SkillProficiencies.Expert),
            createSkill(Skills.GitOps, SkillProficiencies.Expert),
            createSkill(
                Skills.SiteReliabilityEngineering,
                SkillProficiencies.Intermediate,
            ),
            createSkill(
                Skills.DisasterRecoveryPlanning,
                SkillProficiencies.Expert,
            ),
            createSkill(Skills.ThreatModeling, SkillProficiencies.Intermediate),
            createSkill(Skills.SoftwareEngineering, SkillProficiencies.Expert),
            createSkill(Skills.TechnicalLeadership, SkillProficiencies.Expert),
            createSkill(Skills.Microservices, SkillProficiencies.Expert),
            createSkill(
                Skills.CloudNativeApplicationDevelopment,
                SkillProficiencies.Expert,
            ),
            createSkill(
                Skills.CellBasedArchitecture,
                SkillProficiencies.Intermediate,
            ),
        ],
    },
    {
        category: SkillCategoryArtificialIntelligenceAndMachineLearning,
        skills: [
            createSkill(Skills.NeuralNetworks, SkillProficiencies.Novice),
            createSkill(Skills.DeepLearning, SkillProficiencies.Novice),
            createSkill(
                Skills.ReinforcementLearning,
                SkillProficiencies.Novice,
            ),
            createSkill(Skills.TensorFlow, SkillProficiencies.Novice),
        ],
    },
];

export default SkillCategories;
