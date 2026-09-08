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
import { WEBSITE_PUBLIC_URL } from "@/constants/metadata";
import React from "react";

import { useMDXComponents } from "../../mdx-components";

/*
 * Test helper components
 *
 * useMDXComponents is a plain function despite its hook-like name (its body
 * calls no hooks), but ESLint's rules-of-hooks lint still requires it to be
 * called from inside a component. MDXComponents["a"] is also typed as a
 * union that includes a plain intrinsic tag name, which TS won't accept as
 * a JSX component reference — narrow it to the function-component shape it
 * actually is at runtime.
 */

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { error: Error | null }
> {
    state = { error: null };

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            return (
                <div data-testid="render-error">
                    {(this.state.error as Error).message}
                </div>
            );
        }
        return this.props.children;
    }
}

const MdxLink = (
    props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
): React.ReactElement | null => {
    const { a: RealMdxLink } = useMDXComponents({}) as {
        a: (
            props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
        ) => React.ReactElement | null;
    };
    return <RealMdxLink {...props} />;
};

const MdxImage = (): React.ReactElement | null => {
    const { img: RealMdxImage } = useMDXComponents({}) as {
        img: () => React.ReactElement | null;
    };
    return <RealMdxImage />;
};

const MdxTable = (): React.ReactElement | null => {
    const { table: RealMdxTable } = useMDXComponents({}) as {
        table: () => React.ReactElement | null;
    };
    return <RealMdxTable />;
};

const MdxHeading = ({
    level,
}: {
    level: "h3" | "h4" | "h5" | "h6";
}): React.ReactElement | null => {
    const components = useMDXComponents({}) as Record<
        string,
        () => React.ReactElement | null
    >;
    const RealMdxHeading = components[level];
    return <RealMdxHeading />;
};

const MdxList = ({
    component,
    children,
}: {
    component: "ul" | "ol";
    children: React.ReactNode;
}): React.ReactElement | null => {
    const components = useMDXComponents({}) as Record<
        string,
        (props: { children: React.ReactNode }) => React.ReactElement | null
    >;
    const RealMdxList = components[component];
    const RealMdxListItem = components["li"];
    return (
        <RealMdxList>
            <RealMdxListItem>{children}</RealMdxListItem>
        </RealMdxList>
    );
};

const MdxBlockquote = ({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement | null => {
    const { blockquote: RealMdxBlockquote } = useMDXComponents({}) as {
        blockquote: (props: {
            children: React.ReactNode;
        }) => React.ReactElement | null;
    };
    return <RealMdxBlockquote>{children}</RealMdxBlockquote>;
};

const MdxThematicBreak = (): React.ReactElement | null => {
    const { hr: RealMdxThematicBreak } = useMDXComponents({}) as {
        hr: () => React.ReactElement | null;
    };
    return <RealMdxThematicBreak />;
};

const MdxProseHeading = ({
    level,
    children,
}: {
    level: "h1" | "h2";
    children: React.ReactNode;
}): React.ReactElement | null => {
    const components = useMDXComponents({}) as Record<
        string,
        (props: { children: React.ReactNode }) => React.ReactElement | null
    >;
    const RealMdxProseHeading = components[level];
    return <RealMdxProseHeading>{children}</RealMdxProseHeading>;
};

/*
 * Tests
 */

describe("MDX link mapping", () => {
    it("resolves a relative article link against the blog-articles base", () => {
        // Real articles use this "./{category}/{slug}" form — see e.g.
        // app/(content)/blog-articles/(articles)/java/reading-java-annotations-on-the-fly/page.mdx.
        cy.mount(<MdxLink href="./java/some-article">Read more</MdxLink>);

        cy.findByRole("link", { name: /read more/i }).should(
            "have.attr",
            "href",
            `${WEBSITE_PUBLIC_URL}/blog-articles/java/some-article`,
        );
    });

    it("leaves an absolute external URL untouched", () => {
        cy.mount(
            <MdxLink href="https://example.com/post">External post</MdxLink>,
        );

        cy.findByRole("link", { name: /external post/i }).should(
            "have.attr",
            "href",
            "https://example.com/post",
        );
    });

    it("throws when a link has no href", () => {
        // The ErrorBoundary catches the deliberate throw; React's dev build
        // logs it to console.error. Allow exactly that message.
        cy.allowConsoleError("MDX links must have an href.");
        cy.mount(
            <ErrorBoundary>
                <MdxLink href="">No href</MdxLink>
            </ErrorBoundary>,
        );

        cy.findByTestId("render-error").should(
            "contain.text",
            "MDX links must have an href.",
        );
    });

    it("throws when a link has no text", () => {
        cy.allowConsoleError("MDX links must have link text.");
        cy.mount(
            <ErrorBoundary>
                <MdxLink href="https://example.com/post" />
            </ErrorBoundary>,
        );

        cy.findByTestId("render-error").should(
            "contain.text",
            "MDX links must have link text.",
        );
    });

    it("opens article links in a new tab", () => {
        cy.mount(<MdxLink href="https://example.com/post">Post</MdxLink>);

        cy.findByRole("link", { name: /post/i }).should(
            "have.attr",
            "target",
            "_blank",
        );
    });
});

describe("MDX prose element mapping", () => {
    it("announces a bullet list and its items to screen readers", () => {
        cy.mount(<MdxList component="ul">First item</MdxList>);

        cy.findByRole("list").should("exist");
        cy.findByRole("list").should("have.prop", "tagName", "UL");
        cy.findByRole("listitem").should("contain.text", "First item");
    });

    it("announces a numbered list as an ordered list to screen readers", () => {
        cy.mount(<MdxList component="ol">First item</MdxList>);

        cy.findByRole("list").should("exist");
        cy.findByRole("list").should("have.prop", "tagName", "OL");
        cy.findByRole("listitem").should("contain.text", "First item");
    });

    it("presents a quoted passage as a blockquote", () => {
        cy.mount(<MdxBlockquote>Words of wisdom</MdxBlockquote>);

        cy.get("blockquote").should("contain.text", "Words of wisdom");
    });

    it("keeps the thematic break out of the accessibility tree", () => {
        cy.mount(<MdxThematicBreak />);

        cy.get("[role='separator']").should("have.attr", "aria-hidden", "true");
    });

    it("exposes the article's top-level heading at the level the article layout reserves", () => {
        cy.mount(<MdxProseHeading level="h1">A Section</MdxProseHeading>);

        cy.findByRole("heading", { level: 2, name: "A Section" }).should(
            "exist",
        );
    });

    it("exposes the article's subheadings at the level the article layout reserves", () => {
        cy.mount(<MdxProseHeading level="h2">A Subsection</MdxProseHeading>);

        cy.findByRole("heading", { level: 3, name: "A Subsection" }).should(
            "exist",
        );
    });
});

describe("MDX unsupported element guards", () => {
    it("rejects raw markdown images in favour of the attributed Image component", () => {
        // The ErrorBoundary catches the deliberate throw; allow exactly it.
        cy.allowConsoleError(
            "Raw markdown images are unsupported — use the <Image> MDX component instead.",
        );
        cy.mount(
            <ErrorBoundary>
                <MdxImage />
            </ErrorBoundary>,
        );

        cy.findByTestId("render-error").should(
            "contain.text",
            "Raw markdown images are unsupported — use the <Image> MDX component instead.",
        );
    });

    it("rejects tables in articles", () => {
        cy.allowConsoleError("Tables are not supported in articles.");
        cy.mount(
            <ErrorBoundary>
                <MdxTable />
            </ErrorBoundary>,
        );

        cy.findByTestId("render-error").should(
            "contain.text",
            "Tables are not supported in articles.",
        );
    });

    it("rejects heading levels below the two the article layout supports", () => {
        cy.allowConsoleError("only 2 heading levels are available in articles");
        (["h3", "h4", "h5", "h6"] as const).forEach((level) => {
            cy.mount(
                <ErrorBoundary>
                    <MdxHeading level={level} />
                </ErrorBoundary>,
            );

            cy.findByTestId("render-error").should(
                "contain.text",
                "only 2 heading levels are available in articles",
            );
        });
    });
});
