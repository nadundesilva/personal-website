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
"use client";

import * as Sentry from "@sentry/nextjs";
import type React from "react";
import { useEffect } from "react";

import { Button } from "@/components/primitives";

interface ErrorProps {
    reset: () => void;
    error: Error & { digest?: string };
}

const Error = ({ reset, error }: ErrorProps): React.ReactElement => {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);

    return (
        <div className="flex min-h-[50vh] items-center justify-center">
            <div role="alert" aria-atomic="true" className="text-center">
                <h1 className="my-4 text-xl font-semibold">
                    Something went wrong
                </h1>
                <Button onClick={reset}>Try Again</Button>
            </div>
        </div>
    );
};

export default Error;
