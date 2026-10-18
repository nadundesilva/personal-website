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

// Next types every *.svg import as `any` so it can coexist with svgr. This
// project does not use svgr, so its SVG assets are plain static images.
declare module "@/assets/*.svg" {
    const image: import("next/image").StaticImageData;
    export default image;
}
