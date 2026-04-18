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

import { Spinner } from "@/components/primitives";

const Loading = (): React.ReactElement => (
    <div className="flex h-screen justify-center pt-[25%]">
        <Spinner
            data-testid="route-segment-loading-spinner"
            className="size-10"
        />
    </div>
);

export default Loading;
