"use client";
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
import { useReportWebVitals } from "next/web-vitals";
import type React from "react";

interface Zaraz {
    track: (eventName: string, data?: Record<string, unknown>) => void;
    queue: (eventName: string, data?: Record<string, unknown>) => void;
}

interface ZarazWindow {
    zaraz?: Zaraz;
}

const WebVitals = (): React.ReactElement | null => {
    useReportWebVitals((metric) => {
        if (
            typeof window !== "undefined" &&
            (window as unknown as ZarazWindow).zaraz
        ) {
            const zaraz = (window as unknown as ZarazWindow).zaraz;
            if (zaraz) {
                zaraz.track("web_vital", {
                    name: metric.name,
                    value: Math.round(
                        metric.name === "CLS"
                            ? metric.value * 1000
                            : metric.value,
                    ),
                    id: metric.id,
                    delta: metric.delta,
                    rating: metric.rating,
                });
            }
        }
    });
    return null;
};

export default WebVitals;
