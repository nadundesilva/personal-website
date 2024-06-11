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
 * Website: https://nadundesilva.github.io
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */
import { buildURL } from "react-imgix";

export default function nextImageLoader({ src, width, quality }) {
    return src.startsWith("/_next/static/media/")
        ? src
        : buildURL(
              "https://nadundesilva.imgix.net" +
                  (src.startsWith("/") ? "" : "/") +
                  src,
              {
                  q: quality,
                  w: width,
              },
          );
}
