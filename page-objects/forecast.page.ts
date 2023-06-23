import { Page } from "@playwright/test";

export class ForecastPage {
    days: string = '.day';
    rainPercentage: string = '.rain .pop';
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getPercentageRainNumberByDate(date: string): Promise<number> {
        const days = this.page.locator(this.days);
        const dateForecast = await days
            .filter({ hasText: date });
        const rainForecast = await dateForecast.locator(this.rainPercentage).innerText();
        return parseFloat(rainForecast.replace('%', ''));
    }
}