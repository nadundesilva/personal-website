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

import { Date } from "./date";

export interface Publication {
    title: string;
    url: string;
    publishedDate: Date;
    venue: string;
    keywords: string[];
}

const Publications: Record<string, Publication> = {
    GanBasedAnomalyDetection: {
        title: "Generative Adversarial Networks (GAN) based Anomaly Detection in Industrial Software Systems",
        url: "https://ieeexplore.ieee.org/document/8818750",
        publishedDate: new Date(2019, "January"),
        venue: "Moratuwa Engineering Research Conference (MERCon)",
        keywords: [
            "Anomaly Detection",
            "Generative Adversarial Networks",
            "Industrial Software Systems",
            "Deep Learning",
        ],
    },
    AnomalyDetectionUsingVae: {
        title: "Anomaly Detection in Industrial Software Systems — Using Variational Autoencoders",
        url: "https://www.scitepress.org/Papers/2018/66003/pdf/index.html",
        publishedDate: new Date(2018, "January"),
        venue: "7th International Conference on Pattern Recognition Applications and Methods (ICPRAM)",
        keywords: [
            "Anomaly Detection",
            "Variational Autoencoders",
            "Industrial Software Systems",
            "Machine Learning",
        ],
    },
};

export default Publications;
