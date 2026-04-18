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
import { toString } from "hast-util-to-string";
import readingTime from "reading-time";

const rehypeReadingTime = () => (tree) => {
    const text = toString(tree);
    const { minutes } = readingTime(text);

    tree.children.unshift({
        type: "element",
        tagName: "span",
        properties: {
            dataReadingTimeMinutes: String(Math.max(1, Math.ceil(minutes))),
            hidden: true,
            ariaHidden: "true",
        },
        children: [],
    });
};

export default rehypeReadingTime;
