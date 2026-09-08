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
    const readingTimeMinutes = Math.max(1, Math.ceil(minutes));

    tree.children.unshift(
        {
            type: "element",
            tagName: "span",
            properties: {
                dataReadingTimeMinutes: String(readingTimeMinutes),
                hidden: true,
                ariaHidden: "true",
            },
            children: [],
        },
        // Also export the value as an ESM binding so utils/server/blog-articles.ts
        // (which imports this module for its metadata) can reuse this exact
        // number instead of recomputing reading time itself over the raw file -
        // that raw-file computation used to disagree with this one because it
        // included the copyright header, imports and JS metadata objects.
        {
            type: "mdxjsEsm",
            value: `export const readingTimeMinutes = ${readingTimeMinutes};`,
            data: {
                estree: {
                    type: "Program",
                    sourceType: "module",
                    comments: [],
                    body: [
                        {
                            type: "ExportNamedDeclaration",
                            specifiers: [],
                            source: null,
                            declaration: {
                                type: "VariableDeclaration",
                                kind: "const",
                                declarations: [
                                    {
                                        type: "VariableDeclarator",
                                        id: {
                                            type: "Identifier",
                                            name: "readingTimeMinutes",
                                        },
                                        init: {
                                            type: "Literal",
                                            value: readingTimeMinutes,
                                            raw: String(readingTimeMinutes),
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        },
    );
};

export default rehypeReadingTime;
