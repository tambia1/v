import { test, expect } from "@playwright/test";

test("open desktop", async ({ page }) => {
	await page.goto("http://localhost:5000/v/");

	const appSettings = await page.getByText("Settings");
	await expect(appSettings).toBeVisible();
	await expect(page).toHaveScreenshot("desktop.png");

	await appSettings.click();
	await expect(page.getByText("Appearance")).toBeVisible();
	await expect(page).toHaveScreenshot("settings.png");

	await page.locator("svg").filter({ hasText: "iconXCircle" }).click();
	await page.waitForTimeout(1000);
	await expect(appSettings).toBeVisible();
	await page.getByText("User").click();
	await page.getByPlaceholder("Email (a, b)").click();
	await page.getByPlaceholder("Email (a, b)").fill("a");
	await page.getByPlaceholder("Password (a, b)").click();
	await page.getByPlaceholder("Password (a, b)").fill("a");
	await page.getByRole("button", { name: "Login" }).click();
	const userName = await page.getByText("John", { exact: true });
	await expect(userName).toBeVisible();
	await expect(page).toHaveScreenshot("loggedIn.png");
});
