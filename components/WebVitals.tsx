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
import React from "react";

interface Window {
    gtag: Gtag.Gtag;
}

const WebVitals = (): React.ReactElement => {
    useReportWebVitals((metric) => {
        (window as Window).gtag("event", metric.name, {
            value: Math.round(
                metric.name === "CLS" ? metric.value * 1000 : metric.value,
            ),
            event_label: metric.id,
            non_interaction: true,
        });
    });
    return <React.Fragment />;
};

export default WebVitals;
