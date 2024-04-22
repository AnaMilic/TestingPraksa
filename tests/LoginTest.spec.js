const { test, expect } = require("@playwright/test");

test("Valid login", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const itemTitle = page.locator(".inventory_item_label a");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  expect(await page.screenshot()).toMatchSnapshot("homePageScreenshot.png");
  //await page.screenshot({ path: "screenshots/homePageScreenshot.png" });
  await itemTitle.first().waitFor();
  await expect(itemTitle.first()).toContainText("Sauce Labs Backpack");
});
