import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "https://localhost:5000";

test("Desktop", async ({ page }) => {
	let screenshotCounter = 0;

	await page.context().clearCookies();
	await page.goto(`${BASE_URL}/v/`, { waitUntil: "commit" });

	const splash = await page.getByLabel("logo");
	await expect(splash).toBeVisible();
	await expect(page).toHaveScreenshot(`${screenshotCounter++}_desktop_splash.png`);

	const home = await page.getByText("Guest");
	await expect(home).toBeVisible();
	await page.waitForTimeout(1000);
	await expect(page).toHaveScreenshot(`${screenshotCounter++}_desktop_guest.png`);

	await page.getByText("User").click();
	await page.getByPlaceholder("Email (a, b)").click();
	await page.getByPlaceholder("Email (a, b)").fill("a");
	await page.getByPlaceholder("Password (a, b)").click();
	await page.getByPlaceholder("Password (a, b)").fill("a");
	await page.getByRole("button", { name: "Login" }).click();
	const welcome = await page.getByText("Welcome John Admin!");
	await expect(welcome).toBeVisible();
	await expect(page).toHaveScreenshot(`${screenshotCounter++}_desktop_login.png`);

	await expect(welcome).not.toBeVisible();
	await expect(page).toHaveScreenshot(`${screenshotCounter++}_desktop_user.png`);

	const appSettings = await page.getByText("Settings");
	await expect(appSettings).toBeVisible();
	await appSettings.click();
	await expect(page.getByText("Appearance")).toBeVisible();
	await expect(page).toHaveScreenshot(`${screenshotCounter++}_desktop_settings.png`);

	await page.locator("svg").filter({ hasText: "iconXCircle" }).click();
	const userName = await page.getByText("John");
	await expect(userName).toBeVisible();
	await expect(page).toHaveScreenshot(`${screenshotCounter++}_desktop_home.png`);
});
