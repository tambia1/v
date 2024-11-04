import { expect, test } from "@playwright/test";

test("Desktop", async ({ page }) => {
	await page.goto("https://localhost:5000/v/");

	const desktop = await page.getByText("Guest");
	await expect(desktop).toBeVisible();
	await expect(page).toHaveScreenshot("desktop_home.png");

	await page.getByText("User").click();
	await page.getByPlaceholder("Email (a, b)").click();
	await page.getByPlaceholder("Email (a, b)").fill("a");
	await page.getByPlaceholder("Password (a, b)").click();
	await page.getByPlaceholder("Password (a, b)").fill("a");
	await page.getByRole("button", { name: "Login" }).click();
	const userName = await page.getByText("John", { exact: true });
	await expect(userName).toBeVisible();
	await expect(page).toHaveScreenshot("desktop_after_login.png");

	const appSettings = await page.getByText("Settings");
	await expect(appSettings).toBeVisible();
	await appSettings.click();
	await expect(page.getByText("Appearance")).toBeVisible();
	await expect(page).toHaveScreenshot("desktop_settings.png");

	await page.locator("svg").filter({ hasText: "iconXCircle" }).click();
	await page.waitForTimeout(1000);
	await expect(userName).toBeVisible();
	await expect(page).toHaveScreenshot("desktop_after_settings.png");
});
