import { type Page, expect } from "@playwright/test";

export const ANIMATION_TIME = 500;

export const performLogin = async (page: Page) => {
	await page.context().clearCookies();

	// Ensure VITE_BASE_URL is available
	if (!process.env.VITE_BASE_URL) {
		throw new Error("VITE_BASE_URL environment variable is not set");
	}

	// Ensure viewport is set correctly (especially important in CI)
	await page.setViewportSize({ width: 390, height: 844 });

	await page.goto(`${process.env.VITE_BASE_URL}`, { waitUntil: "domcontentloaded" });

	const splash = page.getByLabel("logo");
	await expect(splash).toBeVisible();
	await expect(splash).not.toBeVisible();

	const home = page.getByText("Guest");
	await expect(home).toBeVisible();
	await page.waitForTimeout(ANIMATION_TIME);

	await page.getByText("User").click();
	await page.getByPlaceholder("Email (a, b)").click();
	await page.getByPlaceholder("Email (a, b)").fill("a");
	await page.getByPlaceholder("Password (a, b)").click();
	await page.getByPlaceholder("Password (a, b)").fill("a");
	await page.getByRole("button", { name: "Login" }).click();

	const welcome = page.getByText("Welcome John Admin!");
	await expect(welcome).toBeVisible();
	await expect(welcome).not.toBeVisible();
};
