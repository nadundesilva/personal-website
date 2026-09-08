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
import CopyButton from "@/components/primitives/CopyButton";

function stubClipboard(resolveOrReject: "resolve" | "reject") {
    cy.window().then((win) => {
        const writeText =
            resolveOrReject === "resolve"
                ? cy.stub().as("writeText").resolves()
                : cy.stub().as("writeText").rejects(new Error("Denied"));
        Object.defineProperty(win.Navigator.prototype, "clipboard", {
            configurable: true,
            get: () => ({ writeText }),
        });
    });
}

describe("CopyButton", () => {
    it("is labeled and ready to copy before any interaction", () => {
        cy.mount(<CopyButton copyContent="hello" />);

        cy.findByRole("button", { name: /copy/i }).should("be.visible");
        // The status live region is empty on initial render before any copy action.
        cy.findByRole("status").should("have.text", "");
    });

    it("changes its icon to show the Copied state after a successful clipboard write", () => {
        stubClipboard("resolve");
        cy.mount(<CopyButton copyContent="hello world" />);

        cy.findByRole("button", { name: /copy/i })
            .find("svg")
            .invoke("attr", "class")
            .as("defaultIcon");

        cy.findByRole("button", { name: /copy/i }).click({ force: true });

        cy.get("@writeText").should("have.been.calledWith", "hello world");
        cy.findByRole("status").should("have.text", "Copied!");
        cy.findByRole("button", { name: /^copy$/i })
            .find("svg")
            .invoke("attr", "class")
            .then((copiedIcon) => {
                cy.get("@defaultIcon").should("not.eq", copiedIcon);
            });
        // The accessible name stays the base action ("Copy"), state is announced via role=status only.
        cy.findByRole("button", { name: /^copy$/i }).should("exist");
    });

    it("reverts to default state after the Copied timeout", () => {
        cy.clock();
        stubClipboard("resolve");
        cy.mount(<CopyButton copyContent="hello" />);

        cy.findByRole("button", { name: /copy/i }).click({ force: true });
        cy.findByRole("status").should("have.text", "Copied!");

        cy.tick(2000);
        cy.findByRole("status").should("have.text", "");
    });

    it("changes its icon to show the Copy failed state when clipboard write rejects", () => {
        stubClipboard("reject");
        cy.mount(<CopyButton copyContent="hello" />);

        cy.findByRole("button", { name: /copy/i })
            .find("svg")
            .invoke("attr", "class")
            .as("defaultIcon");

        cy.findByRole("button", { name: /copy/i }).click({ force: true });

        cy.findByRole("status").should("have.text", "Copy failed");
        cy.findByRole("button", { name: /copy/i })
            .find("svg")
            .invoke("attr", "class")
            .then((failedIcon) => {
                cy.get("@defaultIcon").should("not.eq", failedIcon);
            });
    });

    it("reverts to default state after the Copy failed timeout", () => {
        cy.clock();
        stubClipboard("reject");
        cy.mount(<CopyButton copyContent="hello" />);

        cy.findByRole("button", { name: /copy/i }).click({ force: true });
        cy.findByRole("status").should("have.text", "Copy failed");

        cy.tick(2000);
        cy.findByRole("status").should("have.text", "");
    });

    it("copies a value that is resolved asynchronously", () => {
        stubClipboard("resolve");
        const resolver = cy.stub().as("resolver").resolves("resolved content");
        cy.mount(<CopyButton resolveCopyContent={resolver} />);

        cy.findByRole("button", { name: /copy/i }).click({ force: true });

        cy.get("@resolver").should("have.been.calledOnce");
        cy.get("@writeText").should("have.been.calledWith", "resolved content");
    });

    it("announces a caller-provided success message when configured", () => {
        stubClipboard("resolve");
        cy.mount(
            <CopyButton
                copyContent="x"
                label="Duplicate"
                copiedLabel="Done!"
            />,
        );

        cy.findByRole("button", { name: /duplicate/i }).click({ force: true });
        cy.findByRole("status").should("have.text", "Done!");
    });

    it("announces a caller-provided failure message when configured", () => {
        stubClipboard("reject");
        cy.mount(<CopyButton copyContent="x" failedLabel="Oops" />);

        cy.findByRole("button", { name: /copy/i }).click({ force: true });
        cy.findByRole("status").should("have.text", "Oops");
    });
});
