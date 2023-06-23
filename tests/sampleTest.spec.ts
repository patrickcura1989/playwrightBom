import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/home.page'
import { ForecastPage } from '../page-objects/forecast.page'

const baseUrl = 'http://www.bom.gov.au/';

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test('Navigate to the Sydney Forecast Page then Assert on the Rain Percentage', async ({ page }) => {

  const capital = "Sydney";
  const numberOfDaysToAdd = 3;
  const targetDate = new Date(Date.now() + numberOfDaysToAdd * 24 * 60 * 60 * 1000)
  const monthOptions: Intl.DateTimeFormatOptions = { month: "long" };
  const targetDateMonth = targetDate.toLocaleDateString("en-US", monthOptions);
  const targetDateDate = targetDate.getDate();
  const date = `${targetDateDate} ${targetDateMonth}`;

  const homePage = new HomePage(page);
  await homePage.navigateToACapital(capital);

  const forecastPage = new ForecastPage(page);
  const rainForecast = await forecastPage.getPercentageRainNumberByDate(date);
  const errorMessage = `Looks like it will be a rainy day on the ${targetDateDate}th of ${targetDateMonth}`;
  await expect(rainForecast, errorMessage).toBeLessThanOrEqual(50);

});

