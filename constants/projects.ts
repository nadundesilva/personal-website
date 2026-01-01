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
    logo: {
        srcLight: StaticImageData;
        srcDark: StaticImageData;
        alt: string;
    };
    link: string;
}

export const Projects: Record<string, Project> = {
    Indexity: {
        name: "Indexity",
        logo: {
            srcLight: indexityLogoImage,
            srcDark: indexityLogoWhiteImage,
            alt: "Indexity",
        },
        link: "https://indexity.io/",
    },
    Choreo: {
        name: "Choreo",
        logo: {
            srcLight: choreoLogoImage,
            srcDark: choreoLogoWhiteImage,
            alt: "Choreo",
        },
        link: "https://wso2.com/choreo/",
    },
    Ballerina: {
        name: "Ballerina",
        logo: {
            srcLight: ballerinaLogoImage,
            srcDark: ballerinaLogoWhiteImage,
            alt: "Ballerina",
        },
        link: "https://ballerina.io/",
    },
    Cellery: {
        name: "Cellery",
        logo: {
            srcLight: celleryLogoImage,
            srcDark: celleryLogoWhiteImage,
            alt: "Cellery",
        },
        link: "https://github.com/wso2-cellery/cellery",
    },
    Siddhi: {
        name: "Siddhi",
        logo: {
            srcLight: siddhiLogoImage,
            srcDark: siddhiLogoWhiteImage,
            alt: "Siddhi",
        },
        link: "https://siddhi.io/",
    },
    K8sReplicator: {
        name: "K8s Replicator",
        logo: {
            srcLight: k8sReplicatorLogoImage,
            srcDark: k8sReplicatorLogoImage,
            alt: "K8s Replicator",
        },
        link: "https://github.com/nadundesilva/k8s-replicator",
    },
    MeshManager: {
        name: "Mesh Manager",
        logo: {
            srcLight: meshManagerLogoImage,
            srcDark: meshManagerLogoImage,
            alt: "Mesh Manager",
        },
        link: "https://github.com/nadundesilva/mesh-manager",
    },
};
