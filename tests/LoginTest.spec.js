const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");

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

test.only("Valid login using PMO", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const homePage = poManager.getHomePage();
  await loginPage.goToLoginPage();
  await loginPage.validLogin();
  await homePage.validateHomePage();
});

test("Invalid login", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goToLoginPage();
  await loginPage.invalidLogin();
});
