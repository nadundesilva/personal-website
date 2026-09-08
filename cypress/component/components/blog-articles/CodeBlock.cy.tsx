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
import CodeBlock from "@/components/blog-articles/CodeBlock";

describe("CodeBlock", () => {
    it("shows the code it is given", () => {
        cy.mount(
            <CodeBlock>
                <code>const x = 1;</code>
            </CodeBlock>,
        );

        cy.findByRole("code").should("not.exist");
        cy.contains("const x = 1;").should("be.visible");
    });

    it("identifies itself as a code block to screen readers when no language is known", () => {
        cy.mount(
            <CodeBlock>
                <code>hello</code>
            </CodeBlock>,
        );

        // <pre> has no intrinsic accessible name; aria-label exposes the block's purpose to screen readers.
        cy.get("pre").should("have.attr", "aria-label", "code block");
    });

    it("tells screen reader users which language the block contains", () => {
        cy.mount(
            <CodeBlock data-language="typescript">
                <code>const x: number = 1;</code>
            </CodeBlock>,
        );

        // <pre> has no intrinsic accessible name; aria-label exposes the language to screen readers.
        cy.get("pre").should(
            "have.attr",
            "aria-label",
            "typescript code block",
        );
    });

    // realHover needs CDP to simulate genuine OS-level pointer state - a
    // synthetic mouseover/pointerover event never activates CSS :hover in
    // any browser. Firefox has no CDP, so this can't run there.
    it(
        "stays out of the way until the reader hovers the code block",
        { browser: "!firefox" },
        () => {
            cy.mount(
                <CodeBlock>
                    <code>{"console.log('hi');"}</code>
                </CodeBlock>,
            );

            cy.findByRole("button", { name: /copy to clipboard/i }).should(
                "have.css",
                "opacity",
                "0",
            );
            cy.get(".code-block-wrapper").realHover();
            cy.findByRole("button", { name: /copy to clipboard/i }).should(
                "have.css",
                "opacity",
                "1",
            );
        },
    );

    it("reveals the copy button for keyboard users tabbing into the code block", () => {
        cy.mount(
            <CodeBlock>
                <code>{"console.log('hi');"}</code>
            </CodeBlock>,
        );

        cy.findByRole("button", { name: /copy to clipboard/i })
            .focus()
            .should("have.css", "opacity", "1");
    });

    it("copies the code text to clipboard when the copy button is clicked", () => {
        // Stub navigator.clipboard so we can assert what was written
        cy.window().then((win) => {
            const writeText = cy.stub().as("writeText").resolves();
            Object.defineProperty(win.Navigator.prototype, "clipboard", {
                configurable: true,
                get: () => ({ writeText }),
            });
        });

        const codeText = 'const greeting = "hello, world";';
        cy.mount(
            <CodeBlock>
                <code>{codeText}</code>
            </CodeBlock>,
        );

        cy.findByRole("button", { name: /copy to clipboard/i }).click();

        // resolveCopyContent uses querySelector("code").textContent — this verifies the wiring
        cy.get("@writeText").should("have.been.calledWith", codeText);
    });
});
