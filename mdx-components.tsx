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
 * © 2024 Nadun De Silva. All rights reserved.
 */
import type { MDXComponents } from "mdx/types";

import MdxArticleImage from "@/components/blog-articles/ArticleImage";
import ArticleLayout, {
    type ArticleLayoutProps,
} from "@/components/blog-articles/ArticleLayout";
import CodeBlock from "@/components/blog-articles/CodeBlock";
import InlineCodeSegment from "@/components/blog-articles/InlineCodeSegment";
import {
    Link,
    List,
    ListItem,
    Paragraph,
    SectionHeading,
    SubsectionHeading,
} from "@/components/content";
import { LeftAccent, Separator } from "@/components/primitives";
import { WEBSITE_PUBLIC_URL } from "@/constants/metadata";

interface CreatorPlatform {
    name: string;
    href: string;
}

interface Creator {
    name: string;
    href: string;
    platform: CreatorPlatform;
}

interface ImageProps {
    src: string;
    alt: string;
    creator?: Creator;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
        a: ({ href, children }) =>
            href ? (
                <Link
                    href={new URL(
                        href,
                        `${WEBSITE_PUBLIC_URL}/blog-articles/`,
                    ).toString()}
                    target="_blank"
                >
                    {children}
                </Link>
            ) : null,
        h1: ({ children }) => <SectionHeading>{children}</SectionHeading>,
        h2: ({ children }) => <SubsectionHeading>{children}</SubsectionHeading>,
        hr: () => <Separator aria-hidden className="my-8" />,
        p: ({ children }) => <Paragraph>{children}</Paragraph>,
        ul: ({ children }) => <List component="ul">{children}</List>,
        ol: ({ children }) => <List component="ol">{children}</List>,
        li: ({ children }) => (
            <ListItem>
                <div className="text-[0.9375rem] leading-[1.75] font-normal">
                    {children}
                </div>
            </ListItem>
        ),
        blockquote: ({ children }) => (
            <LeftAccent
                thickness={3}
                opacity={0.5}
                className="my-8 py-2 italic [&_code]:not-italic"
            >
                <blockquote className="m-0 p-0">{children}</blockquote>
            </LeftAccent>
        ),
        code: (props) => <InlineCodeSegment {...props} />,
        pre: (props) => <CodeBlock {...props} />,
        BlogArticleLayout:
            ArticleLayout as React.ComponentType<ArticleLayoutProps>,
        Image: ({ src, alt, creator }: ImageProps) => (
            <MdxArticleImage src={src} alt={alt} creator={creator} />
        ),

        /*
         * Unsupported Elements
         *
         * These throw errors at build time to catch accidental usage early.
         */

        // Raw markdown image syntax (![alt](src)) is unsupported — use the custom
        // <Image> MDX component instead, which handles attribution and optimization.
        img: () => {
            throw new Error(
                "Raw markdown images are unsupported — use the <Image> MDX component instead.",
            );
        },
        // Tables are not supported in articles.
        table: () => {
            throw new Error("Tables are not supported in articles.");
        },
        thead: () => {
            throw new Error("Tables are not supported in articles.");
        },
        tbody: () => {
            throw new Error("Tables are not supported in articles.");
        },
        tr: () => {
            throw new Error("Tables are not supported in articles.");
        },
        th: () => {
            throw new Error("Tables are not supported in articles.");
        },
        td: () => {
            throw new Error("Tables are not supported in articles.");
        },

        // Heading levels h3–h6 are intentionally unsupported. Articles only use
        // h1 (SectionHeading) and h2 (SubsectionHeading). Supporting deeper levels
        // would add visual and structural complexity without benefit to readers.
        h3: () => {
            throw new Error(
                "MDX h3 (###) is unsupported — only 2 heading levels are available in articles (h1 and h2).",
            );
        },
        h4: () => {
            throw new Error(
                "MDX h4 (####) is unsupported — only 2 heading levels are available in articles (h1 and h2).",
            );
        },
        h5: () => {
            throw new Error(
                "MDX h5 (#####) is unsupported — only 2 heading levels are available in articles (h1 and h2).",
            );
        },
        h6: () => {
            throw new Error(
                "MDX h6 (######) is unsupported — only 2 heading levels are available in articles (h1 and h2).",
            );
        },
    };
}
