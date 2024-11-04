import { expect, test } from "@playwright/test";

test("Desktop", async ({ page }) => {
	await page.goto("https://localhost:5000/v/");

	const splash = await page.getByLabel("logo");
	await expect(splash).toBeVisible();
	await page.pause();
	await expect(page).toHaveScreenshot("desktop_splash.png");

	const home = await page.getByText("Guest");
	await expect(home).toBeVisible();
	await page.pause();
	await expect(page).toHaveScreenshot("desktop_guest.png");

	await page.getByText("User").click();
	await page.getByPlaceholder("Email (a, b)").click();
	await page.getByPlaceholder("Email (a, b)").fill("a");
	await page.getByPlaceholder("Password (a, b)").click();
	await page.getByPlaceholder("Password (a, b)").fill("a");
	await page.getByRole("button", { name: "Login" }).click();
	const userName = await page.getByText("Welcome John Admin!", { exact: true });
	await expect(userName).toBeVisible();
	await page.pause();
	await expect(page).toHaveScreenshot("desktop_login.png");

	await expect(userName).not.toBeVisible();
	await page.pause();
	await expect(page).toHaveScreenshot("desktop_user.png");

	const appSettings = await page.getByText("Settings");
	await expect(appSettings).toBeVisible();
	await appSettings.click();
	await expect(page.getByText("Appearance")).toBeVisible();
	await page.pause();
	await expect(page).toHaveScreenshot("desktop_settings.png");

	await page.locator("svg").filter({ hasText: "iconXCircle" }).click();
	await expect(userName).toBeVisible();
	await page.pause();
	await expect(page).toHaveScreenshot("desktop_home.png");
});
