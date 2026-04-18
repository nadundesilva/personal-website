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

import Companies, { type Company } from "@/constants/companies";
import Skills, { type SkillDefinition } from "@/constants/skills";
import { Date, DateRange, Now } from "./date";

export interface Experience {
    name: string;
    company: Company;
    timePeriod: DateRange;
    description: string;
    institute: string;
    skills: SkillDefinition[];
}

const Experiences: Record<string, Experience> = {
    McCraeTechLeadSoftwareEngineer: {
        name: "Lead Software Engineer",
        company: Companies.McCraeTech,
        timePeriod: new DateRange(new Date(2024, "April"), Now),
        description:
            "Leading the SRE aspects of Indexity data-planes and working across the product.",
        institute: "McCrae Tech, Auckland, New Zealand",
        skills: [
            Skills.GoLang,
            Skills.Python,
            Skills.Scala,
            Skills.Maven,
            Skills.SpringBoot,
            Skills.OrientDB,
            Skills.Aws,
            Skills.AwsEcs,
            Skills.AwsSqs,
            Skills.Grpc,
            Skills.Oidc,
            Skills.GitLabCi,
            Skills.Terraform,
            Skills.Docker,
            Skills.GitOps,
            Skills.DataDog,
            Skills.DisasterRecoveryPlanning,
            Skills.SoftwareEngineering,
            Skills.SiteReliabilityEngineering,
            Skills.TechnicalLeadership,
        ],
    },
    OrionHealthSeniorSoftwareEngineer: {
        name: "Senior Software Engineer",
        company: Companies.OrionHealth,
        timePeriod: new DateRange(
            new Date(2022, "November"),
            new Date(2024, "April"),
        ),
        description:
            "Spearheaded the deployment of Indexity data-planes on AWS.",
        institute: "Orion Health, Auckland, New Zealand",
        skills: [
            Skills.GoLang,
            Skills.Python,
            Skills.Scala,
            Skills.Maven,
            Skills.SpringBoot,
            Skills.OrientDB,
            Skills.ApacheLucene,
            Skills.Aws,
            Skills.AwsEcs,
            Skills.AwsSqs,
            Skills.Grpc,
            Skills.AwsCloudWatch,
            Skills.GitLabCi,
            Skills.Terraform,
            Skills.Docker,
            Skills.GitOps,
            Skills.DataDog,
            Skills.DisasterRecoveryPlanning,
            Skills.ThreatModeling,
            Skills.SoftwareEngineering,
            Skills.SiteReliabilityEngineering,
            Skills.TechnicalLeadership,
        ],
    },
    WSO2AssociateTechnicalLead: {
        name: "Associate Technical Lead",
        company: Companies.WSO2,
        timePeriod: new DateRange(
            new Date(2021, "June"),
            new Date(2022, "November"),
        ),
        description:
            "Led Choreo Observability Team as well as other teams in Choreo.",
        institute: "WSO2, Colombo 03, Sri Lanka",
        skills: [
            Skills.Azure,
            Skills.Kubernetes,
            Skills.GoLang,
            Skills.Ballerina,
            Skills.Java,
            Skills.OpenTelemetry,
            Skills.React,
            Skills.AzureDataLake,
            Skills.AzureDataExplorer,
            Skills.AzureEventHub,
            Skills.MsSQL,
            Skills.Prometheus,
            Skills.Jaeger,
            Skills.Agile,
            Skills.GitOps,
            Skills.Istio,
            Skills.Kustomize,
            Skills.Microservices,
            Skills.SoftwareEngineering,
            Skills.TechnicalLeadership,
        ],
    },
    WSO2SeniorSoftwareEngineer: {
        name: "Senior Software Engineer",
        company: Companies.WSO2,
        timePeriod: new DateRange(
            new Date(2019, "July"),
            new Date(2021, "June"),
        ),
        description:
            "Led Choreo Observability Team in creating the initial PoC as well as the platform.",
        institute: "WSO2, Colombo 03, Sri Lanka",
        skills: [
            Skills.Azure,
            Skills.Kubernetes,
            Skills.GoLang,
            Skills.Ballerina,
            Skills.Java,
            Skills.React,
            Skills.AzureEventHub,
            Skills.Prometheus,
            Skills.Jaeger,
            Skills.Agile,
            Skills.GitOps,
            Skills.Istio,
            Skills.Kustomize,
            Skills.Microservices,
            Skills.SoftwareEngineering,
            Skills.TechnicalLeadership,
        ],
    },
    WSO2SoftwareEngineer: {
        name: "Software Engineer",
        company: Companies.WSO2,
        timePeriod: new DateRange(
            new Date(2018, "January"),
            new Date(2019, "July"),
        ),
        description:
            "Designed & developed several components in middleware & cloud projects.",
        institute: "WSO2, Colombo 03, Sri Lanka",
        skills: [
            Skills.Java,
            Skills.Maven,
            Skills.Docker,
            Skills.Kubernetes,
            Skills.Helm,
            Skills.Ballerina,
            Skills.Microservices,
        ],
    },
    WSO2SoftwareEngineeringTrainee: {
        name: "Software Engineering Trainee",
        company: Companies.WSO2,
        timePeriod: new DateRange(
            new Date(2016, "July"),
            new Date(2016, "December"),
        ),
        description:
            "Implemented a Notebook prototype for the Data Analytics Server.",
        institute: "WSO2, Colombo 03, Sri Lanka",
        skills: [Skills.Java, Skills.JavaScript],
    },
};

export const CurrentExperience = Experiences.McCraeTechLeadSoftwareEngineer;

export default Experiences;
