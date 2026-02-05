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

import { StaticImageData } from "next/image";
import Skills from "@/constants/skills";

import indexityLogoImage from "@/assets/projects/indexity-logo.svg";
import indexityLogoWhiteImage from "@/assets/projects/indexity-logo-white.svg";
import choreoLogoImage from "@/assets/projects/choreo-logo.svg";
import choreoLogoWhiteImage from "@/assets/projects/choreo-logo-white.svg";
import ballerinaLogoImage from "@/assets/projects/ballerina-logo.svg";
import ballerinaLogoWhiteImage from "@/assets/projects/ballerina-logo-white.svg";
import celleryLogoImage from "@/assets/projects/cellery-logo.svg";
import celleryLogoWhiteImage from "@/assets/projects/cellery-logo-white.svg";
import siddhiLogoImage from "@/assets/projects/siddhi-logo.svg";
import siddhiLogoWhiteImage from "@/assets/projects/siddhi-logo-white.svg";
import k8sReplicatorLogoImage from "@/assets/projects/personal/k8s-replicator-logo.png";
import meshManagerLogoImage from "@/assets/projects/personal/mesh-manager-logo.png";

export interface Project {
    name: string;
    description: string;
    logo: {
        srcLight: StaticImageData;
        srcDark: StaticImageData;
        alt: string;
    };
    link: string;
    skills: string[];
}

const Projects: Record<string, Project> = {
    Indexity: {
        name: "Indexity",
        description:
            "A cloud-native Enterprise Master Patient Index (EMPI) and Master Data Management (MDM) platform designed to enhance data accuracy and interoperability in healthcare systems.",
        logo: {
            srcLight: indexityLogoImage,
            srcDark: indexityLogoWhiteImage,
            alt: "Indexity",
        },
        link: "https://indexity.io/",
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
        logo: {
            srcLight: choreoLogoImage,
            srcDark: choreoLogoWhiteImage,
            alt: "Choreo",
        },
        link: "https://wso2.com/choreo/",
        skills: [
            Skills.Azure,
            Skills.Kubernetes,
            Skills.GoLang,
            Skills.Ballerina,
            Skills.Java,
            Skills.OpenTelemetry,
            Skills.React,
            Skills.Azure,
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
        logo: {
            srcLight: ballerinaLogoImage,
            srcDark: ballerinaLogoWhiteImage,
            alt: "Ballerina",
        },
        link: "https://ballerina.io/",
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
        logo: {
            srcLight: celleryLogoImage,
            srcDark: celleryLogoWhiteImage,
            alt: "Cellery",
        },
        link: "https://github.com/wso2-cellery/cellery",
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
        logo: {
            srcLight: siddhiLogoImage,
            srcDark: siddhiLogoWhiteImage,
            alt: "Siddhi",
        },
        link: "https://siddhi.io/",
        skills: [
            Skills.Java,
            Skills.Maven,
            Skills.StreamProcessing,
            Skills.SoftwareEngineering,
        ],
    },
    K8sReplicator: {
        name: "K8s Replicator",
        description:
            "A Kubernetes controller that automatically watches namespaces and creates resources (Secrets, ConfigMaps, etc.) in them as soon as they are created.",
        logo: {
            srcLight: k8sReplicatorLogoImage,
            srcDark: k8sReplicatorLogoImage,
            alt: "K8s Replicator",
        },
        link: "https://github.com/nadundesilva/k8s-replicator",
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
        logo: {
            srcLight: meshManagerLogoImage,
            srcDark: meshManagerLogoImage,
            alt: "Mesh Manager",
        },
        link: "https://github.com/nadundesilva/mesh-manager",
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
