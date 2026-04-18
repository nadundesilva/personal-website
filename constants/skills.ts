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
 * © 2026 Nadun De Silva. All rights reserved.
 */

export enum SkillProficiency {
    Novice = "Novice",
    Intermediate = "Intermediate",
    Expert = "Expert",
}

export interface SkillDefinition {
    name: string;
    proficiencyLevel: SkillProficiency;
}

const createSkill = (
    name: string,
    level: SkillProficiency,
): SkillDefinition => ({ name, proficiencyLevel: level });

const Skills = {
    // Programming Languages
    Java: createSkill("Java", SkillProficiency.Expert),
    Ballerina: createSkill("Ballerina", SkillProficiency.Intermediate),
    GoLang: createSkill("GoLang", SkillProficiency.Expert),
    Python: createSkill("Python", SkillProficiency.Intermediate),
    Scala: createSkill("Scala", SkillProficiency.Intermediate),
    JavaScript: createSkill("JavaScript", SkillProficiency.Intermediate),
    TypeScript: createSkill("TypeScript", SkillProficiency.Intermediate),
    CompilerTheory: createSkill(
        "Compiler Theory",
        SkillProficiency.Intermediate,
    ),

    // Cloud Platforms
    Aws: createSkill("AWS", SkillProficiency.Expert),
    Gcp: createSkill("GCP", SkillProficiency.Intermediate),
    Azure: createSkill("Azure", SkillProficiency.Novice),

    // Containerization & Orchestration
    Kubernetes: createSkill("Kubernetes", SkillProficiency.Expert),
    AwsEcs: createSkill("AWS ECS", SkillProficiency.Expert),
    Docker: createSkill("Docker", SkillProficiency.Expert),
    Kustomize: createSkill("Kustomize", SkillProficiency.Intermediate),
    Helm: createSkill("Helm", SkillProficiency.Intermediate),
    KubernetesOperatorFramework: createSkill(
        "Kubernetes Operator Framework",
        SkillProficiency.Expert,
    ),
    Istio: createSkill("Istio", SkillProficiency.Intermediate),
    KubernetesControllers: createSkill(
        "Kubernetes Controllers",
        SkillProficiency.Expert,
    ),

    // Infrastructure as Code & Automation
    Terraform: createSkill("Terraform", SkillProficiency.Expert),
    Ansible: createSkill("Ansible", SkillProficiency.Novice),
    GitHubActions: createSkill("GitHub Actions", SkillProficiency.Expert),
    GitLabCi: createSkill("GitLab CI/CD", SkillProficiency.Expert),
    Maven: createSkill("Maven", SkillProficiency.Expert),

    // Application Frameworks & Libraries
    SpringBoot: createSkill("Spring Boot", SkillProficiency.Intermediate),
    ExpressJS: createSkill("ExpressJS", SkillProficiency.Intermediate),
    React: createSkill("React", SkillProficiency.Intermediate),
    NextJS: createSkill("NextJS", SkillProficiency.Intermediate),
    ApacheLucene: createSkill("Apache Lucene", SkillProficiency.Intermediate),
    D3js: createSkill("D3.js", SkillProficiency.Novice),

    // Databases & Data Storage
    InfluxDB: createSkill("Influx DB", SkillProficiency.Novice),
    Redis: createSkill("Redis", SkillProficiency.Intermediate),
    OrientDB: createSkill("Orient DB", SkillProficiency.Intermediate),
    AzureDataExplorer: createSkill(
        "Azure Data Explorer",
        SkillProficiency.Expert,
    ),
    AzureDataLake: createSkill("Azure Data Lake", SkillProficiency.Expert),
    MySQL: createSkill("MySQL", SkillProficiency.Expert),
    MsSQL: createSkill("MsSQL", SkillProficiency.Expert),

    // Event-Driven Architecture & Messaging
    Kafka: createSkill("Kafka", SkillProficiency.Expert),
    AwsSqs: createSkill("AWS SQS", SkillProficiency.Expert),
    AzureEventHub: createSkill("Azure Event Hub", SkillProficiency.Expert),
    StreamProcessing: createSkill("Stream Processing", SkillProficiency.Expert),

    // API Development & Standards
    Rest: createSkill("REST", SkillProficiency.Expert),
    GraphQl: createSkill("GraphQL", SkillProficiency.Expert),
    Grpc: createSkill("gRPC", SkillProficiency.Expert),
    OpenApi: createSkill("OpenAPI", SkillProficiency.Expert),
    OAuth2: createSkill("OAuth2", SkillProficiency.Expert),
    Oidc: createSkill("OIDC", SkillProficiency.Expert),

    // Observability & Monitoring
    OpenTelemetry: createSkill("OpenTelemetry", SkillProficiency.Expert),
    DataDog: createSkill("DataDog", SkillProficiency.Intermediate),
    Prometheus: createSkill("Prometheus", SkillProficiency.Expert),
    Jaeger: createSkill("Jaeger", SkillProficiency.Expert),
    AwsCloudWatch: createSkill("AWS CloudWatch", SkillProficiency.Intermediate),

    // Software Engineering Practices
    Agile: createSkill("Agile", SkillProficiency.Expert),
    DevOps: createSkill("DevOps", SkillProficiency.Expert),
    GitOps: createSkill("GitOps", SkillProficiency.Expert),
    SiteReliabilityEngineering: createSkill(
        "Site Reliability Engineering",
        SkillProficiency.Intermediate,
    ),
    DisasterRecoveryPlanning: createSkill(
        "Disaster Recovery Planning",
        SkillProficiency.Expert,
    ),
    ThreatModeling: createSkill(
        "Threat Modeling",
        SkillProficiency.Intermediate,
    ),
    SoftwareEngineering: createSkill(
        "Software Engineering",
        SkillProficiency.Expert,
    ),
    TechnicalLeadership: createSkill(
        "Technical Leadership",
        SkillProficiency.Expert,
    ),
    Microservices: createSkill("Microservices", SkillProficiency.Expert),
    CloudNativeApplicationDevelopment: createSkill(
        "Cloud Native Application Development",
        SkillProficiency.Expert,
    ),
    CellBasedArchitecture: createSkill(
        "Cell-based Architecture",
        SkillProficiency.Intermediate,
    ),

    // Artificial Intelligence & Machine Learning
    DeepLearning: createSkill("Deep Learning", SkillProficiency.Novice),
    NeuralNetworks: createSkill("Neural Networks", SkillProficiency.Novice),
    TensorFlow: createSkill("TensorFlow", SkillProficiency.Novice),
    ReinforcementLearning: createSkill(
        "Reinforcement Learning",
        SkillProficiency.Novice,
    ),
};

export default Skills;
