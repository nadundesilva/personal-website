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
import ImgixClient from "@imgix/js-core";

const client = new ImgixClient({
    domain: "nadundesilva.imgix.net",
    useHTTPS: true,
});

export default function nextImageLoader({ src, width, quality }) {
    return src.startsWith("/_next/static/media/")
        ? src
        : client.buildURL((src.startsWith("/") ? "" : "/") + src, {
              q: quality,
              w: width,
          });
}
