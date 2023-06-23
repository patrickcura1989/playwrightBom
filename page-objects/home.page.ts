import { Page } from "@playwright/test";

export class HomePage {
    capitals: string = '.capital';
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToACapital(capital: string) {
        const capitals = this.page.locator(this.capitals);
        await capitals
            .filter({ hasText: capital })
            .click();
    }
}