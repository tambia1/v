import { expect, test } from "@playwright/test";
import { ANIMATION_TIME, performLogin } from "./utils";

test("Settings", async ({ page }) => {
	await performLogin(page);

	await page.getByText("Settings").click();
	await page.waitForTimeout(ANIMATION_TIME);

	await expect(page.getByText("Appearance")).toBeVisible();
	await expect(page.getByText("About")).toBeVisible();
	await expect(page).toHaveScreenshot("settings-main.png");
});
