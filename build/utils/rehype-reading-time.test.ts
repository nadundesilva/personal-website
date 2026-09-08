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
import { describe, expect, it } from "@jest/globals";

import rehypeReadingTime from "./rehype-reading-time.mjs";

interface TextNode {
    type: "text";
    value: string;
}

interface ElementNode {
    type: "element";
    tagName: string;
    properties: Record<string, unknown>;
    children: HastNode[];
}

type HastNode = TextNode | ElementNode;

interface RootNode {
    type: "root";
    children: HastNode[];
}

interface MarkerSpan {
    type: "element";
    tagName: "span";
    properties: {
        dataReadingTimeMinutes: string;
        hidden: boolean;
        ariaHidden: string;
    };
}

interface ExportEsmNode {
    type: "mdxjsEsm";
    value: string;
}

const text = (value: string): TextNode => ({ type: "text", value });

const element = (tagName: string, children: HastNode[]): ElementNode => ({
    type: "element",
    tagName,
    properties: {},
    children,
});

// hast-util-to-string concatenates descendant text node values with no
// separator, so every text node here carries its own trailing space -
// element boundaries alone do not separate words.
const words = (count: number): string =>
    `${Array.from({ length: count }, () => "word").join(" ")} `;

const run = (
    root: RootNode,
): { marker: MarkerSpan; exported: ExportEsmNode } => {
    rehypeReadingTime()(root);
    return {
        marker: root.children[0] as unknown as MarkerSpan,
        exported: root.children[1] as unknown as ExportEsmNode,
    };
};

describe("rehypeReadingTime", () => {
    it("reports at least a minute for an article too short to measure", () => {
        // An empty tree yields 0 words -> 0 minutes -> Math.ceil(0) is still 0,
        // so this only passes if the plugin's own floor kicks in.
        const root: RootNode = { type: "root", children: [element("p", [])] };

        const { marker } = run(root);

        expect(marker.properties.dataReadingTimeMinutes).toBe("1");
    });

    it("rounds a part-minute of reading up to the next whole minute", () => {
        // 260 words at the library's 200 wpm default is 1.3 minutes - well
        // inside the interval that rounds up to 2, not a knife-edge value
        // that would fail on an unrelated word-counting nuance.
        const root: RootNode = {
            type: "root",
            children: [element("p", [text(words(260))])],
        };

        const { marker } = run(root);

        expect(marker.properties.dataReadingTimeMinutes).toBe("2");
    });

    it("counts the words nested inside headings and code blocks, not just top-level text", () => {
        // Words live at two different nesting depths: one level down in `p`
        // and `h2`, two levels down in `pre > code`. The 150 words one level
        // down alone would round to 1 minute (0.75 min); only counting the
        // 120 words nested two levels down as well pushes the total (270
        // words = 1.35 min) past the threshold that rounds up to 2 - so this
        // fails if the plugin ever stops descending past the first level.
        const root: RootNode = {
            type: "root",
            children: [
                element("p", [text(words(50))]),
                element("h2", [text(words(100))]),
                element("pre", [element("code", [text(words(120))])]),
            ],
        };

        const { marker } = run(root);

        expect(marker.properties.dataReadingTimeMinutes).toBe("2");
    });

    it("reports the same estimate to the article page and to the listing card", () => {
        const root: RootNode = {
            type: "root",
            children: [element("p", [text(words(260))])],
        };

        const { marker, exported } = run(root);

        expect(exported.value).toBe(
            `export const readingTimeMinutes = ${marker.properties.dataReadingTimeMinutes};`,
        );
    });

    it("keeps the estimate marker out of sight and out of the accessibility tree", () => {
        const root: RootNode = {
            type: "root",
            children: [element("p", [text(words(260))])],
        };

        const { marker } = run(root);

        expect(marker.properties.hidden).toBe(true);
        expect(marker.properties.ariaHidden).toBe("true");
    });
});
