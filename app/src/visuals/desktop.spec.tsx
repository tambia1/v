import { expect, test } from "@playwright/test";
import { ANIMATION_TIME } from "./utils";

test("Desktop", async ({ page }) => {
	await page.context().clearCookies();
	await page.goto(`${process.env.VITE_BASE_URL}`, { waitUntil: "domcontentloaded" });

	// Wait for the splash screen to appear and then disappear
	const splash = page.getByLabel("logo");
	await expect(splash).toBeVisible();

	// Wait for the splash to complete loading and disappear
	await expect(splash).not.toBeVisible();

	// Now we should be on the main desktop
	const home = page.getByText("Guest");
	await expect(home).toBeVisible();

	// Wait for fonts and animations to complete
	await page.waitForTimeout(ANIMATION_TIME);
	await page.waitForLoadState('networkidle');

	await expect(page).toHaveScreenshot("desktop-guest.png");

	await page.getByText("User").click();
	await page.getByPlaceholder("Email (a, b)").click();
	await page.getByPlaceholder("Email (a, b)").fill("a");
	await page.getByPlaceholder("Password (a, b)").click();
	await page.getByPlaceholder("Password (a, b)").fill("a");
	await page.getByRole("button", { name: "Login" }).click();

	const welcome = page.getByText("Welcome John Admin!");
	await expect(welcome).toBeVisible();
	await page.waitForTimeout(ANIMATION_TIME);
	await expect(page).toHaveScreenshot("desktop-login.png");
	await expect(welcome).not.toBeVisible();
	await page.waitForTimeout(ANIMATION_TIME);
	await expect(page).toHaveScreenshot("desktop-user.png");
});
