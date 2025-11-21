import { expect, test } from "@playwright/test";
import { performSwipe } from "./utils";

const ANIMATION_TIME = 1000;

test("Desktop", async ({ page }) => {
	let screenshotCounter = 0;

	await page.context().clearCookies();
	await page.goto(`${process.env.VITE_BASE_URL}`, { waitUntil: "commit" });

	const splash = await page.getByLabel("logo");
	await expect(splash).toBeVisible();
	const progress = await page.getByLabel("progress");
	await expect(progress).not.toBeVisible();

	const home = await page.getByText("Guest");
	await expect(home).toBeVisible();
	await page.waitForTimeout(ANIMATION_TIME);
	await expect(page).toHaveScreenshot(`${screenshotCounter++}_desktop_guest.png`);

	await performSwipe(page, "rightToLeft");
	await expect(page).toHaveScreenshot(`${screenshotCounter++}_desktop_guest.png`);

	await performSwipe(page, "leftToRight");
	await page.getByText("User").click();
	await page.getByPlaceholder("Email (a, b)").click();
	await page.getByPlaceholder("Email (a, b)").fill("a");
	await page.getByPlaceholder("Password (a, b)").click();
	await page.getByPlaceholder("Password (a, b)").fill("a");
	await expect(page).toHaveScreenshot(`${screenshotCounter++}_desktop_login.png`);

	await page.getByRole("button", { name: "Login" }).click();
	const welcome = await page.getByText("Welcome John Admin!");
	await page.waitForTimeout(ANIMATION_TIME);
	await expect(welcome).not.toBeVisible();
	await expect(page).toHaveScreenshot(`${screenshotCounter++}_desktop_user.png`);
});
