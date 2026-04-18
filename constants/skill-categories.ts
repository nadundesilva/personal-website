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

import Skills, { type SkillDefinition } from "./skills";

export { SkillProficiency } from "./skills";

export interface SkillGroup {
    category: string;
    skills: SkillDefinition[];
}

const SkillCategories: Record<string, SkillGroup> = {
    ProgrammingLanguages: {
        category: "Programming Languages",
        skills: [
            Skills.Java,
            Skills.GoLang,
            Skills.Python,
            Skills.Scala,
            Skills.JavaScript,
            Skills.TypeScript,
            Skills.Ballerina,
            Skills.CompilerTheory,
        ],
    },
    CloudPlatforms: {
        category: "Cloud Platforms",
        skills: [Skills.Aws, Skills.Gcp, Skills.Azure],
    },
    ContainerizationAndOrchestration: {
        category: "Containerization & Orchestration",
        skills: [
            Skills.Kubernetes,
            Skills.AwsEcs,
            Skills.Docker,
            Skills.Kustomize,
            Skills.Helm,
            Skills.Istio,
            Skills.KubernetesControllers,
            Skills.KubernetesOperatorFramework,
        ],
    },
    InfrastructureAsCodeAndAutomation: {
        category: "Infrastructure as Code & Automation",
        skills: [
            Skills.Terraform,
            Skills.Ansible,
            Skills.GitHubActions,
            Skills.GitLabCi,
            Skills.Maven,
        ],
    },
    ApplicationFrameworksAndLibraries: {
        category: "Application Frameworks & Libraries",
        skills: [
            Skills.SpringBoot,
            Skills.ExpressJS,
            Skills.React,
            Skills.NextJS,
            Skills.ApacheLucene,
            Skills.D3js,
        ],
    },
    DatabasesAndDataStorage: {
        category: "Databases & Data Storage",
        skills: [
            Skills.InfluxDB,
            Skills.Redis,
            Skills.OrientDB,
            Skills.AzureDataExplorer,
            Skills.AzureDataLake,
            Skills.MySQL,
            Skills.MsSQL,
        ],
    },
    EventDrivenArchitectureAndMessaging: {
        category: "Event-Driven Architecture & Messaging",
        skills: [
            Skills.Kafka,
            Skills.AwsSqs,
            Skills.AzureEventHub,
            Skills.StreamProcessing,
        ],
    },
    ApiDevelopmentAndStandards: {
        category: "API Development & Standards",
        skills: [
            Skills.Rest,
            Skills.GraphQl,
            Skills.Grpc,
            Skills.OpenApi,
            Skills.OAuth2,
            Skills.Oidc,
        ],
    },
    ObservabilityAndMonitoring: {
        category: "Observability & Monitoring",
        skills: [
            Skills.OpenTelemetry,
            Skills.Prometheus,
            Skills.Jaeger,
            Skills.DataDog,
            Skills.AwsCloudWatch,
        ],
    },
    SoftwareEngineeringPractices: {
        category: "Software Engineering Practices",
        skills: [
            Skills.Agile,
            Skills.DevOps,
            Skills.GitOps,
            Skills.SiteReliabilityEngineering,
            Skills.DisasterRecoveryPlanning,
            Skills.ThreatModeling,
            Skills.SoftwareEngineering,
            Skills.TechnicalLeadership,
            Skills.Microservices,
            Skills.CloudNativeApplicationDevelopment,
            Skills.CellBasedArchitecture,
        ],
    },
    ArtificialIntelligenceAndMachineLearning: {
        category: "Artificial Intelligence & Machine Learning",
        skills: [
            Skills.NeuralNetworks,
            Skills.DeepLearning,
            Skills.ReinforcementLearning,
            Skills.TensorFlow,
        ],
    },
};

export default SkillCategories;
