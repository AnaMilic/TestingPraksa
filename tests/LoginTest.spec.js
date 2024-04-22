const { test, expect } = require("@playwright/test");

test("Valid login", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const itemTitle = page.locator(".inventory_item_label a");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await itemTitle.first().waitFor();
  await expect(itemTitle.first()).toContainText("Sauce Labs Backpack");
});
