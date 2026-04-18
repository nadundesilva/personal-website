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

import { ContentContainer } from "@/components/layout";

interface ContentLayoutProps {
    children: React.ReactNode;
}

const ContentLayout = ({
    children,
}: ContentLayoutProps): React.ReactElement => {
    return <ContentContainer className="mb-10">{children}</ContentContainer>;
};

export default ContentLayout;
