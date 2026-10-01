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
import type { StaticImageData } from "next/image";

import Logo from "@/components/content/Logo";
import type { LogoImageData } from "@/constants/logos";

const mockLogoData: LogoImageData = {
    srcLight: {
        src: "/logo-light.png",
        width: 280,
        height: 80,
    } as StaticImageData,
    srcDark: {
        src: "/logo-dark.png",
        width: 280,
        height: 80,
    } as StaticImageData,
};

describe("Logo", () => {
    it("loads immediately at high priority when it is the first thing on the page", () => {
        cy.mount(<Logo {...mockLogoData} alt="" fetchPriority="high" />);

        // Both themes' images are prioritized: only one is shown at a time,
        // and either may be the LCP element.
        for (const testId of ["logo-light", "logo-dark"]) {
            cy.findByTestId(testId)
                .should("have.attr", "fetchpriority", "high")
                .and("have.attr", "loading", "eager");
        }
    });

    it("defers loading by default so below-the-fold logos do not compete for bandwidth", () => {
        cy.mount(<Logo {...mockLogoData} alt="" />);

        for (const testId of ["logo-light", "logo-dark"]) {
            cy.findByTestId(testId).should("have.attr", "loading", "lazy");
        }
    });

    it("stays out of the accessibility tree when it is purely decorative", () => {
        cy.mount(<Logo {...mockLogoData} alt="" />);

        // The light image carries no alt text of its own, so its ancestor container
        // must be aria-hidden to suppress the decorative logo from the accessibility tree.
        cy.findByTestId("logo-light")
            .closest("[aria-hidden='true']")
            .should("exist");
    });

    it("describes the light-mode image to screen readers with the caller's alt text", () => {
        cy.mount(<Logo {...mockLogoData} alt="Company Name" />);

        cy.findByTestId("logo-light").should(
            "have.attr",
            "alt",
            "Company Name",
        );
    });

    it("always hides the dark-mode image from the accessibility tree to prevent double announcements", () => {
        cy.mount(<Logo {...mockLogoData} alt="Company Name" />);

        cy.findByTestId("logo-dark")
            .should("have.attr", "aria-hidden", "true")
            .and("have.attr", "alt", "");
    });

    it("shows the light-mode image by default and hides it in dark mode", () => {
        cy.mount(<Logo {...mockLogoData} alt="" />);

        cy.findByTestId("logo-light").should("be.visible");

        cy.document().then((doc) => {
            doc.documentElement.classList.add("dark");
        });
        cy.findByTestId("logo-light").should("not.be.visible");
    });

    it("hides the dark-mode image by default and shows it in dark mode", () => {
        cy.mount(<Logo {...mockLogoData} alt="" />);

        cy.findByTestId("logo-dark").should("not.be.visible");

        cy.document().then((doc) => {
            doc.documentElement.classList.add("dark");
        });
        cy.findByTestId("logo-dark").should("be.visible");
    });
});
