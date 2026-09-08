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
import {
    Button,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/shadcn/ui";

interface TestDrawerProps {
    swipeDirection?: "up" | "down" | "left" | "right";
    showSwipeHandle?: boolean;
    modal?: boolean;
}

function TestDrawer({
    swipeDirection,
    showSwipeHandle,
    modal,
}: TestDrawerProps) {
    return (
        <Drawer
            swipeDirection={swipeDirection}
            showSwipeHandle={showSwipeHandle}
            modal={modal}
        >
            <DrawerTrigger render={<Button>Open Drawer</Button>} />
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Test Drawer</DrawerTitle>
                    <DrawerDescription>Drawer description</DrawerDescription>
                </DrawerHeader>
                <DrawerClose render={<Button>Close</Button>} />
            </DrawerContent>
        </Drawer>
    );
}

describe("Drawer", () => {
    it("opens when trigger is clicked", () => {
        cy.mount(<TestDrawer />);

        cy.findByRole("dialog").should("not.exist");
        cy.findByRole("button", { name: /open drawer/i }).click();
        cy.findByRole("dialog").should("be.visible");
        cy.findByText("Test Drawer").should("be.visible");
    });

    it("closes when the close button is clicked", () => {
        cy.mount(<TestDrawer />);

        cy.findByRole("button", { name: /open drawer/i }).click();
        cy.findByRole("dialog").should("be.visible");

        cy.findByRole("button", { name: /^close$/i }).click();
        cy.findByRole("dialog").should("not.exist");
    });

    it("closes when Escape key is pressed", () => {
        cy.mount(<TestDrawer />);

        cy.findByRole("button", { name: /open drawer/i }).click();
        cy.findByRole("dialog").should("be.visible");

        cy.get("body").type("{esc}");
        cy.findByRole("dialog").should("not.exist");
    });

    // realClick needs CDP to click at real screen coordinates - a plain
    // cy.click("top") was tried here and left the drawer open, so this
    // needs CDP and can't run on Firefox.
    it("closes when clicking the overlay", { browser: "!firefox" }, () => {
        cy.mount(<TestDrawer />);

        cy.findByRole("button", { name: /open drawer/i }).click();
        cy.findByRole("dialog").should("be.visible");

        cy.get("[data-slot='drawer-viewport']").realClick({
            position: "top",
        });
        cy.findByRole("dialog").should("not.exist");
    });

    it("closes when the swipe handle is dragged past the swipe threshold", () => {
        cy.mount(<TestDrawer swipeDirection="up" showSwipeHandle />);

        cy.findByRole("button", { name: /open drawer/i }).click();
        cy.findByRole("dialog").should("be.visible");

        // Base UI's own pointerdown handler ignores drags starting inside
        // [data-slot="drawer-content"] for mouse/pointer input (touch is
        // handled separately, natively, and isn't reproducible through
        // Cypress's synthetic events) - the swipe handle is the one area of
        // the popup deliberately left outside that exclusion, so it is the
        // only mouse-drag target that can close the drawer.
        cy.get('[data-slot="drawer-swipe-handle"]').trigger("pointerdown", {
            button: 0,
            buttons: 1,
            pointerId: 1,
            pointerType: "mouse",
            clientX: 100,
            clientY: 300,
        });
        for (const clientY of [280, 250, 220, 190, 160, 130, 100, 70, 40]) {
            cy.get('[data-slot="drawer-swipe-handle"]').trigger("pointermove", {
                buttons: 1,
                pointerId: 1,
                pointerType: "mouse",
                clientX: 100,
                clientY,
            });
        }
        cy.get('[data-slot="drawer-swipe-handle"]').trigger("pointerup", {
            pointerId: 1,
            pointerType: "mouse",
            clientX: 100,
            clientY: 40,
        });

        cy.findByRole("dialog").should("not.exist");
    });

    it("renders no overlay and leaves the page behind clickable when non-modal", () => {
        // Layout.tsx (the site's only real Drawer consumer) always renders
        // modal={false} - none of the tests above exercise that
        // configuration, only the default modal={true}.
        const onPageContentClick = cy.stub().as("onPageContentClick");
        cy.mount(
            <>
                <button onClick={onPageContentClick}>Page content</button>
                <TestDrawer modal={false} />
            </>,
        );

        cy.findByRole("button", { name: /open drawer/i }).click();
        cy.findByRole("dialog").should("be.visible");

        cy.get("[data-slot='drawer-overlay']").should("not.exist");

        // With modal={true} the overlay is a fixed, full-viewport element
        // that physically covers "Page content" - Cypress's .click() fails
        // there because the target is obscured. Here it must succeed.
        cy.findByRole("button", { name: /page content/i }).click();
        cy.get("@onPageContentClick").should("have.been.calledOnce");
    });

    it("tells the panel which edge it opens from", () => {
        cy.mount(<TestDrawer swipeDirection="up" />);

        cy.findByRole("button", { name: /open drawer/i }).click();
        cy.get("[data-slot='drawer-popup']").should(
            "have.attr",
            "data-swipe-direction",
            "up",
        );
    });
});
