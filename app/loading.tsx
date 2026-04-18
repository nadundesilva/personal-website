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
import type React from "react";

const Loading = (): React.ReactElement => (
    <div className="flex h-screen justify-center pt-[25%]">
        <div
            role="status"
            aria-label="Loading"
            className="border-primary/20 border-t-primary size-10 rounded-full border-4 motion-safe:animate-spin"
        />
    </div>
);

export default Loading;
