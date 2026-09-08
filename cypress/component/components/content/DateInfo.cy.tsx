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
import DateInfo from "@/components/content/DateInfo";
import { DateRange, Date as FormattableDate, Now } from "@/constants/date";

describe("DateInfo", () => {
    it("formats and displays a month+year date", () => {
        const date = new FormattableDate(2021, "June");
        cy.mount(<DateInfo value={date} />);

        cy.get("time").should("be.visible").and("have.text", "June 2021");
    });

    it("exposes the date in machine-readable form for crawlers and assistive tech", () => {
        const date = new FormattableDate(2021, "June");
        cy.mount(<DateInfo value={date} />);

        cy.get("time").should("have.attr", "dateTime", "2021-06");
    });

    it("announces the value as a date to screen readers", () => {
        const date = new FormattableDate(2020, "January");
        cy.mount(<DateInfo value={date} />);

        // The sr-only label gives screen reader users an explicit "Date:" prefix so the time element's context is unambiguous.
        cy.get(".sr-only").should("have.text", "Date:");
    });

    it("reads a date range as 'start to end'", () => {
        const range = new DateRange(
            new FormattableDate(2019, "March"),
            new FormattableDate(2021, "August"),
        );
        cy.mount(<DateInfo value={range} />);

        cy.contains("March 2019 to August 2021").should("be.visible");
    });

    it("shows an ongoing range as running until now", () => {
        const range = new DateRange(new FormattableDate(2020, "May"), Now);
        cy.mount(<DateInfo value={range} />);

        cy.contains("Now").should("be.visible");
    });
});
