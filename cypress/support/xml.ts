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

export const parseXml = (body: string): Document => {
    const doc = new DOMParser().parseFromString(body, "application/xml");
    if (doc.getElementsByTagName("parsererror").length > 0) {
        throw new Error(`Failed to parse XML: ${body}`);
    }
    return doc;
};

// Direct children only, matched by local name with no namespace prefix -
// e.g. selects <link> in an RSS <channel> without also matching <atom:link>,
// which shares the local name but carries a prefix.
export const childrenNamed = (parent: Element, name: string): Element[] =>
    Array.from(parent.children).filter(
        (child) => child.localName === name && child.prefix === null,
    );

export const childText = (parent: Element, name: string): string =>
    childrenNamed(parent, name)[0]?.textContent?.trim() ?? "";
