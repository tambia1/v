import { expect, type Page } from "@playwright/test";

export const ANIMATION_TIME = 500;

export const performLogin = async (page: Page) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.context().clearCookies();

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

	await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
	await expect(page.getByRole("button", { name: "Logout" })).not.toBeVisible();
};

export const performSwipe = async (page: Page, direction: "rightToLeft" | "leftToRight") => {
	const viewportSize = page.viewportSize();

	if (viewportSize) {
		const startX = direction === "rightToLeft" ? viewportSize.width * 0.8 : viewportSize.width * 0.2;
		const endX = direction === "rightToLeft" ? viewportSize.width * 0.2 : viewportSize.width * 0.8;
		const y = viewportSize.height - 50;

		await page.mouse.move(startX, y);
		await page.mouse.down();
		await page.mouse.move(endX, y, { steps: 10 });
		await page.mouse.up();
	}

	await page.waitForTimeout(ANIMATION_TIME);
};
