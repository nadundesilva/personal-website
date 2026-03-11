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
 * © 2025 Nadun De Silva. All rights reserved.
 */
import { Inter, JetBrains_Mono } from "next/font/google";

const defaultFont = Inter({
    weight: ["300", "400", "500"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-default",
});

export const code = JetBrains_Mono({
    weight: ["400", "500"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-code",
});

export default defaultFont;
