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
import type { LucideProps } from "lucide-react";
import type React from "react";

interface PrimaryTintedIconProps {
    icon: React.ComponentType<LucideProps>;
    size?: string;
}

const PrimaryTintedIcon = ({
    icon: Icon,
    size,
}: PrimaryTintedIconProps): React.ReactElement => (
    <Icon aria-hidden="true" className="text-primary/70" size={size} />
);

export default PrimaryTintedIcon;
