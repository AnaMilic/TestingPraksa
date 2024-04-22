const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageObjects/LoginPage");
const { HomePage } = require("../pageObjects/HomePage");

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

test("Valid login using PMO", async ({ page }) => {
  const username = "standard_user";
  const password = "secret_sauce";
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.goToLoginPage();
  await loginPage.validLogin(username, password);
  await homePage.validateHomePage();
});

test.only("Login with invalid username", async ({ page }) => {
  const username = "aaa";
  const password = "secret_sauce";
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.invalidLogin(username, password);
});
