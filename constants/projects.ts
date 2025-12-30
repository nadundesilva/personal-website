import { LogoAsset, Logos } from "./logos";

export interface Project {
    name: string;
    logo: LogoAsset;
    link: string;
}

export const Projects: Record<string, Project> = {
    Indexity: {
        name: "Indexity",
        logo: Logos.Indexity,
        link: "https://indexity.io/",
    },
    Choreo: {
        name: "Choreo",
        logo: Logos.Choreo,
        link: "https://wso2.com/choreo/",
    },
    Ballerina: {
        name: "Ballerina",
        logo: Logos.Ballerina,
        link: "https://ballerina.io/",
    },
    Cellery: {
        name: "Cellery",
        logo: Logos.Cellery,
        link: "https://github.com/wso2-cellery/cellery",
    },
    Siddhi: {
        name: "Siddhi",
        logo: Logos.Siddhi,
        link: "https://siddhi.io/",
    },
    K8sReplicator: {
        name: "K8s Replicator",
        logo: Logos.K8sReplicator,
        link: "https://github.com/nadundesilva/k8s-replicator",
    },
    MeshManager: {
        name: "Mesh Manager",
        logo: Logos.MeshManager,
        link: "https://github.com/nadundesilva/mesh-manager",
    },
};
