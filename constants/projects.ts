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

import { type FormattableDate, Date, DateRange, Now } from "./date";
import Logos, { type LogoImageData } from "@/constants/logos";
import Skills from "@/constants/skills";

export interface Project {
    name: string;
    description: string;
    logo: LogoImageData;
    link: string;
    timePeriod: FormattableDate;
    skills: string[];
}

const Projects: Record<string, Project> = {
    Indexity: {
        name: "Indexity",
        description:
            "A cloud-native Enterprise Master Patient Index (EMPI) and Master Data Management (MDM) platform designed to enhance data accuracy and interoperability in healthcare systems.",
        logo: Logos.Indexity,
        link: "https://indexity.io/",
        timePeriod: new DateRange(new Date(2022, "November"), Now),
        skills: [
            Skills.GoLang,
            Skills.Python,
            Skills.Scala,
            Skills.SpringBoot,
            Skills.OrientDB,
            Skills.ApacheLucene,
            Skills.Gcp,
            Skills.Aws,
            Skills.AwsEcs,
            Skills.AwsSqs,
            Skills.Grpc,
            Skills.AwsCloudWatch,
            Skills.Oidc,
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
    Choreo: {
        name: "Choreo",
        description:
            "A Digital Platform as a Service which abstracts away the complexity of cloud-native development and operations infrastructure so that users can create new APIs, integrations and services in hours.",
        logo: Logos.Choreo,
        link: "https://wso2.com/choreo/",
        timePeriod: new DateRange(
            new Date(2020, "January"),
            new Date(2022, "November"),
        ),
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
            Skills.Agile,
            Skills.GitOps,
            Skills.Oidc,
            Skills.Istio,
            Skills.Kustomize,
            Skills.Microservices,
            Skills.SoftwareEngineering,
            Skills.TechnicalLeadership,
        ],
    },
    Ballerina: {
        name: "Ballerina",
        description:
            "A programming language targeting making the development of cloud-native applications easier, featuring built-in automated Observability.",
        logo: Logos.Ballerina,
        link: "https://ballerina.io/",
        timePeriod: new DateRange(
            new Date(2020, "January"),
            new Date(2022, "June"),
        ),
        skills: [
            Skills.Java,
            Skills.Ballerina,
            Skills.CompilerTheory,
            Skills.Prometheus,
            Skills.Jaeger,
        ],
    },
    Cellery: {
        name: "Cellery",
        description:
            "An implementation of the Cell-based Architecture which aims to improve productivity of the development of complex microservices, across multiple teams.",
        logo: Logos.Cellery,
        link: "https://github.com/wso2-cellery/cellery",
        timePeriod: new DateRange(
            new Date(2018, "September"),
            new Date(2019, "December"),
        ),
        skills: [
            Skills.Kubernetes,
            Skills.Docker,
            Skills.Ballerina,
            Skills.Microservices,
            Skills.CellBasedArchitecture,
            Skills.SoftwareEngineering,
            Skills.TechnicalLeadership,
        ],
    },
    Siddhi: {
        name: "Siddhi",
        description:
            "A fully open source, cloud-native, scalable, streaming, and complex event processing system capable of building event-driven applications.",
        logo: Logos.Siddhi,
        link: "https://siddhi.io/",
        timePeriod: new DateRange(
            new Date(2016, "July"),
            new Date(2016, "December"),
        ),
        skills: [
            Skills.Java,
            Skills.Maven,
            Skills.StreamProcessing,
            Skills.SoftwareEngineering,
        ],
    },
    GoogleSummerOfCode: {
        name: "Google Summer of Code - Siddhi Docs Generation",
        description:
            "A Maven plugin for automatically generating documentation for Siddhi extensions using data annotated in the Java code.",
        logo: Logos.GoogleSummerOfCode,
        link: "https://summerofcode.withgoogle.com/archive/2017/projects/5957128497922048",
        timePeriod: new DateRange(
            new Date(2017, "May"),
            new Date(2017, "September"),
        ),
        skills: [Skills.Java, Skills.Maven],
    },
    K8sReplicator: {
        name: "K8s Replicator",
        description:
            "A Kubernetes controller that automatically watches namespaces and creates resources (Secrets, ConfigMaps, etc.) in them as soon as they are created.",
        logo: Logos.K8sReplicator,
        link: "https://github.com/nadundesilva/k8s-replicator",
        timePeriod: new DateRange(new Date(2021), Now),
        skills: [
            Skills.Kubernetes,
            Skills.Docker,
            Skills.GoLang,
            Skills.KubernetesControllers,
            Skills.KubernetesOperatorFramework,
        ],
    },
    MeshManager: {
        name: "Mesh Manager",
        description:
            "A controller that allows users to declaratively specify microservices including their dependencies so that the controller will properly manage them.",
        logo: Logos.MeshManager,
        link: "https://github.com/nadundesilva/mesh-manager",
        timePeriod: new DateRange(new Date(2021), Now),
        skills: [
            Skills.Kubernetes,
            Skills.Docker,
            Skills.GoLang,
            Skills.KubernetesControllers,
            Skills.KubernetesOperatorFramework,
        ],
    },
};

export default Projects;
