import { test, expect } from "@playwright/test";

test("open desktop", async ({ page }) => {
	await page.goto("http://localhost:5000/v/");

	const appSettings = await page.getByText("Settings");
	await expect(appSettings).toBeVisible();

	await appSettings.click();

	await expect(await page.locator("svg").filter({ hasText: "iconXCircle" })).toBeVisible();

	await expect(page.getByText("Appearance")).toBeVisible();

	await expect(page).toHaveScreenshot();
});
